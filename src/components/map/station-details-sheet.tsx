'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquareWarning,
  Zap,
  ZapOff,
} from 'lucide-react';
import type {
  ChargingStation,
  Connector,
  UserProfile,
} from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { getCompatibility } from '@/lib/compatibility';
import ConnectorIcon from '../icons/connector-icons';
import { ChargeRightCard } from '../charge-right-card';
import { useToast } from '@/hooks/use-toast';

interface StationDetailsSheetProps {
  station: ChargingStation | null;
  userProfile: UserProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getPowerLevel = (power: number) => {
  if (power < 10) return { label: 'Slow', color: 'bg-blue-500' };
  if (power < 75) return { label: 'Medium', color: 'bg-cyan-500' };
  if (power < 200) return { label: 'Fast', color: 'bg-green-500' };
  return { label: 'Ultra-Fast', color: 'bg-indigo-500' };
};

const getScoreColor = (score: number) => {
  if (score > 80) return 'bg-success text-success-foreground';
  if (score > 50) return 'bg-warning text-warning-foreground';
  return 'bg-destructive text-destructive-foreground';
};

const CompatibilityBadge = ({ station, userProfile }: { station: ChargingStation, userProfile: UserProfile | null }) => {
    const compatibility = getCompatibility(station, userProfile);
    
    switch (compatibility.status) {
        case 'NATIVE':
            return <Badge variant="default" className="bg-success hover:bg-success"> <CheckCircle className="mr-2 h-4 w-4" />Natively Compatible</Badge>
        case 'ADAPTER':
            return <Badge variant="default" className="bg-warning hover:bg-warning"> <AlertTriangle className="mr-2 h-4 w-4" />Adapter Required</Badge>
        default:
            return <Badge variant="destructive"> <ZapOff className="mr-2 h-4 w-4" />Incompatible</Badge>
    }
}

export default function StationDetailsSheet({
  station,
  userProfile,
  open,
  onOpenChange,
}: StationDetailsSheetProps) {
  const { toast } = useToast();

  if (!station) return null;

  const image = getPlaceholderImage(station.streetViewImageUrl);

  const handleReport = () => {
    toast({
      title: "Problem Reported",
      description: "Thank you for helping keep our data accurate!",
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full max-w-2xl mx-auto h-[90vh] rounded-t-2xl p-0"
      >
        <ScrollArea className="h-full">
          <div className="relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={`Street view of ${station.name}`}
                width={800}
                height={400}
                className="w-full h-48 object-cover rounded-t-2xl"
                data-ai-hint={station.streetViewImageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>

          <div className="p-6 pt-2 relative -mt-12">
            <SheetHeader className="text-left mb-4">
              <SheetTitle className="font-headline text-2xl">{station.name}</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {station.address}
              </SheetDescription>
              <div className="pt-2 flex flex-wrap gap-2">
                <CompatibilityBadge station={station} userProfile={userProfile} />
                <Badge variant="outline" className={cn("font-semibold", getScoreColor(station.chargeSuccessScore))}>
                    Charge Success: {station.chargeSuccessScore}%
                </Badge>
              </div>
            </SheetHeader>

            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline text-lg">Connectors Available</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {station.connectors.map((connector: Connector, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ConnectorIcon type={connector.type} className="w-8 h-8 text-primary" />
                                        <div>
                                            <p className="font-semibold">{connector.type}</p>
                                            <p className="text-sm text-muted-foreground">{connector.power} kW</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={cn("w-24 justify-center", getPowerLevel(connector.power).color)}>{getPowerLevel(connector.power).label}</Badge>
                                        <Badge variant={connector.status === 'Available' ? 'default' : 'secondary'} className={cn('w-24 justify-center', connector.status === 'Available' && 'bg-accent text-accent-foreground')}>{connector.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Pricing & Time</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Est. 20% → 80%</p>
                      <p className="text-xl font-bold font-headline">~25 min</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-px font-bold">$</span>
                    <div>
                      <p className="font-semibold">Est. Cost</p>
                      <p className="text-muted-foreground">{station.pricing}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ChargeRightCard />

              <div className="flex gap-4">
                <Button variant="outline" className="w-full">
                  Directions <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleReport}>
                  Report a Problem <MessageSquareWarning className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
