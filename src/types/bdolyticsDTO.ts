export interface DesignDTO {
    id: number;
    name: string;
    icon_image: string;
    crafting_time?: number;
    ingredients: IngredientDTO[];
    products: IngredientDTO[];
    crafted_in_houses?: CraftedInHouseDTO[];
    db_type: string;
}

export interface IngredientDTO {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type?: number;
    market_main_category?: number;
    db_type: string;
    amount?: number;
    amounts?: number[];
    select_rate?: number;
    conditions?: Array<Condition[]>;
}

export interface CraftedInHouseDTO {
    id: number;
    name: string;
    icon_image: string;
    db_type: string;
}

export interface ItemDTO {
    id: number;
    sub_id?: number;
    name: string;
    description?: string;
    icon_image: string;
    grade_type: number;
    weight: number;
    buy_price: number;
    sell_price: number;
    repair_price?: number;
    has_market_data?: boolean;
    expiration_period?: number;
    tooltip?: string[];
    item_obtained_from_box?: IngredientDTO[];
    item_obtained_from_quests?: ItemObtainedFromQuest[];
    item_is_used_in_design?: DesignDTO[];
    item_is_product_of_design?: DesignDTO[];
    item_is_used_in_alchemy_recipes?: ItemIsRecipe[];
    item_is_product_of_processing_recipes?: ItemIsRecipe[];
    item_is_used_in_processing_recipes?: ItemIsRecipe[];
    item_obtained_from_farmables?: ItemObtainedFromFarmable[];
    item_gives_knowledges?: ItemGivesKnowledge[];
    main_category?: string;
    sub_category?: string;
    db_type?: string;
}

export interface ItemGivesKnowledge {
    id: number;
    name: string;
    icon_image: string;
    db_type: string;
    select_rate: number;
}

export interface ItemIsRecipe {
    id: number;
    name?: string;
    icon_image?: string;
    ingredients?: IngredientDTO[];
    products?: IngredientDTO[];
    action_type?: string;
    db_type: string;
}

export interface Condition {
    text: string;
    suffix: string;
    condition_name: string;
}

export interface ItemObtainedFromFarmable {
    id: number;
    name: string;
    icon_image: string;
}

export interface ItemObtainedFromQuest {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    db_type: string;
    quest_rewards: QuestReward[];
}

export interface QuestReward {
    reward_type: number;
    amount: number;
    is_select: boolean;
    db_entity?: IngredientDTO;
}
