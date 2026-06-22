import { useState, useEffect } from "react";
import { PROJECTS, Project } from "./types";
import { Sparkles, ArrowDownRight, ArrowRight, Star, Cpu, Heart, CodeSquare, Layers, Lightbulb, ShieldAlert, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomCursor from "./components/CustomCursor";
import ProjectDetail from "./components/ProjectDetail";
import AboutView from "./components/AboutView";
import Markdown from "react-markdown";

import inputFile0 from "./assets/images/input_file_0.webp";
import inputFile1 from "./assets/images/input_file_1.png.webp";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<"home" | "about">("home");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // States for Hero Image Mask and stereoscopic parallax effect
  const [heroHover, setHeroHover] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    
    setCoords((prev) => {
      const dist = Math.hypot(pctX - prev.x, pctY - prev.y);
      // Create high-speed trail spots with fading animation
      if (dist > 2.5 && heroHover) {
        const id = Date.now() + Math.random();
        setTrail((t) => [
          ...t.slice(-5),
          { x: prev.x, y: prev.y, id, opacity: 0.55 }
        ]);
        setTimeout(() => {
          setTrail((t) => t.filter((p) => p.id !== id));
        }, 220);
      }
      return { x: pctX, y: pctY };
    });

    // Opposite directional physical parallax displacement (displacement limit 22 pixels)
    const px = -((x / rect.width) - 0.5) * 22;
    const py = -((y / rect.height) - 0.5) * 22;
    setParallax({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    onHoverOff();
    setHeroHover(false);
    setParallax({ x: 0, y: 0 });
    setTrail([]);
  };

  // Synchronize cursor functions
  const onHoverOn = (label: string) => {
    setCursorLabel(label);
    setIsHovered(true);
  };

  const onHoverOff = () => {
    setCursorLabel("");
    setIsHovered(false);
  };

  useEffect(() => {
    // If a project detail page is open, make sure it is scrolled to top
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [activeProject]);



  // Category filter mapping for the main landing page
  const filteredProjects = selectedFilter === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white antialiased selection:bg-glacier selection:text-dark relative overflow-hidden font-sans">
      
      {/* Spring custom responsive cursor */}
      <CustomCursor cursorLabel={cursorLabel} isHovered={isHovered} />

      <AnimatePresence mode="wait">
        {activeView === "about" && !activeProject ? (
          <AboutView 
            onClose={() => setActiveView("home")}
            onHoverOn={onHoverOn}
            onHoverOff={onHoverOff}
          />
        ) : !activeProject ? (
          /* MAIN PORTFOLIO LANDING PAGE */
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
          >
            {/* Global Sticky Navigation */}
            <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-4 sm:px-8 lg:px-16 border-b border-borderGray bg-[#0D0D0D]/85 backdrop-blur-md z-40 select-none">
              <button 
                type="button"
                onClick={() => {
                  setActiveView("home");
                  setActiveProject(null);
                }}
                className="text-lg sm:text-xl font-black tracking-tighter uppercase underline decoration-glacier/40 decoration-2 underline-offset-4 select-none cursor-none bg-transparent border-0 outline-none p-0 focus-visible:ring-1 focus-visible:ring-glacier"
                onMouseEnter={() => onHoverOn("NICK LU")}
                onMouseLeave={onHoverOff}
                aria-label="Nick Lu Home"
              >
                NICK LU
              </button>
              <div className="flex gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase items-center">
                <button 
                  onClick={() => {
                    setActiveView("home");
                    setActiveProject(null);
                    // scroll to works after a micro delay
                    setTimeout(() => {
                      document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="hover:text-glacier transition-colors cursor-none bg-transparent border-none text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] outline-none font-bold"
                >
                  Projects
                </button>
                <button 
                  onClick={() => {
                    setActiveView("about");
                    setActiveProject(null);
                  }}
                  className={`hover:text-glacier transition-colors cursor-none bg-transparent border-none text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] outline-none font-bold ${
                    activeView === "about" ? "text-glacier underline decoration-2 underline-offset-4" : ""
                  }`}
                >
                  About
                </button>

                <a href="mailto:nickludesign926@gmail.com" className="hover:text-glacier transition-colors cursor-none font-mono">Contact</a>
              </div>
              <div className="hidden lg:block text-[10px] font-mono border border-borderGray px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                PORTFOLIO 2026
              </div>
            </nav>

            {/* Split Hero Entrance */}
            <main className="w-full max-w-full overflow-hidden min-h-[90vh] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 border-b border-borderGray">
              {/* Left Column Text Content */}
              <section className="flex flex-col justify-center px-[8%] border-r border-borderGray relative py-16 md:py-24">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[0.95] tracking-tighter uppercase">
                    <span className="text-glacier">DESIGN.</span> <br />
                    ENGINEERING. <br />
                    INNOVATION.
                  </h1>
                  <p className="text-titanium text-sm sm:text-base max-w-md leading-relaxed opacity-85 font-light">
                    Expert in 3D modeling, CMF development, and end-to-end product realization—from complex electronic hardware prototyping to premium packaging design.
                  </p>
                  
                  {/* Action Guidance Call to Action (CTA) */}
                  <div className="pt-2 flex flex-wrap gap-4 select-none">
                    <button
                      onClick={() => {
                        document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      onMouseEnter={() => onHoverOn("EXPLORE")}
                      onMouseLeave={onHoverOff}
                      className="px-6 py-3.5 bg-glacier text-dark text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-cyan-400 focus-visible:ring-1 focus-visible:ring-glacier cursor-none flex items-center gap-2"
                    >
                      View Selected Works
                      <span className="text-xs">↓</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setActiveView("about");
                        setActiveProject(null);
                      }}
                      onMouseEnter={() => onHoverOn("ABOUT ME")}
                      onMouseLeave={onHoverOff}
                      className="px-6 py-3.5 border border-borderGray hover:border-glacier hover:text-glacier text-white text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-sm transition-all duration-300 cursor-none"
                    >
                      ABOUT ME
                    </button>
                  </div>

                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pt-4">
                    Location: Hong Kong S.A.R // NICK LU DESIGN
                  </div>
                </motion.div>
              </section>

              {/* Right Column Hero Artwork with Stereoscopic Parallax and Spotlight Mask Reveal */}
              <section 
                className="relative bg-[#0A0A0A] overflow-hidden group h-[50vh] lg:h-auto max-w-full cursor-none border-b lg:border-b-0 border-borderGray flex items-center justify-center select-none"
                onMouseEnter={() => {
                  onHoverOn("EXPLORE");
                  setHeroHover(true);
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* 1. Base Image Layer (Visible outer part, slightly offset opposite to cursor) */}
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.06)`,
                    transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                >
                  <img
                    src="/input_file_1.png.png"
                    className="w-full h-full object-cover object-top opacity-85 contrast-110"
                    alt="External Finished Form Shell"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const orig = window.location.origin;
                      if (target.src === orig + "/input_file_1.png.png") {
                        target.src = "/input_file_1.png";
                      } else if (target.src === orig + "/input_file_1.png") {
                        target.src = inputFile1;
                      }
                    }}
                  />
                  {/* Subtle decorative background scanning grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>                 {/* 2. Revealed Image Layer (Hidden, revealed inside the circular mask with stronger stereoscopic depth) */}
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px) scale(1.06)`,
                    WebkitMaskImage: heroHover 
                      ? `radial-gradient(circle 260px at ${coords.x}% ${coords.y}%, black 40%, transparent 100%)` 
                      : `radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)`,
                    maskImage: heroHover 
                      ? `radial-gradient(circle 260px at ${coords.x}% ${coords.y}%, black 40%, transparent 100%)` 
                      : `radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)`,
                    opacity: heroHover ? 1 : 0,
                    // Dynamic performance transition logic:
                    // When hovering/moving, we disabled mask transition to make the reveal circle follow the cursor 100% smoothly without any lag.
                    // On mouse leave, we apply a smooth ease-out fade transition to hide the reveal layer elegantly.
                    transition: heroHover
                      ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out" 
                      : "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                >
                  <img
                    src={inputFile0}
                    className="w-full h-full object-cover object-top opacity-100 contrast-110 brightness-105"
                    alt="Internal Structural Configuration / Blueprints"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + "/input_file_0.png") {
                        target.src = "/input_file_0.png";
                      }
                    }}
                  />
                </div>

                {/* 3. Trail Reveal Layers (High-speed motion dynamic trailing tracking) */}
                {trail.map((point) => (
                  <div 
                    key={point.id}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px) scale(1.06)`,
                      WebkitMaskImage: `radial-gradient(circle 180px at ${point.x}% ${point.y}%, black 30%, transparent 100%)`,
                      maskImage: `radial-gradient(circle 180px at ${point.x}% ${point.y}%, black 30%, transparent 100%)`,
                      opacity: point.opacity,
                      transition: "opacity 0.22s ease-out"
                    }}
                  >
                    <img
                      src={inputFile0}
                      className="w-full h-full object-cover object-top contrast-110 brightness-105"
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + "/input_file_0.png") {
                          target.src = "/input_file_0.png";
                        }
                      }}
                    />
                  </div>
                ))}

                {/* Ambient vignette background shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent pointer-events-none" />

                {/* Bottom stable watermark watermark */}
                <div className="absolute bottom-8 left-8 font-mono text-[10px] text-glacier tracking-widest pointer-events-none select-none uppercase">
                  <span>DEFENSIVE PULSE ARMATURE</span>
                </div>
              </section>
            </main>

            {/* Selected Works Gallery Grid */}
            <section id="works" className="w-full bg-dark pb-32">
              
              {/* Works section title bar */}
              <div className="w-full py-16 px-8 lg:px-16 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-borderGray">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Selected Works</h2>
                  <p className="text-glacier font-mono text-[9px] md:text-[10px] mt-2 tracking-[0.3em] uppercase">
                    MEC_VALIDATION // DESIGN_SYSTEMS // INTENTIONAL_FORM
                  </p>
                </div>
              </div>

              {/* Dynamic Project Grid (Staggered Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-borderGray" id="project-grid">
                {filteredProjects.map((project, index) => {
                  // Some cards are pushed lower to create dynamic staggered rhythms, exactly mirroring original design
                  let alignmentClass = "";
                  if (index === 1 || index === 5 || index === 6) {
                    alignmentClass = "md:mt-16";
                  } else if (index === 2) {
                    alignmentClass = "md:-mt-16";
                  }

                  return (
                    <button
                      type="button"
                      key={project.id}
                      onClick={() => {
                        setActiveProject(project);
                        onHoverOff();
                      }}
                      onMouseEnter={() => onHoverOn("VIEW CASE")}
                      onMouseLeave={onHoverOff}
                      className={`project-card group text-left w-full relative bg-dark p-8 sm:p-12 min-h-[500px] sm:min-h-[550px] md:min-h-[600px] flex flex-col justify-between overflow-hidden cursor-none transition-all duration-500 border-b border-borderGray hover:bg-[#111]/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-glacier/80 focus-visible:bg-[#111]/20 ${alignmentClass}`}
                      aria-label={`View case study: ${project.title}`}
                    >
                      <div className="relative z-10 space-y-3 pointer-events-none">
                        <span className="font-mono text-[9px] sm:text-[10px] text-glacier block underline uppercase tracking-wider">
                          0{index + 1} / {project.categoryLabel}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-2 group-hover:text-glacier transition-colors uppercase leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-titanium/60 max-w-sm leading-relaxed font-light">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Image background overlay with clean opacity shift without zoom scale on hover */}
                      <img
                        src={project.coverImage}
                        className="absolute inset-0 z-0 w-full h-full object-cover opacity-[0.14] group-hover:opacity-[0.3] transition-all duration-1000 grayscale group-hover:grayscale-0 pointer-events-none"
                      />

                      {/* Bottom action indicator */}
                      <div className="relative z-10 w-full mt-6 pointer-events-none">
                        <div className="flex justify-end pt-4 border-t border-borderGray/20">
                          <div className="w-10 h-[1.5px] bg-glacier/50 group-hover:w-20 transition-all duration-500" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-24 text-gray-500 font-mono text-sm uppercase">
                  No projects match your current category filter context.
                </div>
              )}
            </section>



            {/* Site Footer */}
            <footer className="w-full py-16 px-8 border-t border-borderGray bg-dark">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="w-full md:w-auto">
                  <a
                    href="mailto:nickludesign926@gmail.com"
                    onMouseEnter={() => onHoverOn("MAIL")}
                    onMouseLeave={onHoverOff}
                    className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter hover:text-glacier transition-colors cursor-none uppercase text-white inline-block break-all sm:break-normal max-w-full"
                  >
                    nickludesign926@gmail.com
                  </a>
                </div>
                <div className="text-left md:text-right text-gray-600 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest leading-loose shrink-0">
                  Designed by NICK LU // © 2026 Hong Kong // Engineered by AI Studio
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          /* DETAILED CASE STUDY SUBPAGE PAGE */
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectDetail
              project={activeProject}
              onBack={() => setActiveProject(null)}
              onHoverOn={onHoverOn}
              onHoverOff={onHoverOff}
              onNextProject={(nextProject) => setActiveProject(nextProject)}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
