import firebaseService from "../services/firebaseService";
import MarketApi from "../services/marketApiService";
import { FIREBASE_COLLECTIONS, MARKET_API_URLS } from "../constants";
import { ItemDTO } from "../types/bdolyticsDTO";
import { IngrediantsMarketPriceDTO } from "../types/firebaseDTO";
import logger from "../config/logger";

// 캐시된 원자재 데이터
let cachedIngredients: ItemDTO[] = [];
// 초기화 상태 플래그
let isInitiated = false;

/**
 * 원자재 데이터를 초기화합니다.
 */
const initCachedIngredients = async (): Promise<void> => {
    cachedIngredients = await firebaseService.getDocuments<ItemDTO>(
        FIREBASE_COLLECTIONS.CRATE_INGREDIENT
    );
    isInitiated = true;
    logger.info("캐시된 원자재 데이터가 초기화되었습니다.");
};

/**
 * 원자재의 시장 가격을 업데이트합니다.
 *
 * @description
 * - 데이터베이스에서 원자재 ID를 요청합니다.
 * - 시장 API를 통해 원자재의 시장 가격을 가져와 데이터베이스에 업데이트합니다.
 * - 캐시된 원자재 데이터를 활용하여 불필요한 네트워크 요청을 줄입니다.
 * - 일괄 작업을 활용하여 성능을 개선하고 Firebase 비용을 절감합니다.
 */
const updateIngrediantsMarketPrice = async (): Promise<void> => {
    try {
        if (!isInitiated) await initCachedIngredients();

        const ingredientIds = cachedIngredients.map(
            (ingredient) => ingredient.id
        );
        const searchResult = await MarketApi.getWorldMarketSearchList(
            MARKET_API_URLS.KR,
            ingredientIds.toString()
        );

        // 일괄 작업을 생성합니다.
        const batch = firebaseService.createBatch();

        for (const item of searchResult) {
            const marketPriceDTO: IngrediantsMarketPriceDTO = {
                itemId: item.itemId,
                marketPrice: item.basePrice
            };
            const itemRef = firebaseService.doc(
                FIREBASE_COLLECTIONS.INGREDIANTS_MARKETPRICE,
                item.itemId.toString()
            );
            batch.set(itemRef, marketPriceDTO);
        }

        // 일괄 작업을 커밋합니다.
        await firebaseService.commitBatch(batch);

        logger.info("원자재의 시장 가격이 업데이트되었습니다.");
    } catch (error) {
        logger.error("원자재 ID 가져오기 중 에러가 발생했습니다:", error);
    }
};

export default updateIngrediantsMarketPrice;
