
# F1-Analyzer Backend

This is the Python Flask backend for the F1-Analyzer application. It connects to the OpenF1 API to fetch real Formula 1 driver data.

## Setup Instructions

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```

3. **The API will be available at:**
   - Main API: `http://localhost:5000`
   - Health check: `http://localhost:5000/api/health`
   - Driver search: `http://localhost:5000/api/drivers/search?name=<driver_name>`

## API Endpoints

### GET /api/drivers/search
Search for F1 drivers by name.

**Parameters:**
- `name` (required): Driver name to search for (first name, last name, or full name)

**Example:**
```
GET /api/drivers/search?name=Max
```

**Response:**
```json
{
  "drivers": [
    {
      "driver_number": 1,
      "first_name": "Max",
      "last_name": "Verstappen",
      "team_name": "Red Bull Racing",
      "team_colour": "#3671C6",
      "country_code": "NLD",
      "headshot_url": "https://..."
    }
  ]
}
```

### GET /api/health
Health check endpoint to verify the API is running.

## Data Source

This backend uses the OpenF1 API (https://api.openf1.org/v1) to fetch real-time Formula 1 data.
