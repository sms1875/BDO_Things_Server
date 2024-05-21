export interface MarketApiResponseDTO {
    resultCode: number;
    resultMsg: string;
}

export interface HotItemDTO {
    itemId: number;
    enhancementMin: number;
    enhancementMax: number;
    basePrice: number;
    currentStock: number;
    totalTrades: number;
    priceChangeDirection: number;
    priceChangeValue: number;
    priceHardCapMin: number;
    priceHardCapMax: number;
    lastSalePrice: number;
    lastSaleTime: number;
}

export interface MarketItemDTO {
    itemId: number;
    currentStock: number;
    totalTrades: number;
    basePrice: number;
}

export interface MarketSubItemDTO {
    itemId: number;
    enhancementMin: number;
    enhancementMax: number;
    basePrice: number;
    currentStock: number;
    totalTrades: number;
    priceHardCapMin: number;
    priceHardCapMax: number;
    lastSalePrice: number;
    lastSaleTime: number;
}

export interface SearchedItemDTO {
    itemId: number;
    currentStock: number;
    basePrice: number;
    totalTrades: number;
}

export interface BiddingInfoDTO {
    price: number;
    sellOrders: number;
    buyOrders: number;
}

export interface MarketPriceInfoDTO {
    priceHistory: number[]; // Prices sorted by date, ascending order
}

export interface WaitListItemDTO {
    itemId: number;
    enhancementLevel: number;
    price: number;
    timestamp: number;
}
