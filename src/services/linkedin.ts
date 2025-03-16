import type { CompanySearchResponse, ProfileSearchResponse } from '@/types/linkedin';

const RAPIDAPI_KEY = '5a7b4ede34msh348850c8fe4f302p194c61jsn45d9d9f488da';
const RAPIDAPI_HOST = 'linkedin-bulk-data-scraper.p.rapidapi.com';

const headers = {
  'Content-Type': 'application/json',
  'x-rapidapi-host': RAPIDAPI_HOST,
  'x-rapidapi-key': RAPIDAPI_KEY,
};

interface SearchParams {
  keyword: string;
  page?: number;
}

export async function searchProfiles({ keyword, page = 1 }: SearchParams): Promise<ProfileSearchResponse> {
  try {
    // Using the exact parameters from the curl request
    const params = {
      keyword,
      page,
      title_free_text: "",
      company_free_text: "",
      first_name: "",
      last_name: "",
      current_company_list: "",
      past_company_list: "",
      location_list: "",
      language_list: "",
      service_catagory_list: "",
      school_free_text: "",
      industry_list: "",
      school_list: ""
    };

    const response = await fetch('https://linkedin-bulk-data-scraper.p.rapidapi.com/search_people_with_filters', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText || response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(`API returned error: ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
}

export async function searchCompanies({ keyword, page = 1 }: SearchParams): Promise<CompanySearchResponse> {
  try {
    // Using the exact parameters from the curl request
    const params = {
      keyword,
      page,
      company_size_list: "",
      hasJobs: false,
      location_list: "",
      industry_list: ""
    };

    const response = await fetch('https://linkedin-bulk-data-scraper.p.rapidapi.com/search_company_with_filters', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText || response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(`API returned error: ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error searching companies:', error);
    throw error;
  }
}
