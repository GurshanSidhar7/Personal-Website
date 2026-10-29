export const profile = {
  name: "Gurshan Sidhar",
  email: "gurshansidhar7@gmail.com",
  academicEmail: "sidh5429@mylaurier.ca",
  github: "https://github.com/GurshanSidhar7",
  linkedin: "https://www.linkedin.com/in/gurshan-sidhar",
  instagram: "https://www.instagram.com/alttabtheory",
  x: "https://x.com/alttabtheory",
  resume: "/Gurshan%20Sidhar%20Final%20Resume.pdf",
  languages: ["English", "French", "Punjabi"],
  favouriteFilms: [
    "Perfect Blue",
    "Moonlight",
    "Parasite",
    "Anhey Ghorhey Da Daan",
  ],
};

export const projects = [
  {
    slug: "equity-options-analytics",
    name: "Equity Options Analytics",
    category: "Quantitative finance",
    color: "olive",
    image: "/media/equity-options.webp",
    imageAlt:
      "Equity Options Analytics workspace with Overview, Volatility, and Pricing Lab navigation",
    summary:
      "An exploration of market data, option pricing, and the mathematics behind risk. Built to make the assumptions as visible as the results.",
    description:
      "A learning-focused analytics workspace for equity-options fundamentals, bringing historical equity data, realized volatility, and a European options pricing lab into one interface.",
    problem:
      "A single option price says little without the volatility, time horizon, and sensitivities behind it.",
    solution:
      "A Python analytics layer calculates the models, while a Next.js interface brings inputs, charts, methodology, and limitations together.",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "TypeScript",
      "NumPy",
      "pandas",
      "SciPy",
    ],
    features: [
      [
        "Historical perspective",
        "Ticker-based historical prices, latest completed daily close, and 20- and 30-day realized volatility.",
      ],
      [
        "A transparent pricing lab",
        "Dividend-adjusted European Black–Scholes pricing with editable call and put assumptions.",
      ],
      [
        "Risk, made visible",
        "Delta, Gamma, Vega, Theta, and a selected Greek-versus-spot chart.",
      ],
      [
        "Explicit boundaries",
        "Closing prices are distinguished from live quotes. The option chain is marked as planned.",
      ],
    ],
    approach: [
      "Next.js interface",
      "FastAPI endpoints",
      "Python models",
      "Historical market data",
    ],
    outcome:
      "A working educational dashboard with numerical and API validation. Implied volatility and live option-chain analytics are outside the currently verified implementation.",
    github: "https://github.com/GurshanSidhar7/equity-options-analytics",
    live: "https://equity-options-analytics-1.vercel.app/",
    note: "Current scope is documented in the project repository. Model outputs are theoretical; sample pricing inputs are illustrative.",
  },
  {
    slug: "lucky-lease",
    name: "LuckyLease",
    category: "Full-stack · AI",
    color: "sage",
    image: "/media/Lucky_Lease.webp",
    imageAlt: "LuckyLease student housing homepage with city search",
    summary:
      "Finding a place should feel like finding a fit. A student sublet marketplace with real-time conversations and a thoughtful AI second opinion.",
    description:
      "A web-based platform for short-term subletting, focused on student and intern housing. Search, location discovery, messaging, and personalized advice live in one place.",
    problem:
      "Students and interns need short-term housing that fits their budget, location, and schedule. A listing alone rarely tells the whole story.",
    solution:
      "A searchable marketplace pairs practical discovery tools with Lucky, a Google Gemini-powered advisor that evaluates a listing against a renter’s preferences.",
    stack: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Tailwind",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Socket.io",
      "Google Gemini",
    ],
    features: [
      [
        "Search & discover",
        "Create listings, use advanced filters, and explore an interactive map. Multiple photos are stored with Supabase Storage.",
      ],
      [
        "A personal second opinion",
        "Lucky considers budget, location, amenities, and lease duration to provide structured pros and cons and a compatibility rating from 0 to 10.",
      ],
      [
        "Talk in real time",
        "Socket.io connects renters and listing owners through real-time chat.",
      ],
      [
        "Secure access",
        "JWT-secured email and password authentication supports the marketplace experience.",
      ],
    ],
    approach: [
      "Next.js 14 interface",
      "Express & JWT",
      "Supabase database / storage",
      "Socket.io & Gemini",
    ],
    outcome:
      "A functioning sublet marketplace connecting listing discovery, secure access, real-time chat, and AI-assisted comparison.",
    github: "https://github.com/TaseskiCS/LuckyLease",
    live: "https://luckylease.vercel.app/",
  },
  {
    slug: "cvlens",
    name: "CVLens",
    category: "Natural language processing",
    color: "blue",
    image: "/media/cvlens.webp",
    imageAlt: "CVLens resume extraction web app",
    summary:
      "From a resume to structured information. An NLP-powered application that gives unstructured documents a useful shape.",
    description:
      "A group-built web application that extracts contact information, education, skills, and work experience from PDF and DOCX resumes.",
    problem:
      "Resume information often arrives in layouts that require repetitive manual data entry.",
    solution:
      "A SpaCy named-entity recognition model processes uploaded resumes. A FastAPI REST API returns structured JSON, and a Next.js frontend presents the extracted details.",
    stack: [
      "Python",
      "Next.js",
      "Tailwind",
      "FastAPI",
      "SpaCy",
      "Docker",
      "Git",
    ],
    features: [
      ["Document ingestion", "Upload PDF or DOCX resumes for processing."],
      [
        "Named-entity recognition",
        "Extract contact details, education, skills, and work history with SpaCy. The project included a dataset of over 200 resumes.",
      ],
      [
        "Structured responses",
        "A RESTful FastAPI service returns extracted information as JSON.",
      ],
      [
        "An approachable interface",
        "The Next.js frontend fetches API results and displays the information in a readable format.",
      ],
    ],
    approach: [
      "PDF / DOCX upload",
      "FastAPI service",
      "SpaCy NLP extraction",
      "JSON & Next.js",
    ],
    outcome:
      "An end-to-end document-processing workflow turning resume uploads into structured data. Built as a group project.",
    github: "https://github.com/CVLens/CVLens",
    live: "https://cvlens.vercel.app/",
  },
  {
    slug: "poke-pal",
    name: "PokéPal",
    category: "Machine learning · Full-stack",
    color: "rose",
    image: "/media/PokePal.webp",
    imageAlt: "PokéPal Pokédex-style personality match interface",
    summary:
      "Nine answers, 151 Pokémon, and a match you can understand. An explainable recommendation engine using local MiniLM embeddings and weighted personality features to find your Kanto counterpart.",
    description:
      "PokéPal ranks all 151 original Kanto Pokémon from nine free-text answers. The Pokédex-inspired interface presents a personalized explanation, a compatibility index, and two alternative matches.",
    problem:
      "How can nine natural-language answers produce a personal Pokémon match with a clear, traceable explanation?",
    solution:
      "A FastAPI backend runs pretrained-model inference locally on the CPU with MiniLM sentence embeddings and ONNX Runtime. Semantic ranking combines similarity, 11 interpretable personality dimensions, and weighted environmental and elemental preferences.",
    stack: [
      "Python",
      "FastAPI",
      "MiniLM",
      "ONNX Runtime",
      "NumPy",
      "Next.js",
      "React",
      "Tailwind CSS",
      "PokéAPI",
    ],
    features: [
      [
        "Semantic understanding",
        "Pretrained sentence embeddings interpret natural-language answers beyond exact keyword matches.",
      ],
      [
        "Weighted matching",
        "Personality, problem-solving, and behavior carry more weight, while music and favorite color have limited influence.",
      ],
      [
        "All 151 candidates",
        "Distinct profiles separate documented Pokémon characteristics from subjective personality interpretations. Independent human-reviewed match accuracy has not yet been measured.",
      ],
      [
        "Explainable results",
        "Deterministic templates connect meaningful user answers to the selected profile, explaining the match alongside a compatibility index and two alternatives.",
      ],
      [
        "Efficient CPU inference",
        "The model loads once and candidate embeddings are precomputed. Local diagnostics measured approximately 62 ms average CPU inference, excluding network time.",
      ],
      [
        "Reliable responses",
        "Input validation, deterministic ranking, concurrent-request tests, and local display-data fallbacks support reliable results when PokéAPI fails.",
      ],
    ],
    approach: [
      "Nine free-text answers",
      "MiniLM & ONNX Runtime",
      "Weighted semantic ranking",
      "Explained Pokémon matches",
    ],
    outcome:
      "A local recommendation pipeline connecting nine natural-language responses to an explained ranking of 151 Pokémon. Independent human-reviewed match accuracy has not yet been measured.",
    github: "https://github.com/GurshanSidhar7/Poke-Pal",
    live: "https://pokepal-g.vercel.app/",
  },
  {
    slug: "portfolio-website",
    name: "Personal Portfolio",
    category: "Design & engineering",
    color: "paper",
    image: "/media/port_website.webp",
    imageAlt: "The original purple, space-themed Gurshan Sidhar portfolio",
    summary:
      "An evolving home for the things I build and the moments I collect. This site started with a star field; its next chapter begins on paper.",
    description:
      "My personal portfolio, built with React, HTML, CSS, and JavaScript, showcases my skills, projects, experience, and photography in an interactive space.",
    problem:
      "A portfolio should communicate both the engineering work and the person behind it, with a clear path to the details.",
    solution:
      "This edition introduces dedicated project pages, an editorial career timeline, a concise professional introduction, and a photo journal.",
    stack: ["React", "HTML", "CSS", "JavaScript", "React Router"],
    features: [
      [
        "A place for each story",
        "Separate routes for work, experience, and personal interests.",
      ],
      [
        "Clear paths into the work",
        "Dedicated pages connect professional experience, project details, education, and personal photography.",
      ],
      [
        "Frame by frame",
        "Personal photographs appear as Polaroid prints with handwritten captions, thumbnails, and an accessible full-size viewer.",
      ],
      [
        "Thoughtful foundations",
        "Responsive layouts, keyboard navigation, reduced-motion support, and locally hosted fonts.",
      ],
    ],
    approach: [
      "React & React Router",
      "Shared content model",
      "CSS design system",
      "SVG & native interactions",
    ],
    outcome:
      "An ongoing personal project in web development, interaction design, and visual storytelling. The image above preserves the original design.",
    github:
      "https://github.com/GurshanSidhar7/Personal-Website/tree/master?tab=readme-ov-file",
  },
];

