// ============================================================
// VoltEdge Electrical — site data and copy
// All copy written to sound like a real local business.
// ============================================================

export const BRAND = {
  name: "VoltEdge Electrical",
  shortName: "VoltEdge",
  tagline: "Licensed electricians serving Columbus, Ohio",
  phone: "(614) 555-0148",
  phoneHref: "tel:+16145550148",
  emergency: "(614) 555-0199",
  emergencyHref: "tel:+16145550199",
  email: "hello@voltedgeelectrical.com",
  emailHref: "mailto:hello@voltedgeelectrical.com",
  address: "4128 Foundry Avenue, Columbus, OH 43215",
  hours: "Mon to Fri 7:30am to 5:30pm",
  saturday: "Sat 8am to 1pm",
  founded: 2010,
} as const;

export const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "About Us", page: "about" },
  { label: "Services", page: "services" },
  { label: "Projects", page: "projects" },
  { label: "Blog", page: "blog" },
  { label: "Contact", page: "contact" },
] as const;

export type PageId = (typeof NAV_LINKS)[number]["page"] | "blogPost" | "rfq";

export const HERO_SLIDES = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "Columbus, Ohio",
    title: "Safe wiring. Smart homes. Done right the first time.",
    text: "From a flickering light to a full rewire, our licensed crew handles the job cleanly, on schedule, and up to code.",
    primaryCta: { label: "Request a Quote", page: "rfq" as const },
    secondaryCta: { label: "Our Services", page: "services" as const },
  },
  {
    image: "/images/hero-2.jpg",
    eyebrow: "Family Run Since 2010",
    title: "A crew you can actually trust inside your home",
    text: "Every electrician on our team is licensed, background checked, and trained to treat your place with respect. Shoe covers on. Mess gone when we leave.",
    primaryCta: { label: "Meet the Team", page: "about" as const },
    secondaryCta: { label: "Get Help Now", page: "contact" as const },
  },
  {
    image: "/images/hero-3.jpg",
    eyebrow: "Modern Electrical Work",
    title: "Power for the way you live now",
    text: "EV chargers, smart panels, and lighting design that makes an older home feel brand new. We wire for the next twenty years, not the last twenty.",
    primaryCta: { label: "See Our Work", page: "projects" as const },
    secondaryCta: { label: "Book a Visit", page: "contact" as const },
  },
];

export const WELCOME_TABS = [
  {
    id: "residential",
    label: "Residential",
    title: "Your home, wired the safe way",
    text: "Most of our work happens in houses around Columbus. Older homes in Clintonville and German Village keep us busy with knob and tube replacements and panel swaps. Newer builds call us for recessed lighting, bathroom circuits, and EV chargers. Whatever the job, we pull the permit, do it to code, and label everything so the next person who opens the panel knows exactly what they are looking at.",
    bullets: [
      "Whole home rewires and knob and tube replacement",
      "Panel upgrades from 100 to 200 amp service",
      "Ceiling fans, fixtures, and recessed lighting",
      "EV charger installation for every vehicle brand",
    ],
    image: "/images/service-residential.jpg",
  },
  {
    id: "commercial",
    label: "Commercial",
    title: "Keep your doors open and your lights on",
    text: "We work with restaurant owners, shopkeepers, and office managers across the city. Our commercial crews understand that downtime costs you money, so we schedule around your hours and get in and out fast. From a sign circuit on High Street to a full office buildout in the Arena District, we plan it, wire it, and stand behind it.",
    bullets: [
      "Office and retail buildouts and tenant finishes",
      "Sign and parking lot lighting circuits",
      "Dedicated circuits for kitchen and office equipment",
      "Routine maintenance plans for busy locations",
    ],
    image: "/images/service-commercial.jpg",
  },
  {
    id: "industrial",
    label: "Industrial",
    title: "Heavy duty power for serious operations",
    text: "Factories and warehouses around Rickenbacker and the rail yards trust us with their three phase work. Our industrial team builds and repairs control cabinets, replaces motors and starters, and troubleshoots production line faults without slowing your floor down for long. Safety is the whole job here. Lockout procedures, arc flash awareness, and clean documentation come standard.",
    bullets: [
      "Three phase power distribution and motor controls",
      "Control cabinet builds and rebuilds",
      "Machine hookups and production line troubleshooting",
      "Preventive maintenance and thermal imaging scans",
    ],
    image: "/images/service-industrial.jpg",
  },
];

