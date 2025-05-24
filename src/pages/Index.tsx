
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DriverCard from '@/components/DriverCard';
import SearchResults from '@/components/SearchResults';

interface Driver {
  driver_number: number;
  first_name: string;
  last_name: string;
  team_name: string;
  team_colour: string;
  country_code: string;
  headshot_url: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchResults, setSearchResults] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data for demonstration (replace with actual API call)
  const mockDrivers: Driver[] = [
    {
      driver_number: 1,
      first_name: "Max",
      last_name: "Verstappen",
      team_name: "Red Bull Racing",
      team_colour: "#3671C6",
      country_code: "NLD",
      headshot_url: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png"
    },
    {
      driver_number: 44,
      first_name: "Lewis",
      last_name: "Hamilton",
      team_name: "Mercedes",
      team_colour: "#27F4D2",
      country_code: "GBR",
      headshot_url: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png"
    },
    {
      driver_number: 16,
      first_name: "Charles",
      last_name: "Leclerc",
      team_name: "Ferrari",
      team_colour: "#E8002D",
      country_code: "MON",
      headshot_url: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/1col/image.png"
    },
    {
      driver_number: 81,
      first_name: "Oscar",
      last_name: "Piastri",
      team_name: "McLaren",
      team_colour: "#FF8000",
      country_code: "AUS",
      headshot_url: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a driver name');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = mockDrivers.filter(driver => 
        driver.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${driver.first_name} ${driver.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No drivers found with that name');
      } else if (results.length === 1) {
        setSelectedDriver(results[0]);
      }
    } catch (err) {
      setError('Error searching for drivers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              F1-<span className="text-red-500">nalyzer</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Discover Formula 1 driver profiles and statistics
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-red-500/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Search for F1 Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter driver name (e.g., 'Max', 'Hamilton', 'Leclerc')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="mt-8">
          {selectedDriver && (
            <DriverCard 
              driver={selectedDriver} 
              onBack={() => setSelectedDriver(null)}
            />
          )}
          
          {searchResults.length > 1 && !selectedDriver && (
            <SearchResults 
              drivers={searchResults}
              onSelectDriver={setSelectedDriver}
            />
          )}
        </div>

        {/* Demo Instructions */}
        {!selectedDriver && searchResults.length === 0 && !isLoading && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-black/20 backdrop-blur-sm border-gray-700/50">
              <CardContent className="pt-6">
                <div className="text-center text-gray-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">Try searching for:</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Max', 'Hamilton', 'Leclerc', 'Piastri'].map((name) => (
                      <Badge 
                        key={name}
                        variant="outline" 
                        className="cursor-pointer hover:bg-red-600/20 border-red-500/50 text-gray-300"
                        onClick={() => {
                          setSearchQuery(name);
                          setSearchQuery(name);
                        }}
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    This demo uses mock data. Connect to your Python backend to fetch real F1 driver information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
