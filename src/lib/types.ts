export type ConnectorType = 'NACS' | 'CCS' | 'CHAdeMO' | 'J1772';

export interface Vehicle {
  id: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  connectorType: ConnectorType[];
  maxAcChargeRate: number; // in kW
  maxDcChargeRate: number; // in kW
  batteryCapacity: number; // in kWh
  range: number; // in miles
  imageUrl: string;
}

export interface Adapter {
  id: number;
  name: string;
  from: ConnectorType;
  to: ConnectorType;
  certification: 'OEM' | 'UL 2252' | 'Third-Party';
  price: number;
  purchaseUrl: string;
  imageUrl: string;
  imageHint: string;
}

export interface Connector {
  type: ConnectorType;
  power: number; // in kW
  status: 'Available' | 'InUse' | 'OutOfOrder';
}

export interface ChargingStation {
  id: number;
  name: string;
  address: string;
  position: { lat: number; lng: number };
  connectors: Connector[];
  chargeSuccessScore: number; // 0-100
  pricing: string;
  streetViewImageUrl: string;
  streetViewImageHint: string;
}

export interface UserProfile {
  vehicle: Vehicle | null;
  adapters: Adapter[];
}
