# Postman Login API Testing Guide

## Endpoint Information
- **Base URL:** `https://icollegebackendjav-production.up.railway.app`
- **Login Endpoint:** `/auth/login`
- **Method:** `POST`

## Step-by-Step Postman Configuration

### 1. Request Setup
- **Method:** POST
- **URL:** `https://icollegebackendjav-production.up.railway.app/auth/login`

### 2. Headers (Headers Tab)
Only these two headers should be active:
```
Content-Type: application/json
Accept: application/json
```

**Remove/Uncheck:**
- Origin
- User-Agent (if manually added)
- Any other custom headers

### 3. Body (Body Tab)
- Select: **raw**
- Select: **JSON** (from dropdown)
- Body content:
```json
{
  "scholarId": "210001",
  "password": "yourpassword"
}
```

### 4. Settings
- SSL certificate verification: **ON**
- Request timeout: **0** (no timeout)

## Alternative Endpoints to Try

If `/auth/login` doesn't work, try these:

1. **Without /auth prefix:**
   ```
   https://icollegebackendjav-production.up.railway.app/login
   ```

2. **With /api prefix:**
   ```
   https://icollegebackendjav-production.up.railway.app/api/auth/login
   ```

3. **Try registration endpoint (if it worked before):**
   ```
   https://icollegebackendjav-production.up.railway.app/auth/register
   ```
   (Use login body: `{ "scholarId": "...", "password": "..." }`)

## Expected Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Common Errors

### 403 Forbidden
- Check if credentials are correct
- Verify headers are exactly as shown
- Try removing Accept header (keep only Content-Type)
- Check if backend requires additional authentication

### CORS Error
- Backend might block Postman requests
- Try using browser console instead
- Check backend CORS configuration

### 401 Unauthorized
- Wrong credentials
- Check scholarId and password are correct

## Troubleshooting Checklist
- [ ] URL is correct (no trailing slash)
- [ ] Method is POST
- [ ] Only Content-Type and Accept headers (no Origin)
- [ ] Body is raw → JSON format
- [ ] JSON syntax is correct (double quotes, no trailing comma)
- [ ] Credentials are correct
- [ ] SSL verification is ON
