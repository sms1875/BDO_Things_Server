import { DesignDTO, ItemDTO } from '../DTO/BDOlyticsDTO';
import axios from 'axios';

/**
 * bdolyticsApi: Black Desert Online Database.
 * @see https://bdolytics.com/
 */
const BDOlyticsApi = {
  /**
   * Fetch data from the bdolytics API.
   * @param {string} url - The endpoint URL. (e.g., design, item)
   * @param {string} id - The ID of the item or design.
   * @returns {Promise<ItemDTO | DesignDTO | null>} - Response Data Structure
   */
  fetchBdolyticsCategoryIdData: async (url: string, id: string): Promise<ItemDTO | DesignDTO | null> => {
    try {
      const response = await axios.get(`${url}${id}`);
      return response.data.data as ItemDTO | DesignDTO;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  }
};

export default BDOlyticsApi;
