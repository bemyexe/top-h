export interface Country {
  active: boolean;
  country: string;
  icon: string;
  id: number;
  isTopCollected: boolean;
  locale: string;
  name: string;
  topApps: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoriesDTO {
  id: number;
  name: string;
  categories: Category[];
}

interface ChartData {
  category: {
    subCategory: {
      date: number;
    };
  };
}

interface DataResponseDTO<T> {
  data: T[];
  message: string;
  statusCode: number;
}

interface ChartResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

class TopHistoryApi {
  private apiKey = 'B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l';

  async getCountryList(): Promise<DataResponseDTO<Country>> {
    return fetch(`${import.meta.env.VITE_BASE_URL}/v1/geo?${this.apiKey}`).then(
      (result) => result.json()
    );
  }

  async getCategoryList(): Promise<DataResponseDTO<CategoriesDTO>> {
    return fetch(
      `${import.meta.env.VITE_BASE_URL}/v1/applicationCategory?platform=1&${
        this.apiKey
      }`
    ).then((result) => result.json());
  }

  async getChartData(
    countryId: Country['id'],
    dateFrom: string,
    dateTo: string
  ): Promise<ChartResponse<ChartData>> {
    return fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/package/top_history/9379/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&?platforms=1&${
        this.apiKey
      }`
    ).then((result) => result.json());
  }
}

export const topHistoryApi = new TopHistoryApi();
