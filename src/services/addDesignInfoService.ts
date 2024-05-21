import firebaseService from "./firebaseService";
import BdolyticsApi from "./bdolyticsApiService";
import { DesignDTO, ItemDTO } from "../types/bdolyticsDTO";
import { BDOLYTICS_API_URLS } from "../constants";
import logger from "../config/logger";
import { WriteBatch } from "firebase-admin/firestore";

class addDesignInfoService {
    /**
     * 디자인 데이터의 이름이 주어진 문자열을 포함하는지 확인하는 필터 함수입니다.
     * @param {string} filterString - 필터링할 문자열입니다.
     * @param {DesignDTO | undefined} designData - 필터링할 디자인 데이터입니다.
     * @returns {boolean} - 디자인 데이터의 이름이 주어진 문자열을 포함하는 경우 true, 그렇지 않으면 false
     */
    private static crateFilter(
        filterString: string,
        designData: DesignDTO | undefined
    ): boolean {
        return designData?.name?.includes(filterString) ?? false;
    }

    /**
     * 지정된 범위의 ID에 대해 디자인, 완성품 및 재료 아이템 데이터를 Firestore에 추가합니다.
     *
     * @param {number} startId - 시작 ID
     * @param {number} endId - 끝 ID
     * @param {string} designCollection - 디자인 데이터를 저장할 Firestore 컬렉션 이름
     * @param {string} productCollection - 완성품 데이터를 저장할 Firestore 컬렉션 이름
     * @param {string} ingredientCollection - 재료 데이터를 저장할 Firestore 컬렉션 이름
     * @param {string} [filterString] - 디자인 데이터 필터링에 사용할 문자열 (선택 사항)
     */
    static async addData(
        startId: number,
        endId: number,
        designCollection: string,
        productCollection: string,
        ingredientCollection: string,
        filterString?: string
    ): Promise<void> {
        try {
            const batch = firebaseService.createBatch();
            logger.info("Firestore에 데이터를 추가하는 중...");

            for (let id = startId; id <= endId; id++) {
                const designData =
                    await BdolyticsApi.fetchBdolyticsCategoryIdData(
                        BDOLYTICS_API_URLS.DESIGN,
                        String(id)
                    );

                if (
                    designData &&
                    (!filterString ||
                        this.crateFilter(filterString, designData as DesignDTO))
                ) {
                    const productIds: string[] = (
                        designData as DesignDTO
                    ).products.map((product) => String(product.id));
                    const ingredientIds: string[] = (
                        designData as DesignDTO
                    ).ingredients.map((ingredient) => String(ingredient.id));

                    const promises = [
                        this.addDataToDocument(
                            designData,
                            designCollection,
                            batch
                        ),
                        ...productIds.map((productId) =>
                            BdolyticsApi.fetchBdolyticsCategoryIdData(
                                BDOLYTICS_API_URLS.ITEM,
                                productId
                            ).then((itemData) =>
                                this.addDataToDocument(
                                    itemData as ItemDTO,
                                    productCollection,
                                    batch
                                )
                            )
                        ),
                        ...ingredientIds.map((ingredientId) =>
                            BdolyticsApi.fetchBdolyticsCategoryIdData(
                                BDOLYTICS_API_URLS.ITEM,
                                ingredientId
                            ).then((itemData) =>
                                this.addDataToDocument(
                                    itemData as ItemDTO,
                                    ingredientCollection,
                                    batch
                                )
                            )
                        )
                    ];

                    await Promise.all(promises);
                }
            }

            await firebaseService.commitBatch(batch);
            logger.info("데이터 추가가 완료되었습니다.");
        } catch (error) {
            logger.error("데이터를 업데이트하는 중 에러 발생:", error);
        }
    }

    /**
     * Firestore 문서에 데이터를 처리하고 추가합니다.
     * @param {DesignDTO | ItemDTO} data - 추가할 데이터입니다.
     * @param {string} documentType - Firestore에서의 문서 유형입니다.
     * @param {WriteBatch} batch - Firestore batch write 작업을 위한 WriteBatch 입니다.
     */
    private static async addDataToDocument(
        data: DesignDTO | ItemDTO,
        documentType: string,
        batch: WriteBatch
    ): Promise<void> {
        try {
            if (data && Object.keys(data).length > 0) {
                const documentExists = await firebaseService.documentExists(
                    documentType,
                    String(data.id)
                );
                if (!documentExists) {
                    const docRef = firebaseService.doc(
                        documentType,
                        String(data.id)
                    );
                    if (this.isItemDTO(data)) {
                        const filteredItemData: ItemDTO = this.filterItemData(
                            data as ItemDTO
                        );
                        batch.set(docRef, filteredItemData);
                    } else {
                        batch.set(docRef, data);
                    }
                } else {
                    logger.info(
                        `ID ${data.id}에 해당하는 데이터가 이미 존재합니다. 문서 유형: ${documentType}`
                    );
                }
            } else {
                logger.info(
                    `데이터가 비어있습니다. 문서 유형: ${documentType}`
                );
            }
        } catch (error) {
            logger.error(`데이터를 추가하는 중 에러 발생:`, error);
        }
    }

    /**
     * 필요한 속성만 포함되도록 항목 데이터를 필터링합니다.
     * @param {ItemDTO} itemData - 필터링할 항목 데이터입니다.
     * @returns {ItemDTO} - 필터링된 항목 데이터입니다.
     */
    private static filterItemData(itemData: ItemDTO): ItemDTO {
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
            has_market_data: itemData.has_market_data
            //expiration_period: itemData.expiration_period,
            //tooltip: itemData.tooltip,
            //main_category: itemData.main_category,
            //sub_category: itemData.sub_category,
            //db_type: itemData.db_type
        };
    }

    /**
     * 데이터가 ItemDTO 타입인지 확인합니다.
     * @param data - 확인할 데이터입니다.
     * @returns {boolean} - 데이터가 ItemDTO 타입인 경우 true, 그렇지 않으면 false
     */
    private static isItemDTO(data: any): data is ItemDTO {
        return "db_type" in data && data.db_type === "item";
    }
}

export default addDesignInfoService;