export const SERVICES = [
  {
    slug: "installation",
    title: "Electrical Installation",
    icon: "PlugZap",
    short: "New circuits, fixtures, and wiring for remodels, additions, and new construction, all permitted and inspected.",
    long: "If you are adding a room, finishing a basement, or building from the ground up, we wire the whole thing. We walk the plans with you first, mark every outlet and switch location on the studs, and rough it in cleanly. Once drywall goes up we come back, set the devices, and test every circuit before we call it done. You get a permit on the wall and an inspector's sign off, not guesswork.",
    points: [
      "New construction and additions",
      "Basement and attic finish wiring",
      "Dedicated circuits for appliances and equipment",
      "Hot tub, sauna, and generator hookups",
    ],
    image: "/images/project-2.jpg",
  },
  {
    slug: "maintenance",
    title: "Service and Maintenance",
    icon: "Wrench",
    short: "Repairs, tune ups, and annual checkups that catch small problems before they turn into dark houses.",
    long: "Loose outlets, warm switch plates, breakers that trip for no reason. Small stuff gets ignored until it shorts out on a Sunday night. Our maintenance visits cover the whole system: we torque panel connections, test GFCI and AFCI protection, check the attic and crawlspace wiring, and hand you a plain language report at the end. Fix what matters now, plan the rest for later.",
    points: [
      "Outlet, switch, and fixture repairs",
      "Breaker troubleshooting and replacement",
      "Annual whole home electrical checkups",
      "Thermal scans that catch hot connections early",
    ],
    image: "/images/about-small.jpg",
  },
  {
    slug: "safety",
    title: "Electrical Safety Inspections",
    icon: "ShieldCheck",
    short: "A full top to bottom inspection before you buy, sell, or renovate a property. Honest findings, no scare tactics.",
    long: "Buying a house in Columbus? Spend a little before you spend a lot. We open the panel, test the grounding, pull a few devices, and look for the things home inspectors are not licensed to diagnose. Aluminum branch wiring, Federal Pacific and Zinsco panels, overloaded circuits, DIY splices in the attic. You get a written report with photos and a straight answer about what is urgent and what can wait.",
    points: [
      "Pre purchase inspections for buyers",
      "Rental and Airbnb compliance checks",
      "Knob and tube and aluminum wiring assessments",
      "Insurance and code compliance reports",
    ],
    image: "/images/blog-1.jpg",
  },
  {
    slug: "security",
    title: "Security Systems",
    icon: "Cctv",
    short: "Cameras, doorbell units, and alarm wiring installed neatly and set up on your phone the same day.",
    long: "A security camera in a box does you no good if it is aimed at the sidewalk. We plan camera coverage around your actual property, wire everything properly instead of running plugs through windows, and set up the apps on your phone before we leave. Motion lighting, doorbell cameras, flood sensors. Simple systems that work, without the monthly contract push you get from the big national brands.",
    points: [
      "Camera systems for homes and storefronts",
      "Video doorbell and smart lock wiring",
      "Motion activated flood lighting",
      "Alarm system low voltage wiring",
    ],
    image: "/images/project-6.jpg",
  },
  {
    slug: "switchboards",
    title: "Switchboard Upgrades",
    icon: "GitCommitVertical",
    short: "Old fuse boxes and crowded panels swapped for safe modern switchgear with room to grow.",
    long: "A lot of homes in older Columbus neighborhoods still run on 60 or 100 amp fuse boxes. They were fine in 1955. They were not built for central air, an induction range, and a car that charges overnight. We swap old switchboards for modern 200 amp panels with proper breakers, clean grounding, and space left over for whatever you add next. Most upgrades are done in a single day.",
    points: [
      "Fuse box to breaker panel conversions",
      "60 or 100 amp service upgraded to 200 amp",
      "Meter base and service entrance updates",
      "Subpanels for garages, shops, and additions",
    ],
    image: "/images/hero-2.jpg",
  },
  {
    slug: "lighting",
    title: "Indoor and Outdoor Lighting",
    icon: "Lightbulb",
    short: "Lighting design and installation that changes how a room or a yard feels the moment the sun goes down.",
    long: "Lighting is the cheapest renovation there is. A dim, yellow kitchen turns crisp with the right layout of recessed cans and under cabinet strips. A dark yard turns welcoming with path lights and a couple of well aimed uplights in the trees. We design the layout with you, install it with clean switching and dimmers where they make sense, and leave you with something you actually enjoy looking at.",
    points: [
      "Recessed, under cabinet, and cove lighting",
      "Landscape and pathway lighting",
      "Dimmers, smart switches, and scene controls",
      "Security and dusk to dawn lighting",
    ],
    image: "/images/project-4.jpg",
  },
];

