
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Driver {
  driver_number: number;
  first_name: string;
  last_name: string;
  team_name: string;
  team_colour: string;
  country_code: string;
  headshot_url: string;
}

interface SearchResultsProps {
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ drivers, onSelectDriver }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Found {drivers.length} drivers matching your search
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <Card 
            key={`${driver.driver_number}-${driver.last_name}`}
            className="bg-black/40 backdrop-blur-sm border-gray-700/50 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
            onClick={() => onSelectDriver(driver)}
          >
            <CardContent className="p-6">
              <div className="text-center">
                {/* Team color accent */}
                <div 
                  className="h-1 w-full mb-4 rounded"
                  style={{ backgroundColor: driver.team_colour }}
                />
                
                {/* Driver Image */}
                <div className="relative inline-block mb-4">
                  <img
                    src={driver.headshot_url}
                    alt={`${driver.first_name} ${driver.last_name}`}
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-600 group-hover:border-red-500 transition-colors bg-gray-800"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/100x100/374151/ffffff?text=F1';
                    }}
                  />
                  <div 
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white"
                    style={{ backgroundColor: driver.team_colour }}
                  >
                    #{driver.driver_number}
                  </div>
                </div>

                {/* Driver Info */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {driver.first_name} {driver.last_name}
                </h3>
                
                <div className="space-y-2">
                  <Badge 
                    className="text-white font-medium"
                    style={{ backgroundColor: driver.team_colour }}
                  >
                    {driver.team_name}
                  </Badge>
                  <div>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {driver.country_code}
                    </Badge>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="mt-4 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Click to view profile
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
