const API_BASE = '/api';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = localStorage.getItem('rsr_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.error || data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth API
  auth: {
    login: (credentials) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    getMe: () => request('/auth/me')
  },

  // Events API
  events: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.category && params.category !== 'All') searchParams.append('category', params.category);
      if (params.city && params.city !== 'All') searchParams.append('city', params.city);
      if (params.search) searchParams.append('search', params.search);
      const queryString = searchParams.toString();
      return request(`/events${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => request(`/events/${id}`),
    create: (eventData) => request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    })
  },

  // Tickets & Gate Check-in API
  tickets: {
    register: (payload) => request('/tickets/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
    getMy: (email) => {
      const qs = email ? `?email=${encodeURIComponent(email)}` : '';
      return request(`/tickets/my${qs}`);
    },
    checkIn: (payload) => request('/tickets/checkin', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
    getCheckins: (eventId) => request(`/tickets/checkins/${eventId}`)
  },

  // Leads CRM API
  leads: {
    capture: (leadData) => request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    }),
    getAll: (eventId) => {
      const qs = eventId ? `?eventId=${encodeURIComponent(eventId)}` : '';
      return request(`/leads${qs}`);
    }
  }
};

export default api;
