
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface DriverCardProps {
  driver: Driver;
  onBack: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        onClick={onBack}
        variant="outline"
        className="mb-6 bg-black/40 border-gray-600 text-white hover:bg-gray-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Search
      </Button>

      <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Team color accent */}
            <div 
              className="h-2 w-full"
              style={{ backgroundColor: driver.team_colour }}
            />
            
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Driver Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={driver.headshot_url}
                      alt={`${driver.first_name} ${driver.last_name}`}
                      className="w-48 h-48 object-cover rounded-full border-4 border-gray-600 bg-gray-800"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/200x200/374151/ffffff?text=F1';
                      }}
                    />
                    <div 
                      className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-white"
                      style={{ backgroundColor: driver.team_colour }}
                    >
                      #{driver.driver_number}
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {driver.first_name} <span className="text-red-400">{driver.last_name}</span>
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                    <Badge 
                      className="text-white font-semibold text-lg px-4 py-2"
                      style={{ backgroundColor: driver.team_colour }}
                    >
                      {driver.team_name}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300 text-lg px-4 py-2">
                      {driver.country_code}
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">#{driver.driver_number}</div>
                      <div className="text-gray-400 text-sm">Driver Number</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">{driver.team_name}</div>
                      <div className="text-gray-400 text-sm">Current Team</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">{driver.country_code}</div>
                      <div className="text-gray-400 text-sm">Nationality</div>
                    </div>
                  </div>

                  {/* Additional Info Section */}
                  <div className="mt-8 p-6 bg-gray-900/50 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Driver Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <span className="font-semibold text-gray-200">Full Name:</span> {driver.first_name} {driver.last_name}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-200">Racing Number:</span> #{driver.driver_number}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-200">Team:</span> {driver.team_name}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-200">Country:</span> {driver.country_code}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverCard;
