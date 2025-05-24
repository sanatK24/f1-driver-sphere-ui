
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dataclasses import dataclass, asdict
from typing import List, Optional, Dict, Any
import json

@dataclass
class Driver:
    driver_number: int
    first_name: str
    last_name: str
    team_name: str
    team_colour: str
    country_code: str
    headshot_url: str

class F1DriverAPI:
    BASE_URL = "https://api.openf1.org/v1"

    def __init__(self):
        self.session = requests.Session()

    def _make_request(self, endpoint: str, params: dict = None) -> Optional[Dict]:
        """Helper method to make API requests with error handling."""
        try:
            response = self.session.get(f"{self.BASE_URL}/{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error making request to {endpoint}: {str(e)}")
            return None
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON response: {str(e)}")
            return None

    def search_drivers_by_name(self, name: str) -> List[Driver]:
        """Search for drivers by name (case-insensitive)."""
        params = {
            'session_key': 'latest'
        }
        data = self._make_request('drivers', params)
        
        if not data:
            print("Error fetching driver list")
            return []
            
        try:
            drivers = []
            name_lower = name.lower()
            for driver_data in data:
                first_name = driver_data.get('first_name', '')
                last_name = driver_data.get('last_name', '')
                full_name = f"{first_name} {last_name}".strip().lower()
                
                if (name_lower in first_name.lower() or
                    name_lower in last_name.lower() or
                    name_lower in full_name):
                    drivers.append(Driver(
                        driver_number=driver_data.get('driver_number', 0),
                        first_name=first_name,
                        last_name=last_name,
                        team_name=driver_data.get('team_name', ''),
                        team_colour=driver_data.get('team_colour', '#000000'),
                        country_code=driver_data.get('country_code', ''),
                        headshot_url=driver_data.get('headshot_url', '')
                    ))
            
            return drivers
            
        except (AttributeError, TypeError) as e:
            print(f"Error parsing driver data: {str(e)}")
            return []

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize F1 API
f1_api = F1DriverAPI()

@app.route('/api/drivers/search', methods=['GET'])
def search_drivers():
    """Search for drivers by name."""
    name = request.args.get('name', '')
    
    if not name:
        return jsonify({'error': 'Name parameter is required'}), 400
    
    try:
        drivers = f1_api.search_drivers_by_name(name)
        # Convert dataclass objects to dictionaries
        drivers_dict = [asdict(driver) for driver in drivers]
        return jsonify({'drivers': drivers_dict})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
