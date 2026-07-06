import apiClient from "./api";

export const settingsApi = {
  getByKey: async (key: string): Promise<string | null> => {
    try {
      const response = await apiClient.get<{ value: string | null }>(`/settings/key/${encodeURIComponent(key)}`);
      return response.data.value ?? null;
    } catch {
      return null;
    }
  },
};