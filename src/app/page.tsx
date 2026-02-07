import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PlugRightLogo from '@/components/icons/plugright-logo';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="p-8 max-w-md w-full text-center shadow-2xl">
        <div className="mx-auto w-20 h-20 mb-6">
          <PlugRightLogo />
        </div>
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">
          PlugRight
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
          Your universal EV charging companion. Find compatible stations, plan
          routes, and never worry about the right plug again.
        </p>
        <Button asChild size="lg" className="font-semibold text-base w-full">
          <Link href="/map">Enter App</Link>
        </Button>
      </Card>
    </div>
  );
}
