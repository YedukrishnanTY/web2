import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/Profile.services';
import { getCoffeeList } from '../../services/data.services';

function Dashboard() {
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const profileData = await getProfile();
            console.log('Profile data:', profileData);

            // ✅ Call your second endpoint here
            getCoffeeList()
                .then(result => {
                    console.log('Coffee list:', result);
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                    navigate('/'); // ✅ Redirect if profile fails
                });

        } catch (error) {
            console.error('Error fetching profile:', error);
            navigate('/'); // ✅ Redirect if profile fails
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return <div>Dashboard page</div>;
}

export default Dashboard;
