
import React from 'react';
import { User, MapPin, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureNavigationProps {
  activeFeature: string;
  onFeatureChange: (feature: string) => void;
}

const FeatureNavigation: React.FC<FeatureNavigationProps> = ({ activeFeature, onFeatureChange }) => {
  const features = [
    { id: 'drivers', label: 'Drivers', icon: User },
    { id: 'tracks', label: 'Tracks', icon: MapPin },
    { id: 'results', label: 'Results', icon: Trophy },
    { id: 'seasons', label: 'Seasons', icon: Calendar },
  ];

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-red-500/20 mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-center gap-4">
          {features.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              onClick={() => onFeatureChange(id)}
              variant={activeFeature === id ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                activeFeature === id
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureNavigation;
