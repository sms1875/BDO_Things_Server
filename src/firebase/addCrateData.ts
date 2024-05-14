import { addDocument } from './firebase';
import { fetchData } from './api';
import { DesignDTO, ItemDTO } from './firebaseDTOs';
import { BDOLYTICS_API_URLS } from './constants';

// Process and add crate item data to Firestore
export async function addDataToDocument(url: string,id: string, documentType: string): Promise<void> {
  const itemData = await fetchData(url, id);
  if (itemData && Object.keys(itemData).length > 0) {
    await addDocument(documentType, itemData, id);
  } else {
    console.log(`No data found for ID ${id} , documentType : ${documentType}`);
  }
}

// Process and add crate ingredient data to Firestore
export async function addCrateIngredientData(url: string, id: string, documentType: string): Promise<void> {
  const itemData = await fetchData(url, id);
  if (itemData && Object.keys(itemData).length > 0 && isItemDTO(itemData)) {
    const filteredItemData: ItemDTO = filterItemData(itemData);
    await addDocument(documentType, filteredItemData, id);
  } else {
    console.log(`No data found for ID ${id} , documentType : ${documentType}`);
  }
}

// Function to check if the data is of type ItemDTO
function isItemDTO(data: any): data is ItemDTO {
  return 'description' in data;
}

// Filter item data to include only necessary properties
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
    db_type: itemData.db_type,
  };
}

// Add crate data to Firestore
export async function addCrateData(): Promise<void> {
  const filter = (designData: DesignDTO | undefined) => designData?.name?.includes('Crate') ?? false;

  // 가공 상자 시작 아이템 id = 9200, 마지막 아이템 id = 9602
  for (let id = 9200; id <= 9602; id++) {
    const designData = await fetchData(BDOLYTICS_API_URLS.DESIGN, String(id));
    if (designData && filter(designData as DesignDTO)) {
      const productIds: string[] = (designData as DesignDTO).products.map(product => String(product.id));
      const ingredientIds: string[] = (designData as DesignDTO).ingredients.map(ingredient => String(ingredient.id));

      await Promise.all([
        addDataToDocument(BDOLYTICS_API_URLS.DESIGN, String(id), 'crateDesign'),
        ...productIds.map(productId => addDataToDocument(BDOLYTICS_API_URLS.ITEM ,productId, 'crateProduct')),
        ...ingredientIds.map(ingredientId => addCrateIngredientData(BDOLYTICS_API_URLS.ITEM, ingredientId, 'crateIngredient'))
      ]);
    }
  }
}
