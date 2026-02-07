import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function ChargeRightCard() {
  return (
    <Card className="bg-gradient-to-br from-upsell to-yellow-500 text-white shadow-lg">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-headline font-semibold">Charging at Home?</h3>
            <p className="text-sm text-white/90">Get a free assessment.</p>
          </div>
        </div>
        <Button asChild variant="secondary" size="sm" className="bg-white text-upsell-foreground hover:bg-white/90">
          <Link href="https://evchargeright.com" target="_blank" rel="noopener noreferrer">
            Learn More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
