'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { ChargingStation, UserProfile } from '@/lib/types';
import StationPin from './station-pin';
import { Skeleton } from '../ui/skeleton';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface MapViewProps {
  stations: ChargingStation[];
  userProfile: UserProfile;
  onSelectStation: (station: ChargingStation) => void;
}

const MapLoading = () => (
    <div className="w-full h-full bg-muted">
        <Skeleton className="w-full h-full" />
    </div>
)

export default function MapView({
  stations,
  userProfile,
  onSelectStation,
}: MapViewProps) {

  if (!API_KEY) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-muted text-center p-4">
        <h2 className="font-headline text-xl font-semibold text-foreground">
          Map Unavailable
        </h2>
        <p className="text-muted-foreground max-w-sm">
          Please add a `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to your environment variables to view the map.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} loading="async" render={MapLoading}>
      <Map
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={13}
        mapId="plugright_map_1"
        disableDefaultUI={true}
        gestureHandling="greedy"
        className="h-full w-full border-none"
      >
        {stations.map((station) => (
          <AdvancedMarker
            key={station.id}
            position={station.position}
            onClick={() => onSelectStation(station)}
          >
            <StationPin station={station} userProfile={userProfile} />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
