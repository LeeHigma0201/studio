import type { ConnectorType } from '@/lib/types';
import React from 'react';

const NacsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    <path d="M6 7h1a2 2 0 0 1 2 2v1" />
    <path d="M12 11h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3" />
    <path d="M12 7v10" />
  </svg>
);

const CcsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 14.25c0 .966.784 1.75 1.75 1.75h6.5c.966 0 1.75-.784 1.75-1.75v-4.5C17 8.784 16.216 8 15.25 8h-6.5C7.784 8 7 8.784 7 9.75v4.5z" />
    <circle cx="8.5" cy="18.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="18.5" r="1.5" fill="currentColor" />
  </svg>
);

const ChademoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14 10H8V14h6" />
    <path d="M12 7v8" />
    <path d="M16 10v4" />
  </svg>
);

const J1772Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 10h10a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a1 1 0 011-1z" />
    <path d="M12 14v4" />
  </svg>
);

const icons: Record<ConnectorType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  NACS: NacsIcon,
  CCS: CcsIcon,
  CHAdeMO: ChademoIcon,
  J1772: J1772Icon,
};

const ConnectorIcon = ({ type, ...props }: { type: ConnectorType } & React.SVGProps<SVGSVGElement>) => {
  const Icon = icons[type];
  if (!Icon) return null;
  return <Icon {...props} />;
};

export default ConnectorIcon;