export const experiences = [
  {
    company: "BMO",
    role: "Data Science Analyst",
    team: "Audit AI & Analytics",
    date: "Winter 2027",
    status: "Incoming",
    summary:
      "My next chapter: bringing my interests in data science, AI, and finance into Audit AI & Analytics.",
    highlights: [],
    stack: [],
  },
  {
    company: "Yamaha Motor Canada",
    role: "Data Analyst Co-op",
    team: "Data analytics & financial planning",
    date: "May — Sep 2026",
    location: "Toronto, ON",
    summary:
      "Turning sales data and economic indicators into a clearer picture for forecasting and financial planning.",
    highlights: [
      {
        result:
          "Improved month-over-month and year-over-year demand projections",
        method:
          "by building statistical learning and machine learning models for demand forecasting and competitor-pricing analysis.",
      },
      {
        result: "Enabled privacy-conscious buyer-behavior analysis",
        method:
          "by combining product-level purchase records with third-party demographic probability data in an aggregate-only analytics dashboard.",
      },
      {
        result:
          "Accelerated forecasting, budgeting, and monthly FP&A decisions",
        method:
          "by delivering executive-facing Power BI dashboards for financial planning and review.",
      },
      {
        result: "Ensured reliable Power BI refreshes",
        method:
          "by engineering Python pipelines to clean, standardize, and merge internal sales records with Statistics Canada economic indicators.",
      },
    ],
    stack: ["Python", "Power BI", "Machine learning", "Data pipelines"],
  },
  {
    company: "Jonas Software",
    role: "AI Enablement Intern",
    team: "Constellation Software · TSX: CSU",
    date: "Sep — Dec 2025",
    location: "Toronto, ON",
    summary:
      "Helping teams put AI to work across HR, finance, and internal operations.",
    highlights: [
      {
        result: "Saved time for a global HR team",
        method:
          "by automating candidate evaluation with AI-powered workflows that transformed unstructured candidate information into structured outputs.",
      },
      {
        result: "Automated invoice analysis and financial workflows",
        method:
          "by designing end-to-end systems with Power Automate, n8n, and LLMs that converted unstructured information into structured outputs.",
      },
      {
        result: "Supported AI governance and education across departments",
        method:
          "by maintaining the Jonas AI Hub, authoring standard operating procedures, and assisting with hands-on workshops.",
      },
    ],
    stack: ["Power Automate", "n8n", "LLMs", "AI governance"],
  },
];

