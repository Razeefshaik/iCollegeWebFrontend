// ==========================
// API Base URL (deployed backend)
// ==========================
const BASE_URL = "https://vivacious-lita-razeef-0c7e7706.koyeb.app";

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
// Helper function to parse response (JSON or TEXT)
// ==========================
async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
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
      let errorData;
      try {
        errorData = await parseResponse(response);
      } catch (_) {
        errorData = null;
      }
      const msg =
        (errorData && typeof errorData === "object" && (errorData.message || errorData.error)) ||
        (typeof errorData === "string" && errorData.length < 200 ? errorData : null);
      const errorMessage =
        msg || `Request failed (${response.status} ${response.statusText})`;

      if (response.status === 401) {
        localStorage.removeItem("token");
      }

      throw new Error(errorMessage);
    }

    return await parseResponse(response);
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Cannot reach server. Check your internet and that the backend is running at " + BASE_URL
      );
    }
    console.error("API Request Error:", error);
    throw error;
  }
}

// =====================================================
// AUTH MODULE (NO TOKEN REQUIRED)
// =====================================================

// Student Registration
export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await parseResponse(response);

    const message =
      errorData?.message ||
      errorData ||
      "An account with this Scholar ID or email already exists. Please log in instead.";

    throw new Error(message);
  }

  return await parseResponse(response);
}

// ✅ Admin Registration (separate endpoint)
export async function registerAdmin(userData) {
  const response = await fetch(`${BASE_URL}/auth/register-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await parseResponse(response);

    const message =
      errorData?.message ||
      errorData ||
      "Admin registration failed. Please check the secret key.";

    throw new Error(message);
  }

  return await parseResponse(response);
}

// Login
export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || "Login failed");
  }

  return await parseResponse(response);
}

// OTP Verification (Query Params)
export async function verifyOtp({ scholarId, otp }) {
  const response = await fetch(
    `${BASE_URL}/auth/verify?scholarId=${encodeURIComponent(
      scholarId
    )}&otp=${encodeURIComponent(otp)}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(
      errorData?.message || errorData || "OTP verification failed"
    );
  }

  return await parseResponse(response);
}

// Resend OTP
export async function resendOtp(scholarId) {
  const response = await fetch(
    `${BASE_URL}/auth/resend-otp?scholarId=${scholarId}`,
    { method: "POST" }
  );

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || "Failed to resend OTP");
  }

  return await parseResponse(response);
}

// Forgot password
export async function forgotPassword(scholarId) {
  const response = await fetch(
    `${BASE_URL}/auth/forgot-password?scholarId=${scholarId}`,
    { method: "POST" }
  );

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || "Forgot password failed");
  }

  return await parseResponse(response);
}

// Reset password
export async function resetPassword(data) {
  const response = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || "Reset password failed");
  }

  return await parseResponse(response);
}

// Get profile
export async function getMe() {
  return apiRequest("/auth/me");
}

// =====================================================
// POLLS MODULE (AUTH REQUIRED)
// =====================================================

// Get all polls (active + expired)
// GET /polls/all
export async function getAllPolls() {
  return apiRequest("/polls/all");
}

// Vote on a poll
// POST /polls/{pollId}/vote?optionIndex=0
export async function voteOnPoll(pollId, optionIndex) {
  return apiRequest(`/polls/${pollId}/vote?optionIndex=${optionIndex}`, {
    method: "POST",
  });
}

// Create poll (admin only) – backend: POST /polls/launch
// body: { question, options: string[], durationHours: number, isAnonymous: boolean }
export async function createPoll(data) {
  return apiRequest("/polls/launch", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// =====================================================
// ANNOUNCEMENTS MODULE (AUTH REQUIRED)
// =====================================================

// Get all announcements
export async function getAllAnnouncements() {
  // GET /announcements/all -> [{ id, title, description, priority, createdAt }]
  return apiRequest("/announcements/all");
}

// Create announcement (admin only) – backend: POST /announcements/publish
// body: { title, content, category?, imageUrl?, isUrgent? }
export async function createAnnouncement(data) {
  return apiRequest("/announcements/publish", {
    method: "POST",
    body: JSON.stringify(data),
  });
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

export async function getAllComplaints(page = 0, size = 10) {
  return apiRequest(`/complaints/get-all-complaints?page=${page}&size=${size}`);
}

export async function getMyComplaints() {
  return apiRequest("/complaints/my-complaints");
}

export async function toggleUpvote(complaintId) {
  return apiRequest(`/complaints/${complaintId}/upvote`, {
    method: "PUT",
  });
}

// =====================================================
// CATEGORY MAPS
// =====================================================

export const CATEGORY_MAP = {
  academics: "ACADEMICS",
  hostel: "HOSTEL",
  internet: "INTERNET",
  cleanliness: "CLEANLINESS",
  infrastructure: "INFRASTRUCTURE",
  canteen: "CANTEEN",
  other: "OTHER",
};

export const CATEGORY_DISPLAY = {
  ACADEMICS: "academics",
  HOSTEL: "hostel",
  INTERNET: "internet",
  CLEANLINESS: "cleanliness",
  INFRASTRUCTURE: "infrastructure",
  CANTEEN: "canteen",
  OTHER: "other",
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
