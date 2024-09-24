import { axiosInstance } from '@harshitpadha/auth';

// User-related API calls
export const fetchUsers = () => axiosInstance.get('accounts/users/');
export const createUser = (data) => axiosInstance.post('accounts/users/', data);
export const fetchUserCount = () => axiosInstance.get('accounts/user/count/');
export const fetchUserTrends = () => axiosInstance.get('accounts/user/trends/');

export const deleteUsers = (userIds) => {
    return axiosInstance.post('accounts/users/delete/', { ids: userIds });
  };
export const fetchUsersSearch = (searchQuery = '') =>
    axiosInstance.get(`accounts/users/search/?search=${encodeURIComponent(searchQuery)}`);
  

// Employee-related API calls
export const fetchEmployees = () => axiosInstance.get('employee/employees/');
export const fetchEmployeeCount = () => axiosInstance.get('employee/employees/count/');
export const fetchEmployeeTrends = () => axiosInstance.get('employee/employees/trends/');
export const fetchEmployeePerformance = (employeeId) => axiosInstance.get(`employee/employees/${employeeId}/performances/`);

// Company-related API calls
export const fetchCompanies = () => axiosInstance.get('company/companies/');
export const fetchCompanyDepartments = (companyId) => axiosInstance.get(`company/companies/${companyId}/departments/`);
export const fetchCompanyTrends = () => axiosInstance.get('company/companies/trends/');

// Booking-related API calls
export const fetchBookings = () => axiosInstance.get('bookings/');
export const createBooking = (data) => axiosInstance.post('bookings/', data);
export const cancelBooking = (id) => axiosInstance.put(`bookings/cancel/${id}/`);

// Payment-related API calls
export const createPayment = (data) => axiosInstance.post('payments/', data);

// Room-related API calls
export const fetchAvailableRooms = () => axiosInstance.get('rooms/');

// Review-related API calls
export const fetchReviews = () => axiosInstance.get('reviews/');
export const createReview = (data) => axiosInstance.post('reviews/', data);

// Add more functions as needed...
