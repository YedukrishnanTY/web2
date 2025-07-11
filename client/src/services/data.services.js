import getHeaders from "../common/getHeaders";
const API_BASE_URL = process.env.REACT_APP_API_URL;
export const fetchDetails = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/details`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error;
    }
}

export const coffee = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coffee`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error;
    }
}
