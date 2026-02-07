'use client';
import { useMemo } from 'react';
import type { ChargingStation, UserProfile, ConnectorType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getCompatibility } from '@/lib/compatibility';
import ConnectorIcon from '@/components/icons/connector-icons';

interface StationPinProps {
  station: ChargingStation;
  userProfile: UserProfile | null;
}

export default function StationPin({ station, userProfile }: StationPinProps) {
  const compatibility = useMemo(
    () => getCompatibility(station, userProfile),
    [station, userProfile]
  );

  const { colorClass, primaryConnector } = useMemo(() => {
    const firstAvailableConnector =
      station.connectors.find((c) => c.status === 'Available')?.type ||
      station.connectors[0]?.type;

    switch (compatibility.status) {
      case 'NATIVE':
        return {
          colorClass: 'bg-success',
          primaryConnector:
            compatibility.connectors.find((c) => !c.adapterNeeded)?.type ||
            firstAvailableConnector,
        };
      case 'ADAPTER':
        return {
          colorClass: 'bg-warning',
          primaryConnector:
            compatibility.connectors[0]?.type || firstAvailableConnector,
        };
      case 'INCOMPATIBLE':
        return {
          colorClass: 'bg-destructive',
          primaryConnector: firstAvailableConnector,
        };
      default:
        return {
          colorClass: 'bg-muted-foreground',
          primaryConnector: firstAvailableConnector,
        };
    }
  }, [compatibility, station.connectors]);

  const scoreColor =
    station.chargeSuccessScore > 80
      ? 'bg-success'
      : station.chargeSuccessScore > 50
      ? 'bg-warning'
      : 'bg-destructive';

  return (
    <button className="transform transition-transform hover:scale-110 focus:outline-none">
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 border-white/50',
          colorClass
        )}
      >
        <ConnectorIcon
          type={primaryConnector}
          className="w-6 h-6 text-white"
        />
        <div
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center text-[10px] font-bold text-white rounded-full h-5 w-5 border-2 border-white/50',
            scoreColor
          )}
        >
          {station.chargeSuccessScore}
        </div>
      </div>
    </button>
  );
}
