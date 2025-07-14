import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/Profile.services';
import { deleteCoffee, getCoffeeList } from '../../services/data.services';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [coffeeData, setCoffeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items to display per page

    // State for Coffee Details Modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentCoffeeDetails, setCurrentCoffeeDetails] = useState(null);

    // New states for Delete Confirmation Modal
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [coffeeToDelete, setCoffeeToDelete] = useState(null);

    // New states for Snackbar
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch profile data (if needed for authentication or user-specific data)
            const profileData = await getProfile();

            // Fetch coffee list data
            const result = await getCoffeeList();
            setCoffeeData(result);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again later.');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(coffeeData.length / itemsPerPage);

    // Get current posts for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = coffeeData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and previous page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to show delete confirmation modal
    const handleDeleteClick = (coffee) => {
        setCoffeeToDelete(coffee);
        setShowDeleteConfirmModal(true);
    };

    // Function to show the snackbar
    const showCustomSnackbar = (message, type) => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
            setSnackbarMessage('');
            setSnackbarType('success');
        }, 3000); // Snackbar will disappear after 3 seconds
    };

    // Function to confirm and perform deletion
    const confirmDelete = () => {
        if (coffeeToDelete) {
            const payload = {
                _id: coffeeToDelete._id
            };
            deleteCoffee(payload)
                .then(() => {
                    setCoffeeData(coffeeData.filter(item => item._id !== coffeeToDelete._id));
                    setShowDeleteConfirmModal(false);
                    setCoffeeToDelete(null);
                    showCustomSnackbar('Coffee entry deleted successfully!', 'success');
                })
                .catch((error) => {
                    console.error("Error deleting coffee:", error);
                    setError("Failed to delete coffee document.");
                    setShowDeleteConfirmModal(false);
                    setCoffeeToDelete(null);
                    showCustomSnackbar('Failed to delete coffee entry.', 'error');
                });
        }
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setShowDeleteConfirmModal(false);
        setCoffeeToDelete(null);
    };

    const handleShowDetails = (coffee) => {
        setCurrentCoffeeDetails(coffee);
        setShowDetailsModal(true);
    };

    // Function to close coffee details modal
    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setCurrentCoffeeDetails(null);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full pb-32">
                <div className="text-xl text-gray-700 dark:text-gray-300">Loading dashboard data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center w-full pb-32">
                <div className="text-xl text-red-600 dark:text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full pb-32">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 mt-8">Coffee Dashboard</h1>

            {coffeeData.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-5xl">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Coffee List</h2>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Table Header (Div-based) */}
                        <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-700 font-medium text-gray-500 dark:text-gray-300 uppercase text-xs tracking-wider border-b border-gray-200 dark:border-gray-700">
                            <div className="col-span-1 text-left">Name</div>
                            <div className="col-span-1 text-left">Subject</div>
                            <div className="col-span-1 text-left">Message</div>
                            <div className="col-span-1 text-left">IP Address</div>
                            <div className="col-span-1 text-left">User Agent</div>
                            <div className="col-span-1 text-center">Actions</div>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {currentItems.map((coffee) => (
                                <div key={coffee._id} className="grid grid-cols-6 gap-4 px-6 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                    <div className="col-span-1 font-medium text-gray-900 dark:text-white truncate">{coffee.name}</div>
                                    <div className="col-span-1 truncate">{coffee.subject}</div>
                                    <div className="col-span-1 truncate">{coffee.message}</div>
                                    <div className="col-span-1 truncate">{coffee.ip}</div>
                                    <div className="col-span-1 truncate">{coffee.userAgent}</div>
                                    <div className="col-span-1 flex justify-center space-x-2">
                                        {/* View Details Button */}
                                        <button
                                            onClick={() => handleShowDetails(coffee)}
                                            className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                            aria-label="View Details"
                                        >
                                            {/* Eye icon SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteClick(coffee)}
                                            className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                            aria-label="Delete Coffee"
                                        >
                                            {/* Trash icon SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6 17.5 20.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                            >
                                Previous
                            </button>
                            <div className="flex space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out
                                            ${currentPage === i + 1
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </div>
            ) : (
                <p className="text-lg text-gray-700 dark:text-gray-300">No coffee data available.</p>
            )}

            {/* Coffee Details Modal */}
            {showDetailsModal && currentCoffeeDetails && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 relative">
                        <button
                            onClick={closeDetailsModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-150 ease-in-out"
                            aria-label="Close"
                        >
                            {/* X icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                            Coffee Details
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Name:</span> {currentCoffeeDetails.name}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Subject:</span> {currentCoffeeDetails.subject}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Message:</span> {currentCoffeeDetails.message}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">IP Address:</span> {currentCoffeeDetails.ip}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">User Agent:</span> {currentCoffeeDetails.userAgent}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">Confirm Deletion</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
                            Are you sure you want to delete this coffee entry? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSnackbar && (
                <div
                    className={`fixed top-8 right-8 p-4 rounded-md shadow-lg text-white text-center transition-all duration-300 ${snackbarType === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    style={{ zIndex: 1000 }} // Ensure it's above other elements
                >
                    {snackbarMessage}
                </div>
            )}
        </div>
    );
}

export default Dashboard;