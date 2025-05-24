import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CircuitCard from './CircuitCard';

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

const CircuitsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [filteredCircuits, setFilteredCircuits] = useState<Circuit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallback data in case API fails
  const fallbackCircuits: Circuit[] = [
    {
      circuitId: "adelaide",
      url: "http://en.wikipedia.org/wiki/Adelaide_Street_Circuit",
      circuitName: "Adelaide Street Circuit",
      Location: {
        lat: "-34.9272",
        long: "138.617",
        locality: "Adelaide",
        country: "Australia"
      }
    },
    {
      circuitId: "albert_park",
      url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
      circuitName: "Albert Park Grand Prix Circuit",
      Location: {
        lat: "-37.8497",
        long: "144.968",
        locality: "Melbourne",
        country: "Australia"
      }
    },
    {
      circuitId: "americas",
      url: "http://en.wikipedia.org/wiki/Circuit_of_the_Americas",
      circuitName: "Circuit of the Americas",
      Location: {
        lat: "30.1328",
        long: "-97.6411",
        locality: "Austin",
        country: "USA"
      }
    },
    {
      circuitId: "interlagos",
      url: "http://en.wikipedia.org/wiki/Autódromo_José_Carlos_Pace",
      circuitName: "Autódromo José Carlos Pace",
      Location: {
        lat: "-23.7036",
        long: "-46.6997",
        locality: "São Paulo",
        country: "Brazil"
      }
    },
    {
      circuitId: "silverstone",
      url: "http://en.wikipedia.org/wiki/Silverstone_Circuit",
      circuitName: "Silverstone Circuit",
      Location: {
        lat: "52.0786",
        long: "-1.01694",
        locality: "Silverstone",
        country: "UK"
      }
    },
    {
      circuitId: "monza",
      url: "http://en.wikipedia.org/wiki/Autodromo_Nazionale_Monza",
      circuitName: "Autodromo Nazionale di Monza",
      Location: {
        lat: "45.6156",
        long: "9.28111",
        locality: "Monza",
        country: "Italy"
      }
    },
    {
      circuitId: "monaco",
      url: "http://en.wikipedia.org/wiki/Circuit_de_Monaco",
      circuitName: "Circuit de Monaco",
      Location: {
        lat: "43.7347",
        long: "7.42056",
        locality: "Monte-Carlo",
        country: "Monaco"
      }
    }
  ];

  // Load circuits data from Ergast API
  useEffect(() => {
    const loadCircuits = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from API with request options
        const requestOptions = {
          method: 'GET',
          redirect: 'follow' as const
        };

        const response = await fetch("http://ergast.com/api/f1/circuits.json", requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.MRData?.CircuitTable?.Circuits) {
          const formattedCircuits = data.MRData.CircuitTable.Circuits.map((circuit: any) => ({
            circuitId: circuit.circuitId,
            url: circuit.url,
            circuitName: circuit.circuitName,
            Location: {
              lat: circuit.Location.lat,
              long: circuit.Location.long,
              locality: circuit.Location.locality,
              country: circuit.Location.country
            }
          }));
          
          setCircuits(formattedCircuits);
          setFilteredCircuits(formattedCircuits);
          return;
        }
        
        // If no data from API, use fallback
        throw new Error('No circuit data received from API');
      } catch (err) {
        console.error('Error fetching circuits:', err);
        setError('Failed to load circuits. Using sample data instead.');
        
        // Use fallback data
        setCircuits(fallbackCircuits);
        setFilteredCircuits(fallbackCircuits);
      } finally {
        setIsLoading(false);
      }
    };

    loadCircuits();
  }, []);

  // Filter circuits based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCircuits(circuits);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = circuits.filter(circuit => 
      circuit.circuitName.toLowerCase().includes(query) ||
      (circuit.Location.locality && circuit.Location.locality.toLowerCase().includes(query)) ||
      circuit.Location.country.toLowerCase().includes(query) ||
      circuit.circuitId.toLowerCase().includes(query)
    );
    
    setFilteredCircuits(results);
  }, [searchQuery, circuits]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Search is handled automatically by the useEffect
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-red-500/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Search F1 Circuits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by circuit name, city, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button 
              onClick={() => {}}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? 'Loading...' : 'Search'}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Circuits Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading circuits...</p>
        </div>
      ) : filteredCircuits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCircuits.map((circuit) => (
            <CircuitCard key={circuit.circuitId} circuit={circuit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No circuits found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default CircuitsSection;
