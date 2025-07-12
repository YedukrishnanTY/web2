import getHeaders from "../common/getHeaders";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            credentials: 'include',
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