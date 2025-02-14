export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRequest = async (endpoint, method = 'GET', body = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 120 }, // 2 dakika (120 saniye) cache süresi
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || response.statusText || "Bilinmeyen bir hata oluştu"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
