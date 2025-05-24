
interface Driver {
  driver_number: number;
  first_name: string;
  last_name: string;
  team_name: string;
  team_colour: string;
  country_code: string;
  headshot_url: string;
}

interface ApiResponse {
  drivers: Driver[];
}

const API_BASE_URL = 'http://localhost:5000/api';

export const searchDrivers = async (name: string): Promise<Driver[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/drivers/search?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw new Error('Failed to fetch drivers from API');
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
