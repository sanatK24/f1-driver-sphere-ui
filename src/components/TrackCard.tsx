
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: number;
  name: string;
  location: string;
  country: string;
  circuit_length: number;
  laps: number;
  image_url?: string;
}

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center">
          {/* Track Image */}
          <div className="relative mb-4">
            <img
              src={track.image_url || 'https://via.placeholder.com/300x200/374151/ffffff?text=F1+Track'}
              alt={track.name}
              className="w-full h-32 object-cover rounded-lg border border-gray-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x200/374151/ffffff?text=F1+Track';
              }}
            />
          </div>

          {/* Track Info */}
          <h3 className="text-lg font-bold text-white mb-2">{track.name}</h3>
          
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{track.location}, {track.country}</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {track.circuit_length}km
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {track.laps} laps
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
