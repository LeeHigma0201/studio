import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  BatteryCharging,
  MapPin,
  Clock,
  CircleDollarSign,
  ShieldCheck,
} from 'lucide-react';

const mockRoute = [
  {
    stop: 1,
    name: 'Electrify America, Baker CA',
    chargeTo: 80,
    time: 22,
    cost: 18.5,
    success: 95,
  },
  {
    stop: 2,
    name: 'EVgo, Las Vegas South Outlets',
    chargeTo: 75,
    time: 18,
    cost: 15.2,
    success: 88,
  },
];

export default function RoutePage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="font-headline text-2xl font-semibold">
          Smart Route Planner
        </h1>
        <p className="text-muted-foreground">
          Enter your trip details to find the best charging stops.
        </p>
      </header>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" placeholder="e.g., Las Vegas, NV" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="soc">Current Battery %</Label>
            <Input id="soc" type="number" placeholder="e.g., 90" />
          </div>
          <Button className="w-full font-semibold">Plan My Route</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-xl font-semibold mb-4">
          Your Suggested Route
        </h2>
        <div className="space-y-4 relative">
          {/* Dotted line connecting stops */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border border-l-2 border-dashed" />
          
          <div className="flex items-center gap-4 pl-12">
            <div className="absolute left-0 w-10 h-10 bg-background flex items-center justify-center">
                <Car className="w-6 h-6 text-primary z-10" />
            </div>
            <div>
                <p className="font-semibold">Your Location</p>
                <p className="text-sm text-muted-foreground">Starting with 90% charge</p>
            </div>
          </div>
          
          {mockRoute.map((leg) => (
            <div key={leg.stop} className="pl-12">
              <Card>
                <CardHeader>
                    <div className="absolute left-0 w-10 h-10 bg-background flex items-center justify-center">
                        <BatteryCharging className="w-6 h-6 text-accent z-10" />
                    </div>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    Stop {leg.stop}: {leg.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Charge to{' '}
                      <span className="font-bold">{leg.chargeTo}%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>
                      <span className="font-bold">~{leg.time} min</span> charging
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Est. <span className="font-bold">${leg.cost}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <span>
                      <span className="font-bold">{leg.success}%</span> success
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="flex items-center gap-4 pl-12">
            <div className="absolute left-0 w-10 h-10 bg-background flex items-center justify-center">
                <MapPin className="w-6 h-6 text-destructive z-10" />
            </div>
            <div>
                <p className="font-semibold">Destination</p>
                <p className="text-sm text-muted-foreground">Arrive with ~15% charge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
