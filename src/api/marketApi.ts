import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://trade.kr.playblackdesert.com';

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'User-Agent': 'BlackDesert'
};

const fetchData = async (url: string, body: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(baseUrl + url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

/**
 * MarketApi: API for accessing Black Desert Online market data.
 * @see https://developers.veliainn.com/
 */
const MarketApi = {
  /**
   * Get all hot items from the marketplace.
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Item ID
   * 1 - Enhancement range - min
   * 2 - Enhancement range - max
   * 3 - Base price
   * 4 - Current stock
   * 5 - Total trades
   * 6 - Price change direction (1 - down, 2 - up)
   * 7 - Price change value
   * 8 - Price hard cap - min
   * 9 - Price hard cap - max
   * 10 - Last sale price
   * 11 - Last sale time
   */
  getWorldMarketHotList: async (): Promise<any> => fetchData('/Trademarket/GetWorldMarketHotList', {}),

  /**
   * Get items from a specific category or subcategory.
   * @param {number} keyType - required
   * @param {number} mainCategory - required
   * @param {number} [subCategory] - optional
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Item ID
   * 1 - Current stock
   * 2 - Total trades
   * 3 - Base price
   */
   getWorldMarketList: async (keyType: number, mainCategory: number, subCategory?: number): Promise<any> => {
    const requestBody: any = { keyType, mainCategory };
    if (subCategory !== undefined) requestBody.subCategory = subCategory;
    return fetchData('/Trademarket/GetWorldMarketList', requestBody);
  },

  /**
   * Get details about a specific item.
   * @param {number} keyType - required
   * @param {number} mainKey - required
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Item ID
   * 1 - Current stock
   * 2 - Total trades
   * 3 - Base price
   * 4 - Current stock
   * 5 - Total trades
   * 6 - Price hard cap - min
   * 7 - Price hard cap - max
   * 8 - Last sale price
   * 9 - Last sale time
   */
  getWorldMarketSubList: async (keyType: number, mainKey: number): Promise<any> =>
  fetchData('/Trademarket/GetWorldMarketSubList', { keyType, mainKey }),


  /**
   * Search items by their ids.
   * @param {number} searchResult - required
   * Comma separated list of item ids. Must include at least one item id.
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Item ID
   * 1 - Current stock
   * 2 - Base price
   * 3 - Total trades
   */
  getWorldMarketSearchList: async (searchResult: string): Promise<any> =>
  fetchData('/Trademarket/GetWorldMarketSearchList', { searchResult }),

  /**
   * Get orders for a specific item.
   * @param {number} keyType - required
   * @param {number} mainKey - required
   * @param {number} subKey - required
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Price
   * 1 - Amount of sell orders
   * 2 - Amount of buy orders
   */
  getBiddingInfoList: async (keyType: number, mainKey: number, subKey: number): Promise<any> =>
  fetchData('/Trademarket/GetBiddingInfoList', { keyType, mainKey, subKey }),

  /**
   * Get the price history of an item for the past 90 days.
   * @param {number} keyType - required
   * @param {number} mainKey - required
   * @param {number} subKey - required
   * @returns {Promise<Array>} - Response Data Structure
   * The prices are sorted by date, in ascending order. First value would be the price for 90 days ago, while the last value would be the price for today.
   */
  getMarketPriceInfo: async (keyType: number, mainKey: number, subKey: number): Promise<any> =>
  fetchData('/Trademarket/GetMarketPriceInfo', { keyType, mainKey, subKey }),

  /**
   * Get list of items in queue for registration.
   * @returns {Promise<Array>} - Response Data Structure
   * 0 - Item ID
   * 1 - Enhancement Level
   * 2 - Price
   * 3 - Timestamp when item hits the market
   */
  getWorldMarketWaitList: async (): Promise<any> => fetchData('/Trademarket/GetWorldMarketWaitList', {})
};

export default MarketApi;
