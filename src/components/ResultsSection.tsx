
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RaceResults from './RaceResults';

interface RaceResult {
  position: number;
  driver_name: string;
  team_name: string;
  time: string;
  points: number;
  fastest_lap?: boolean;
}

interface Race {
  id: number;
  name: string;
  date: string;
  track: string;
  results: RaceResult[];
}

const ResultsSection = () => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  // Mock race data
  const mockRaces: Race[] = [
    {
      id: 1,
      name: "Bahrain Grand Prix",
      date: "2024-03-02",
      track: "Bahrain International Circuit",
      results: [
        { position: 1, driver_name: "Max Verstappen", team_name: "Red Bull Racing", time: "1:31:44.742", points: 25 },
        { position: 2, driver_name: "Sergio Perez", team_name: "Red Bull Racing", time: "+22.457", points: 18 },
        { position: 3, driver_name: "Carlos Sainz", team_name: "Ferrari", time: "+33.270", points: 15, fastest_lap: true },
        { position: 4, driver_name: "Charles Leclerc", team_name: "Ferrari", time: "+55.525", points: 12 },
        { position: 5, driver_name: "George Russell", team_name: "Mercedes", time: "+1:21.295", points: 10 }
      ]
    },
    {
      id: 2,
      name: "Saudi Arabian Grand Prix",
      date: "2024-03-09",
      track: "Jeddah Corniche Circuit",
      results: [
        { position: 1, driver_name: "Max Verstappen", team_name: "Red Bull Racing", time: "1:20:43.273", points: 26, fastest_lap: true },
        { position: 2, driver_name: "Sergio Perez", team_name: "Red Bull Racing", time: "+13.643", points: 18 },
        { position: 3, driver_name: "Charles Leclerc", team_name: "Ferrari", time: "+18.639", points: 15 },
        { position: 4, driver_name: "Oscar Piastri", team_name: "McLaren", time: "+32.547", points: 12 },
        { position: 5, driver_name: "Fernando Alonso", team_name: "Aston Martin", time: "+35.763", points: 10 }
      ]
    }
  ];

  return (
    <div>
      {!selectedRace ? (
        <>
          <Card className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-red-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-center">2024 Race Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRaces.map((race) => (
                  <Card 
                    key={race.id}
                    className="bg-gray-800/50 border-gray-600 hover:border-red-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedRace(race)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{race.name}</h3>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-gray-300 mb-2">{race.track}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {race.date}
                        </Badge>
                        <span className="text-sm text-gray-400">Click to view results</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => setSelectedRace(null)}
            variant="outline"
            className="mb-6 bg-black/40 border-gray-600 text-white hover:bg-gray-800"
          >
            Back to Races
          </Button>
          
          <RaceResults 
            raceResults={selectedRace.results}
            raceName={selectedRace.name}
          />
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
