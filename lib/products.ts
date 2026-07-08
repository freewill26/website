import type { Product, RelatedType } from "@/types/product";

/**
 * Product-type catalogue (Taraflex® family).
 *
 * In a production app this would come from a CMS or API; it lives here as a
 * typed, in-memory record keyed by product code so pages stay fully static.
 */
export const PRODUCTS: Record<string, Product> = {
  "TFX-01": {
    code: "TFX-01",
    category: "VINYL SPORTS FLOORING",
    name: "Sport M Performance",
    nameL1: "Sport M",
    nameL2: "Performance",
    swatch: "#C9442E",
    tagline:
      "The competition surface specified by FIBA, FIVB and BWF for elite indoor sport — engineered to cushion athletes and accelerate ball response simultaneously.",
    description:
      "Taraflex® Sport M Performance is Gerflor's flagship competition vinyl, developed with and for professional sports federations. Its point-elastic P1 structure absorbs impact precisely where the foot lands, delivering ≥53% force reduction while maintaining the lively ball bounce that elite athletes demand.",
    description2:
      "Every roll is manufactured to ISO 9001 at Gerflor's Reyrieux plant. The polyurethane-reinforced wear layer is antibacterial and low-VOC. Suitable for multi-sport court marking using Taraflex® validated inks. Available in 29 colourways including solid and wood-effect decors.",
    keyStats: [
      { label: "THICKNESS", value: "9.0 mm" },
      { label: "FORCE REDUCTION", value: "≥53%" },
      { label: "BALL REBOUND", value: "94%" },
      { label: "VERTICAL DEFORMATION", value: "2.3 mm" },
    ],
    highlights: [
      { tag: "PERFORMANCE", title: "Point-Elastic P1 Class", detail: "Cushioning precisely at the footfall point — no wasted energy, no energy return into joints." },
      { tag: "PROTECTION", title: "≥53% Force Reduction", detail: "Exceeds EN 14904 Category P1 minimum, protecting knees and ankles across the full career." },
      { tag: "BALL", title: "94% Ball Rebound", detail: "Consistent vertical rebound from every court zone — no dead spots, no surprises." },
      { tag: "SURFACE", title: "Antibacterial PU Topcoat", detail: "Certified SIAA antibacterial protection built into the wear layer, not a surface treatment." },
      { tag: "ENVIRONMENT", title: "Low VOC · Indoor Air Quality", detail: "FloorScore certified, contributing to LEED and BREEAM healthy-building credits." },
      { tag: "DURABILITY", title: "20-Year Expected Lifespan", detail: "Heavy-duty 0.7 mm PU wear layer tested to 1.5M abrasion cycles under tournament footfall." },
    ],
    specs: [
      { label: "Total Thickness", value: "9.0 mm" },
      { label: "Wear Layer", value: "0.7 mm PU reinforced" },
      { label: "Weight", value: "5,800 g/m²" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Roll Length", value: "20 m (40 m² per roll)" },
      { label: "Force Reduction", value: "≥53% (EN 14904 P1)" },
      { label: "Vertical Deformation", value: "2.3 mm" },
      { label: "Ball Rebound", value: "94%" },
      { label: "Slip Resistance", value: "≥80 µ (EN 13036-4)" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
      { label: "Anti-Static", value: "ESD < 2kV" },
    ],
    certs: ["FIBA Level 1", "FIVB Approved", "BWF Approved", "EN 14904 P1", "FloorScore", "ISO 14001"],
  },
  "TFX-02": {
    code: "TFX-02",
    category: "VINYL SPORTS FLOORING",
    name: "Sport M Comfort",
    nameL1: "Sport M",
    nameL2: "Comfort",
    swatch: "#2F6BFF",
    tagline:
      "Higher-cushion build for training facilities, academies and multi-use halls — prioritising joint protection over maximum ball response.",
    description:
      "Taraflex® Sport M Comfort uses a thicker foam-backed structure to deliver superior shock absorption for training environments where athletes spend long hours on court daily. It absorbs 45% of vertical force — above the EN 14904 P1 threshold — with a marginally softer underfoot feel than Performance.",
    description2:
      "Ideal for national academies, university sports centres and multi-purpose halls where high daily footfall demands a forgiving surface. Same antibacterial PU topcoat as Performance; available in 22 colourways.",
    keyStats: [
      { label: "THICKNESS", value: "7.0 mm" },
      { label: "FORCE REDUCTION", value: "≥45%" },
      { label: "BALL REBOUND", value: "91%" },
      { label: "VERTICAL DEFORMATION", value: "1.9 mm" },
    ],
    highlights: [
      { tag: "COMFORT", title: "Higher Foam Density Core", detail: "Denser foam layer distributes load over a wider area, reducing cumulative joint stress in training." },
      { tag: "PROTECTION", title: "≥45% Force Reduction", detail: "Engineered for athletes training 4+ hours per day across multiple sessions." },
      { tag: "VERSATILITY", title: "Multi-Sport Ready", detail: "Pre-validated for badminton, basketball, volleyball and handball court line-marking." },
      { tag: "SURFACE", title: "Antibacterial PU Topcoat", detail: "Same SIAA-certified antibacterial protection as the Performance range." },
      { tag: "COST", title: "Optimised Value", detail: "Lower entry price than Performance while meeting all P1 federation standards for training use." },
      { tag: "MAINTENANCE", title: "Easy-Clean Topcoat", detail: "Smooth PU surface resists dirt ingress — maintained with weekly dry mopping and periodic wet wash." },
    ],
    specs: [
      { label: "Total Thickness", value: "7.0 mm" },
      { label: "Wear Layer", value: "0.65 mm PU reinforced" },
      { label: "Weight", value: "5,100 g/m²" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Roll Length", value: "20 m" },
      { label: "Force Reduction", value: "≥45% (EN 14904 P1)" },
      { label: "Vertical Deformation", value: "1.9 mm" },
      { label: "Ball Rebound", value: "91%" },
      { label: "Slip Resistance", value: "≥80 µ (EN 13036-4)" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
      { label: "Anti-Static", value: "ESD < 2kV" },
    ],
    certs: ["EN 14904 P1", "BWF Training Approved", "FloorScore", "ISO 14001"],
  },
  "TFX-03": {
    code: "TFX-03",
    category: "VINYL SPORTS FLOORING",
    name: "Evolution",
    nameL1: "Evolution",
    nameL2: "",
    swatch: "#1FA95B",
    tagline:
      "The all-round surface: balanced grip, comfort, durability and price — the most installed Taraflex® globally for a reason.",
    description:
      "Taraflex® Evolution is the world's most installed vinyl sports surface. Its 6.2 mm structure balances point-elastic cushioning, consistent ball rebound and a hard-wearing topcoat into one product that performs across all indoor court sports.",
    description2:
      "Specified for school halls, leisure centres, community sports facilities and club-level competition venues. A single roll width covers court width — minimising seams. 35 colourways available.",
    keyStats: [
      { label: "THICKNESS", value: "6.2 mm" },
      { label: "FORCE REDUCTION", value: "≥35%" },
      { label: "BALL REBOUND", value: "88%" },
      { label: "VERTICAL DEFORMATION", value: "1.5 mm" },
    ],
    highlights: [
      { tag: "VERSATILITY", title: "Global #1 Installed Surface", detail: "Trusted in 115+ countries across all indoor court sports for over 40 years." },
      { tag: "PERFORMANCE", title: "Balanced Force Reduction", detail: "35% force reduction suitable for leisure, education and club competition." },
      { tag: "DURABILITY", title: "0.65 mm PU Wear Layer", detail: "Resists heavy footfall, equipment rolling and chair abrasion in multi-use venues." },
      { tag: "COLOUR", title: "35 Colourways", detail: "Widest colour range in the family, including traditional wood-effect patterns." },
      { tag: "INSTALLATION", title: "Full-Roll Court Width", detail: "Standard 2.0 m roll placed seam-free within a badminton court boundary." },
      { tag: "COST", title: "Best-Value Entry Point", detail: "Lowest cost-per-m² in the Taraflex family without sacrificing federation approval." },
    ],
    specs: [
      { label: "Total Thickness", value: "6.2 mm" },
      { label: "Wear Layer", value: "0.65 mm PU reinforced" },
      { label: "Weight", value: "4,500 g/m²" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Roll Length", value: "20 m" },
      { label: "Force Reduction", value: "≥35% (EN 14904 P1)" },
      { label: "Vertical Deformation", value: "1.5 mm" },
      { label: "Ball Rebound", value: "88%" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
    ],
    certs: ["EN 14904 P1", "BWF Approved", "FloorScore", "ISO 9001"],
  },
  "TFX-04": {
    code: "TFX-04",
    category: "VINYL SPORTS FLOORING",
    name: "Badminton",
    nameL1: "Taraflex",
    nameL2: "Badminton",
    swatch: "#E08A1E",
    tagline:
      "BWF-approved surface engineered specifically for shuttle control, low-glare vision and the side-to-side loading pattern of elite badminton.",
    description:
      "Taraflex® Badminton is a dedicated court surface built around the biomechanical demands of the sport. Its calibrated surface texture delivers consistent shuttle-grip for serving and controlled rebound after the serve — without the high-friction feel that fatigues ankle lateral movement.",
    description2:
      "The colour palette is selected for low contrast glare under LED shuttlecourt lighting. Available in BWF competition green/yellow and neutral grey. Approved for use at BWF World Championships and Thomas & Uber Cup.",
    keyStats: [
      { label: "THICKNESS", value: "7.5 mm" },
      { label: "SHUTTLE GRIP", value: "Calibrated" },
      { label: "GLARE REDUCTION", value: "Low reflectance" },
      { label: "BWF APPROVAL", value: "Level 1" },
    ],
    highlights: [
      { tag: "SHUTTLE", title: "Calibrated Surface Texture", detail: "Grain engineered to control shuttle contact angle — consistent serve and service-return patterns." },
      { tag: "VISION", title: "Low-Glare PU Topcoat", detail: "Matte finish eliminates LED light scatter in dedicated shuttle halls." },
      { tag: "MOVEMENT", title: "Lateral-Load Optimised", detail: "Side-step shock absorption tuned for the wide, fast lateral movement pattern of badminton." },
      { tag: "APPROVAL", title: "BWF Level 1 Certified", detail: "Approved for World Championships, All-England, Thomas & Uber Cup and national open events." },
      { tag: "COLOUR", title: "Competition Palette", detail: "BWF green/yellow and neutral competition grey — no custom colours to protect shuttle visibility." },
      { tag: "LINE MARKING", title: "Pre-Integrated Lines", detail: "Lines inlaid at factory rather than painted — no peeling edges, no tape trip hazards." },
    ],
    specs: [
      { label: "Total Thickness", value: "7.5 mm" },
      { label: "Wear Layer", value: "0.65 mm calibrated-texture PU" },
      { label: "Weight", value: "5,200 g/m²" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Shuttle Grip", value: "Calibrated low-friction" },
      { label: "Force Reduction", value: "≥40% (EN 14904 P1)" },
      { label: "Reflectance (Gloss)", value: "< 20 GU (low)" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
    ],
    certs: ["BWF Level 1", "EN 14904 P1", "FloorScore", "ISO 9001"],
  },
  "TFX-05": {
    code: "TFX-05",
    category: "VINYL SPORTS FLOORING",
    name: "Bateco",
    nameL1: "Taraflex",
    nameL2: "Bateco",
    swatch: "#8FBD1A",
    tagline:
      "Heavy-traffic multi-sport build for high-use community centres, leisure facilities and school halls that need durability above all else.",
    description:
      "Taraflex® Bateco is the heavy-duty member of the family — a thicker, denser structure built to withstand heavy chairs, trolleys, exhibition traffic and the full range of indoor sports, all in the same space. Its 8.0 mm build provides superior puncture and indent resistance.",
    description2:
      "Where Evolution is the performance all-rounder and Comfort prioritises athlete cushioning, Bateco prioritises operational longevity in multi-use environments. Approved for recreational badminton and multi-sport use.",
    keyStats: [
      { label: "THICKNESS", value: "8.0 mm" },
      { label: "FORCE REDUCTION", value: "≥38%" },
      { label: "INDENT RESISTANCE", value: "Heavy-duty" },
      { label: "USE CLASS", value: "Multi-use hall" },
    ],
    highlights: [
      { tag: "DURABILITY", title: "Heavy-Traffic Build", detail: "Tested to withstand 300 kg point loads — safe for stacked chairs, trolleys and exhibition equipment." },
      { tag: "PERFORMANCE", title: "≥38% Force Reduction", detail: "Suitable for recreational sport and community fitness activities." },
      { tag: "SURFACE", title: "Hardened PU Topcoat", detail: "Wear layer formulated for high abrasion resistance under non-sports footwear and equipment." },
      { tag: "INDENT", title: "Permanent Indent Resistant", detail: "Foam layer formulated to recover from heavy static loads overnight — no permanent impressions." },
      { tag: "MAINTENANCE", title: "Easy Maintenance", detail: "Machine-scrubbable surface — compatible with standard industrial floor-cleaning equipment." },
      { tag: "LIFESPAN", title: "25-Year Expected Life", detail: "Highest longevity in the family under multi-use conditions." },
    ],
    specs: [
      { label: "Total Thickness", value: "8.0 mm" },
      { label: "Wear Layer", value: "0.7 mm hardened PU" },
      { label: "Weight", value: "5,600 g/m²" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Force Reduction", value: "≥38% (EN 14904 P1)" },
      { label: "Indent Load Resistance", value: "300 kg point load" },
      { label: "Machine-Scrubbable", value: "Yes" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
    ],
    certs: ["EN 14904 P1", "FloorScore", "ISO 9001"],
  },
  "TFX-06": {
    code: "TFX-06",
    category: "VINYL SPORTS FLOORING",
    name: "Decibel Acoustic",
    nameL1: "Decibel",
    nameL2: "Acoustic",
    swatch: "#5FD0E0",
    tagline:
      "Acoustic-dampening build that cuts impact sound transmission by 19 dB — for sports halls stacked above occupied spaces.",
    description:
      "Taraflex® Decibel is an acoustically-engineered surface built for multi-storey facilities where the sports hall sits above offices, classrooms or residential areas. Its dual-layer structure separates the playing surface from the sub-floor acoustically, cutting footfall impact noise transmission by 19 dB.",
    description2:
      "Meets the most stringent building-regulation requirements for impact sound in mixed-use developments. Delivers full EN 14904 P1 sports performance on the playing surface, with the acoustic layer invisible to the athlete.",
    keyStats: [
      { label: "THICKNESS", value: "10.5 mm" },
      { label: "IMPACT SOUND REDUCTION", value: "19 dB" },
      { label: "FORCE REDUCTION", value: "≥50%" },
      { label: "USE CASE", value: "Stacked venues" },
    ],
    highlights: [
      { tag: "ACOUSTIC", title: "19 dB Impact Sound Reduction", detail: "Dual-layer acoustic isolation tested to ISO 10140 — compliant with the strictest building regulations." },
      { tag: "PERFORMANCE", title: "Full P1 Sports Performance", detail: "Despite the acoustic layer, delivers competition-grade force reduction and ball response." },
      { tag: "STRUCTURE", title: "Floating Acoustic Layer", detail: "Secondary foam layer decouples playing surface from structural slab — no hard paths for vibration." },
      { tag: "BUILDING", title: "BREEAM / LEED Credit Eligible", detail: "Acoustic performance contributes to occupant-comfort credits in green-building assessments." },
      { tag: "THICKNESS", title: "10.5 mm Total Build", detail: "Thicker build requires coordination with door thresholds and adjacent finishes in new-build." },
      { tag: "APPLICATIONS", title: "Multi-Storey Sports Venues", detail: "Designed for rooftop sports decks, podium-level gyms and upper-floor court facilities." },
    ],
    specs: [
      { label: "Total Thickness", value: "10.5 mm" },
      { label: "Playing Layer Thickness", value: "6.2 mm (Evolution grade)" },
      { label: "Acoustic Layer Thickness", value: "4.3 mm" },
      { label: "Impact Sound Reduction", value: "19 dB ΔLw (ISO 10140)" },
      { label: "Weight", value: "6,800 g/m²" },
      { label: "Force Reduction", value: "≥50%" },
      { label: "Roll Width", value: "2.0 m" },
      { label: "Fire Classification", value: "Bfl–s1 (EN 13501)" },
    ],
    certs: ["EN 14904 P1", "ISO 10140 Acoustic", "FloorScore", "BREEAM eligible", "ISO 14001"],
  },
  "FLDB-01": {
    code: "FLDB-01",
    category: "SEATING & STADIUM",
    name: "Standard Stepped Bleacher",
    nameL1: "Standard Stepped",
    nameL2: "Bleacher",
    swatch: "#2F6BFF",
    tagline: "Manual push-back telescopic bleacher system engineered for rapid multi-sport hall transformations and spectator safety.",
    description: "The Freewill Standard Stepped Bleacher (FLDB-01) is engineered specifically for school gyms, university halls, and municipal sports arenas across India. Featuring heavy-duty cold-rolled steel framing and UV-stabilized high-density polypropylene seating modules, this 4-12 tier retractable system allows a single operator to expand or retract spectator seating in under 3 minutes.",
    description2: "Manufactured in Pune under ISO 9001 quality controls, all structural steel elements are hot-dip galvanized and powder-coated for corrosion resistance. Non-marking polyurethane wheels distribute floor loads evenly to protect indoor sports surfaces including vinyl, maple, and polyurethane floors.",
    keyStats: [
      { label: "TREAD DEPTH", value: "850 mm" },
      { label: "RISER HEIGHT", value: "350 mm" },
      { label: "SAFETY SPEC", value: "EN 13200" },
      { label: "RETRACTION TIME", value: "< 3 mins" },
    ],
    highlights: [
      { tag: "FLEXIBILITY", title: "Telescopic Nesting System", detail: "Folds flat against venue perimeter walls, freeing 90% of floor space." },
      { tag: "SAFETY", title: "EN 13200 Structural Spec", detail: "Certified structural load capacity exceeding 5.0 kN/m² for live crowd safety." },
      { tag: "PROTECTION", title: "Non-Marking Poly Wheels", detail: "Polyurethane wheel treads protect vinyl and hardwood timber courts." },
      { tag: "MATERIALS", title: "UV-Stable Polymer Shells", detail: "High-impact polypropylene seat shells resistant to UV degradation and impact." },
      { tag: "OPERATION", title: "Low-Friction Bearings", detail: "Heavy-duty sealed roller bearings ensure smooth manual push-back." },
      { tag: "WARRANTY", title: "10-Year Substructure Warranty", detail: "Structural steel framing backed by a 10-year manufacturer warranty." },
    ],
    specs: [
      { label: "System Type", value: "Manual Retractable Stepped Bleacher" },
      { label: "Seat Module", value: "High-Density Polypropylene (HDPE)" },
      { label: "Tread Depth", value: "850 mm" },
      { label: "Riser Height", value: "350 mm" },
      { label: "Live Load Capacity", value: "≥ 5.0 kN/m² (EN 13200-1)" },
      { label: "Frame Construction", value: "Hot-dip galvanized & powder-coated steel" },
      { label: "Wheel System", value: "Non-marking polyurethane with double ball bearings" },
      { label: "Standard Decking", value: "18mm exterior-grade plywood with anti-slip phenolic coating" },
      { label: "Aisle Width", value: "1,100 mm with safety handrails" },
      { label: "Fire Classification", value: "Class B-s1, d0 flame retardant" },
    ],
    certs: ["EN 13200 Certified", "ISO 9001:2015", "CE Mark", "Made in India", "FloorSafe Guard"],
  },
  "FLDB-02": {
    code: "FLDB-02",
    category: "SEATING & STADIUM",
    name: "Motorized Power Bleacher",
    nameL1: "Motorized Power",
    nameL2: "Bleacher",
    swatch: "#C9442E",
    tagline: "Automated push-button telescopic grandstand system for large arenas and stadium halls.",
    description: "The Freewill Motorized Power Bleacher (FLDB-02) integrates dual electric drive motors with automated friction wheels to deploy large-capacity spectator seating at the touch of a wireless remote pendant.",
    description2: "Built with integrated limit sensors, automatic safety locks, and synchronous drive shafts, this system ensures whisper-quiet, jam-free deployment even on high-capacity 16-row configurations.",
    keyStats: [
      { label: "DRIVE MOTOR", value: "3-Phase Electric" },
      { label: "DEPLOYMENT TIME", value: "< 90 seconds" },
      { label: "CAPACITY", value: "Up to 2,500 Seats" },
      { label: "CONTROL", value: "Wireless Remote" },
    ],
    highlights: [
      { tag: "AUTOMATION", title: "Push-Button Drive", detail: "Deploy or retract 1,000+ seats in under 90 seconds with zero manual labor." },
      { tag: "SYNCHRONIZATION", title: "Dual-Motor Tracking", detail: "Electronic synchronization ensures true straight-line tracking during movement." },
      { tag: "SAFETY", title: "Auto-Lock Sensors", detail: "Integrated safety limit switches and mechanical auto-lock latches." },
      { tag: "CUSTOMIZATION", title: "Arena Color Matching", detail: "Seat shells and side curtains color-matched to club branding." },
    ],
    specs: [
      { label: "System Type", value: "Motorized Retractable Grandstand" },
      { label: "Motor Spec", value: "Dual 1.5 kW 3-Phase Electric Gear Motors" },
      { label: "Tread Depth", value: "850 mm / 900 mm" },
      { label: "Riser Height", value: "350 mm" },
      { label: "Control Interface", value: "Key switch & Handheld wireless pendant" },
      { label: "Structural Spec", value: "EN 13200-1 / ISO 9001" },
    ],
    certs: ["EN 13200-1", "CE Electrical Safety", "ISO 9001:2015", "IP55 Rated Drive"],
  },
  "FLDB-03": {
    code: "FLDB-03",
    category: "SEATING & STADIUM",
    name: "VIP Padded Bleacher",
    nameL1: "VIP Padded",
    nameL2: "Bleacher",
    swatch: "#E08A1E",
    tagline: "Plush upholstered tip-up seats mounted on folding retractable grandstands for premium arena seating.",
    description: "The VIP Padded Bleacher (FLDB-03) delivers high-end club seating comfort inside retractable hall structures. Each ergonomic seat features cold-cured polyurethane foam padding encased in heavy-duty vinyl or fabric upholstery.",
    description2: "Equipped with automatic quiet gravity-tilt return mechanisms, armrests, and optional cup holders, offering luxury seating that folds compactly away when not in use.",
    keyStats: [
      { label: "SEATING TYPE", value: "Tip-Up Upholstered" },
      { label: "FOAM SPEC", value: "Cold-Cured Polyurethane" },
      { label: "ARMRESTS", value: "Included" },
      { label: "SAFETY SPEC", value: "EN 13200" },
    ],
    highlights: [
      { tag: "LUXURY", title: "Ergonomic Upholstered Padding", detail: "High-resilience foam padding for maximum long-event spectator comfort." },
      { tag: "QUIET", title: "Gravity Tip-Up Mechanism", detail: "Silent gravity-operated seat return system with zero maintenance springs." },
      { tag: "FINISH", title: "Premium Leatherette / Fabric", detail: "Stain-resistant and flame-retardant upholstery choices." },
    ],
    specs: [
      { label: "Seat Construction", value: "Steel frame with cold-cured PU foam" },
      { label: "Upholstery", value: "Stain-resistant heavy-duty vinyl / fabric" },
      { label: "Tread Depth", value: "950 mm" },
      { label: "Riser Height", value: "380 mm" },
    ],
    certs: ["EN 13200 Certified", "BS 5852 Fire Retardant", "ISO 9001:2015"],
  },
  "FLDB-04": {
    code: "FLDB-04",
    category: "SEATING & STADIUM",
    name: "Outdoor Aluminum Bleacher",
    nameL1: "Outdoor Aluminum",
    nameL2: "Bleacher",
    swatch: "#1FA95B",
    tagline: "Weatherproof anodized aluminum stepped bleachers engineered for outdoor stadiums and sports grounds.",
    description: "The Outdoor Aluminum Bleacher (FLDB-04) provides weatherproof spectator seating for outdoor football pitches, hockey grounds, and track venues across India. Built entirely from marine-grade extruded aluminum alloys.",
    description2: "Resistant to monsoon rain, intense UV radiation, and high humidity. Nonslip fluted aluminum planks prevent slips and require zero painting or rust maintenance.",
    keyStats: [
      { label: "MATERIAL", value: "Anodized Aluminum" },
      { label: "WEATHER RATING", value: "100% Monsoon Proof" },
      { label: "TREAD SURFACE", value: "Non-Slip Fluted Planks" },
      { label: "MAINTENANCE", value: "Zero Rust / Painting" },
    ],
    highlights: [
      { tag: "DURABILITY", title: "Marine-Grade Aluminum", detail: "Corrosion-proof extruded aluminum structure built for Indian weather." },
      { tag: "SAFETY", title: "Anti-Slip Planks", detail: "Fluted traction grooves provide firm footing even in wet monsoon conditions." },
    ],
    specs: [
      { label: "Material", value: "Extruded Aluminum Alloy 6063-T6" },
      { label: "Finish", value: "Clear Anodized Planks & Galvanized Steel Frame" },
      { label: "Tread Planks", value: "Dual 2x10 inch anti-slip aluminum" },
    ],
    certs: ["EN 13200-1", "ISO 9001:2015", "All-Weather Rated"],
  },
  "FLDB-05": {
    code: "FLDB-05",
    category: "SEATING & STADIUM",
    name: "Recessed Wall Bleacher",
    nameL1: "Recessed Wall",
    nameL2: "Bleacher",
    swatch: "#5FD0E0",
    tagline: "Retractable bleachers that fold completely flush into wall alcoves for zero-footprint storage.",
    description: "The Recessed Wall Bleacher (FLDB-05) is the ultimate architectural solution for multi-sport halls demanding zero obstruction when seating is stowed. The front fascias match wall panels, creating a seamless aesthetic.",
    description2: "Operated manually or motorized, the bank retracts smoothly into recessed wall pockets, preserving 100% of perimeter floor space for court play.",
    keyStats: [
      { label: "FOOTPRINT", value: "Zero (Flush Stowed)" },
      { label: "FACIA FINISH", value: "Custom Wall Matching" },
      { label: "RETRACTION", value: "Recessed Pocket" },
      { label: "SAFETY", value: "EN 13200" },
    ],
    highlights: [
      { tag: "ARCHITECTURAL", title: "Flush Wall Recess", detail: "Stows completely flat into wall pockets with matching panel covers." },
      { tag: "SPACE", title: "Zero Hall Obstruction", detail: "Eliminates protruding edges along boundary walls." },
    ],
    specs: [
      { label: "Storage Mode", value: "Recessed Wall Pocket Mount" },
      { label: "Fascia Panel", value: "Acoustic or timber matching wall finish" },
    ],
    certs: ["EN 13200-1", "ISO 9001:2015"],
  },
};

/** Default product shown when no/unknown code is requested. */
export const DEFAULT_PRODUCT_CODE = "TFX-01";

/** Compact summaries used by the "related types" grid. */
const TYPE_SUMMARIES: RelatedType[] = [
  { code: "TFX-01", name: "Sport M Performance", desc: "Competition surface for elite indoor sport.", spec: "9.0mm · ≥53%", swatch: "#C9442E" },
  { code: "TFX-02", name: "Sport M Comfort", desc: "Higher comfort for training halls.", spec: "7.0mm · ≥45%", swatch: "#2F6BFF" },
  { code: "TFX-03", name: "Evolution", desc: "All-round surface for multi-sport use.", spec: "6.2mm · ≥35%", swatch: "#1FA95B" },
  { code: "TFX-04", name: "Badminton", desc: "BWF-approved shuttle-specific build.", spec: "7.5mm · BWF L1", swatch: "#E08A1E" },
  { code: "TFX-05", name: "Bateco", desc: "Heavy-traffic multi-use hall build.", spec: "8.0mm · ≥38%", swatch: "#8FBD1A" },
  { code: "TFX-06", name: "Decibel Acoustic", desc: "19 dB acoustic impact reduction.", spec: "10.5mm · 19dB", swatch: "#5FD0E0" },
];

/** Every product code (used to statically generate one page per type). */
export function getAllProductCodes(): string[] {
  return Object.keys(PRODUCTS);
}

/** Look up a product, falling back to the default when the code is unknown. */
export function getProduct(code: string): Product {
  return PRODUCTS[code] ?? PRODUCTS[DEFAULT_PRODUCT_CODE];
}

/** Up to three other types in the family, excluding the current product. */
export function getRelatedTypes(currentCode: string, limit = 3): RelatedType[] {
  return TYPE_SUMMARIES.filter((t) => t.code !== currentCode).slice(0, limit);
}
