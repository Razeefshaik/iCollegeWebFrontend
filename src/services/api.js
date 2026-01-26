// ==========================
// API Base URL
// ==========================
const BASE_URL = "https://icollegebackendjav-production.up.railway.app";

// ==========================
// Get JWT token from localStorage
// ==========================
function getToken() {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  if (!token) {
    console.warn(
      "⚠️ No authentication token found! Please login or add a test token.\n" +
        "For testing, you can manually add a token:\n" +
        "localStorage.setItem('token', 'your-test-token-here')"
    );
  }

  return token;
}

// ==========================
// Helper function to make AUTHENTICATED API requests
// ==========================
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
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;

        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          url,
          hasToken: !!token,
        });
      } catch {
        const text = await response.text().catch(() => "");
        errorMessage = text || errorMessage;

        console.error("API Error (non-JSON):", {
          status: response.status,
          statusText: response.statusText,
          text,
          url,
          hasToken: !!token,
        });
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        errorMessage = "Unauthorized. Please login again.";
      }

      if (response.status === 403) {
        errorMessage =
          "Access forbidden. Please check your authentication token or permissions.";
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

// =====================================================
// AUTH MODULE (NO TOKEN REQUIRED)
// =====================================================

/**
 * Register a new student
 * @param {Object} userData - { name, publicName, email, password, scholarId }
 * @returns {Promise<Object>} { token }
 */
export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json(); // { token }
}

/**
 * Login user
 * @param {Object} credentials - { scholarId, password }
 * @returns {Promise<Object>} { token }
 */
export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json(); // { token }
}

// =====================================================
// COMPLAINT MODULE (AUTH REQUIRED)
// =====================================================

export async function createComplaint(complaintData) {
  return apiRequest("/complaints/create-complaint", {
    method: "POST",
    body: JSON.stringify(complaintData),
  });
}

/**
 * GET ALL COMPLAINTS (PAGINATED)
 * Returns FULL Spring Boot page object
 */
export async function getAllComplaints(page = 0, size = 10) {
  return apiRequest(
    `/complaints/get-all-complaints?page=${page}&size=${size}`
  );
}

/**
 * GET LOGGED-IN USER COMPLAINTS
 */
export async function getMyComplaints() {
  return apiRequest("/complaints/my-complaints");
}

export async function toggleUpvote(complaintId) {
  return apiRequest(`/complaints/${complaintId}/upvote`, {
    method: "PUT",
  });
}

// =====================================================
// CATEGORY MAPPING
// =====================================================

export const CATEGORY_MAP = {
  facilities: "INFRASTRUCTURE",
  academics: "ACADEMIC",
  events: "OTHER",
  other: "OTHER",
  hostel: "HOSTEL",
  mess: "MESS",
};

export const CATEGORY_DISPLAY = {
  INFRASTRUCTURE: "Facilities",
  ACADEMIC: "Academics",
  HOSTEL: "Hostel",
  MESS: "Mess",
  OTHER: "Other",
};

// =====================================================
// COMMENTS MODULE (AUTH REQUIRED)
// =====================================================

export async function getComments(complaintId) {
  return apiRequest(`/complaint/${complaintId}/comments`);
}

export async function addComment(complaintId, text) {
  return apiRequest(`/complaint/${complaintId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}
