import axios from 'axios';
import { DesignDTO, ItemDTO } from './firebaseDTOs';

export async function fetchData(url: string, id: string): Promise<ItemDTO | DesignDTO | null> {
  try {
    const response = await axios.get(`${url}${id}`);
    return response.data.data as ItemDTO | DesignDTO;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}