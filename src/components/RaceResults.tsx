
import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RaceResult {
  position: number;
  driver_name: string;
  team_name: string;
  time: string;
  points: number;
  fastest_lap?: boolean;
}

interface RaceResultsProps {
  raceResults: RaceResult[];
  raceName: string;
}

const RaceResults: React.FC<RaceResultsProps> = ({ raceResults, raceName }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          {raceName} - Race Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead className="text-gray-300">Pos</TableHead>
              <TableHead className="text-gray-300">Driver</TableHead>
              <TableHead className="text-gray-300">Team</TableHead>
              <TableHead className="text-gray-300">Time</TableHead>
              <TableHead className="text-gray-300">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {raceResults.map((result) => (
              <TableRow key={result.position} className="border-gray-600 hover:bg-gray-800/50">
                <TableCell className="text-white font-bold">
                  {result.position <= 3 ? (
                    <div className="flex items-center gap-2">
                      {result.position}
                      {result.position === 1 && <Trophy className="h-4 w-4 text-yellow-400" />}
                      {result.position === 2 && <Trophy className="h-4 w-4 text-gray-400" />}
                      {result.position === 3 && <Trophy className="h-4 w-4 text-orange-400" />}
                    </div>
                  ) : (
                    result.position
                  )}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center gap-2">
                    {result.driver_name}
                    {result.fastest_lap && <Clock className="h-4 w-4 text-purple-400" />}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{result.team_name}</TableCell>
                <TableCell className="text-gray-300">{result.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {result.points}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RaceResults;
