"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Map, Waypoints, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/map', label: 'Map', icon: Map },
  { href: '/route', label: 'Route', icon: Waypoints },
  { href: '/adapters', label: 'Adapters', icon: Zap },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full">{children}</div>
      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-transparent pointer-events-none z-40" style={{background: 'linear-gradient(to top, hsl(var(--background)), transparent)'}} />
      )}
      {showNav && (
        <footer className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <nav className="flex justify-around items-center h-16 max-w-md mx-auto bg-card/80 backdrop-blur-lg border rounded-full shadow-lg">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex flex-col items-center justify-center w-full h-full text-secondary-foreground transition-colors rounded-full',
                    isActive ? 'text-primary' : 'hover:text-primary'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium font-body">{label}</span>
                </Link>
              );
            })}
          </nav>
        </footer>
      )}
    </div>
  );
}