export const PROJECTS = [
  {
    title: "Clintonville craftsman, full rewire",
    category: "Residential",
    location: "Clintonville",
    year: "2026",
    text: "A 1948 craftsman still running on original knob and tube. We rewired the whole house in five days, worked around the homeowners staying put, and patched every wall hole before we left.",
    image: "/images/project-1.jpg",
  },
  {
    title: "Arena District office buildout",
    category: "Commercial",
    location: "Downtown",
    year: "2026",
    text: "Six thousand square feet of second generation office space turned into a design studio. New panels, forty circuits, conference room AV, and lighting on occupancy sensors.",
    image: "/images/project-2.jpg",
  },
  {
    title: "Warehouse control cabinet rebuild",
    category: "Industrial",
    location: "Rickenbacker area",
    year: "2025",
    text: "A conveyor line kept stopping a distribution center. We rebuilt the main control cabinet over a weekend, labeled every wire, and the line has run clean since.",
    image: "/images/project-3.jpg",
  },
  {
    title: "Grandview kitchen lighting overhaul",
    category: "Residential",
    location: "Grandview Heights",
    year: "2025",
    text: "One hanging bulb over a table, and that was it. Twenty two recessed cans, under cabinet strips, and three dimming zones later, the kitchen became the favorite room in the house.",
    image: "/images/project-4.jpg",
  },
  {
    title: "Bexley EV charger installs",
    category: "Residential",
    location: "Bexley",
    year: "2025",
    text: "Two neighbors, two chargers, one week. Both homes needed panel work first, so we upgraded the service and mounted a 48 amp charger in each garage.",
    image: "/images/project-5.jpg",
  },
  {
    title: "Westerville landscape lighting",
    category: "Residential",
    location: "Westerville",
    year: "2026",
    text: "A backyard the family avoided after dark. Fourteen low voltage fixtures, path lights along the new pavers, and uplights on the two big maples out back.",
    image: "/images/project-6.jpg",
  },
];

export const PROJECT_CATEGORIES = ["All", "Residential", "Commercial", "Industrial"];

export const WHY_US = [
  {
    icon: "Award",
    title: "16 Years on the Job",
    text: "VoltEdge opened in 2010 and plenty of our first customers still call us first. That kind of repeat business only happens when the work holds up.",
  },
  {
    icon: "BadgeCheck",
    title: "Licensed and Insured",
    text: "State of Ohio license EL.38291, fully bonded, and covered up to two million. Permits pulled on jobs that need them, no shortcuts offered.",
  },
  {
    icon: "Clock",
    title: "24/7 Emergency Response",
    text: "A real electrician answers the emergency line at 2am, not a call center. We keep two trucks staffed overnight for exactly that reason.",
  },
  {
    icon: "BadgeDollarSign",
    title: "Upfront Pricing",
    text: "You see the full price in writing before we touch a wire. The number we quote is the number on the invoice. No surprise line items, ever.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Our panel was original to the house and the inspector flagged it during our refinance. Frank's crew swapped it out in one day and walked me through the permit paperwork without me having to chase anyone. Price matched the quote to the dollar.",
    name: "Jason Wheeler",
    role: "Homeowner, Clintonville",
    image: "/images/client-1.jpg",
  },
  {
    quote:
      "I called three electricians and VoltEdge was the only one that actually picked up the phone. Maria found a burnt connection in the attic that two other companies missed. She took photos, explained everything, and had it fixed the same morning.",
    name: "Dana Whitfield",
    role: "Homeowner, Grandview Heights",
    image: "/images/client-2.jpg",
  },
  {
    quote:
      "I have used them twice now, once for a ceiling fan and once for a bigger rewire in the garage. They show up when they say they will, wear shoe covers, and clean up after themselves. Sounds basic but that puts them ahead of everyone else I have hired.",
    name: "Robert Nance",
    role: "Retired, Bexley",
    image: "/images/client-3.jpg",
  },
  {
    quote:
      "They rewired our coffee shop during a four day closure and beat the schedule by a day. Marcus even came back on a Saturday to help us debug a point of sale system that turned out to be a vendor issue, not wiring. That is the kind of outfit I recommend to everyone.",
    name: "Marcus Lee",
    role: "Owner, Cedar Hill Coffee",
    image: "/images/client-4.jpg",
  },
];