export const photos = [
  {
    file: "seigfried",
    title: "Late Night Runs",
    description:
      "Sometimes all you need is a Mucho Mango Arizona, some Fuzzy Peaches and your friends on a late night cruise!",
    alt: "A gas station illuminated at dusk during a late-night drive",
  },
  {
    file: "bird_sun",
    title: "Ball of Fire",
    description:
      "It’s like the birds are flocking around the warmth of the sun.",
    alt: "Birds silhouetted over the water in the warm light of a setting sun",
  },
  {
    file: "dark_ryd",
    title: "Dark Ryd",
    position: "50% 78%",
    description: "The red light shines like a ruby in an ocean of blue skies.",
    alt: "Red traffic lights glowing against a deep blue evening sky",
  },
  {
    file: "house",
    title: "Dancing Trees",
    position: "50% 78%",
    description:
      "A late-night walk can reveal that you’re not the only one moving with nature.",
    alt: "Palm trees and houses beneath an evening sky",
  },
  {
    file: "snowboard",
    title: "Snow Dunes",
    description: "The calm before the storm.",
    alt: "A snowboarder sitting on a snowy mountain slope",
  },
  {
    file: "late_night",
    title: "Passenger Perspective",
    description:
      "Sometimes the best thing to do is look out your window and absorb what you drive by.",
    alt: "A distant city at sunset seen from the passenger’s perspective",
  },
  {
    file: "jellyfish",
    title: "Floating Away",
    description: "Fun fact: they’re older than dinosaurs!",
    alt: "Orange jellyfish floating through a vivid blue aquarium",
  },
  {
    file: "mountain",
    title: "Nature’s Roller Coaster",
    description:
      "I like to imagine I can glide across the edges of these insane mountains!",
    alt: "Layered mountain ridges stretching across the landscape",
  },
  {
    file: "sunflower",
    title: "Cotton Candy Skies",
    description: "The sunflowers chasing the sun.",
    alt: "A field of sunflowers beneath a pastel evening sky",
  },
  {
    file: "yosemit",
    title: "Half Dome",
    description:
      "This view makes you realize how small we truly are in the world. (Bigger question is how we invented an air fryer from this!?)",
    alt: "Yosemite’s Half Dome rising above trees beneath a cloudy sky",
  },
  {
    file: "mountain_sun",
    title: "The Last Light",
    description: "Mountains, water, and the last light of the day.",
    alt: "An orange sunset over still water and distant mountains",
  },
  {
    file: "la_tree",
    title: "Looking Up",
    description: "A different perspective from the street.",
    alt: "Tall palms lining a sunny city street",
  },
];

export const stackGroups = [
  {
    title: "Languages",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "C",
      "R",
      "SQL",
      "HTML / CSS",
    ],
  },
  {
    title: "Interfaces & APIs",
    items: [
      "React",
      "Next.js",
      "Tailwind",
      "Node.js",
      "Express",
      "FastAPI",
      "Socket.io",
      "Leaflet",
    ],
  },
  {
    title: "Data & intelligence",
    items: [
      "NumPy",
      "pandas",
      "SciPy",
      "SpaCy",
      "Pydantic",
      "Power BI",
      "Google Gemini API",
      "PostgreSQL",
    ],
  },
  {
    title: "Tools & workflows",
    items: [
      "Git / GitHub",
      "Docker",
      "Linux",
      "Supabase",
      "Power Automate",
      "n8n",
      "pdf-lib",
      "Markdown",
      "VS Code",
      "PyCharm",
      "Eclipse",
    ],
  },
];
