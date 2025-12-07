const API_BASE_URL = 'http://localhost:8000';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
        });

        let errorMessage = `HTTP error! status: ${response.status}`;
        if (response.status === 404) {
            errorMessage = 'Ресурс не найден';
        } else if (response.status === 400) {
            errorMessage = 'Ошибка в запросе';
        } else if (response.status === 500) {
            errorMessage = 'Ошибка сервера';
        }

        throw new Error(errorMessage);
    }
    return response.json();
};

export const getCars = async () => {
    try {
        console.log('Fetching cars from:', `${API_BASE_URL}/car/`);
        const response = await fetch(`${API_BASE_URL}/car/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error in getCars:', error);
        throw error;
    }
};

export const getCarById = async (id) => {
    try {
        console.log('Fetching car by id:', id);
        const response = await fetch(`${API_BASE_URL}/car/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error in getCarById ${id}:`, error);
        throw error;
    }
};

export const createCar = async (carData) => {
    try {
        console.log('Creating car:', carData);
        const response = await fetch(`${API_BASE_URL}/car/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
            mode: 'cors',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error in createCar:', error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        console.log('Updating car:', id, carData);
        const response = await fetch(`${API_BASE_URL}/car/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
            mode: 'cors',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error in updateCar ${id}:`, error);
        throw error;
    }
};

export const deleteCar = async (id) => {
    try {
        console.log('Deleting car:', id);
        const response = await fetch(`${API_BASE_URL}/car/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return { success: true };
        }

        return await response.json();
    } catch (error) {
        console.error(`Error in deleteCar ${id}:`, error);
        throw error;
    }
};

export const checkHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            mode: 'cors',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};