export const STATS = [
  { value: 1240, suffix: "+", label: "Jobs Completed" },
  { value: 16, suffix: "", label: "People Working" },
  { value: 9, suffix: "", label: "Business Partners" },
  { value: 2800, suffix: "+", label: "Happy Customers" },
];

export const TEAM = [
  {
    name: "Frank Holloway",
    role: "Founder and Master Electrician",
    bio: "Started VoltEdge in 2010 with one van and a borrowed ladder. Twenty seven years in the trade and still pulls out his meter on almost every job.",
    image: "/images/team-3.jpg",
  },
  {
    name: "Daniel Cho",
    role: "Lead Journeyman Electrician",
    bio: "Nine years with the company and our best hand on commercial buildouts. If your office needs power at 7am Monday, Daniel is the one quietly making it happen.",
    image: "/images/team-1.jpg",
  },
  {
    name: "Maria Santos",
    role: "Service Electrician",
    bio: "The troubleshooter. Maria gets the calls nobody else can figure out, from phantom breaker trips to old house wiring with a mind of its own.",
    image: "/images/team-2.jpg",
  },
  {
    name: "Tyler Brooks",
    role: "Apprentice Electrician",
    bio: "Second year apprentice, Columbus State electrical program. The neatest wire pulls in the company and the first to volunteer for a crawlspace.",
    image: "/images/team-4.jpg",
  },
];

export const POSTS = [
  {
    slug: "wiring-warning-signs",
    title: "Five warning signs your old wiring is asking for help",
    date: "August 12, 2026",
    readTime: "4 min read",
    image: "/images/blog-1.jpg",
    excerpt:
      "Houses talk. Breakers that trip twice a month, outlets that buzz, a smell like something warm near a lamp. Here is what those signals mean and when to make the call.",
    body: [
      "Old wiring rarely fails all at once. It sends warnings first, and the trick is knowing how to hear them. After sixteen years of crawling through attics around Columbus, I have learned that most house fires caused by electricity gave off at least one of the signs below, sometimes for months.",
      "First, breakers that trip over and over. A breaker exists to protect wire, so when the same one trips every couple of weeks, that circuit is telling you it is overloaded or that something on it is failing. Resetting it forever is not a plan.",
      "Second, discoloration or scorch marks around outlets. That browning around a plug blade means heat, and heat at a connection means resistance, and resistance is what starts fires. If an outlet plate ever feels warm, stop using it and call someone.",
      "Third, a buzzing or crackling sound from a switch or wall. Electricity is silent when it flows properly. Any sound you can hear is a connection arcing somewhere it should not be.",
      "Fourth, two prong outlets throughout the house. Those ungrounded outlets usually mean the home still runs on its original wiring from the fifties or earlier. It works, right up until you plug in anything with a computer in it.",
      "Fifth, a smell like warm plastic with no obvious source. This one gets no waiting period. Turn off the main breaker and make the call right away.",
      "None of these mean panic. They mean it is time for an inspection, which costs a whole lot less than what comes after ignoring them. If your house is showing any of these signs, our inspection team can tell you exactly where you stand in about two hours.",
    ],
  },
  {
    slug: "led-upgrades-that-pay",
    title: "LED upgrades that actually lower your bill",
    date: "June 3, 2026",
    readTime: "5 min read",
    image: "/images/blog-2.jpg",
    excerpt:
      "Not every energy saving tip saves money. These four do, with real numbers from real Columbus homes we have worked on.",
    body: [
      "You have heard a thousand energy tips. Unplug the toaster. Wash in cold water. Some of it adds up to pocket change. We wired and upgraded enough homes to know which changes actually show up on the bill, so here are the four worth doing.",
      "Swap the bulbs you use most. You do not need to change all forty bulbs in the house, just the ten that burn the most hours. A 60 watt incandescent burning six hours a day costs about nineteen dollars a year. An equivalent LED costs about three. Ten high use fixtures covers most of the difference people hope for from whole home conversions.",
      "Put the porch and landscape lights on photocells. Outdoor lighting burns all night, every night, all year. Dusk to dawn fixtures or a twenty dollar photocell adapter cuts those hours to actual darkness hours. In winter that barely matters. In summer it saves eight months of wasted burn time.",
      "Add occupancy sensors to the rooms where lights get left on. Basements, closets, garages, kids rooms. A sensor that turns lights off when nobody is there pays for itself inside a year in most homes, and the good ones now dim instead of snapping off, which stopped being annoying years ago.",
      "Rethink the can lights. Older recessed fixtures vent heated air straight into the attic in winter. Sealed LED retrofit trims stop that leak, so you save on lighting and on heating at the same time. In a house with a dozen cans, this one quietly fixes a draft nobody could find.",
      "One honest note: LED retrofits in older dimmer systems sometimes flicker. That is usually a dimmer built for high wattage bulbs, not a bad LED. If a swap gives you flicker, have an electrician check the dimmer rating before you blame the bulbs.",
    ],
  },
  {
    slug: "ev-charger-expectations",
    title: "What to expect when you install a home EV charger",
    date: "March 18, 2026",
    readTime: "4 min read",
    image: "/images/blog-3.jpg",
    excerpt:
      "A charger install is mostly electrical homework before the fun part. Here is the honest timeline, cost range, and the questions to ask before you buy one.",
    body: [
      "Home charger installs have become a huge part of our work, and almost every customer asks the same three questions. How long does it take, what does it cost, and will my panel handle it. Here are the straight answers.",
      "The install itself is usually a half day. The homework comes first. We do a load calculation on your panel, which is a fancy way of adding up everything your house might draw at once and seeing what is left over for a car. Most homes with 150 amp service or better have room. Some 100 amp homes do too, depending on gas versus electric appliances.",
      "If the panel has room, we run a dedicated circuit to the garage, mount the charger, and set up the app. Total cost for a typical install lands between 650 and 1200 dollars depending on distance from the panel and whether the garage wall is finished.",
      "If the panel does not have room, that is where costs move. A service upgrade to 200 amp runs 2200 to 3500 in central Ohio, permits and utility coordination included. It is worth it anyway in a lot of older homes, but you deserve to hear that from someone not selling it to you.",
      "Two questions worth asking before you buy a charger. First, does your car accept 48 amp charging, because paying for a 48 amp unit when the car tops out at 32 is wasted money. Second, does the charger use the app you actually want to keep. Some apps are better than others and you will live in it more than you think.",
      "Columbus and several suburbs still offer rebates on charger installs some months of the year. We keep current on which programs are live and hand customers the paperwork filed. Ask about it when you book, because the deadlines are real.",
    ],
  },
];

