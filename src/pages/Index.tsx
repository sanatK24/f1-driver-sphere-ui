import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DriverCard from '@/components/DriverCard';
import SearchResults from '@/components/SearchResults';
import FeatureNavigation from '@/components/FeatureNavigation';
import CircuitsSection from '@/components/CircuitsSection';
import ResultsSection from '@/components/ResultsSection';
import { searchDrivers } from '@/services/api';

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
  const [activeFeature, setActiveFeature] = useState('drivers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchResults, setSearchResults] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a driver name');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const results = await searchDrivers(searchQuery);
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No drivers found with that name');
      } else if (results.length === 1) {
        setSelectedDriver(results[0]);
      }
    } catch (err) {
      setError('Error connecting to F1 API. Please check if the backend server is running.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'drivers':
        return (
          <>
            {/* Search Section */}
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
                    {error.includes('backend server') && (
                      <p className="text-red-300 text-sm mt-2">
                        Make sure to run: <code className="bg-gray-800 px-1 rounded">python backend/app.py</code>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Search Results</h2>
                <SearchResults 
                  drivers={searchResults} 
                  onSelectDriver={setSelectedDriver} 
                />
              </div>
            )}

            {/* Selected Driver Details */}
            {selectedDriver && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Driver Details</h2>
                <DriverCard 
                  driver={selectedDriver} 
                  onBack={() => setSelectedDriver(null)} 
                />
              </div>
            )}
          </>
        );

      case 'tracks':
        return <CircuitsSection />;

      case 'results':
        return <ResultsSection />;

      case 'seasons':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Seasons</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              F1-<span className="text-red-500">analyzer</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Comprehensive Formula 1 analysis and information platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <FeatureNavigation 
          activeFeature={activeFeature}
          onFeatureChange={setActiveFeature}
        />
        
        {renderFeatureContent()}
      </div>
    </div>
  );
};

export default Index;
