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
      console.error('Error fetching data:', error);
      return { resultCode: -1, resultMsg: 'Error fetching data' }; // 에러 발생 시 기본값 반환
    }
  },

  /**
   * Get all hot items from the marketplace.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @returns {Promise<Array>} - Response Data Structure
   * [Item ID, Enhancement range - min, Enhancement range - max, Base price, Current stock, Total trades,
   * Price change direction (1 - down, 2 - up), Price change value, Price hard cap - min, Price hard cap - max,
   * Last sale price, Last sale time]
   */
  getWorldMarketHotList: async (marketUrl: string): Promise<any> => MarketApi.fetchData(`${marketUrl}GetWorldMarketHotList`, {}),

  /**
   * Get items from a specific category or subcategory.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainCategory - Required mainCategory.
   * @param {number} [subCategory] - Optional subCategory.
   * @returns {Promise<Array>} - Response Data Structure
   * [Item ID, Current stock, Total trades, Base price]
   */
  getWorldMarketList: async (marketUrl: string, keyType: number, mainCategory: number, subCategory?: number): Promise<any> => {
    const requestBody: any = { keyType, mainCategory };
    if (subCategory !== undefined) requestBody.subCategory = subCategory;
    return MarketApi.fetchData(`${marketUrl}GetWorldMarketList`, requestBody);
  },

  /**
   * Get details about a specific item.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @returns {Promise<Array>} - Response Data Structure
   * [Item ID, Current stock, Total trades, Base price, Current stock, Total trades,
   * Price hard cap - min, Price hard cap - max, Last sale price, Last sale time]
   */
  getWorldMarketSubList: async (marketUrl: string, keyType: number, mainKey: number): Promise<any> =>
    MarketApi.fetchData(`${marketUrl}GetWorldMarketSubList`, { keyType, mainKey }),

  /**
   * Search items by their ids.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {string} searchResult - Required comma-separated list of item ids.
   * @returns {Promise<Array>} - Response Data Structure
   * [Item ID, Current stock, Base price, Total trades]
   */
  getWorldMarketSearchList: async (marketUrl: string, searchResult: string): Promise<any> =>
    MarketApi.fetchData(`${marketUrl}GetWorldMarketSearchList`, { searchResult }),

  /**
   * Get orders for a specific item.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @param {number} subKey - Required subKey.
   * @returns {Promise<Array>} - Response Data Structure
   * [Price, Amount of sell orders, Amount of buy orders]
   */
  getBiddingInfoList: async (marketUrl: string, keyType: number, mainKey: number, subKey: number): Promise<any> =>
    MarketApi.fetchData(`${marketUrl}GetBiddingInfoList`, { keyType, mainKey, subKey }),

  /**
   * Get the price history of an item for the past 90 days.
   * @param {string} marketUrl - The base URL of the market API. (e.g., KR, EU)
   * @param {number} keyType - Required keyType.
   * @param {number} mainKey - Required mainKey.
   * @param {number} subKey - Required subKey.
   * @returns {Promise<Array>} - Response Data Structure
   * The prices are sorted by date, in ascending order. First value would be the price for 90 days ago,
   * while the last value would be the price for today.
   */
  getMarketPriceInfo: async (marketUrl: string, keyType: number, mainKey: number, subKey: number): Promise<any> =>
    MarketApi.fetchData(`${marketUrl}GetMarketPriceInfo`, { keyType, mainKey, subKey }),

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
      return {
        itemId: parseInt(itemData[0]),
        enhancementLevel: parseInt(itemData[1]),
        price: parseInt(itemData[2]),
        timestamp: parseInt(itemData[3])
      };
    });
  },

  /**
  * Parses the response data to an array of T using the provided parsing function.
  * @param {MarketApiResponseDTO} responseData - The raw response data.
  * @param {(itemString: string) => T} parseFunction - The function to parse each item string.
  * @returns {Array<T>} - Parsed array of type T.
  */
  parseDataArray: <T>(responseData: MarketApiResponseDTO, parseFunction: (itemString: string) => T): Array<T> => {
    const parsedItems: Array<T> = [];
    if (responseData.resultCode === 0) {
      const itemStringArray = responseData.resultMsg.split('|');
      itemStringArray.forEach((itemString: string) => {
        parsedItems.push(parseFunction(itemString));
      });
    }
    return parsedItems;
  },

  /**
   * Parses the response data to an array of T using the provided parsing function.
   * @param {MarketApiResponseDTO} responseData - The raw response data.
   * @param {(itemData: string[]) => T} parseFunction - The function to parse each item data array.
   * @returns {Array<T>} - Parsed array of type T.
   */
  parseDataArrayWithData: <T>(responseData: MarketApiResponseDTO, parseFunction: (itemData: string[]) => T): Array<T> => {
    const parsedItems: Array<T> = [];
    if (responseData.resultCode === 0) {
      const itemStringArray = responseData.resultMsg.split('|');
      itemStringArray.forEach((itemString: string) => {
        const itemData = itemString.split('-');
        parsedItems.push(parseFunction(itemData));
      });
    }
    return parsedItems;
  },
};

export default MarketApi;