export const FAQS = [
  {
    q: "Do you really answer emergency calls at night?",
    a: "Yes. Two of our trucks run overnight and the emergency line rings a real electrician, not an answering service. If you smell burning, hear buzzing from a panel, or lost power to half the house, call the emergency number and someone will pick up.",
  },
  {
    q: "How much does a service call cost?",
    a: "A standard diagnostic visit runs 89 dollars, and we waive that fee if you hire us for the repair on the spot. Bigger work gets a written fixed price before anything starts, so the number never moves mid job.",
  },
  {
    q: "Are you licensed and insured?",
    a: "VoltEdge holds Ohio electrical license EL.38291, carries two million in liability coverage, and bonds every job. We pull permits for work that requires them and schedule the inspections ourselves.",
  },
  {
    q: "Which areas around Columbus do you cover?",
    a: "All of Franklin County plus parts of Delaware and Licking. Clintonville, Grandview, Upper Arlington, Bexley, Westerville, Dublin, and Downtown are home turf. Farther out, just ask, we usually still make it work.",
  },
  {
    q: "Can you work around my business hours?",
    a: "Constantly. Restaurants get rewired at 2am, offices get panels swapped over weekends. Tell us the window that hurts least and we will hit it.",
  },
];

export const PARTNERS = [
  "Buckeye Supply Co",
  " Franklin County Builders",
  "MidOhio Energy",
  "Columbus Property Group",
  "Scioto Electric Supply",
  "Heartland Rentals",
];

// If the form API cannot be reached (for example on static hosting), hand the
// visitor a prefilled email instead of a dead end. Works in every browser.
export function mailtoLead(
  data: Record<string, FormDataEntryValue>,
  source: string
) {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && value.trim()) {
      // propertyType -> "Property Type" so the email reads naturally
      const label = key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/^./, (c) => c.toUpperCase());
      lines.push(`${label}: ${value.trim()}`);
    }
  }
  const subject =
    source === "rfq"
      ? "Quote request from the website"
      : source === "appointment"
        ? "Appointment request from the website"
        : "Website message";
  const body = lines.join("\n\n");
  window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
