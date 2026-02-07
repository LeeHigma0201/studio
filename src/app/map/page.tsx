'use client';
import { useState } from 'react';
import { stations } from '@/lib/data';
import type { ChargingStation, UserProfile } from '@/lib/types';
import MapView from '@/components/map/map-view';
import StationDetailsSheet from '@/components/map/station-details-sheet';
import { vehicles, adapters as allAdapters } from '@/lib/data';

const mockUserProfile: UserProfile = {
  vehicle: vehicles[0], // Tesla Model Y
  adapters: [allAdapters[1]], // CCS to Tesla adapter
};

export default function MapPage() {
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(
    null
  );

  return (
    <div className="h-screen w-full">
      <div className="absolute inset-0">
        <MapView
          stations={stations}
          onSelectStation={setSelectedStation}
          userProfile={mockUserProfile}
        />
        <StationDetailsSheet
          station={selectedStation}
          userProfile={mockUserProfile}
          open={!!selectedStation}
          onOpenChange={(isOpen) => !isOpen && setSelectedStation(null)}
        />
      </div>
    </div>
  );
}
