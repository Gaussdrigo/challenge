import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para agregar el token de autorización a cada solicitud
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.url !== '/users/demo_login/') {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Función para iniciar sesión
export const login = async (username, password) => {
    const response = await api.post('/users/demo_login/', { username, password });
    return response.data;
};

// Función para obtener el listado de empleados con filtros opcionales
export const fetchUsers = async (filters) => {
    const response = await api.get('/users/', { params: filters });
    return response.data;
};

// Función para obtener el listado de recibos con filtros opcionales
export const fetchReceipts = async (filters) => {
    const response = await api.get('/receipts/', { params: filters });
    return response.data;
};

// Función para obtener el enlace del archivo PDF de un recibo por su ID
export const fetchReceiptFile = async (id) => {
    const response = await api.get(`/receipts/${id}/file`);
    return response.data.file; // Retorna el enlace al archivo PDF
};


export default api;
