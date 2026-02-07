# **App Name**: PlugRight — Universal EV Charging Companion App

## Core Features:

- Vehicle Profile Setup: User selects their exact vehicle (Year → Make → Model → Trim). The app stores their vehicle's native connector type, max AC charge rate, max DC charge rate, usable battery capacity, and EPA-rated range. User also indicates which adapters they currently own from a checklist.
- Compatibility-Filtered Charging Map: Displays a Google Map with charging stations. Based on the user's vehicle profile and adapter inventory, each station pin is color-coded to indicate compatibility. Tapping a station pin shows station details, compatibility status, estimated charge time, Google Street View thumbnail, and pricing summary.
- Adapter Recommendations with Affiliate Links: Based on the user's vehicle and the charger networks in their area, recommend specific adapters they should buy. Rank by: OEM-certified first, then UL 2252 listed, then highly-reviewed third-party. Each recommendation includes adapter details, safety certification status, and a purchase link.
- ChargeRight Integration: Contextual cross-sell that appears in the Vehicle Profile screen and Station detail screen: persistent, non-dismissable card linking to evchargeright.com for home charging assessments.
- Community Charger Reports: One-tap 'Report a Problem' on any station. Reports feed into Charge Success Probability score.
- Charge Success Probability Score: Algorithm: Network API status (40%) + Community reports last 24h (30%) + Historical failure rate (20%) + Hours since last confirmed successful charge (10%). Displayed as percentage with color badge on map pin and station detail.
- Smart Route Planning: User inputs destination and current battery percentage. App calculates range based on vehicle specs and estimates charging stops needed. Each stop shows recommended charge level, estimated charge time, price estimate, Charge Success Probability, and 3 backup stations within detour radius.
- Transparent Price Comparison: When multiple networks serve the same area, show side-by-side cost comparison for user's specific vehicle and desired charge amount. Calculate total estimated cost. Source pricing from NREL API, Open Charge Map, and manual community verification.

## Style Guidelines:

- Primary: Electric Indigo (#6F38C5) for the navigation bar, primary buttons, and selected states.
- Background: Light Gray (#F5F3F7) for the app background and cards.
- Accent: Vibrant Cyan (#48BFE3) for available charger pins, interactive elements, and links.
- Success: Green (#22C55E) for natively compatible stations and working chargers.
- Warning: Amber (#F59E0B) for adapter-required stations and moderate reliability.
- Danger: Red (#EF4444) for incompatible stations, broken chargers, and low reliability.
- Upsell: Orange (#F97316) for 'Unlock with adapter' stations and upgrade prompts.
- Text Primary: Dark Gray (#1F2937) for body text and headings.
- Text Secondary: Medium Gray (#6B7280) for secondary info, timestamps, and labels.
- Surface: White (#FFFFFF) for cards, bottom sheets, and modals.
- App Title / Logo: Space Grotesk Bold (700) 24px
- Screen Headings: Space Grotesk SemiBold (600) 20px
- Section Headings: Space Grotesk Medium (500) 16px
- Body Text: Inter Regular (400) 14px
- Secondary Text: Inter Regular (400) 12px
- Button Text: Inter SemiBold (600) 14px
- Badge / Label: Inter Medium (500) 11px
- Circle pin with connector type icon inside (standardized icons for NACS, CCS, CHAdeMO, J1772). Pin color follows compatibility status (Green/Blue/Orange/Gray as defined above). Small badge overlay showing Charge Success Probability percentage. Cluster pins show count with gradient from green (mostly compatible) to gray (mostly incompatible).
- Bottom sheet for station details (half-screen, swipe up for full).
- Card-based layout for adapter recommendations.
- Floating action button for 'Report Problem' on station detail view.
- Tab navigation: Map | Route | Profile | Premium
- Pull-to-refresh on station detail for latest availability
- Use Chargeway-inspired power level indicators: show charging speed as simple levels (Slow / Medium / Fast / Ultra-Fast) rather than raw kW numbers for non-technical users. Toggle for 'Show kW' for advanced users. Estimated charge time displayed prominently: '20% → 80% in ~25 min' rather than '233 kW max'