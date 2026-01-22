// API Base URL
const BASE_URL = "https://icollegebackendjav-production.up.railway.app";

// Get JWT token from localStorage
// Try multiple possible keys in case auth module uses different key
function getToken() {
  // Priority order: token, jwtToken, authToken, accessToken
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  // If no token found, log a helpful message
  if (!token) {
    console.warn(
      "⚠️ No authentication token found! Please login or add a test token.\n" +
      "For testing, you can manually add a token:\n" +
      "localStorage.setItem('token', 'your-test-token-here')"
    );
  }

  return token;
}

// Helper function to make API requests
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        
        // Log full error for debugging
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          url: url,
          hasToken: !!token,
        });
      } catch (e) {
        // If response is not JSON, get text
        const text = await response.text().catch(() => "");
        errorMessage = text || errorMessage;
        console.error("API Error (non-JSON):", {
          status: response.status,
          statusText: response.statusText,
          text: text,
          url: url,
          hasToken: !!token,
        });
      }
      
      // Special handling for 403
      if (response.status === 403) {
        errorMessage = "Access forbidden. Please check your authentication token or permissions.";
      }
      
      // Special handling for 401
      if (response.status === 401) {
        errorMessage = "Unauthorized. Please login again.";
        // Optionally clear token and redirect to login
        localStorage.removeItem("token");
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

// Complaint Module API Functions

/**
 * Create a new complaint
 * @param {Object} complaintData - { title, description, imageUrl, category }
 * @returns {Promise<Object>} ComplaintResponse object
 */
export async function createComplaint(complaintData) {
  return apiRequest("/complaints/create-complaint", {
    method: "POST",
    body: JSON.stringify(complaintData),
  });
}

/**
 * Get all complaints (feed) with pagination
 * @param {number} page - Page number (starts at 0)
 * @param {number} size - Number of items per page
 * @returns {Promise<Array>} Array of ComplaintResponse objects
 */
export async function getAllComplaints(page = 0, size = 10) {
  const response = await apiRequest(`/complaints/get-all-complaints?page=${page}&size=${size}`);
  // Ensure we return an array
  return Array.isArray(response) ? response : [];
}

/**
 * Get complaints created by the logged-in user
 * @returns {Promise<Array>} Array of ComplaintResponse objects
 */
export async function getMyComplaints() {
  const response = await apiRequest("/complaints/my-complaints");
  // Ensure we return an array
  return Array.isArray(response) ? response : [];
}

/**
 * Toggle upvote on a complaint (like/unlike)
 * @param {number} complaintId - ID of the complaint
 * @returns {Promise<Object>} Updated ComplaintResponse object
 */
export async function toggleUpvote(complaintId) {
  return apiRequest(`/complaints/${complaintId}/upvote`, {
    method: "PUT",
  });
}

// Category mapping from frontend to backend
export const CATEGORY_MAP = {
  facilities: "INFRASTRUCTURE",
  academics: "ACADEMIC",
  events: "OTHER",
  other: "OTHER",
  // Add more mappings as needed
  hostel: "HOSTEL",
  mess: "MESS",
};

// Reverse mapping for display
export const CATEGORY_DISPLAY = {
  INFRASTRUCTURE: "Facilities",
  ACADEMIC: "Academics",
  HOSTEL: "Hostel",
  MESS: "Mess",
  OTHER: "Other",
};
