import axios from 'axios';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

const prisma = new PrismaClient();

interface ItemDTO {
  id: number;
  sub_id: number;
  name: string;
  description?: string | null;
  icon_image: string;
  grade_type: number;
  weight: number;
  buy_price: number;
  sell_price: number;
  repair_price: number;
  has_market_data: boolean;
  expiration_period: number;
  tooltip?: string[] | null;
  item_is_product_of_design: DesignDTO[];
  item_is_used_in_design: DesignDTO[];
}

// Design DTO
interface DesignDTO {
  id: number;
  name: string;
  icon_image: string;
  crafting_time: number;
  ingredients: ItemDTO[];
  products: ItemDTO[];
  db_type: string;
}

async function fetchDesignData(id: string): Promise<DesignDTO | null> {
  try {
    const response = await axios.get(`https://apiv2.bdolytics.com/en/KR/db/design/${id}`);
    return response.data.data as DesignDTO;
  } catch (error) {
    console.error('Error fetching design data:', error);
    return null;
  }
}

async function fetchItemData(id: string): Promise<ItemDTO | null> {
  try {
    const response = await axios.get(`https://apiv2.bdolytics.com/en/KR/db/item/${id}`);
    return response.data.data as ItemDTO;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
}

async function addItem(itemData: ItemDTO): Promise<void> {
  const existingItem = await prisma.item.findUnique({ where: { id: itemData.id } });
  if (!existingItem) {
    console.log('Item Data:', itemData.id);

    await prisma.item.create({
      data: {
        id: itemData.id,
        sub_id: itemData.sub_id,
        name: itemData.name,
        description: itemData.description,
        icon_image: itemData.icon_image,
        grade_type: itemData.grade_type,
        weight: itemData.weight,
        buy_price: itemData.buy_price,
        sell_price: itemData.sell_price,
        repair_price: itemData.repair_price,
        has_market_data: itemData.has_market_data,
        expiration_period: itemData.expiration_period,
      },
    });
  } else {
    console.log(`Item with ID ${itemData.id} already exists.`);
  }
}

async function addDesign(designData: DesignDTO): Promise<void> {
  const existingDesign = await prisma.design.findUnique({ where: { id: designData.id } });
  if (!existingDesign) {
    console.log('Design Data:', designData.id);

    await prisma.design.create({
      data: {
        id: designData.id,
        name: designData.name,
        icon_image: designData.icon_image,
        crafting_time: designData.crafting_time,
        db_type: designData.db_type,
      },
    });
  } else {
    console.log(`Design with ID ${designData.id} already exists.`);
  }
}

async function processDesignData(id: string, filter: (designData: DesignDTO) => boolean): Promise<void> {
  const designData = await fetchDesignData(id);
  if (designData && Object.keys(designData).length > 0 && filter(designData)) {
    // Add or update design and items

    // Add items
    const itemIds: string[] = [];
    designData.ingredients.forEach(ingredient => itemIds.push(String(ingredient.id)));
    designData.products.forEach(product => itemIds.push(String(product.id)));

    await Promise.all(itemIds.map(async itemId => {
      const itemData = await fetchItemData(itemId);
      if (itemData && Object.keys(itemData).length > 0) {
        await addItem(itemData);
      } else {
        console.log(`No item data found for item ID ${itemId}`);
      }
    }));

    await addDesign(designData);

    // item 과 design 관계 설정
    await prisma.design.update({
      where: { id: designData.id },
      data: {
        ingredients: { connect: designData.ingredients.map(ingredient => ({ id: ingredient.id })) },
        products: { connect: designData.products.map(product => ({ id: product.id })) },
      }
    })

  } else {
    console.log(`No design data found for design ID ${id} or design does not meet filter criteria.`);
  }
}

async function initDBWithFilters(id: number , filter: (designData: DesignDTO) => boolean) {
  await processDesignData(String(id), filter);
}

function crateFilter(designData: DesignDTO): boolean {
  return designData.name.includes('Crate');
}

export async function initDB() {
  for (let id = 9200; id <= 9602; id++) {
    await initDBWithFilters(id, crateFilter);
  }
}
