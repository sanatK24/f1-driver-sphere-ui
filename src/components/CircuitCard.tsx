import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Map, AlertCircle, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GOOGLE_MAPS_API_KEY } from '@/config';

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

interface CircuitCardProps {
  circuit: Circuit;
}

const CircuitCard: React.FC<CircuitCardProps> = ({ circuit }) => {
  const [imageError, setImageError] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mapUrl, setMapUrl] = useState<string>('');

  // Generate map image URL using Google Maps Static API
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setErrorMessage('Google Maps API key not configured');
      setIsMapLoading(false);
      return;
    }

    const { lat, long } = circuit.Location;
    const zoom = 16; // Increased from 12 to 14 for better track visibility
    const size = '600x300';
    const marker = `color:red%7C${lat},${long}`;

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=${marker}&key=${GOOGLE_MAPS_API_KEY}`;
    console.log('Map URL:', url);
    setMapUrl(url);
  }, [circuit.Location]);

  // Fallback SVG when image fails to load
  const getFallbackSvg = () => {
    const { circuitName, Location } = circuit;
    const locationText = `${Location.locality}, ${Location.country}`.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" style="background-color: #1a1a1a">
        <rect width="100%" height="100%" fill="#1a1a1a" />
        <circle cx="50%" cy="50%" r="100" fill="none" stroke="#333" stroke-width="2" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#333" stroke-width="2" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#333" stroke-width="2" />
        <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">
          ${circuitName}
        </text>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#888" text-anchor="middle">
          ${locationText}
        </text>
        <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="12" fill="#555" text-anchor="middle">
          Map unavailable
        </text>
      </svg>`
    )}`;
  };

  // Handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load map image:', e);
    const target = e.target as HTMLImageElement;
    console.error('Failed to load image URL:', target.src);

    setImageError(true);
    setIsMapLoading(false);
    setErrorMessage('Failed to load map. Check console for details.');

    // Set fallback SVG
    target.src = getFallbackSvg();
  };

  const handleImageLoad = () => {
    setImageError(false);
    setIsMapLoading(false);
    setErrorMessage(null);
  };

  // Log the API key status (for debugging, remove in production)
  useEffect(() => {
    console.log('Google Maps API Key:', GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing');
  }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50 h-full">
        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Google Maps API Key Required</h3>
          <p className="text-gray-400 mb-4">
            To view circuit maps, please add your Google Maps API key to the config file.
          </p>
          <div className="bg-gray-800 p-4 rounded-md text-left text-sm text-gray-300 font-mono w-full">
            <p>1. Get an API key from Google Cloud Console</p>
            <p>2. Enable "Maps Static API" for the key</p>
            <p>3. Add it to <code className="bg-gray-700 px-1 rounded">src/config.ts</code></p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50 hover:border-red-500/50 transition-all duration-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1">
          {/* Circuit Map Image */}
          <div className="relative mb-4 h-40 overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center">
            {isMapLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <Compass className="h-8 w-8 text-gray-600 mb-2 animate-spin" />
                  <span className="text-sm text-gray-400">Loading map...</span>
                </div>
              </div>
            )}

            <img
              src={mapUrl}
              alt={`${circuit.circuitName} map`}
              className={`w-full h-full object-cover ${isMapLoading ? 'opacity-0' : 'opacity-100'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />

            {(imageError || errorMessage) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 p-4">
                <div className="text-center">
                  <AlertCircle className="h-10 w-10 text-red-500 mb-3 mx-auto" />
                  <h4 className="text-sm font-medium text-gray-200 mb-1">Map Unavailable</h4>
                  <p className="text-xs text-gray-400">
                    {errorMessage || 'Could not load map'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Check console for details
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Circuit Info */}
          <h3 className="text-lg font-bold text-white mb-2">{circuit.circuitName}</h3>

          <div className="space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{circuit.Location.locality}, {circuit.Location.country}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                Lat: {parseFloat(circuit.Location.lat).toFixed(4)}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                Long: {parseFloat(circuit.Location.long).toFixed(4)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Wiki Link */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <a
            href={circuit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            View on Wikipedia <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircuitCard;
