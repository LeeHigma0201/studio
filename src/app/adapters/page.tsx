import { adapters } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdaptersPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="font-headline text-2xl font-semibold">
          Adapter Recommendations
        </h1>
        <p className="text-muted-foreground">
          Unlock more charging stations with these recommended adapters.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adapters.map((adapter) => {
          const image = getPlaceholderImage(adapter.imageUrl);
          return (
            <Card key={adapter.id} className="flex flex-col">
              <CardHeader>
                {image && (
                  <div className="aspect-video relative mb-4">
                    <Image
                      src={image.imageUrl}
                      alt={adapter.name}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={adapter.imageHint}
                    />
                  </div>
                )}
                <CardTitle className="font-headline text-lg">
                  {adapter.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{adapter.from}</span>
                  <ExternalLink className="w-4 h-4" />
                  <span>{adapter.to}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">
                    {adapter.certification} Certified
                  </span>
                </div>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="flex justify-between items-center">
                <p className="text-2xl font-bold font-headline">${adapter.price}</p>
                <Button asChild>
                  <Link href={adapter.purchaseUrl} target="_blank">
                    Buy Now <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
