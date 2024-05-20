interface MarketApiResponseDTO {
    resultCode: number;
    resultMsg: string;
}

interface HotItemDTO {
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

interface MarketItemDTO {
    itemId: number;
    currentStock: number;
    totalTrades: number;
    basePrice: number;
}

interface MarketSubItemDTO {
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

interface SearchedItemDTO {
    itemId: number;
    currentStock: number;
    basePrice: number;
    totalTrades: number;
}

interface BiddingInfoDTO {
    price: number;
    sellOrders: number;
    buyOrders: number;
}

interface MarketPriceInfoDTO {
    priceHistory: number[]; // Prices sorted by date, ascending order
}

interface WaitListItemDTO {
    itemId: number;
    enhancementLevel: number;
    price: number;
    timestamp: number;
}

export {
    MarketApiResponseDTO,
    HotItemDTO,
    MarketItemDTO,
    MarketSubItemDTO,
    SearchedItemDTO,
    BiddingInfoDTO,
    MarketPriceInfoDTO,
    WaitListItemDTO
};
