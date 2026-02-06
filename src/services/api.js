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

  // Debug logging
  console.log("API Request:", {
    url,
    method: config.method || "GET",
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "none",
    headers: config.headers,
  });

  try {
    const response = await fetch(url, config);

    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let responseText = "";

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;

        console.error("API Error Response (JSON):", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          url,
          hasToken: !!token,
        });
      } catch {
        responseText = await response.text().catch(() => "");
        errorMessage = responseText || errorMessage;

        console.error("API Error (non-JSON):", {
          status: response.status,
          statusText: response.statusText,
          text: responseText,
          url,
          hasToken: !!token,
        });
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        errorMessage = "Unauthorized. Please login again.";
      }

      if (response.status === 403) {
        // Log full details for 403
        const allHeaders = {};
        response.headers.forEach((value, key) => {
          allHeaders[key] = value;
        });
        
        console.error("403 Forbidden Details:", {
          url,
          status: response.status,
          statusText: response.statusText,
          responseText: responseText || "No response body",
          requestHeaders: config.headers,
          responseHeaders: allHeaders,
          tokenExists: !!token,
          tokenLength: token ? token.length : 0,
        });
        
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
 * Register a new student (Step 1 - sends OTP)
 * @param {Object} userData - { name, publicName, email, password, scholarId }
 * @returns {Promise<String>} Success message
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

  const result = await response.json();
  // Backend returns a message string, not JSON object
  return typeof result === "string" ? result : result.message || "Registration successful. Please check your email for OTP.";
}

/**
 * Verify OTP (Step 2 - activates account and returns token)
 * @param {String} scholarId - Student scholar ID
 * @param {String} otp - OTP code received via email
 * @returns {Promise<Object>} { token }
 */
export async function verifyOTP(scholarId, otp) {
  const response = await fetch(`${BASE_URL}/auth/verify?scholarId=${scholarId}&otp=${otp}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "OTP verification failed");
  }

  return await response.json(); // { token }
}

/**
 * Resend OTP
 * @param {String} scholarId - Student scholar ID
 * @returns {Promise<String>} Success message
 */
export async function resendOTP(scholarId) {
  const response = await fetch(`${BASE_URL}/auth/resend-otp?scholarId=${scholarId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to resend OTP");
  }

  const result = await response.json();
  return typeof result === "string" ? result : result.message || "OTP resent successfully.";
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
 * GET ALL COMPLAINTS
 * Fetches all complaints, sorted by newest first
 */
export async function getAllComplaints() {
  return apiRequest("/complaints/all");
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

/**
 * Update complaint status (Admin Only)
 * @param {Number} complaintId - Complaint ID
 * @param {String} status - PENDING, RESOLVED, or DISMISSED
 */
export async function updateComplaintStatus(complaintId, status) {
  return apiRequest(`/complaints/update-status/${complaintId}?status=${status}`, {
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
  return apiRequest(`/comments/complaint/${complaintId}`);
}

export async function addComment(complaintId, content, anonymous = false) {
  return apiRequest("/comments/add", {
    method: "POST",
    body: JSON.stringify({
      complaintId,
      content,
      anonymous,
    }),
  });
}

// =====================================================
// USER PROFILE MODULE (AUTH REQUIRED)
// =====================================================

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data { name, publicName, email, scholarId, role }
 */
export async function getUserProfile() {
  // Check token before making request
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  
  // Try the endpoint
  try {
    return await apiRequest("/auth/me");
  } catch (error) {
    // If 403, the token might be invalid - suggest re-login
    if (error.message.includes("403") || error.message.includes("forbidden")) {
      console.warn("Profile endpoint returned 403. Token might be invalid or expired.");
      console.warn("Token preview:", token.substring(0, 50) + "...");
    }
    throw error;
  }
}
