import type { ChargingStation, UserProfile, ConnectorType } from './types';

export type CompatibilityStatus = 'NATIVE' | 'ADAPTER' | 'INCOMPATIBLE';

export interface CompatibilityResult {
  status: CompatibilityStatus;
  connectors: {
    type: ConnectorType;
    adapterNeeded: boolean;
  }[];
}

export function getCompatibility(
  station: ChargingStation,
  userProfile: UserProfile | null
): CompatibilityResult {
  if (!userProfile?.vehicle) {
    return { status: 'INCOMPATIBLE', connectors: [] };
  }

  const vehicleConnectors = userProfile.vehicle.connectorType;
  const ownedAdapters = userProfile.adapters;
  const compatibleConnectors: CompatibilityResult['connectors'] = [];

  for (const stationConnector of station.connectors) {
    // Native check
    if (vehicleConnectors.includes(stationConnector.type)) {
      compatibleConnectors.push({
        type: stationConnector.type,
        adapterNeeded: false,
      });
      continue;
    }

    // Adapter check
    for (const adapter of ownedAdapters) {
      if (
        adapter.from === stationConnector.type &&
        vehicleConnectors.includes(adapter.to)
      ) {
        compatibleConnectors.push({
          type: stationConnector.type,
          adapterNeeded: true,
        });
        break; 
      }
    }
  }

  if (compatibleConnectors.some((c) => !c.adapterNeeded)) {
    return { status: 'NATIVE', connectors: compatibleConnectors };
  }
  if (compatibleConnectors.length > 0) {
    return { status: 'ADAPTER', connectors: compatibleConnectors };
  }

  return { status: 'INCOMPATIBLE', connectors: [] };
}
