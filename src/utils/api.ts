/**
 * API utility for making requests to the backend
 */

const API_BASE_URL = 'http://localhost:5000/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  token?: string | null;
}

/**
 * Make a request to the API
 */
export const apiRequest = async (endpoint: string, options: RequestOptions = {}) => {
  const { method = 'GET', body, token } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Try to get token from localStorage if not provided
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      headers['Authorization'] = `Bearer ${storedToken}`;
    }
  }
  
  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  
  try {
    console.log(`API Request: ${method} ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Debug response information
    console.log(`Response status: ${response.status}`);
    
    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If response cannot be parsed as JSON, use status text
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    // Parse JSON response
    const data = await response.json();
    console.log(`API Response data:`, data);
    return data;
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    throw error;
  }
};

// API service for appointments
export const appointmentsApi = {
  getAll: () => apiRequest('/appointments'),
  getById: (id: string | number) => apiRequest(`/appointments/${id}`),
  create: (data: any) => apiRequest('/appointments', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/appointments/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/appointments/${id}`, { method: 'DELETE' }),
};

// API service for pets
export const petsApi = {
  getAll: () => apiRequest('/pets'), // Fetch all pets
  getById: (id: string | number) => apiRequest(`/pets/${id}`),
  create: (data: any) => apiRequest('/pets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => apiRequest(`/pets/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/pets/${id}`, { method: 'DELETE' }),
  getPetTypes: () => apiRequest('/pets/pet-types'), // Corrected endpoint
};

// API service for owners
export const ownersApi = {
  getAll: () => apiRequest('/owners'), // Fetch all owners
  getById: (id: string | number) => apiRequest(`/owners/${id}`),
  getOwnerPets: (id: string | number) => apiRequest(`/owners/${id}/pets`),
  create: (data: any) => apiRequest('/owners', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/owners/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/owners/${id}`, { method: 'DELETE' }),
};

// Additional API services for other tables
export const consultationsApi = {
  getAll: () => apiRequest('/consultations'),
  getById: (id: string | number) => apiRequest(`/consultations/${id}`),
  create: (data: any) => apiRequest('/consultations', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/consultations/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/consultations/${id}`, { method: 'DELETE' }),
};

export const laboratoryApi = {
  getAll: () => apiRequest('/laboratory'),
  getById: (id: string | number) => apiRequest(`/laboratory/${id}`),
  create: (data: any) => apiRequest('/laboratory', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/laboratory/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/laboratory/${id}`, { method: 'DELETE' }),
};

export const vaccinationsApi = {
  getAll: () => apiRequest('/vaccinations'),
  getById: (id: string | number) => apiRequest(`/vaccinations/${id}`),
  create: (data: any) => apiRequest('/vaccinations', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/vaccinations/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/vaccinations/${id}`, { method: 'DELETE' }),
};

export const surgeryApi = {
  getAll: () => apiRequest('/surgery'),
  getById: (id: string | number) => apiRequest(`/surgery/${id}`),
  create: (data: any) => apiRequest('/surgery', { method: 'POST', body: data }),
  update: (id: string | number, data: any) => apiRequest(`/surgery/${id}`, { method: 'PUT', body: data }),
  delete: (id: string | number) => apiRequest(`/surgery/${id}`, { method: 'DELETE' }),
};

// New API services for shop functionality
export const shopApi = {
  getProducts: () => apiRequest('/shop/products'),
  getProductById: (id: string | number) => apiRequest(`/shop/products/${id}`),
  getCart: () => apiRequest('/shop/cart'),
  addToCart: (data: { productId: number, quantity: number }) => 
    apiRequest('/shop/cart/add', { method: 'POST', body: data }),
  updateCartItem: (data: { itemId: number, quantity: number }) => 
    apiRequest('/shop/cart/update', { method: 'PUT', body: data }),
  removeCartItem: (itemId: number) => 
    apiRequest('/shop/cart/remove', { method: 'DELETE', body: { itemId } }),
  checkout: () => apiRequest('/shop/checkout', { method: 'POST' }),
  getOrders: () => apiRequest('/shop/orders'),
  getOrderById: (id: string | number) => apiRequest(`/shop/orders/${id}`),
};
