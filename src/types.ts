export interface SubWork {
  title: string;
  category: string;
  image: string;
  cursorLabel: string;
  description?: string;
  isVideo?: boolean;
  videoUrl?: string;
  youtubeUrl?: string;
  images?: string[];
  imageDetails?: {
    title: string;
    category: string;
    description: string;
  }[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTechnicalSpec {
  title: string;
  description: string;
}

export interface FinalArtifact {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export interface JournalSubmission {
  journal: string;
  publisher: string;
  acceptanceRate: string;
  decisionTime: string;
  submissionToAcceptance: string;
  onlinePub: string;
  rank: number;
}

export interface ResearchPaper {
  title: string;
  authors: string;
  abstract: string;
  journalQueue: JournalSubmission[];
}

export interface PatentInfo {
  title: string;
  patentNo: string;
  authority: string;
  date: string;
}

export interface AwardInfo {
  title: string;
  awardingBody: string;
  year: string;
  description: string;
  medal?: string;
}

export interface CommercializationInfo {
  company: string;
  funding: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  year: string;
  role?: string;
  company?: string;
  location?: string;
  method?: string;
  focus?: string;
  dimensions?: string;
  artist?: string;
  medium?: string;
  challengeTitle: string;
  challengeDescription: string;
  challengeDescriptionEn?: string;
  coverImage: string;
  youtubeId?: string;
  subWorks?: SubWork[];
  technicalSpecs?: ProjectTechnicalSpec[];
  metrics?: ProjectMetric[];
  finalGallery?: FinalArtifact[];
  conceptGallery?: FinalArtifact[];
  researchPapers?: ResearchPaper[];
  patents?: PatentInfo[];
  awards?: AwardInfo[];
  commercialization?: CommercializationInfo;
  keywords?: string[];
  coreSlogan?: string;
  coreDescription?: string;
  backgroundProblem?: string;
  userResearch?: {
    methodology: string;
    conclusion: string;
  };
  stakeholders?: string[];
  kinectSystem?: {
    system: string;
    steps: string[];
    games: string;
  };
  serviceTouchpoints?: {
    page: string;
    desc: string;
    img?: string;
  }[];
  sustainabilityFeatures?: {
    solar_energy: string;
    rainwater_collection: string;
  };
  designOutput?: {
    structures: string[];
    artisticStyle: string;
    journey: string[];
  };
  localImages?: {
    hero_banner?: string;
    kinect_analysis?: string;
    ui_screens?: string;
    usage_scenario?: string;
    architecture_plan?: string;
    hero_mockup?: string;
    hardware_structure?: string;
    data_charts?: string;
    app_low_fidelity?: string;
    app_visual_ui?: string;
    storyboard?: string;
  };
  painPoints?: string[];
  kanoModelConclusion?: string;
  hardwareExperimentation?: {
    components: string[];
    dataAnalysisConclusion: {
      middle_sole_area: string;
      forefoot_area: string;
      rear_heel_heel: string;
    };
  };
  appArchitecture?: {
    coreFunctions: {
      ankle_model: string;
      progress_display: string;
      task_system: string;
      recommendations: string;
      tutorials_and_community: string;
    };
    tabNavigation: {
      tab: string;
      features: string[];
    }[];
  };
  visualIdentity?: {
    mainColor: string;
    auxiliaryColor: string;
    typography: string[];
    uiStyle: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "accutone",
    title: "ACCUTONE",
    subtitle: "Graphic & 3D product development, premium packaging, and precision visualization of consumer electronics.",
    category: "product",
    categoryLabel: "Commercial Hardware",
    year: "2026",
    role: "3D/Graphic Designer",
    company: "Accutone Technologies Limited",
    location: "Hong Kong",
    challengeTitle: "The Challenge & Objective",
    challengeDescription: "In an era dominated by transient digital experiences, the challenge was to create a physical artifact that embodies 'Acoustic Permanence.' The objective was to redesign the internal chamber architecture to minimize standing waves while maintaining a form factor that speaks to the professional audiophile.",
    challengeDescriptionEn: "We focused on the intersection of high-precision CNC machining and ergonomic comfort, ensuring the weight distribution remains balanced for extended studio sessions. Every radius and chamfer was calculated to serve both acoustic performance and tactile elegance.",
    coverImage: "/src/assets/images/regenerated_image_1781757091891.png",
    subWorks: [
      {
        title: "Graphic Design, Poster & Packaging Suite",
        category: "Graphic Design",
        image: "/src/assets/images/包装/1.png",
        cursorLabel: "VIEW",
        description: "Custom-developed brand packaging setups, thematic promotional posters, and creative comic designs crafted to augment narrative-driven product identity and engagement.",
        images: [
          "/src/assets/images/包装/1.png",
          "/src/assets/images/包装/2.png",
          "/src/assets/images/包装/3.png"
        ]
      },
      {
        title: "IFA 2026 Booth Design",
        category: "Spatial Design",
        image: "/src/assets/images/Space design showcase/Image20260619182355.png",
        cursorLabel: "SPACE",
        description: "The official spatial presentation and interactive product experience zones at the IFA Berlin exhibition hall, maximizing crowd engagement and fluid demo structures.",
        images: [
          "/src/assets/images/Space design showcase/Image20260619182355.png",
          "/src/assets/images/Space design showcase/0b48c4f1a240877267dfeed5f1d9f88c.png",
          "/src/assets/images/Space design showcase/{A0EBCBED-CB42-49CC-9C55-F5EE0670A8C3}.png",
          "/src/assets/images/Space design showcase/e1aceade5b928106fc0ba45a3b28e964.png"
        ]
      },
      {
        title: "Accutone Polar Mini 8: Complete Product Lifecycle & Development",
        category: "Product Development & Launch",
        image: "/src/assets/images/POLAR MINI 8 Poster.png",
        cursorLabel: "CMF",
        description: "A comprehensive showcase of the Accutone Polar Mini 8 design lifecycle, documenting every critical milestone from initial 3D digital CAD construction and CMF prototyping validation to hyper-realistic Keyshot rendering and official launch key visual design.",
        images: [
          "/src/assets/images/POLAR MINI 8 Poster.png",
          "/src/assets/images/建模/1.jpg",
          "/src/assets/images/建模/2.png",
          "/src/assets/images/建模/3.jpg"
        ],
        imageDetails: [
          {
            title: "Official Launch Poster & Design Overview",
            category: "04 / Product Launch",
            description: "The official launch poster details the final aesthetic language and CMF specifications of the Accutone Polar Mini 8, seamlessly uniting advanced physical mechanical details with core acoustic engineering principles."
          },
          {
            title: "3D CAD Modeling & Structural Engineering",
            category: "01 / Digital Prototyping",
            description: "Precise 3D CAD modeling to balance acoustic cavity volume and physical proportions. Constructing the device chassis from the ground up to guarantee flawless acoustic resonance space and structural interface integrity."
          },
          {
            title: "CMF Evaluation & KeyShot Lighting Refinement",
            category: "02 / Rendering & CMF",
            description: "Leveraging KeyShot for realistic physical material calibration and studio lighting simulations. Critically evaluating the surface finish of anodized aluminum and subtle edge bevels to define a high-end consumer product aesthetic."
          },
          {
            title: "Production-Ready Detail Engineering & Fine Tuning",
            category: "03 / Assembly Details",
            description: "Final optimization of parting lines, hinge kinematics, and physical clearance tolerances, ensuring a seamless interface flow from digital renders to high-yield mass production."
          }
        ]
      },

      {
        title: "Converse 95 Product Reel",
        category: "Product Commercial",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065",
        cursorLabel: "PLAY",
        description: "Modern commercial showcasing the Converse 95 premium active headset, with standard-setting ergonomics and digital hybrid ANC controls.",
        isVideo: true,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-headphones-on-a-neon-illuminated-background-44331-large.mp4",
        youtubeUrl: "https://youtu.be/koPXruGzKpo",
        images: [
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065",
          "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2070",
          "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?q=80&w=2074"
        ]
      },
      {
        title: "Accutone UB 380 Spec Reel",
        category: "Product Commercial",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070",
        cursorLabel: "PLAY",
        description: "Technical spec breakdown video exhibiting the Accutone UB 380 with 300-degree rotating boom, noise cancellation, and flexible high-grade styling.",
        isVideo: true,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-headphones-resting-on-a-desk-with-glowing-neon-light-44335-large.mp4",
        youtubeUrl: "https://youtu.be/LjJ779ugsCw",
        images: [
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065"
        ]
      }
    ],
    technicalSpecs: [
      {
        title: "Brand Layout & Packaging Identity",
        description: "Executing complex print setups, vector layouts, and user-centric brand stories."
      },
      {
        title: "Sustainable Packaging",
        description: "Designing 100% recyclable molded pulp structures for global distribution."
      },
      {
        title: "Spatial Logic",
        description: "Optimizing visitor flow and interactive product displays in international trade shows."
      }
    ],
    metrics: [
      { label: "Chamber Vol", value: "12.4 cc" },
      { label: "CNC Tolerance", value: "±0.02 mm" },
      { label: "Recyclability", value: "100%" }
    ]
  },
  {
    id: "auramist",
    title: "AURAMIST",
    subtitle: "A Novel Portable Water Misting System for Personal Care",
    category: "product",
    categoryLabel: "Inclusive Research & Assistive Design",
    year: "2023 — 2025",
    role: "Research & Design Lead",
    company: "Hong Kong Baptist University & Hydroverse",
    location: "Hong Kong / Geneva",
    focus: "Fluid Dynamics & Inclusive Design",
    challengeTitle: "Inclusive Design for Mobility Enhancement",
    challengeDescription: "The transition to requiring physical assistance for personal hygiene is a deeply challenging life experience, often accompanied by a loss of individual independence and personal dignity. Existing assistive technologies focus almost exclusively on basic functional utility, neglecting the psychological and emotional well-being of the users. AuraMist addresses this gap by introducing the first portable, zero-installation, intelligent water-misting system designed for wheelchair-bound and mobility-impaired individuals.",
    challengeDescriptionEn: "Formulated using a rigorous participatory design methodology, the system integrates dual-intensity misting technology with AI-powered controls. Clinical and fluid-dynamics validation proved that AuraMist cuts water consumption by 76% compared to standard showers, while maintaining standard heat envelope distribution and skin comfort. This project represents a scalable model of academic excellence translating into a high-impact commercial product.",
    coverImage: "/src/assets/images/regenerated_image_1781772629136.jpg",
    youtubeId: "JCjDWmrhugM",
    metrics: [
      { label: "Water Saving", value: "76%" },
      { label: "Global Audience", value: "80M+" },
      { label: "KT Funding", value: "HK$0.89M" },
      { label: "International Awards", value: "2 Major" }
    ],
    technicalSpecs: [
      {
        title: "Dual-Intensity Misting",
        description: "Engineered high-efficiency micro-jets that atomize water flow into specific spatial cones, maximizing surface warmth while conserving 76% of resources."
      },
      {
        title: "Digital Thermal Mixing",
        description: "AI-guided responsive mixer stabilizes temperature fluctuations instantly, protecting sensory-sensitive skin from accidental thermal injuries."
      },
      {
        title: "Adaptive Rail Systems",
        description: "Configurable in single-rail or dual-rail modes, facilitating zero-transfer bathing on wheelchair tracks or specialized clinical care beds."
      },
      {
        title: "Voice-Actuated UI Grid",
        description: "Integrated voice-recognition and offline wireless interfaces, ensuring disabled users maintain high-autonomy hands-free usage."
      }
    ],
    subWorks: [
      {
        title: "High-Speed Laser Shadowgraphy",
        category: "Laboratory Fluid Verification",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2070",
        cursorLabel: "FLUIDITY",
        description: "Iteratively tracking spray patterns and micro-droplet sizes under a 50,000 frames/sec laser-gated optical array to optimize dermal surface coverage.",
        images: [
          "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2070",
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080"
        ]
      },
      {
        title: "Co-Design Workshops",
        category: "Participatory Empathy Mapping",
        image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2074",
        cursorLabel: "EMPATHY",
        description: "Direct immersive engagement sessions with wheelchair users, clinical therapists, and home-care providers to define raw mobility constraints and emotional pain points.",
        images: [
          "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2074",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2090"
        ]
      },
      {
        title: "Dynamic Flow Actuation",
        category: "Hardware Circuit Design",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
        cursorLabel: "HARDWARE",
        description: "Development of micro-controller routing programs and dual-pump actuators to toggle and shift fluid paths (high-pressure Route A or low-pressure Route B) based on active voice inputs.",
        images: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
          "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=2070"
        ]
      },
      {
        title: "The 50th Geneva Inventions Show",
        category: "Global Scientific Recognition",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070",
        cursorLabel: "GENEVA",
        description: "Presenting the zero-installation physical apparatus to international academic and industrial panels, which awarded the project an official peer-evaluated Silver Medal.",
        images: [
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070",
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        ]
      }
    ],
    finalGallery: [
      {
        title: "System Prototyping & Components",
        description: "This image displays the initial hardware configuration, including Arduino controls, servo motors, and joystick inputs alongside the 3D-printed modular arm components, illustrating the foundational mechanical and electronic assembly.",
        image: "/src/assets/images/auramist/1.jpg",
        badge: "PROTOTYPING"
      },
      {
        title: "Design Schematics",
        description: "A comprehensive technical breakdown of the system, mapping out the mist nozzle placement, integrated circuitry, water tank location, and motor-driven arm movement for single and double-rail configurations.",
        image: "/src/assets/images/auramist/2.jpg",
        badge: "DESIGN SCHEMATICS"
      },
      {
        title: "Thermal Testing",
        description: "Functional validation using thermal imaging and precision thermometers to monitor temperature outputs, ensuring the misting system maintains a safe, consistent thermal environment for the user.",
        image: "/src/assets/images/auramist/3.jpg",
        badge: "THERMAL TESTING"
      },
      {
        title: "Heat Distribution Analysis",
        description: "Visual data analysis captured via infrared thermography, confirming the effective heat distribution and coverage of the misting mechanism across the user's upper body area.",
        image: "/src/assets/images/auramist/4.jpg",
        badge: "THERMAL ANALYSIS"
      },
      {
        title: "Material Surface Interaction",
        description: "A microscopic or experimental view of droplet formation and surface interaction, highlighting the fluid dynamics research conducted to ensure uniform mist distribution.",
        image: "/src/assets/images/auramist/5.jpg",
        badge: "FLUID DYNAMICS"
      },
      {
        title: "Full System Integration (Test Environment)",
        description: "The assembled prototype featuring the Hydroverse main unit and misting arm positioned with a mannequin, demonstrating the completed mechanical integration before real-world user testing.",
        image: "/src/assets/images/auramist/6.jpg",
        badge: "INTEGRATION"
      },
      {
        title: "Iteration & Functional Testing",
        description: "A controlled testing environment showing the system operational with a wheelchair user surrogate, validating ergonomics and physical clearance.",
        image: "/src/assets/images/auramist/7.jpg",
        badge: "FUNCTIONAL TESTING"
      },
      {
        title: "Public Exhibition",
        description: "The Hydroverse system showcased at a public innovation event, where the team engages with visitors, demonstrating the real-world accessibility impact for users with mobility impairments.",
        image: "/src/assets/images/auramist/8.jpg",
        badge: "EXHIBITION"
      },
      {
        title: "Project Recognition & Team",
        description: "The team representing the project at the \"InnoCarnival 2025\" under the Hong Kong Baptist University Knowledge Transfer Office, celebrating the successful public demonstration and development of the initiative.",
        image: "/src/assets/images/auramist/9.jpg",
        badge: "RECOGNITION"
      }
    ],
    conceptGallery: [
      {
        title: "Conceptual Design Appearance",
        description: "Optimize the overall appearance design using generative AI tools.",
        image: "/src/assets/images/auramist/10.jpeg",
        badge: "AESTHETIC SCHEME"
      },
      {
        title: "Conceptual Design Appearance",
        description: "Optimize the overall appearance design using generative AI tools.",
        image: "/src/assets/images/auramist/11.jpeg",
        badge: "DETAIL DESIGN"
      },
      {
        title: "Conceptual Design Appearance",
        description: "Optimize the overall appearance design using generative AI tools.",
        image: "/src/assets/images/auramist/12.jpeg",
        badge: "SYS ARCHITECTURE"
      },
      {
        title: "Conceptual Design Appearance",
        description: "Optimize the overall appearance design using generative AI tools.",
        image: "/src/assets/images/auramist/13.jpeg",
        badge: "ERGONOMICS STUDY"
      },
      {
        title: "Conceptual Design Appearance",
        description: "Optimize the overall appearance design using generative AI tools.",
        image: "/src/assets/images/auramist/14.jpeg",
        badge: "CLINICAL CONCEPT"
      }
    ],
    researchPapers: [
      {
        title: "A Novel Portable Water Misting System for Personal Care: Design, Performance, and Water Management Implications",
        authors: "Lai-yin Qin*, Lu Haoxuan, Kin Cheung, Chen Bing",
        abstract: "This paper details the design, performance, and water management implications of a novel portable water misting system for personal care. Known as AuraMist, it is engineered to provide a safe, comfortable, and water-efficient bathing solution for individuals with mobility limitations. We present two mechanical designs—a single-rail model for general use and a double-rail model for enhanced stability. The core of the system is its dual-intensity misting technology which, in conjunction with a digital water-mixer for precise temperature control, reduces water consumption by 76% while maintaining high levels of user satisfaction and thermal envelopes across healthcare facilities.",
        journalQueue: [
          {
            journal: "Nature Water",
            publisher: "Nature Portfolio",
            acceptanceRate: "Est. <10%",
            decisionTime: "~70-100 Days",
            submissionToAcceptance: "~180-250 Days",
            onlinePub: "~15-25 Days",
            rank: 1
          },
          {
            journal: "Water Research",
            publisher: "Elsevier / IWA",
            acceptanceRate: "~15%",
            decisionTime: "~32 Days",
            submissionToAcceptance: "~85-150 Days",
            onlinePub: "~10 Days",
            rank: 2
          },
          {
            journal: "Sustainability",
            publisher: "MDPI",
            acceptanceRate: "~42%",
            decisionTime: "~18 Days",
            submissionToAcceptance: "~39 Days",
            onlinePub: "~4 Days",
            rank: 3
          },
          {
            journal: "Water (MDPI)",
            publisher: "MDPI",
            acceptanceRate: "~43%",
            decisionTime: "~17 Days",
            submissionToAcceptance: "~38 Days",
            onlinePub: "~4 Days",
            rank: 4
          }
        ]
      },
      {
        title: "From Empathy to Innovation: A Design Thinking Approach to Reimagining the Bathing Experience for Mobility-Impaired Individuals",
        authors: "Lai-yin Qin*, Lu Haoxuan, Kin Cheung, Chen Bing",
        abstract: "The transition to requiring assistance for personal hygiene causes a loss of independence and traditional dignity. Conventional approaches to developing assistive technologies focus purely on functional solutions without fully addressing the psychological and emotional needs of users. This paper presents an exhaustive case study on the design and realization of AuraMist using a design-thinking methodology across 5 phases: Empathize, Define, Ideate, Prototype, and Test. A key outcome of this process was a detailed clinical workflow analysis that identified and dismantled major traditional transfers and physical hazards.",
        journalQueue: [
          {
            journal: "Design Studies",
            publisher: "Elsevier",
            acceptanceRate: "~8-10%",
            decisionTime: "~60-120 Days",
            submissionToAcceptance: "~190 Days",
            onlinePub: "~15 Days",
            rank: 1
          },
          {
            journal: "Intl. Journal of Design",
            publisher: "Taiwan Society of Design Science",
            acceptanceRate: "Est. ~10%",
            decisionTime: "~90-120 Days",
            submissionToAcceptance: "~200-300 Days",
            onlinePub: "~30-60 Days",
            rank: 2
          },
          {
            journal: "CoDesign",
            publisher: "Taylor & Francis",
            acceptanceRate: "Est. ~15-20%",
            decisionTime: "~80-100 Days",
            submissionToAcceptance: "~180-240 Days",
            onlinePub: "~20-30 Days",
            rank: 3
          },
          {
            journal: "She Ji",
            publisher: "Elsevier / Tongji",
            acceptanceRate: "~12%",
            decisionTime: "~45-100 Days",
            submissionToAcceptance: "~165 Days",
            onlinePub: "~15 Days",
            rank: 4
          }
        ]
      }
    ],
    patents: [
      {
        title: "Bathing Apparatus",
        authority: "Patents Registry, Intellectual Property Department of Hong Kong",
        patentNo: "32024099227.3",
        date: "Feb 2025"
      },
      {
        title: "Bathing Apparatus (Chinese Utility Model)",
        authority: "CNIPA (National Intellectual Property Administration of China)",
        patentNo: "20242271872.0",
        date: "Nov 2024"
      },
      {
        title: "Water Misting System for Enhancing Bathing Experience for Wheelchair",
        authority: "USPTO (United States Patent Registry)",
        patentNo: "US 63/596,665",
        date: "2023"
      }
    ],
    awards: [
      {
        title: "Silver Medal",
        awardingBody: "50th International Exhibition of Inventions Geneva",
        year: "2025",
        medal: "SILVER",
        description: "Highly prestigious worldwide validation, establishing scientific, clinical, and spatial design credibility."
      },
      {
        title: "Thailand Award for Best Invention and Innovation",
        awardingBody: "National Research Council of Thailand (NRCT)",
        year: "2025",
        medal: "BEST_INVENTION",
        description: "Special recognition for excellence in human-centred social healthcare impact and water conservation."
      }
    ]
  },
  {
    id: "defensive-pulse",
    title: "DEFENSIVE PULSE ARMATURE",
    subtitle: "Bio-mimetic Wearable Kinetic Sculpture",
    category: "product",
    categoryLabel: "Interactive Sculpture",
    year: "2026",
    artist: "Nick Lu (Lu Haoxuan)",
    medium: "Wearable Interactive Sculpture",
    focus: "Biometric Emotion Externalization",
    dimensions: "40 x 40 x 35 cm",
    challengeTitle: "Freudian Defense & Lion-fish Bio-Metaphor",
    challengeDescription: "This device utilizes heart rate sensors to drive mechanical components, dynamically simulating the defensive expansion of a lionfish. As accumulated negative emotions ferment (manifested through defense mechanisms like social avoidance or emotional numbness), the artwork references Anna Freud's (1936) psychological defense structures—specifically displacement, redirecting internal anxiety toward concrete, safe physical releases—to provide a tactile medium for invisible human states.",
    challengeDescriptionEn: "Inspired by the Pterois (Lion-fish) which transforms venomous spines into dynamic shields as a silent language of deep-sea survival, this wearable interactive helmet externalizes the invisible 'black box of the human mind'. Utilizing clinical baselines where 90 bpm serves as the critical index for anxiety, the system interprets heart-rate spikes to actuate active servo networks. When anxiety triggers, structural fins expand dynamically, allowing wearers to transfer and communicate negative states smoothly.",
    coverImage: "/src/assets/images/regenerated_image_1781773447864.jpg",
    youtubeId: "3dnjJjw20d0", 
    metrics: [
      { label: "Critical Trigger", value: "90 BPM" },
      { label: "Actuators", value: "Dual PWM Servos" },
      { label: "Response Delay", value: "<50 ms" }
    ],
    subWorks: [
      {
        title: "Project Identity",
        category: "01 / Identity",
        image: "/src/assets/images/Defensive pulse armature/1.jpg",
        cursorLabel: "IDENTITY",
        description: "Defensive Pulse Armature. Key Tags: 3D printing, Mechanical structure, Emotion visualization, Interactive installation. Main high-quality render of the helmet device."
      },
      {
        title: "Background (The Theory)",
        category: "02 / Psychology",
        image: "/src/assets/images/Defensive pulse armature/2.jpg",
        cursorLabel: "THEORY",
        description: "Concept: Quote Sigmund Freud regarding unexpressed emotions. Mechanism: Describe the vicious cycle of 'internal friction' and brain-activated defense mechanisms such as repression, denial, projection, regression, and displacement."
      },
      {
        title: "Displacement (Deep Dive)",
        category: "03 / Displacement",
        image: "/src/assets/images/Defensive pulse armature/3.jpg",
        cursorLabel: "DEEP DIVE",
        description: "Definition: Explain displacement as a defense mechanism where dangerous emotions are transferred to a safer situation. Supporting Evidence: Include the research context from Anna Freud (1936) and the referenced studies on stress and emotional catharsis."
      },
      {
        title: "Thinking Process (Data & Biometrics)",
        category: "04 / Data Logic",
        image: "/src/assets/images/Defensive pulse armature/4.jpg",
        cursorLabel: "BIO-LOGIC",
        description: "Logic: Detail the connection between anxious states and heart rate. State that 90 bpm is the critical value for judging anxiety."
      },
      {
        title: "Thinking Process (Interaction Flow)",
        category: "04 / Flowchart",
        image: "/src/assets/images/Defensive pulse armature/5.jpg",
        cursorLabel: "FLOWCHART",
        description: "Interaction Flow: Display the flowchart of the responsive feedback loop: Emotions ──> Wearable Device ──> Externalization (via heart rate, body temperature, and brain wave detection)."
      },
      {
        title: "Inspiration (Nature & Positioning)",
        category: "05 / Inspiration",
        image: "/src/assets/images/Defensive pulse armature/6.jpg",
        cursorLabel: "BIOMETRIC",
        description: "Inspiration: Lion-fish (Pterois) transforming venomous spines into a silent language of survival. Design Positioning: Use a comparison framework to map the design: Defensive vs. Offensive, Invisibility vs. Visibility, and Organic vs. Mechanical."
      },
      {
        title: "Transformation (The Bridge)",
        category: "06 / Transition",
        image: "/src/assets/images/Defensive pulse armature/7.jpg",
        cursorLabel: "BRIDGE",
        description: "Mapping: Present the transition from Emotional Displacement ──> Lion-fish Mechanism ──> Wearable Interaction. Value Proposition: Emphasize how the device provides a new form of interactive emotional communication by visualizing internal states."
      },
      {
        title: "System Design (Technical Implementation)",
        category: "07 / Tech Core",
        image: "/src/assets/images/Defensive pulse armature/8.jpg",
        cursorLabel: "HARDWARE",
        description: "Hardware: Arduino Uno as the mainboard. Mechanism: Explain the use of Servo motor A (dorsal fin simulation) and Servo motor B (pectoral fin simulation), controlled by heart rate data."
      },
      {
        title: "Development (Sketch & Ideation)",
        category: "08 / Development",
        image: "/src/assets/images/Defensive pulse armature/9.jpg",
        cursorLabel: "IDEATION",
        description: "Ideation: Present initial sketches focusing on structural aesthetics, futuristic form, and kinetic art."
      },
      {
        title: "Development (Prototyping Iterations)",
        category: "08 / Linkage",
        image: "/src/assets/images/Defensive pulse armature/10.jpg",
        cursorLabel: "PROTOTYPES",
        description: "Prototyping Iterations: Document the two-stage testing process. Highlight the refinement of the fin skeleton to move from a 'messy' movement to a functional linear motion structure."
      },
      {
        title: "Refinement (The Final Form)",
        category: "09 / Refinement",
        image: "/src/assets/images/Defensive pulse armature/11.jpg",
        cursorLabel: "FINAL FORM",
        description: "Final Details: Showcase the redesigned backbone and support skeleton based on the linear motion requirement."
      }
    ],
    finalGallery: [
      {
        title: "01 / Prototyping: Small-Scale Validation Model",
        description: "A handheld physical model used to test the overall look, feel, and structural curves of the skull-fitting helmet. It verified the physical silhouette before executing full-scale 3D prints.",
        image: "/src/assets/images/regenerated_image_1781100784824.jpg",
        badge: "TEST ASSEMBLY"
      },
      {
        title: "02 / Mechanism: Refined Linear Slide & Rail",
        description: "Detailed view of the active mechanical ribs and motor integration. Re-designed the slider track based on the fish's vertebrae, successfully reducing mechanical friction and allowing smooth pull-rising action of individual shapes without jamming.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
        badge: "HARDWARE LINKAGE"
      },
      {
        title: "03 / Realization: Completed Active Defense Sculpture",
        description: "The fully printed and assembled wearable kinetic sculpture standing in high-speed, anxiety-triggered state. The physical spines rise collectively, creating a literal spatial buffer as defensive visual language.",
        image: "/src/assets/images/regenerated_image_1781103736413.jpg",
        badge: "COMPLETED ARTIFACT"
      }
    ]
  },
  {
    id: "everyonestage",
    title: "ACADEMIC ARCHIVE",
    subtitle: "Selected Student Works & Academic Portfolios",
    category: "exhibition",
    categoryLabel: "Academic Archive",
    year: "2020 - 2024",
    role: "Graduate Portfolio",
    method: "Speculative & Hard System Design",
    focus: "Multi-Disciplinary Design",
    location: "Global Academic Archives",
    challengeTitle: "Speculative Interventions & Physical Human Interfaces",
    challengeDescription: "A curated academic retrospective documenting five main milestone portfolios completed during studies abroad. Comprised of interactive therapeutic wear, eco-architectural rain receptors, speculative athletic ergonomics, organic fine-art installations, and communal relational art, this collection maps design interventions across the scales of body, community, and planetary landscape.",
    challengeDescriptionEn: "Bridging robust user-centered research, mechanical kinetic modeling, and speculative design narratives. The five central works—RehabStride, EverOneStage, SHEports, The Apology to the Black Sheep, and The Swim For You—serve as design blueprints to prompt physical rehabilitation, resource conservation, gender accessibility, critical ecological awareness, and cultural preservation.",
    coverImage: "/src/assets/images/cover11.jpg",
    metrics: [
      { label: "Selected Projects", value: "5 Pieces" },
      { label: "Studies Span", value: "2020 - 2024" },
      { label: "Speculator Design", value: "Gold Prize" },
      { label: "System Fidelity", value: "Production" }
    ],
    keywords: ["Academic Retrospective", "Speculative Systems", "Wearable Technology", "Interactive Architecture"],
    subWorks: [
      {
        title: "01 / RehabStride",
        category: "01 / REHABSTRIDE — MEDICAL RETRAINING WEAR",
        image: "/src/assets/images/留学作品集/portfolio-02.jpg",
        cursorLabel: "REHABSTRIDE",
        description: "RehabStride is an intelligent rehabilitation equipment and platform designed for patients with Chronic Ankle Instability (CAI). It features personalized, scientific rehabilitation plans, real-time monitoring of rehabilitation progress, and a user-friendly application for tracking and medical interaction. By balancing scientific rehabilitation processes with an enjoyable, individualized user experience, RehabStride significantly improves patient adherence and long-term recovery outcomes.",
        images: [
          "/src/assets/images/留学作品集/portfolio-02.jpg",
          "/src/assets/images/留学作品集/portfolio-03.jpg",
          "/src/assets/images/留学作品集/portfolio-04.jpg",
          "/src/assets/images/留学作品集/portfolio-05.jpg",
          "/src/assets/images/留学作品集/portfolio-06.jpg",
          "/src/assets/images/留学作品集/portfolio-07.jpg",
          "/src/assets/images/留学作品集/portfolio-08.jpg"
        ],
        imageDetails: [
          {
            title: "RehabStride Intelligent Ankle Device",
            category: "01 / Concept Innovation",
            description: "An intelligent rehabilitation equipment and platform designed to address Chronic Ankle Instability (CAI) with high scientific specificity."
          },
          {
            title: "Customized Ergonomic Attachment",
            category: "02 / Product Design",
            description: "A lightweight, flexible sleeve structure optimized for continuous joint support, secure fastening, and muscle thermal regulation."
          },
          {
            title: "Biomimetic Strain & Flex Sensors",
            category: "03 / Hardware Engineering",
            description: "Embedded micro-strain gauges and angle-sensing channels tracking multi-directional gait patterns and micro-movements of ankle joints."
          },
          {
            title: "Personalized Rehabilitation Plans",
            category: "04 / Interactive Science",
            description: "Provides adaptive, scientifically validated exercise workflows tailored to the patient's real-time ligament recovery phases."
          },
          {
            title: "Real-Time Gait Analysis Interface",
            category: "05 / Companion Dashboard",
            description: "Allows direct tracking of angle deviations and load parameters, offering medical professionals rich visual data on progress."
          },
          {
            title: "Adaptive Haptic Feedback Loop",
            category: "06 / Smart Controller",
            description: "Instantly alerts CAI patients via subtle vibrational signals when joint load limits or critical angle thresholds are exceeded."
          },
          {
            title: "Enjoyable Patient Adherence Experience",
            category: "07 / Design Significance",
            description: "Balances strict medical guidelines with gamified visual milestones, ensuring maximum engagement, confidence, and adherence."
          }
        ]
      },
      {
        title: "02 / EverOneStage",
        category: "02 / EVERONESTAGE — MONSOON WATER COLLECTOR",
        image: "/src/assets/images/留学作品集/portfolio-09.jpg",
        cursorLabel: "EVERONESTAGE",
        description: "An eco-architectural pavilion prototype designed for high-density public areas in Kowloon, Hong Kong. It operates daily as a net-positive resource hub—employing a dual-flow siphon roof to harvest 1,500 liters of rain water monthly while utilizing low-latency Kinect computer vision cameras to host self-service public performance art.",
        images: [
          "/src/assets/images/留学作品集/portfolio-09.jpg",
          "/src/assets/images/留学作品集/portfolio-10.jpg",
          "/src/assets/images/留学作品集/portfolio-11.jpg",
          "/src/assets/images/留学作品集/portfolio-12.jpg",
          "/src/assets/images/留学作品集/portfolio-13.jpg",
          "/src/assets/images/留学作品集/portfolio-14.jpg",
          "/src/assets/images/留学作品集/portfolio-15.jpg",
          "/src/assets/images/留学作品集/portfolio-16.jpg"
        ],
        imageDetails: [
          {
            title: "Project Overview",
            category: "01 / Platform Overview",
            description: "An overview of the project, introducing its positioning as an inclusive, participatory, and sustainable performance platform."
          },
          {
            title: "Background & Context",
            category: "02 / Socio-Cultural Research",
            description: "Background research analyzing the impact of the rise of the internet and social media on traditional theater performances."
          },
          {
            title: "Stage Classification",
            category: "03 / Typology Studies",
            description: "Functional classification of diverse performance venues and their audience reach/popularity within modern communities."
          },
          {
            title: "Sustainability & Material Analysis",
            category: "04 / Eco-Material Lifecycle",
            description: "Environmental assessments and pollution challenges concerning staging construction materials, including electricals, coatings, and panels."
          },
          {
            title: "Self-Service Mode & Public Participation",
            category: "05 / Collaborative Ecology",
            description: "Analysis of the operational logic of self-service performance modes, along with the required synergy between society, government, and market."
          },
          {
            title: "User Research & Insights",
            category: "06 / Participatory Insights",
            description: "Surveys and in-depth interviews capturing public expectations on sustainability, community interaction, and public staging."
          },
          {
            title: "Design Strategy & Brainstorming",
            category: "07 / Tactical Brainstorming",
            description: "Core design strategies highlighting waste management, art galleries integration, interactive installations, and energy-conserving green lighting."
          },
          {
            title: "User Journey & Co-creation",
            category: "08 / Cultural Co-Creation",
            description: "User journey maps and co-creation frameworks demonstrating how booking systems, social interaction, and eco-cycles form a healthy cultural loops."
          }
        ]
      },
      {
        title: "03 / SHEports",
        category: "03 / SHEPORTS — SPECULATIVE ACCESSSIBLE GEAR",
        image: "/src/assets/images/留学作品集/portfolio-17.jpg",
        cursorLabel: "SHEPORTS",
        description: "SHEports is a speculative design framework and athletic gear kit engineered to address physiological safety discrepancies in extreme racing sports. Combining body-scanning algorithms with custom carbon-fiber weave patterns, SHEports creates a modular safety harness and rib guardian specifically adjusted to female torso geometry, protecting internal organs against high impact forces.",
        images: [
          "/src/assets/images/留学作品集/portfolio-17.jpg",
          "/src/assets/images/留学作品集/portfolio-18.jpg",
          "/src/assets/images/留学作品集/portfolio-19.jpg",
          "/src/assets/images/留学作品集/portfolio-20.jpg",
          "/src/assets/images/留学作品集/portfolio-21.jpg",
          "/src/assets/images/留学作品集/portfolio-22.jpg",
          "/src/assets/images/留学作品集/portfolio-23.jpg"
        ],
        imageDetails: [
          {
            title: "Project Overview & Significance",
            category: "01 / Project Significance",
            description: "Project overview and significance, defining the platform's core value as a one-stop sports service dedicated entirely to women."
          },
          {
            title: "Gender Inequality in Sports",
            category: "02 / Socio-Cultural Study",
            description: "An in-depth analysis of the current status of gender inequality in physical sports, exploring historical context and statistical data."
          },
          {
            title: "Problem Observation",
            category: "03 / Problem Analysis",
            description: "Observational studies highlighting outdated facilities, general resource scarcity, and the lack of companionship for women in team sports."
          },
          {
            title: "Research & Questionnaire Insights",
            category: "04 / Quantitative Research",
            description: "Survey conclusions analyzing physiological differences, cultural stereotypes, and public perspectives on mixed-gender sports."
          },
          {
            title: "Pain Points & User Needs",
            category: "05 / Human-Centered Design",
            description: "From pain points to user needs, summarizing the realistic challenges and expectations women face when entering athletic spaces."
          },
          {
            title: "Service & Platform Architecture",
            category: "06 / Architecture",
            description: "Detailed service architecture illustrating mobile app functionalities, spatial planning, and female-only athletic facility distribution."
          },
          {
            title: "Design Components & User Interface",
            category: "07 / Visual Systems",
            description: "User interface and design components, including application wireframes, site maps, and custom visual color palettes."
          },
          {
            title: "User Scenario & Future Advocacy",
            category: "08 / Scenario Simulation",
            description: "User scenario simulations showcasing the complete journey from entry to community building, advocating for long-term gender equity."
          }
        ]
      },
      {
        title: "04 / The Apology to the Black Sheep",
        category: "04 / THE APOLOGY TO THE BLACK SHEEP — INSTALLATION",
        image: "/src/assets/images/留学作品集/portfolio-24.jpg",
        cursorLabel: "BLACK SHEEP",
        description: "An immersive multimedia gallery installation and critical design inquiry apologizing to the industrial-damaged landscapes of local agricultural communities. Combining a slow-moving, robotic terracotta soil-agitator with a synthetic eco-acoustic noise floor, the project invites audience steps to trigger tremors in regional soil vessels, exposing the immediate acoustic anxiety of human-caused environmental shifts.",
        images: [
          "/src/assets/images/留学作品集/portfolio-24.jpg",
          "/src/assets/images/留学作品集/portfolio-25.jpg",
          "/src/assets/images/留学作品集/portfolio-26.jpg",
          "/src/assets/images/留学作品集/portfolio-27.jpg",
          "/src/assets/images/留学作品集/portfolio-28.jpg"
        ],
        imageDetails: [
          {
            title: "Project Overview & Significance",
            category: "01 / Project Overview",
            description: "Project overview, introducing it as a public apology installation that utilizes interactive technological systems to promote community healing and reflection."
          },
          {
            title: "Background: The Black Sheep Effect",
            category: "02 / Background Study",
            description: "An analytical study on how the 'black sheep effect' triggers isolation, discrimination, and bullying dynamics within a social or student group."
          },
          {
            title: "Research & Experimentation",
            category: "03 / Psychological Research",
            description: "Investigating the psychological needs of individuals who realize past bullying actions and their collective desire for a restorative apology platform."
          },
          {
            title: "Concept & Functionality",
            category: "04 / System Design",
            description: "Core design philosophy and system features, utilizing randomized feed-backs through digital displays and acoustic speakers to enhance interactivity and invoke deep emotional resonances."
          },
          {
            title: "Production & Final Outcome",
            category: "05 / Production & Delivery",
            description: "Chronological documentation mapping out the entire execution cycle from initial sketches to hardware assembly, as well as the active emotional healing value brought by this installation."
          }
        ]
      },
      {
        title: "05 / The Swim For You (Master’s Group Assignment)",
        category: "05 / THE SWIM FOR YOU — PUBLIC ART INSTALLATION",
        image: "/src/assets/images/留学作品集/portfolio-29.jpg",
        cursorLabel: "SWIM FOR YOU",
        description: "An interactive public art intervention exploring relational aesthetics and psychogeographical memories of the historic Sai Wan Swimming Shed. Using physical lifebuoys, sensory light sequences, and printed inter-generational interviews, the project bridges individual narratives and community history, transforming local seawater-eroded artifacts into vessels of shared courage and cultural continuation.",
        images: [
          "/src/assets/images/留学作品集/portfolio-29.jpg",
          "/src/assets/images/留学作品集/portfolio-30.jpg",
          "/src/assets/images/留学作品集/portfolio-31.jpg"
        ],
        imageDetails: [
          {
            title: "Project Overview & Significance",
            category: "01 / Collective Memory",
            description: "Project overview and significance, introducing how this public art project utilizes lifebuoys as a medium to reconstruct the historical collective memory of the Sai Wan Swimming Shed."
          },
          {
            title: "Theoretical Foundations",
            category: "02 / Artistic Intervention",
            description: "Exploring how Relational Aesthetics and Psychogeography serve as theoretical anchors for creative art interventions."
          },
          {
            title: "Background & Cultural Preservation",
            category: "03 / Cultural Heritage",
            description: "Analyzing Hong Kong's disappearing swimming shed culture and its profound significance in generational communication."
          }
        ]
      }
    ]
  }
];
