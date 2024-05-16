import axios, { AxiosResponse } from 'axios';
import { MarketApiResponseDTO, HotItemDTO, MarketItemDTO, MarketSubItemDTO, SearchedItemDTO, BiddingInfoDTO, MarketPriceInfoDTO, WaitListItemDTO } from '../DTO/marketDTO';

/**
 * MarketApi: API for accessing Black Desert Online market data.
 * @see https://developers.veliainn.com/
 */
const MarketApi = {
  /**
   * The headers for the market API requests.
   */
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'BlackDesert'
  },

  /**
   * Fetches data from the market API.
   * @param {string} url - The URL of the API endpoint.
   * @param {any} body - The request body.
   * @returns {Promise<MarketApiResponseDTO>} - The response data.
   */
  fetchData: async (url: string, body: any): Promise<MarketApiResponseDTO> => {
    try {
      const response: AxiosResponse = await axios.post(url, body, { headers: MarketApi.headers });
      return response.data;
    } catch (error) {
      return { resultCode: -1, resultMsg: 'Error fetching data' }; // 에러 발생 시 기본값 반환
    }
  },

  /**
   * Get all hot items from the marketplace.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @returns {Promise<Array<HotItemDTO>>} - Response Data Structure
   * [Item ID, Enhancement range - min, Enhancement range - max, Base price, Current stock, Total trades,
   * Price change direction (1 - down, 2 - up), Price change value, Price hard cap - min, Price hard cap - max,
   * Last sale price, Last sale time]
   */
  getWorldMarketHotList: async (marketUrl: string): Promise<Array<HotItemDTO>> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetWorldMarketHotList`, {});
    return MarketApi.parseDataArray<HotItemDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      if (itemData.length !== 11 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        itemId: parseInt(itemData[0]),
        enhancementMin: parseInt(itemData[1]),
        enhancementMax: parseInt(itemData[2]),
        basePrice: parseInt(itemData[3]),
        currentStock: parseInt(itemData[4]),
        totalTrades: parseInt(itemData[5]),
        priceChangeDirection: parseInt(itemData[6]),
        priceChangeValue: parseInt(itemData[7]),
        priceHardCapMin: parseInt(itemData[8]),
        priceHardCapMax: parseInt(itemData[9]),
        lastSalePrice: parseInt(itemData[10]),
        lastSaleTime: parseInt(itemData[11])
      };
    });
  },

  /**
   * Get items from a specific category or subcategory.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainCategory - Required mainCategory.
   * @param {number} [subCategory] - Optional subCategory.
   * @returns {Promise<Array<MarketItemDTO>>} - Response Data Structure
   * [Item ID, Current stock, Total trades, Base price]
   */
  getWorldMarketList: async (marketUrl: string, keyType: number, mainCategory: number, subCategory?: number): Promise<Array<MarketItemDTO>> => {
    const requestBody: any = { keyType, mainCategory };
    if (subCategory !== undefined) requestBody.subCategory = subCategory;
    const responseData = await MarketApi.fetchData(`${marketUrl}GetWorldMarketList`, requestBody);
    return MarketApi.parseDataArray<MarketItemDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      if (itemData.length !== 4 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        itemId: parseInt(itemData[0]),
        currentStock: parseInt(itemData[1]),
        totalTrades: parseInt(itemData[2]),
        basePrice: parseInt(itemData[3])
      };
    });
  },

  /**
   * Get details about a specific item.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @returns {Promise<Array<MarketSubItemDTO>>} - Response Data Structure
   * [Item ID,  Enhancement range - min, Enhancement range - max, Base price, Current stock, Total trades,
   * Price hard cap - min, Price hard cap - max, Last sale price, Last sale time]
   */
  getWorldMarketSubList: async (marketUrl: string, keyType: number, mainKey: number): Promise<Array<MarketSubItemDTO>> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetWorldMarketSubList`, { keyType, mainKey });
    return MarketApi.parseDataArray<MarketSubItemDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      if (itemData.length !== 10 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        itemId: parseInt(itemData[0]),
        enhancementMin: parseInt(itemData[1]),
        enhancementMax: parseInt(itemData[2]),
        basePrice: parseInt(itemData[3]),
        currentStock: parseInt(itemData[4]),
        totalTrades: parseInt(itemData[5]),
        priceHardCapMin: parseInt(itemData[6]),
        priceHardCapMax: parseInt(itemData[7]),
        lastSalePrice: parseInt(itemData[8]),
        lastSaleTime: parseInt(itemData[9])
      };
    });
  },

  /**
   * Search items by their ids.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {string} searchResult - Required comma-separated list of item ids.
   * @returns {Promise<Array<SearchedItemDTO>>} - Response Data Structure
   * [Item ID, Current stock, Base price, Total trades]
   */
  getWorldMarketSearchList: async (marketUrl: string, searchResult: string): Promise<Array<SearchedItemDTO>> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetWorldMarketSearchList`, { searchResult });
    return MarketApi.parseDataArray<SearchedItemDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      if (itemData.length !== 4 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        itemId: parseInt(itemData[0]),
        currentStock: parseInt(itemData[1]),
        basePrice: parseInt(itemData[2]),
        totalTrades: parseInt(itemData[3])
      };
    });
  },

  /**
   * Get orders for a specific item.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @param {number} subKey - Required subKey.
   * @returns {Promise<Array<BiddingInfoDTO>>} - Response Data Structure
   * [Price, Amount of sell orders, Amount of buy orders]
   */
  getBiddingInfoList: async (marketUrl: string, keyType: number, mainKey: number, subKey: number): Promise<Array<BiddingInfoDTO>> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetBiddingInfoList`, { keyType, mainKey, subKey });
    return MarketApi.parseDataArray<BiddingInfoDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      if (itemData.length !== 3 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        price: parseInt(itemData[0]),
        sellOrders: parseInt(itemData[1]),
        buyOrders: parseInt(itemData[2])
      };
    });
  },

  /**
   * Get the price history of an item for the past 90 days.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @param {number} subKey - Required subKey.
   * @returns {Promise<MarketPriceInfoDTO>} - Response Data Structure
   * The prices are sorted by date, in ascending order. First value would be the price for 90 days ago,
   * while the last value would be the price for today.
   */
  getMarketPriceInfo: async (marketUrl: string, keyType: number, mainKey: number, subKey: number): Promise<MarketPriceInfoDTO> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetMarketPriceInfo`, { keyType, mainKey, subKey });
    if (responseData.resultCode === 0 && responseData.resultMsg) {
      const priceHistory = responseData.resultMsg.split('-').map(priceString => parseInt(priceString));
      return { priceHistory };
    } else {
      return { priceHistory: [] };
    }
  },


  /**
   * Get list of items in queue for registration.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @returns {Promise<Array<WaitListItemDTO>>} - Response Data Structure
   * [Item ID, Enhancement Level, Price, Timestamp when item hits the market]
   */
  getWorldMarketWaitList: async (marketUrl: string): Promise<Array<WaitListItemDTO>> => {
    const responseData = await MarketApi.fetchData(`${marketUrl}GetWorldMarketWaitList`, {});
    return MarketApi.parseDataArray<WaitListItemDTO>(responseData, itemString => {
      const itemData = itemString.split('-');
      // 유효성 검사
      if (itemData.length !== 4 || itemData.some(value => isNaN(parseInt(value)))) {
        return null;
      }
      return {
        itemId: parseInt(itemData[0]),
        enhancementLevel: parseInt(itemData[1]),
        price: parseInt(itemData[2]),
        timestamp: parseInt(itemData[3])
      };
    });
  },

  /**
   * Parses the response data from the market API using the provided parsing function.
   * @template T - The type of the parsed items.
   * @param {MarketApiResponseDTO} responseData - The raw response data.
   * @param {(itemString: string) => T | null} parseFunction - The function to parse each item string.
   * @returns {Array<T>} - Parsed array of type T.
   */
  parseDataArray: async <T>(responseData: MarketApiResponseDTO, parseFunction: (itemString: string) => T | null): Promise<T[]> => {
    const parsedItems: Array<T> = [];
    if (responseData.resultCode === 0 && responseData.resultMsg) {
      const itemStringArray = responseData.resultMsg.split('|');
      itemStringArray.forEach((itemString: string) => {
        const parsedItem = parseFunction(itemString);
        if (parsedItem !== null) {
          parsedItems.push(parsedItem);
        }
      });
    }
    return parsedItems;
  },
};

export default MarketApi;
