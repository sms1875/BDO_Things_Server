import firebaseService from "../services/firebaseService";
import BdolyticsApi from "../services/bdolyticsApiService";
import { DesignDTO, ItemDTO } from "../types/bdolyticsDTO";
import { BDOLYTICS_API_URLS, FIREBASE_COLLECTIONS } from "../constants";
import logger from "../config/logger";

/**
 * 가공무역 상자 정보를 Firestore에 추가합니다.
 *
 * @description
 * - Bdolytics API에서 가공무역 상자에 대한 정보를 가져옵니다.
 * - 디자인, 완성품 및 재료 아이템 데이터를 Firestore에 추가합니다.
 */
async function addCrateData(): Promise<void> {
    try {
        const filter = (designData: DesignDTO | undefined) =>
            designData?.name?.includes("Crate") ?? false;

        logger.info("Firestore에 가공무역 상자 데이터를 추가하는 중...");
        for (let id = 9200; id <= 9602; id++) {
            const designData = await BdolyticsApi.fetchBdolyticsCategoryIdData(
                BDOLYTICS_API_URLS.DESIGN,
                String(id)
            );
            if (designData && filter(designData as DesignDTO)) {
                const productIds: string[] = (
                    designData as DesignDTO
                ).products.map((product) => String(product.id));
                const ingredientIds: string[] = (
                    designData as DesignDTO
                ).ingredients.map((ingredient) => String(ingredient.id));

                const promises = [
                    addDataToDocument(
                        BDOLYTICS_API_URLS.DESIGN,
                        String(id),
                        FIREBASE_COLLECTIONS.CRATE_DESIGN
                    ),
                    ...productIds.map((productId) =>
                        addDataToDocument(
                            BDOLYTICS_API_URLS.ITEM,
                            productId,
                            FIREBASE_COLLECTIONS.CRATE_PRODUCT
                        )
                    ),
                    ...ingredientIds.map((ingredientId) =>
                        addCrateIngredientData(
                            BDOLYTICS_API_URLS.ITEM,
                            ingredientId,
                            FIREBASE_COLLECTIONS.CRATE_INGREDIENT
                        )
                    )
                ];

                await Promise.all(promises);
            }
        }
        logger.info("가공무역 상자 데이터 추가가 완료되었습니다.");
    } catch (error) {
        logger.error(
            "가공무역 상자 데이터를 업데이트하는 중 에러 발생:",
            error
        );
    }
}

/**
 * Firestore 문서에 데이터를 처리하고 추가합니다.
 * @param {string} url - Bdolytics API의 URL입니다.
 * @param {string} id - 데이터의 ID입니다.
 * @param {string} documentType - Firestore에서의 문서 유형입니다.
 */
async function addDataToDocument(
    url: string,
    id: string,
    documentType: string
): Promise<void> {
    try {
        const itemData = await BdolyticsApi.fetchBdolyticsCategoryIdData(
            url,
            id
        );
        if (itemData && Object.keys(itemData).length > 0) {
            const documentExists = await firebaseService.documentExists(
                documentType,
                id
            );
            if (!documentExists) {
                await firebaseService.addDocument(documentType, itemData, id);
            } else {
                logger.info(
                    `ID ${id}에 해당하는 데이터가 이미 존재합니다. 문서 유형: ${documentType}`
                );
            }
        } else {
            logger.info(
                `ID ${id}에 해당하는 데이터를 찾을 수 없습니다. 문서 유형: ${documentType}`
            );
        }
    } catch (error) {
        logger.error(`ID ${id}에 데이터를 추가하는 중 에러 발생:`, error);
    }
}

/**
 * 가공무역 상자 재료 데이터를 처리하고 Firestore에 추가합니다.
 * @param {string} url - Bdolytics API의 URL입니다.
 * @param {string} id - 데이터의 ID입니다.
 * @param {string} documentType - Firestore에서의 문서 유형입니다.
 */
async function addCrateIngredientData(
    url: string,
    id: string,
    documentType: string
): Promise<void> {
    try {
        const itemData = await BdolyticsApi.fetchBdolyticsCategoryIdData(
            url,
            id
        );
        if (itemData && Object.keys(itemData).length > 0) {
            const documentExists = await firebaseService.documentExists(
                documentType,
                id
            );
            if (!documentExists) {
                const filteredItemData: ItemDTO = filterItemData(
                    itemData as ItemDTO
                );
                await firebaseService.addDocument(
                    documentType,
                    filteredItemData,
                    id
                );
            } else {
                logger.info(
                    `ID ${id}에 해당하는 데이터가 이미 존재합니다. 문서 유형: ${documentType}`
                );
            }
        } else {
            logger.info(
                `ID ${id}에 해당하는 데이터를 찾을 수 없습니다. 문서 유형: ${documentType}`
            );
        }
    } catch (error) {
        logger.error(
            `ID ${id}에 가공무역 상자 재료 데이터를 추가하는 중 에러 발생:`,
            error
        );
    }
}

/**
 * 필요한 속성만 포함되도록 항목 데이터를 필터링합니다.
 * @param {ItemDTO} itemData - 필터링할 항목 데이터입니다.
 * @returns {ItemDTO} - 필터링된 항목 데이터입니다.
 */
function filterItemData(itemData: ItemDTO): ItemDTO {
    return {
        description: itemData.description,
        id: itemData.id,
        sub_id: itemData.sub_id,
        name: itemData.name,
        icon_image: itemData.icon_image,
        grade_type: itemData.grade_type,
        weight: itemData.weight,
        buy_price: itemData.buy_price,
        sell_price: itemData.sell_price,
        repair_price: itemData.repair_price,
        has_market_data: itemData.has_market_data,
        expiration_period: itemData.expiration_period,
        tooltip: itemData.tooltip,
        main_category: itemData.main_category,
        sub_category: itemData.sub_category,
        db_type: itemData.db_type
    };
}

export default addCrateData;
