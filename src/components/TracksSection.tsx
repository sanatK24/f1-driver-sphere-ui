
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TrackCard from './TrackCard';

interface Track {
  id: number;
  name: string;
  location: string;
  country: string;
  circuit_length: number;
  laps: number;
  image_url?: string;
}

const TracksSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock track data
  const mockTracks: Track[] = [
    {
      id: 1,
      name: "Monaco Circuit",
      location: "Monte Carlo",
      country: "Monaco",
      circuit_length: 3.337,
      laps: 78,
      image_url: "https://via.placeholder.com/300x200/374151/ffffff?text=Monaco"
    },
    {
      id: 2,
      name: "Silverstone Circuit",
      location: "Silverstone",
      country: "United Kingdom",
      circuit_length: 5.891,
      laps: 52,
      image_url: "https://via.placeholder.com/300x200/374151/ffffff?text=Silverstone"
    },
    {
      id: 3,
      name: "Circuit de Spa-Francorchamps",
      location: "Spa",
      country: "Belgium",
      circuit_length: 7.004,
      laps: 44,
      image_url: "https://via.placeholder.com/300x200/374151/ffffff?text=Spa"
    },
    {
      id: 4,
      name: "Suzuka Circuit",
      location: "Suzuka",
      country: "Japan",
      circuit_length: 5.807,
      laps: 53,
      image_url: "https://via.placeholder.com/300x200/374151/ffffff?text=Suzuka"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(mockTracks);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = mockTracks.filter(track => 
        track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No tracks found with that name');
      }
    } catch (err) {
      setError('Error searching for tracks');
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
    <div>
      <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-red-500/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white text-center">Search F1 Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter track name or location..."
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

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}

      {searchResults.length === 0 && !isLoading && !error && (
        <div className="text-center text-gray-300">
          <p>Click search to view all tracks or enter a search term</p>
        </div>
      )}
    </div>
  );
};

export default TracksSection;
