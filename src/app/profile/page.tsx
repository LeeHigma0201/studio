import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { vehicles, adapters } from '@/lib/data';
import type { UserProfile } from '@/lib/types';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Battery, Check, Gauge, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChargeRightCard } from '@/components/charge-right-card';
import { Button } from '@/components/ui/button';

// Mock user profile for demonstration
const userProfile: UserProfile = {
  vehicle: vehicles[0],
  adapters: [adapters[1]],
};

const StatItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-muted-foreground" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default function ProfilePage() {
  const { vehicle, adapters: ownedAdapters } = userProfile;
  const vehicleImage = getPlaceholderImage(vehicle?.imageUrl);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header>
        <h1 className="font-headline text-2xl font-semibold">My Profile</h1>
        <p className="text-muted-foreground">
          Your vehicle and adapter settings.
        </p>
      </header>

      {vehicle && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">My Vehicle</CardTitle>
            <CardDescription>
              {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {vehicleImage && (
              <div className="aspect-video relative">
                <Image
                  src={vehicleImage.imageUrl}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="rounded-lg object-cover"
                  data-ai-hint={vehicleImage.imageHint}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <StatItem icon={Zap} label="DC Charge Rate" value={`${vehicle.maxDcChargeRate} kW`} />
              <StatItem icon={Zap} label="AC Charge Rate" value={`${vehicle.maxAcChargeRate} kW`} />
              <StatItem icon={Battery} label="Battery Size" value={`${vehicle.batteryCapacity} kWh`} />
              <StatItem icon={Gauge} label="EPA Range" value={`${vehicle.range} miles`} />
            </div>
            <Button className="w-full">Change Vehicle</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">My Adapters</CardTitle>
          <CardDescription>Adapters you own for extended compatibility.</CardDescription>
        </CardHeader>
        <CardContent>
          {ownedAdapters.length > 0 ? (
            <ul className="space-y-3">
              {ownedAdapters.map((adapter) => (
                <li key={adapter.id} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success" />
                  <span>
                    {adapter.name} ({adapter.from} to {adapter.to})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              You haven't added any adapters yet.
            </p>
          )}
           <Button variant="outline" className="w-full mt-4">Manage Adapters</Button>
        </CardContent>
      </Card>

      <ChargeRightCard />
    </div>
  );
}
