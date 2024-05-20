import { DesignDTO, ItemDTO } from "../types/bdolyticsDTO";
import axios from "axios";

interface IBdolyticsApiService {
    fetchBdolyticsCategoryIdData(
        url: string,
        id: string
    ): Promise<ItemDTO | DesignDTO | null>;
}

/**
 * bdolyticsApi: Black Desert Online Database.
 * @see https://bdolytics.com/
 */
class BdolyticsApiService implements IBdolyticsApiService {
    async fetchBdolyticsCategoryIdData(
        url: string,
        id: string
    ): Promise<ItemDTO | DesignDTO | null> {
        try {
            const response = await axios.get(`${url}${id}`);
            return response.data.data as ItemDTO | DesignDTO;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;
        }
    }
}

const bdolyticsApiService = new BdolyticsApiService();
export default bdolyticsApiService;
