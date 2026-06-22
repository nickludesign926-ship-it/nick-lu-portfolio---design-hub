import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Mail, FileText, ArrowRight, Layers, Cpu, Award, Target, Eye, ShieldAlert, Crosshair, ChevronLeft, ChevronRight } from "lucide-react";
// @ts-ignore
import uploadedAvatar from "../assets/images/NICK.webp";

interface AboutViewProps {
  onClose: () => void;
  onHoverOn: (label: string) => void;
  onHoverOff: () => void;
}

export default function AboutView({ onClose, onHoverOn, onHoverOff }: AboutViewProps) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const avatarSources = [
    uploadedAvatar,
    "/avatar.jpg",
    "/avatar.png",
    "/avatar.jpeg",
    "/designer_avatar.jpg",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974" // fallback CMF background
  ];

  const handleImageError = () => {
    if (avatarIndex < avatarSources.length - 1) {
      setAvatarIndex(prev => prev + 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: Math.round(x), y: Math.round(y) });

    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = cardWidth / 2;
    const centerY = cardHeight / 2;
    
    // Smooth responsive perspective 3D tilt
    const maxRotation = 12; 
    const rotX = -((y - centerY) / centerY) * maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setIsHovered(true);
    onHoverOn("NICK LU // DESIGN");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    onHoverOff();
  };
  const skills = [
    { category: "3D & Industrial", items: ["Rhino 3D", "Keyshot", "SolidWorks", "Blender", "SketchUp", "Interior Design", "Exhibit Design", "Product Design", "3D Modeling"] },
    { category: "Graphic & CMF", items: ["CMF Architecture", "Adobe Illustrator", "Photoshop", "Brand Identity Systems", "Packaging Design"] },
    { category: "Research & Verify", items: ["Fluid Dynamics Testing", "High-Speed Shadowgraphy", "Sensor Integration (PWM)", "Research Methods", "Data Analysis"] },
    { category: "Interaction & Hardware", items: ["Biometric Sense Loops", "Arduino / ESP32 Logic", "Interactive Sculptures", "Arduino IDE", "Voice Control System"] }
  ];

  interface ExperienceItem {
    year: string;
    role: string;
    company: string;
    bullets?: string[];
    desc?: string;
  }

  const experiences: ExperienceItem[] = [
    {
      year: "Apr 2026 — Present",
      role: "Graphic & 3D Product Designer",
      company: "Accutone Technologies Limited (Hong Kong)",
      bullets: [
        "Product & 3D Innovation: Participate in the entire product development process from initial concept to high-fidelity 3D modeling and photorealistic rendering, bridging the gap between creative vision and engineering feasibility.",
        "Global Packaging Excellence: Design high-end, market-demand-responsive packaging, emphasizing superior color, material, and finish (CMF) and strict Pantone color accuracy to ensure brand consistency in the international market.",
        "Strategic Visual Communication: Create graphic materials and marketing materials for top global exhibitions, including the Hong Kong Electronics Fair, enhancing the brand's influence on the international stage.",
        "Design for Manufacturing (DFM) Collaboration: Drive cross-functional collaboration with engineering and production teams to optimize structural design and achieve efficient manufacturing without compromising aesthetics."
      ]
    },
    {
      year: "Dec 2025 — Present",
      role: "Senior Research Assistant",
      company: "Hong Kong Baptist University (Part-time)",
      bullets: [
        "Spearheaded the design, structural optimization, and physical prototyping for the AuraMist (Dual-Rail H3) research project.",
        "Conducted specialized scientific experiments, including droplet size characterization and spray coverage analysis using water-sensitive papers and ImageJ software.",
        "Successfully delivered and presented the final physical functional prototype at the Science Carnival."
      ]
    },
    {
      year: "Aug 2025 — Dec 2025",
      role: "Product Designer",
      company: "Hydroverse Company Limited (TSSSU HKBU)",
      bullets: [
        "Impact & showcase: \"AuraMist\" portable misting system exhibited at the HKBU Innovation Carnival, demonstrating dual spray modes (mist/jet) with voice control and preset routines for wheelchair users.",
        "Addressing wheelchair users' accessibility needs in technical specifications and acceptance criteria (one-handed operation, voice control, installation/reachability).",
        "Developing the control board and firmware: Implementing a voice + pressure closed-loop system; completing circuit design and debugging; integrating pressure/flow/temperature sensors and power management.",
        "Prototyping and testing: Creating a new functional prototype (dual-arm version); completing bench/wet zone testing; verifying atomization stability, response time, and power consumption."
      ]
    },
    {
      year: "Dec 2021 — Jul 2023",
      role: "Research Assistant / Designer",
      company: "Beijing Normal University School of Future Design",
      bullets: [
        "Brand space design for Jiangsu Shuang Xin New Materials Headquarters Building: Planned 6 functional zones combining \"framed view\" with modern needs; simulated natural light with SketchUp and optimized height/spacing; 10 iterations to delivery; coordinated with procurement; materials cost -12%.",
        "Space Renovation Design Institute of Science and Technology for Brain-Inspired Intelligence: Built 3D models and coordinated construction; budget -10%; designed AR navigation + color zoning; visitor path-finding efficiency +40%; removed 15 construction conflicts.",
        "Changsha \"Malan Shan Pink Lion Funfair\" 2023 Autumn community art exhibition: Owned 3D spatial setup and label/flow optimization; rearranged 700+ labels in two days to boost curatorial efficiency."
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0D0D0D] text-white pt-24 px-8 lg:px-16 pb-32 relative select-none"
    >
      {/* Small Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-baseline border-b border-borderGray pb-16 pt-12 gap-8">
        <div>
          <span className="font-mono text-glacier text-[10px] sm:text-[11px] tracking-[0.5em] uppercase block mb-4">
            [ ABOUT // THE DESIGNER ]
          </span>
          <h1 className="text-5xl lg:text-[100px] font-black leading-none tracking-tighter uppercase text-white">
            NICK LU
          </h1>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-4">
            Hong Kong S.A.R. / Industrial & Graphic Designer
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
          <a
            href="https://www.linkedin.com/in/haoxuan-lu-808593334/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onHoverOn("LINKEDIN")}
            onMouseLeave={onHoverOff}
            className="border border-glacier text-glacier hover:bg-glacier hover:text-dark px-6 py-3 transition-all cursor-none flex items-center gap-2"
          >
            [ LinkedIn Profile ]
          </a>
          <a
            href="mailto:nickludesign926@gmail.com"
            onMouseEnter={() => onHoverOn("SAY HELLO")}
            onMouseLeave={onHoverOff}
            className="border border-borderGray hover:border-glacier hover:text-glacier px-6 py-3 transition-colors cursor-none flex items-center gap-2"
          >
            <Mail className="w-3 h-3" /> Email Contact
          </a>
          <button
            onClick={onClose}
            onMouseEnter={() => onHoverOn("GO BACK")}
            onMouseLeave={onHoverOff}
            className="border border-borderGray hover:border-glacier hover:text-glacier px-6 py-3 transition-all cursor-none"
          >
            Back to Case Studies
          </button>
        </div>
      </div>

      {/* About Description and Philosophy Multi-physics Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-20 border-b border-borderGray">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold tracking-tight uppercase">// PROFILE</h2>
          <p className="text-titanium text-sm leading-relaxed font-light opacity-90">
            Driven by a deep passion for art and design, my work is grounded in industrial design while seamlessly integrating spatial narratives, digital interaction, and critical cultural research. I believe design is not merely about shaping physical objects, but a profound medium for building sensory resonance and narrative depth.
          </p>
          <p className="text-titanium text-sm leading-relaxed font-light opacity-85">
            I thrive in collaborative environments, enjoying the process of solving complex, real-world problems with others while continuously learning through hands-on practice. Keeping a keen focus on diverse social phenomena, I strive to address and respond to societal issues through purposeful and creative design interventions.
          </p>
          <p className="text-titanium text-sm leading-relaxed font-light opacity-75 italic">
            "Driven by a deep passion for art and design. Grounded in industrial design, my practice converges spatial narrative, digital interaction, and critical social engagement."
          </p>
        </div>

        <div className="lg:col-span-7 flex justify-center items-center [perspective:1000px]">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-[420px] aspect-[3/4] bg-[#111] border border-borderGray/65 p-2 sm:p-3 group overflow-hidden transition-colors duration-500 hover:border-glacier/80 cursor-none"
          >
            <div className="relative w-full h-full overflow-hidden bg-black/40">
              {/* Colored Image (No grayscale!) */}
              <img
                src={avatarSources[avatarIndex]}
                onError={handleImageError}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover contrast-105 group-hover:scale-[1.06] transition-all duration-700 ease-out select-none pointer-events-none"
                alt="Nick Lu (Haoxuan Lu)"
              />

              {/* Design frame border accents (purely static, geometric, extremely elegant) */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-glacier/50 transition-colors duration-500" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-glacier/50 transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-glacier/50 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-glacier/50 transition-colors duration-500" />

              {/* Subtle glass shimmer reflection on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Ambient mask shader vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/85 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Core Capability & Skillset Swiss Metrics */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-24 border-b border-borderGray">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-bold tracking-tighter uppercase">TECHNICAL <br />CAPABILITIES</h3>
          <p className="text-xs font-mono text-gray-500 mt-2 uppercase tracking-widest">
            Cross-disciplinary workflow
          </p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {skills.map((skillGroup, sIdx) => (
            <div key={sIdx} className="border-t border-borderGray pt-6 space-y-3">
              <span className="font-mono text-xs text-glacier uppercase tracking-[0.2em] block">
                0{sIdx + 1} // {skillGroup.category}
              </span>
              <div className="flex flex-wrap gap-2 pt-2">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono border border-borderGray/65 text-gray-400 px-3 py-1.5 uppercase leading-none rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-24 border-b border-borderGray">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-bold tracking-tighter uppercase">PROFESSIONAL<br />JOURNEY</h3>
          <p className="text-xs font-mono text-gray-500 mt-2 uppercase tracking-widest">
            Selected Timeline
          </p>
        </div>
        <div className="lg:col-span-8 space-y-12">
          {experiences.map((exp, eIdx) => (
            <div key={eIdx} className="group border-l hover:border-glacier border-borderGray pl-6 py-2 transition-all duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <span className="font-mono text-[11px] text-glacier uppercase tracking-[0.15em]">
                  {exp.year}
                </span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-dark border border-borderGray/50 p-2 leading-none">
                  {exp.company}
                </span>
              </div>
              <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-glacier transition-colors uppercase">
                {exp.role}
              </h4>
              {exp.bullets ? (
                <ul className="list-disc list-outside space-y-2 mt-3 pl-4 text-xs sm:text-sm text-titanium/70 leading-relaxed font-light">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="group-hover:text-white transition-colors duration-300">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs sm:text-sm text-titanium/70 leading-relaxed font-light mt-3">
                  {exp.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Academic Qualifications & Degrees */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-24">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-bold tracking-tighter uppercase">ACADEMIC<br />QUALIFICATIONS</h3>
          <p className="text-xs font-mono text-gray-500 mt-2 uppercase tracking-widest">
            University Degrees
          </p>
        </div>
        <div className="lg:col-span-8 space-y-12">
          {/* Master Degree */}
          <div className="group border-l hover:border-glacier border-borderGray pl-6 py-2 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <span className="font-mono text-[11px] text-glacier uppercase tracking-[0.15em]">
                Aug 2024 — Oct 2025
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-dark border border-borderGray/50 p-2 leading-none">
                GPA: 3.33 / 4.00
              </span>
            </div>
            <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-glacier transition-colors uppercase">
              Master of Arts (Visual Arts — Craft & Design)
            </h4>
            <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wide">
              Hong Kong Baptist University
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-xs sm:text-sm text-titanium/70 leading-relaxed font-light">
                Applied advanced design methodologies, cross-medium material expressions, and curated design frameworks to bridge craftsmanship and modern industrial form factors.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Curating
                </span>
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Graphic Design
                </span>
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Craft & Design
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider pt-2">
                <span className="text-glacier/80">Societies //</span> School Basketball Team, Graduation Exhibition Committee
              </div>
            </div>
          </div>

          {/* Bachelor Degree */}
          <div className="group border-l hover:border-glacier border-borderGray pl-6 py-2 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <span className="font-mono text-[11px] text-glacier uppercase tracking-[0.15em]">
                Sep 2019 — Jun 2023
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-dark border border-borderGray/50 p-2 leading-none">
                GPA: 3.20 / 5.00
              </span>
            </div>
            <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-glacier transition-colors uppercase">
              Bachelor of Engineering (Industrial Design)
            </h4>
            <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wide">
              Beijing Normal University, Zhuhai
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-xs sm:text-sm text-titanium/70 leading-relaxed font-light">
                Developed a strong foundation in mechanical engineering, multi-axis structural prototyping, ergonomic verification, and system architecture for connected devices.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Product Design
                </span>
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Logo Design
                </span>
                <span className="text-[9px] font-mono border border-borderGray/45 text-gray-400 px-2.5 py-1 uppercase rounded">
                  Engineering Prototyping
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider pt-2">
                <span className="text-glacier/80">Societies //</span> Sports Meeting, College Basketball League, Team Leader
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back home trigger bottom */}
      <div className="max-w-7xl mx-auto text-center pt-24">
        <button
          onClick={onClose}
          onMouseEnter={() => onHoverOn("GO BACK")}
          onMouseLeave={onHoverOff}
          className="group relative inline-block bg-transparent border-none outline-none cursor-none py-2"
        >
          <span className="font-mono text-gray-600 text-[10px] tracking-[0.5em] uppercase mb-4 block">
            READY TO REVIEW CASE STUDIES?
          </span>
          <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase transition-colors hover:text-glacier text-white leading-none">
            [ GO BACK HOME ]
          </h3>
          <div className="w-0 h-[2px] bg-glacier group-hover:w-full transition-all duration-500 mx-auto mt-2" />
        </button>
      </div>
    </motion.div>
  );
}
