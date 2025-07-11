import getHeaders from "../common/getHeaders";

export const fetchDetails = async () => {
    try {
        const response = await fetch(`http://localhost:3000/details`, {
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
