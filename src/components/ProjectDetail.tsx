import { useState, useEffect, useRef } from "react";
import { PROJECTS, Project, SubWork } from "../types";
import { ArrowLeft, Sparkles, BookOpen, Cpu, Award, Users, Droplet, Sun, CheckCircle2, BarChart3, Heart, ListTodo, Share2, Play, Printer, Compass, Eye, HelpCircle, Activity, FileText, Layout, UserCheck, RefreshCw, X, Volume2, VolumeX, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";


const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";
  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    id = url.split("v=")[1].split("&")[0];
  } else if (url.includes("embed/")) {
    id = url.split("embed/")[1].split("?")[0];
  }
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0` : url;
};

const getFallbackImage = (title: string, index: number = 0): string => {
  const t = title.toLowerCase();
  
  if (t.includes("rehab") || t.includes("ankle") || t.includes("stride") || t.includes("medical")) {
    const rehabImages = [
      "/src/assets/images/留学作品集/portfolio-02.webp",
      "/src/assets/images/留学作品集/portfolio-03.webp",
      "/src/assets/images/留学作品集/portfolio-04.webp",
      "/src/assets/images/留学作品集/portfolio-05.webp",
      "/src/assets/images/留学作品集/portfolio-06.webp",
    ];
    return rehabImages[index % rehabImages.length];
  }
  
  if (t.includes("everone") || t.includes("gutter") || t.includes("stage") || t.includes("monsoon") || t.includes("water") || t.includes("architect")) {
    const archImages = [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
      "https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=1000",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    ];
    return archImages[index % archImages.length];
  }
  
  if (t.includes("sheport") || t.includes("sport") || t.includes("harness") || t.includes("female") || t.includes("race")) {
    const sportImages = [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000",
    ];
    return sportImages[index % sportImages.length];
  }

  if (t.includes("sheep") || t.includes("apology") || t.includes("black")) {
    return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000";
  }

  return "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000";
};

const getSubworkImages = (subworkItem: SubWork, currentProject: Project): string[] => {
  if (subworkItem.images && subworkItem.images.length > 0) {
    return subworkItem.images;
  }
  const imagesList = [subworkItem.image];
  if (currentProject.finalGallery) {
    currentProject.finalGallery.forEach((item) => {
      if (item.image && item.image !== subworkItem.image && !imagesList.includes(item.image)) {
        imagesList.push(item.image);
      }
    });
  }
  if (currentProject.coverImage && currentProject.coverImage !== subworkItem.image && !imagesList.includes(currentProject.coverImage)) {
    imagesList.push(currentProject.coverImage);
  }
  const stockImages = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000",
  ];
  stockImages.forEach((img) => {
    if (imagesList.length < 4 && !imagesList.includes(img)) {
      imagesList.push(img);
    }
  });
  return imagesList;
};

interface PortfolioProjectCardProps {
  sub: SubWork;
  sIdx: number;
  onHoverOn: (label: string) => void;
  onHoverOff: () => void;
  onOpenGallery: (subwork: SubWork, images: string[], index: number) => void;
}

function PortfolioProjectCard({ sub, sIdx, onHoverOn, onHoverOff, onOpenGallery }: PortfolioProjectCardProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = sub.images ? sub.images.length : 1;
  const currentImg = sub.images ? sub.images[activeSlide] : sub.image;
  const currentDetail = sub.imageDetails && sub.imageDetails[activeSlide]
    ? sub.imageDetails[activeSlide]
    : null;

  return (
    <div className="flex flex-col items-center">
      {/* Title & Metadata */}
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-5 gap-3 text-left">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-glacier uppercase bg-glacier/10 px-2.5 py-1 rounded-sm border border-glacier/20">
            {currentDetail ? currentDetail.category : sub.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-4 uppercase">
            {sub.title} {currentDetail ? `// ${currentDetail.title}` : ""}
          </h3>
        </div>
        <div className="text-[11px] font-mono text-gray-500 bg-white/[0.02] px-3 py-1.5 rounded border border-white/5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-glacier animate-pulse" />
          <span>PROJECT {String(sIdx + 1).padStart(2, '0')}</span>
        </div>
      </div>

      {/* 28:10 Aspect Ratio Slide Container */}
      <div 
        className="relative w-full max-w-5xl bg-[#111] border border-white/10 overflow-hidden group cursor-none"
        style={{ aspectRatio: "28/10" }}
        onClick={() => {
          if (sub.images) {
            onOpenGallery(sub, sub.images, activeSlide);
          }
        }}
        onMouseEnter={() => {
          if (currentDetail) {
            onHoverOn(currentDetail.title.toUpperCase());
          } else {
            onHoverOn("EXPLORE DETAILS");
          }
        }}
        onMouseLeave={onHoverOff}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentImg}
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.01] group-hover:opacity-100 transition-all duration-700 select-none pointer-events-none"
              alt={sub.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getFallbackImage(sub.title || "", activeSlide);
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

        {/* Left Arrow */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10 hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
            onMouseEnter={() => onHoverOn("PREV")}
            onMouseLeave={() => onHoverOn("EXPLORE DETAILS")}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Right Arrow */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlide((prev) => (prev + 1) % totalSlides);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10 hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
            onMouseEnter={() => onHoverOn("NEXT")}
            onMouseLeave={() => onHoverOn("EXPLORE DETAILS")}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Slide Counter Indicator */}
        <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-glacier bg-dark/85 px-2.5 py-1.5 border border-white/10 rounded-sm backdrop-blur-[2px] select-none">
          SLIDE {activeSlide + 1} OF {totalSlides}
        </div>
      </div>

      {/* Description */}
      <div className="w-full max-w-5xl mt-6 text-left">
        <p className="text-xs sm:text-sm text-titanium/80 font-light leading-relaxed bg-white/[0.01] p-5 rounded border border-white/5">
          {currentDetail ? currentDetail.description : sub.description}
        </p>
      </div>
    </div>
  );
}

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onHoverOn: (label: string) => void;
  onHoverOff: () => void;
  onNextProject: (nextProject: Project) => void;
}

export default function ProjectDetail({
  project,
  onBack,
  onHoverOn,
  onHoverOff,
  onNextProject,
}: ProjectDetailProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<{ title: string; videoUrl: string; youtubeUrl?: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOverviewVideoInteracting, setIsOverviewVideoInteracting] = useState<boolean>(false);
  const [isModalVideoInteracting, setIsModalVideoInteracting] = useState<boolean>(false);

  useEffect(() => {
    if (!activeVideo) {
      setIsModalVideoInteracting(false);
    }
  }, [activeVideo]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Toggle video play state safely
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Play interrupted", e));
    }
  };

  // Toggle video mute state safely
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Formats time beautifully e.g. 05:23
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const [activePaperIdx, setActivePaperIdx] = useState<number>(0);
  const [activeSubWorkIdx, setActiveSubWorkIdx] = useState<number>(0);
  const [stageTab, setStageTab] = useState<string>("concept");
  const [rehabTab, setRehabTab] = useState<string>("concept");
  const [activeRehabAppTab, setActiveRehabAppTab] = useState<string>("Home");
  const [playingInline, setPlayingInline] = useState<string | null>(null);

  const [activeGallery, setActiveGallery] = useState<{
    subwork: SubWork;
    images: string[];
    currentIndex: number;
  } | null>(null);

  const [activeFinalArtifactIdx, setActiveFinalArtifactIdx] = useState<number | null>(null);
  const [activeFinalSlideIdx, setActiveFinalSlideIdx] = useState<number>(0);
  const [activeConceptSlideIdx, setActiveConceptSlideIdx] = useState<number>(0);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGallery) {
        if (e.key === "Escape") {
          setActiveGallery(null);
        } else if (e.key === "ArrowLeft") {
          setActiveGallery((prev) => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
            if (project.id === "defensive-pulse" || project.id === "shuangxin") {
              setActiveSubWorkIdx(nextIndex);
            }
            return { ...prev, currentIndex: nextIndex };
          });
        } else if (e.key === "ArrowRight") {
          setActiveGallery((prev) => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex + 1) % prev.images.length;
            if (project.id === "defensive-pulse" || project.id === "shuangxin") {
              setActiveSubWorkIdx(nextIndex);
            }
            return { ...prev, currentIndex: nextIndex };
          });
        }
      } else if (activeFinalArtifactIdx !== null && project.finalGallery) {
        if (e.key === "Escape") {
          setActiveFinalArtifactIdx(null);
        } else if (e.key === "ArrowLeft") {
          setActiveFinalArtifactIdx((prev) => {
            if (prev === null) return null;
            return (prev - 1 + project.finalGallery!.length) % project.finalGallery!.length;
          });
        } else if (e.key === "ArrowRight") {
          setActiveFinalArtifactIdx((prev) => {
            if (prev === null) return null;
            return (prev + 1) % project.finalGallery!.length;
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery, activeFinalArtifactIdx, project.id, project.finalGallery]);

  // Auto scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [project.id]);

  // Preload all gallery and concept images in background for butter-smooth transitions
  useEffect(() => {
    if (project.finalGallery) {
      project.finalGallery.forEach((item) => {
        if (item.image) {
          const img = new Image();
          img.src = item.image;
        }
      });
    }
    if (project.conceptGallery) {
      project.conceptGallery.forEach((item) => {
        if (item.image) {
          const img = new Image();
          img.src = item.image;
        }
      });
    }
  }, [project.id]);

  // Find next project in array
  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  // Filtering for sub-works
  const baseSubworks = project.subWorks
    ? project.id === "auramist"
      ? project.subWorks.filter((item) => item.isVideo)
      : project.subWorks
    : [];

  const filteredSubworks = baseSubworks
    ? filter === "all"
      ? baseSubworks
      : baseSubworks.filter((item) => {
          const catLower = item.category.toLowerCase();
          if (filter === "product") return catLower.includes("product") || catLower.includes("rendering");
          if (filter === "packaging") return catLower.includes("unpack") || catLower.includes("pulp") || catLower.includes("packaging");
          if (filter === "exhibition") return catLower.includes("spatial") || catLower.includes("booth") || catLower.includes("exhibition");
          if (filter === "graphic") return catLower.includes("guidelines") || catLower.includes("identity") || catLower.includes("brand");
          if (filter === "video") return catLower.includes("video") || catLower.includes("commercial") || catLower.includes("media");
          return true;
        })
    : [];

  const displaySubwork = (activeGallery && (project.id === "defensive-pulse" || project.id === "shuangxin") && filteredSubworks[activeGallery.currentIndex])
    ? filteredSubworks[activeGallery.currentIndex]
    : activeGallery ? activeGallery.subwork : null;

  const currentImageDetail = (activeGallery && activeGallery.subwork.imageDetails && activeGallery.subwork.imageDetails[activeGallery.currentIndex])
    ? activeGallery.subwork.imageDetails[activeGallery.currentIndex]
    : null;

  const displayCategory = currentImageDetail ? currentImageDetail.category : displaySubwork?.category;
  const displayTitle = currentImageDetail ? currentImageDetail.title : displaySubwork?.title;
  const displayDescription = currentImageDetail ? currentImageDetail.description : displaySubwork?.description;

  return (
    <div className="min-h-screen bg-dark text-white relative font-sans">
      {/* Immersive Client Navigation */}
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8 lg:px-16 border-b border-borderGray bg-dark/80 backdrop-blur-md z-40">
        <button
          onClick={onBack}
          onMouseEnter={() => onHoverOn("BACK")}
          onMouseLeave={onHoverOff}
          className="group flex items-center gap-2 font-mono text-[11px] tracking-widest text-gray-400 hover:text-glacier transition-colors duration-300 cursor-none bg-transparent border-none outline-none"
        >
          [ <span className="group-hover:px-2 transition-all">←</span> BACK TO HOME ]
        </button>
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] uppercase">
          <span className="text-gray-600">PROJECT</span>
          <span className="text-glacier">/</span>
          <span>{project.title}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] lg:h-screen overflow-hidden flex flex-col justify-end pt-24">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0.3 }}
            animate={{ scale: 1.05, opacity: 0.6 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={project.coverImage}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        </div>

        <div className="relative z-10 px-8 lg:px-16 pb-0">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="reveal-hero"
          >
            <h1 className="text-5xl lg:text-[110px] font-black tracking-bighter leading-none mb-4 uppercase">
              {project.title}
            </h1>
            <p className="text-glacier font-mono text-xs lg:text-sm tracking-[0.4em] mb-12 uppercase leading-relaxed">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Dynamic Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full border-t border-b border-borderGray bg-dark/30 gap-px">
            <div className="p-5 border-r border-borderGray">
              <span className="block text-[9px] font-mono text-gray-500 uppercase mb-2">Year</span>
              <span className="text-xs md:text-sm tracking-widest block font-light">{project.year}</span>
            </div>
            
            <div className="p-5 border-r border-borderGray">
              <span className="block text-[9px] font-mono text-gray-500 uppercase mb-2">{project.artist ? "Artist" : "Role"}</span>
              <span className="text-xs md:text-sm tracking-widest block font-light">
                {project.artist || project.role}
              </span>
            </div>

            <div className="p-5 border-r border-borderGray">
              <span className="block text-[9px] font-mono text-gray-500 uppercase mb-2">
                {project.company ? "Company" : project.medium ? "Medium" : "Method"}
              </span>
              <span className="text-xs md:text-sm tracking-widest block font-light">
                {project.company || project.medium || project.method}
              </span>
            </div>

            <div className="p-5">
              <span className="block text-[9px] font-mono text-gray-500 uppercase mb-2">
                {project.location ? "Location" : project.focus ? "Focus" : "Context"}
              </span>
              <span className="text-xs md:text-sm tracking-widest block font-light">
                {project.location || project.focus}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-8 lg:px-16 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-borderGray bg-dark">
        <div className="lg:col-span-4">
          <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">01 / Overview</span>
          <h2 className="text-3xl font-bold tracking-tighter mt-4 uppercase leading-tight">
            {project.challengeTitle || "The Challenge & Objective"}
          </h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-titanium leading-relaxed font-light text-sm md:text-base opacity-80">
            {project.challengeDescription}
          </p>
          {(project.challengeDescriptionEn || project.technicalSpecs) && (
            <p className="text-titanium leading-relaxed font-light text-sm md:text-base opacity-75 md:opacity-65 italic">
              {project.challengeDescriptionEn || (project.technicalSpecs && project.technicalSpecs[0]?.description)}
            </p>
          )}
        </div>
      </section>

      {/* Embedded High-Vibe Video Documentation (Correctly Formatted) */}
      {project.youtubeId && (
        <section className="py-24 px-8 lg:px-16 border-b border-borderGray bg-[#111111]/30">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">02 / {project.id === "auramist" ? "Video Showcase" : "Documentation"}</span>
              <h2 className="text-3xl font-bold tracking-tighter mt-4 uppercase">
                {project.id === "auramist" ? "Cinematic Concept Showcase" : "Behavioral Synthesis"}
              </h2>
            </div>
            <div className="text-right">
              {project.id === "auramist" ? (
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-loose">
                  Fluid Dynamics: High-Efficiency Micro-Jets<br />
                  Assistive Tech: Adaptive Dermal Comfort
                </p>
              ) : (
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-loose">
                  Signal Processing: Heart Rate Variability (HRV)<br />
                  Actuation: Pulse-Width Modulation (PWM)
                </p>
              )}
            </div>
          </div>

          {/* Secure Video Embed Overlay */}
          <div 
            className="relative w-full aspect-video bg-black border border-borderGray overflow-hidden group shadow-2xl" 
            onMouseEnter={() => {
              if (!isOverviewVideoInteracting) {
                onHoverOn("PLAY VIDEO");
              }
            }}
            onMouseLeave={() => {
              onHoverOff();
              setIsOverviewVideoInteracting(false);
            }}
          >
            {/* Tech Frame Decoration */}
            <div className="absolute top-6 left-6 z-10 font-mono text-[10px] text-glacier/60 pointer-events-none flex flex-col gap-1 select-none text-left">
              <span>[ STATUS: ACTIVE ]</span>
              {project.id === "auramist" ? (
                <>
                  <span>[ SYSTEM: MULTI_METRICS ]</span>
                  <span>[ MODE: PORTABLE_MISTING_SYSTEM ]</span>
                </>
              ) : (
                <span>[ SIGNAL: HEART_RATE_INPUT ]</span>
              )}
            </div>
            <div className="absolute bottom-6 right-6 z-10 font-mono text-[10px] text-glacier/40 pointer-events-none uppercase select-none text-right">
              {project.id === "auramist" ? "Ref: AuraMist Cinematic Video" : `Ref: ${project.youtubeId} // SCULPTURE_V1`}
            </div>

            {/* Render direct YouTube embed properly inside container */}
            <iframe
              className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&mute=1&loop=1`}
              title="Interactive Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />

            {/* Hover overlay that captures cursor events cleanly without getting stuck */}
            {!isOverviewVideoInteracting && (
              <div 
                className="absolute inset-0 bg-black/15 backdrop-blur-[1px] cursor-none flex items-center justify-center z-20 group-hover:bg-black/35 transition-all duration-300"
                onClick={() => {
                  setIsOverviewVideoInteracting(true);
                  onHoverOff();
                }}
              >
                {/* Visual Cue: Click to Interactive Play */}
                <div className="w-16 h-16 rounded-full bg-dark/80 backdrop-blur-sm border border-glacier/30 flex items-center justify-center text-glacier group-hover:scale-110 group-hover:bg-glacier group-hover:text-dark transition-all duration-300 shadow-lg">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Corner Bracket Bracing */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-glacier/30 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-glacier/30 pointer-events-none"></div>
          </div>
        </section>
      )}

      {/* Multi-Disciplinary Work Matrix / Sub-works Section */}
      {project.subWorks && project.id !== "auramist" && project.id !== "everyonestage" && (
        <section className="py-24 border-b border-borderGray bg-dark">
          <div className="px-8 lg:px-16 mb-12 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
            <div>
              <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">
                {project.id === "accutone" 
                  ? "02 / Work Domains" 
                  : project.id === "shuangxin" 
                  ? "03 / Design Renderings" 
                  : project.id === "defensive-pulse"
                  ? "03 / Design Chronicle"
                  : "03 / Sub-assemblies"}
              </span>
              <h2 className="text-3xl font-bold tracking-tighter mt-4 uppercase leading-tight">
                {project.id === "accutone" 
                  ? "Multi-Dimensional Integration" 
                  : project.id === "shuangxin" 
                  ? "Design Proposal Showcase" 
                  : project.id === "defensive-pulse"
                  ? "Development & Psychology Chronicle"
                  : "Sub-mechanical Breakdown"}
              </h2>
            </div>


          </div>          {/* Sub Works Center-Aligned Big Album or Responsive Bento Grid */}
          {(project.id === "defensive-pulse" || project.id === "shuangxin") ? (
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
              {/* Media viewer slide container */}
              <div 
                className="relative w-full aspect-video md:aspect-[16/10] bg-[#111] border border-borderGray overflow-hidden group cursor-none"
                onClick={() => {
                  const subworkImages = filteredSubworks.map(s => s.image);
                  const currentItem = filteredSubworks[activeSubWorkIdx];
                  if (currentItem) {
                    setActiveGallery({
                      subwork: currentItem,
                      images: subworkImages,
                      currentIndex: activeSubWorkIdx
                    });
                  }
                }}
                onMouseEnter={() => {
                  const currentItem = filteredSubworks[activeSubWorkIdx];
                  if (currentItem) {
                    onHoverOn(currentItem.cursorLabel || "ZOOM VIEW");
                  }
                }}
                onMouseLeave={onHoverOff}
              >
                {/* Slides view wrapper */}
                <AnimatePresence mode="wait">
                  {filteredSubworks[activeSubWorkIdx] && (
                    <motion.div
                      key={activeSubWorkIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={filteredSubworks[activeSubWorkIdx].image}
                        decoding="sync"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 select-none pointer-events-none"
                        alt={filteredSubworks[activeSubWorkIdx].title}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fade overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent pointer-events-none" />

                {/* Arrow navigation buttons OVER overlay to override click actions cleanly */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSubWorkIdx((prev) => (prev - 1 + filteredSubworks.length) % filteredSubworks.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                  onMouseEnter={() => onHoverOn("PREV")}
                  onMouseLeave={() => {
                    const currentItem = filteredSubworks[activeSubWorkIdx];
                    if (currentItem) {
                      onHoverOn(currentItem.cursorLabel || "ZOOM VIEW");
                    }
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSubWorkIdx((prev) => (prev + 1) % filteredSubworks.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                  onMouseEnter={() => onHoverOn("NEXT")}
                  onMouseLeave={() => {
                    const currentItem = filteredSubworks[activeSubWorkIdx];
                    if (currentItem) {
                      onHoverOn(currentItem.cursorLabel || "ZOOM VIEW");
                    }
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Step Tag watermark */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-glacier/70 bg-dark/80 px-2 py-1 border border-borderGray/30 rounded backdrop-blur-[2px] select-none uppercase">
                  Step {String(activeSubWorkIdx + 1).padStart(2, '0')} // {String(filteredSubworks.length).padStart(2, '0')}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2.5 mt-6 mb-8 select-none">
                {filteredSubworks.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSubWorkIdx(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-none ${
                      idx === activeSubWorkIdx ? "w-8 bg-glacier" : "w-1.5 bg-gray-600 hover:bg-gray-400"
                    }`}
                    onMouseEnter={() => onHoverOn(`GOTO ${idx + 1}`)}
                    onMouseLeave={onHoverOff}
                  />
                ))}
              </div>

              {/* Description Block */}
              {filteredSubworks[activeSubWorkIdx] && (
                <div className="text-center max-w-2xl mt-2 select-none">
                  <span className="inline-block font-mono text-[10px] text-glacier tracking-[0.25em] uppercase mb-2">
                    {filteredSubworks[activeSubWorkIdx].category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                    {filteredSubworks[activeSubWorkIdx].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-titanium/75 font-light leading-relaxed">
                    {filteredSubworks[activeSubWorkIdx].description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-4 lg:px-8">
              <AnimatePresence mode="popLayout">
                {filteredSubworks.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    key={item.title}
                    onMouseEnter={() => onHoverOn(item.cursorLabel)}
                    onMouseLeave={onHoverOff}
                    className={`aspect-[4/5] relative group overflow-hidden bg-[#111] border border-borderGray flex flex-col justify-end p-6 cursor-none ${
                      item.isVideo ? "hover:border-glacier/50 transition-all duration-300" : ""
                    }`}
                    onClick={() => {
                      if (item.isVideo && item.videoUrl) {
                        setActiveVideo({
                          title: item.title,
                          videoUrl: item.videoUrl,
                          youtubeUrl: item.youtubeUrl
                        });
                      } else {
                        const galleryImages = getSubworkImages(item, project);
                        setActiveGallery({
                          subwork: item,
                          images: galleryImages,
                          currentIndex: 0
                        });
                      }
                    }}
                  >
                    {item.isVideo && item.videoUrl ? (
                      <>
                        <img
                          src={item.image}
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
                          alt={item.title}
                        />
                        <video
                          src={item.videoUrl}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </>
                    ) : (
                      <img
                        src={item.image}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-1000 pointer-events-none"
                        alt={item.title}
                      />
                    )}
                    
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-dark/80 backdrop-blur-sm border border-glacier/25 flex items-center justify-center text-glacier group-hover:scale-110 group-hover:bg-glacier group-hover:text-dark group-hover:border-transparent transition-all duration-500 pointer-events-auto">
                          <Play className="w-5 h-5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/45 to-transparent pointer-events-none" />

                    <div className="relative z-10 pointer-events-none">
                      <span className="block font-mono text-[9px] text-glacier mb-1 uppercase tracking-widest leading-none">
                        {item.category}
                      </span>
                      <h4 className="text-base md:text-lg font-bold tracking-tighter text-white">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[11px] text-gray-400 font-light leading-relaxed mt-3 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      )}

      {/* Technical Specifications Section */}
      {project.technicalSpecs && project.id !== "accutone" && (
        <section className="reveal-section py-24 px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 border-b border-borderGray bg-[#111111]/10">
          <div>
            <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">03 / Technical Specs</span>
            <h2 className="text-4xl font-black tracking-tighter mt-4 uppercase leading-tight">
              FROM CONCEPT<br />TO REALITY.
            </h2>
            <p className="mt-6 text-titanium/70 leading-relaxed text-sm font-light max-w-md">
              Bridging the boundary of physical components and sensor logic requires intense structural verification. By integrating custom mechanics and hardware limits, we ensure complete alignment across all touchpoints.
            </p>
          </div>

          <div className="space-y-10 font-mono">
            {project.technicalSpecs.map((spec, sIdx) => (
              <div key={sIdx} className="border-l border-borderGray hover:border-glacier pl-6 transition-colors duration-300">
                <h4 className="text-white text-xs md:text-sm font-bold uppercase mb-2">
                  {spec.title}
                </h4>
                <p className="text-[10px] md:text-[11px] text-gray-500 uppercase leading-relaxed font-light">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Academic Portfolio Section for everyonestage */}
      {project.id === "everyonestage" && project.subWorks && (
        <section className="py-24 border-b border-borderGray bg-dark relative text-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          
          <div className="px-8 lg:px-16 mb-20 relative z-10">
            <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase block mb-3">// 02 _ SELECTED ACADEMIC PROJECTS //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mt-4 uppercase leading-tight text-white">
              GRADUATE PORTFOLIO
            </h2>
            <p className="text-xs sm:text-sm text-titanium/60 mt-4 max-w-3xl mx-auto font-light leading-relaxed">
              Curating five pivotal student research installations and mechanical design interfaces. Each project represents a unique combination of user studies, rapid high-fidelity electronic prototyping, and holistic speculative systems.
            </p>
          </div>

          <div className="space-y-40 max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
            {project.subWorks.map((sub, sIdx) => (
              <PortfolioProjectCard
                key={sub.title}
                sub={sub}
                sIdx={sIdx}
                onHoverOn={onHoverOn}
                onHoverOff={onHoverOff}
                onOpenGallery={(subwork, images, index) => {
                  setActiveGallery({
                    subwork,
                    images,
                    currentIndex: index
                  });
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Custom Exhibition / Sustainable Community Need Survey Dashboard (Only for EveryoneStage) */}
      {project.id === "everyonestage_obsolete_old" && (
        <section className="py-24 px-8 lg:px-16 border-b border-borderGray bg-dark relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          
          <div className="mb-12 relative z-10 font-sans">
            <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase block mb-3">// 04 _ SYSTEM SPECIFICATION & REFINEMENT //</span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 uppercase tracking-tighter text-white">
              EveryOneStage Interactive Framework
            </h2>
            <p className="text-gray-400 text-sm font-light mt-4 max-w-3xl leading-relaxed">
              Delivering cross-disciplinary public architecture combining gestural systems, responsive service design touchpoints, and solar-hydrological circular micro-grids.
            </p>
          </div>

          {/* Interactive Navigation Hub */}
          <div className="mb-12 border-b border-borderGray/30 relative z-20 flex flex-wrap gap-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider">
            {[
              { id: "concept", label: "Core Concept", icon: Sparkles },
              { id: "research", label: "User Analytics & Stakeholders", icon: Users },
              { id: "kinect", label: "Gestural Technology", icon: Cpu },
              { id: "uiux", label: "Touchpoints & UI/UX", icon: Layout },
              { id: "sustainability", label: "Circular Hydrology", icon: Droplet }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStageTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 transition-all duration-300 cursor-none border-b-2 bg-transparent ${
                    stageTab === tab.id
                      ? "border-glacier text-glacier bg-glacier/5 font-black"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stageTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 min-h-[400px]"
            >
              {stageTab === "concept" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-6 bg-dark/65 border border-borderGray/40 p-8 md:p-12 rounded">
                    <span className="font-mono text-[9px] text-glacier tracking-[0.3em] uppercase block">// VISIONARY MANIFESTO</span>
                    <h3 className="text-2xl md:text-3.5xl font-light italic leading-tight text-white tracking-tight">
                      "{project.coreSlogan}"
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed text-justify font-sans">
                      {project.coreDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4 font-mono text-[9px] uppercase tracking-wider">
                      {project.keywords?.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-[#1a1a1a] text-glacier border border-borderGray/30 rounded">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative overflow-hidden rounded border border-borderGray/40 bg-dark/20 min-h-[300px]">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" 
                      className="w-full h-full object-cover opacity-50 absolute inset-0"
                      alt="Everyone is a Performer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 font-mono">
                      <span className="text-[10px] text-glacier tracking-widest block mb-1">DESIGN OUTPUTS</span>
                      <ul className="space-y-1 text-xs text-white uppercase font-bold tracking-tight">
                        {project.designOutput?.structures.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-glacier rounded-full shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {stageTab === "research" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded relative text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Users className="text-glacier w-5 h-5 animate-pulse" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        User Sentiment Meter & Survey
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-400 font-sans text-xs leading-relaxed">
                        <strong>Methodology:</strong> {project.userResearch?.methodology}
                      </p>
                      <p className="text-gray-400 font-sans text-xs leading-relaxed pt-2 border-t border-borderGray/10">
                        <strong>Insight:</strong> {project.userResearch?.conclusion}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-borderGray/10 font-mono text-[10px] text-gray-400">
                      <div>
                        <div className="flex justify-between text-white uppercase mb-1.5 font-bold">
                          <span>Public Interaction & Free Stage Support</span>
                          <span className="text-emerald-400">96.8%</span>
                        </div>
                        <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-50 rounded-full" style={{ width: "96.8%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-white uppercase mb-1.5 font-bold">
                          <span>Focus on High Structural Sustainability</span>
                          <span className="text-glacier">92.5%</span>
                        </div>
                        <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div className="h-full bg-glacier rounded-full" style={{ width: "92.5%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded relative text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Users className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Stakeholder Ecosystem Matrix
                      </h3>
                    </div>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed">
                      To move past abstract designs into real-world application, the architectural service maps directly across six core multi-sector interests:
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {project.stakeholders?.map((sh, idx) => (
                        <div key={idx} className="p-3 bg-[#111] border border-borderGray/25 rounded font-mono text-[10px] hover:bg-[#1a1a1a] transition-colors relative">
                          <div className="absolute top-1.5 right-2 text-[9px] text-gray-600 font-black">#0{idx+1}</div>
                          <span className="text-white uppercase font-bold tracking-tight block mt-1">{sh.split(" (")[0]}</span>
                          <span className="text-glacier text-[9px] tracking-wider block uppercase mt-0.5">{sh.split(" (")[1]?.replace(")", "") || "Execution"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {stageTab === "kinect" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Cpu className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Interface Motion Core
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] text-[#A3CEF1] tracking-[0.2em] uppercase block">
                      SYSTEM: {project.kinectSystem?.system}
                    </span>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed text-justify font-light">
                      {project.kinectSystem?.games}
                    </p>
                    <div className="p-4 bg-[#111] border border-borderGray/25 rounded font-mono text-[9px] text-gray-400 leading-relaxed">
                      <span className="text-white block font-bold mb-1">// COMPUTER VISION HIGHLIGHT:</span>
                      Passive posture evaluation reduces tactile input dependencies, securing and validating compliance with public hygiene and zero-contact spatial rules.
                    </div>
                  </div>

                  <div className="lg:col-span-8 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-2 border-b border-borderGray/30 pb-3 mb-6">
                      <Cpu className="text-glacier w-4 h-4 shrink-0" />
                      <span className="font-mono text-xs text-white uppercase font-bold tracking-widest">
                        Gestural Processing Chain Map
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                      {project.kinectSystem?.steps.map((step, idx) => (
                        <div key={idx} className="relative p-4 bg-[#161616] border border-borderGray/40 rounded flex flex-col justify-between min-h-[140px] group hover:border-glacier transition-all duration-300">
                          <div>
                            <span className="font-mono text-[22px] font-black text-glacier/25 block group-hover:text-glacier/55 transition-colors">0{idx+1}</span>
                            <span className="font-mono text-[9px] text-gray-500 tracking-widest block uppercase mb-2 mt-1">STAGE</span>
                          </div>
                          <span className="font-mono text-[10px] leading-snug font-bold text-white uppercase tracking-tight">
                            {step}
                          </span>
                          {idx < 4 && (
                            <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 text-glacier/40 font-bold z-20 pointer-events-none">
                              →
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3 p-4 bg-[#0a2330]/20 border border-glacier/10 rounded font-sans text-xs text-gray-400 italic">
                      <span className="text-glacier shrink-0 font-bold">INFO:</span>
                      Real-time body tracking translates human kinetic energy and movement into customized interactive lights and visuals without local database storage.
                    </div>
                  </div>
                </div>
              )}

              {stageTab === "uiux" && (
                <div className="space-y-8">
                  <div className="bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4 mb-6">
                      <Layout className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Service Touchpoints & App System
                      </h3>
                    </div>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-3xl">
                      To translate physical interactivity into structured social behaviors, EveryOneStage introduces a mobile-optimized service web app. This dashboard maps active performance loops while bridging the digital and spatial realms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project.serviceTouchpoints?.map((tp, idx) => (
                      <div key={idx} className="bg-dark/40 border border-borderGray/40 rounded p-6 flex flex-col justify-between min-h-[260px] relative hover:border-glacier transition-all duration-300 group">
                        <div className="absolute top-4 right-4 text-[9px] font-mono text-glacier/40 font-black">#0{idx+1}</div>
                        <div>
                          <div className="w-10 h-10 rounded-full bg-glacier/5 border border-glacier/25 flex items-center justify-center mb-4 text-glacier">
                            {idx === 0 && <UserCheck className="w-4 h-4" />}
                            {idx === 1 && <RefreshCw className="w-4 h-4" />}
                            {idx === 2 && <Play className="w-4 h-4" />}
                            {idx === 3 && <Printer className="w-4 h-4" />}
                          </div>
                          <h4 className="font-mono text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-2 text-left">
                            {tp.page}
                          </h4>
                        </div>
                        <p className="text-gray-500 font-sans text-xs leading-relaxed text-justify font-light group-hover:text-gray-300 transition-colors">
                          {tp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {stageTab === "sustainability" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Droplet className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Hydrological Management
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#A3CEF1] tracking-[0.2em] uppercase block">// OUTDOOR MONSOON MANAGEMENT</span>
                      <p className="text-gray-400 font-sans text-xs leading-relaxed text-justify">
                        {project.sustainabilityFeatures?.rainwater_collection}
                      </p>
                    </div>

                    <div className="border border-borderGray/30 rounded overflow-hidden mt-4">
                      <div className="grid grid-cols-12 bg-dark/80 px-4 py-2 border-b border-borderGray/40 font-mono text-[8px] text-gray-500 uppercase tracking-widest text-left">
                        <div className="col-span-2">Seq</div>
                        <div className="col-span-6">Active Layer</div>
                        <div className="col-span-4 text-right">Efficacy</div>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 border-b border-borderGray/20 items-center font-mono text-[9px] text-left">
                        <div className="col-span-2 text-glacier">01</div>
                        <div className="col-span-6 text-white uppercase font-bold">Inlet Pre-Screening</div>
                        <div className="col-span-4 text-right text-emerald-400 font-semibold font-mono">94% Capt</div>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 border-b border-borderGray/20 items-center font-mono text-[9px] text-left">
                        <div className="col-span-2 text-glacier">02</div>
                        <div className="col-span-6 text-white uppercase font-bold">Charcoal Active Filtration</div>
                        <div className="col-span-4 text-right text-emerald-400 font-semibold font-mono">88.5% Turb</div>
                      </div>
                      <div className="grid grid-cols-12 px-4 py-3 items-center font-mono text-[9px] text-left">
                        <div className="col-span-2 text-glacier">03</div>
                        <div className="col-span-6 text-white uppercase font-bold">Native Shoreline Roots</div>
                        <div className="col-span-4 text-right text-emerald-400 font-semibold font-mono">99.4% Organ</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Sun className="text-glacier w-5 h-5 animate-pulse" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Photovoltaic Harvesting
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-glacier tracking-[0.2em] uppercase block">// ENERGY CIRCULATION</span>
                      <p className="text-gray-400 font-sans text-xs leading-relaxed text-justify">
                        {project.sustainabilityFeatures?.solar_energy}
                      </p>
                    </div>

                    <div className="flex gap-4 p-5 bg-[#111]/50 border border-borderGray/50 font-mono text-[10px] leading-relaxed text-gray-400 mt-4">
                      <Sun className="text-glacier w-8 h-8 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white block uppercase font-bold mb-1">// SYSTEM SAVINGS INTEGRITY</span>
                        By using passive gravity patterns and A-Si shingles, the structure operates cleanly with net-positive off-grid credentials, harvesting electricity without central dependency.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* User Journey Section */}
          <div className="mt-16 bg-dark/45 border border-borderGray/40 p-8 rounded relative z-10 text-left">
            <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4 mb-8">
              <Compass className="text-glacier w-5 h-5 animate-pulse" />
              <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                Engagement User Journey Nodes
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {project.designOutput?.journey.map((node, index) => (
                <div key={index} className="p-4 bg-[#111]/80 border border-borderGray/30 rounded flex flex-col justify-between min-h-[120px] relative font-mono text-[10px]">
                  <span className="text-[20px] font-black text-glacier/20 absolute bottom-3 right-4">0{index + 1}</span>
                  <div>
                    <span className="text-gray-500 uppercase tracking-widest block mb-2 font-bold">STAGE {index + 1}</span>
                    <p className="text-white uppercase font-bold tracking-tight text-[10px] leading-snug">
                      {node}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-borderGray/20 text-gray-500 font-sans text-xs text-justify font-light leading-relaxed">
              *Artistic Configuration: {project.designOutput?.artisticStyle}
            </div>
          </div>
        </section>
      )}

      {/* Custom Medical Tech / Gait & Sensory Rehabilitation System (Only for RehabStride) */}
      {project.id === "rehabstride" && (
        <section className="py-24 px-8 lg:px-16 border-b border-borderGray bg-dark relative overflow-hidden text-left">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          
          <div className="mb-12 relative z-10 font-sans">
            <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase block mb-3">// 04 _ SYSTEM SPECIFICATION & REFINEMENT //</span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 uppercase tracking-tighter text-white">
              RehabStride Interactive Framework
            </h2>
            <p className="text-gray-400 text-sm font-light mt-4 max-w-3xl leading-relaxed">
              An intelligent, data-driven system integrating state-of-the-art plantar biomechanics hardware with motivational, patient-centric mobile companion systems.
            </p>
          </div>

          {/* Mini-Navigation Hub */}
          <div className="mb-12 border-b border-borderGray/30 relative z-20 flex flex-wrap gap-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider">
            {[
              { id: "concept", label: "Core Concept & Kano", icon: Sparkles },
              { id: "hardware", label: "Sensors & Gait Analysis", icon: Cpu },
              { id: "app", label: "App Architecture & Tabs", icon: Layout },
              { id: "visual", label: "Clinical Visual Stylings", icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setRehabTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 transition-all duration-300 cursor-none border-b-2 bg-transparent ${
                    rehabTab === tab.id
                      ? "border-glacier text-glacier bg-glacier/5 font-black"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Interactive display container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={rehabTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 min-h-[400px]"
            >
              {rehabTab === "concept" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Sparkles className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        The Core Concept
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] text-[#A3CEF1] tracking-[0.2em] uppercase block">
                      SLOGAN: "{project.coreSlogan}"
                    </span>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed text-justify">
                      {project.coreDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2 font-mono text-[9px] uppercase tracking-wider">
                      {project.keywords?.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-[#1a1a1a] text-glacier border border-borderGray/30 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 bg-dark border border-borderGray/30 rounded-lg mt-6 font-mono text-[10px] text-gray-400 leading-relaxed">
                      <span className="text-white block font-bold mb-1">// COGNITIVE OVERLOOK HYPOTHESIS:</span>
                      {project.backgroundProblem}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Users className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Patient Pain Points & Kano Focus
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {project.painPoints?.map((pp, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-relaxed text-gray-400">
                          <span className="text-glacier font-mono font-bold shrink-0">0{idx+1}.</span>
                          <p>{pp}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-[#0a2330]/20 border border-glacier/10 rounded font-sans text-xs text-gray-400">
                      <span className="text-white uppercase font-bold block mb-1 font-mono text-[10px]">// KANO MODEL CONCLUSION</span>
                      {project.kanoModelConclusion}
                    </div>
                  </div>
                </div>
              )}

              {rehabTab === "hardware" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Cpu className="text-glacier w-5 h-5 animate-pulse" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Biomechanical Insole Array
                      </h3>
                    </div>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed">
                      To track actual motion patterns instead of inaccurate user guesses, RehabStride features a high-density, multi-node dynamic sensor matrix:
                    </p>
                    <ul className="space-y-2 pt-2">
                      {project.hardwareExperimentation?.components.map((comp, idx) => (
                        <li key={idx} className="flex items-center gap-3 font-mono text-[10px] text-white">
                          <span className="w-1.5 h-1.5 bg-glacier rounded-full shrink-0" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#111] border border-borderGray/25 rounded font-mono text-[9px] text-gray-500 leading-relaxed uppercase">
                      *SYNC STATS: dual-leg dynamic polling rates at 120Hz with dual-node latency metrics falling under &lt;12ms.
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                      <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4 mb-4">
                        <Activity className="text-glacier w-5 h-5" />
                        <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                          Gait & Pressure Field Diagnostics
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-[#111] border border-borderGray/40 hover:border-glacier/30 transition-all duration-300 rounded font-mono text-[11px] relative">
                          <span className="text-white uppercase font-black block mb-1">1. Midfoot & Arch Zone</span>
                          <p className="text-gray-400 text-xs font-sans font-light leading-normal">
                             {project.hardwareExperimentation?.dataAnalysisConclusion.middle_sole_area}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-[#111] border border-borderGray/40 hover:border-[#A3CEF1]/30 transition-all duration-300 rounded font-mono text-[11px] relative">
                          <span className="text-white uppercase font-black block mb-1">2. Lateral Forefoot Dispersion</span>
                          <p className="text-gray-400 text-xs font-sans font-light leading-normal">
                            {project.hardwareExperimentation?.dataAnalysisConclusion.forefoot_area}
                          </p>
                        </div>

                        <div className="p-4 bg-[#111] border border-borderGray/40 hover:border-emerald-400/35 transition-all duration-300 rounded font-mono text-[11px] relative">
                          <span className="text-white uppercase font-black block mb-1">3. Heel Impact peak mapping</span>
                          <p className="text-gray-400 text-xs font-sans font-light leading-normal">
                            {project.hardwareExperimentation?.dataAnalysisConclusion.rear_heel_heel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rehabTab === "app" && (
                <div className="space-y-8 text-left">
                  <div className="bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4 mb-6">
                      <Layout className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        App Architecture & Dynamic Tab System
                      </h3>
                    </div>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-3xl">
                      RehabStride maps dynamic recovery features directly across a modular app navigation hierarchy, ensuring clients stay engaged while maintaining professional therapy guidance.
                    </p>
                  </div>

                  {/* Interactive App Simulator Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Simulator Navigation Buttons */}
                    <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-[11px] uppercase">
                      {project.appArchitecture?.tabNavigation.map((tabObj) => (
                        <button
                          key={tabObj.tab}
                          onClick={() => setActiveRehabAppTab(tabObj.tab)}
                          className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-300 border rounded cursor-none ${
                            activeRehabAppTab === tabObj.tab
                              ? "bg-glacier/10 border-glacier text-glacier font-black"
                              : "bg-[#111] border-borderGray/30 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span>{tabObj.tab} Tab</span>
                          <span className="text-[9px] px-2 py-0.5 bg-dark/80 rounded border border-borderGray/20 text-gray-500">
                            {tabObj.features.length} Feat
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Simulator Screen Output */}
                    <div className="lg:col-span-8 bg-[#141414] border border-borderGray/40 rounded p-8 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-glacier/40 tracking-widest uppercase">// PHONE_PREVIEW_DISPLAY</div>
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2.5 h-2.5 rounded-full bg-glacier animate-pulse" />
                          <span className="font-mono text-xs text-white uppercase font-bold tracking-widest">
                            Active App State: /{activeRehabAppTab.toLowerCase()}
                          </span>
                        </div>

                        {/* Rendering dynamic features */}
                        <div className="space-y-4">
                          {project.appArchitecture?.tabNavigation
                            .find((t) => t.tab === activeRehabAppTab)
                            ?.features.map((feat, idx) => (
                              <div key={idx} className="p-4 bg-dark/60 border border-borderGray/30 rounded flex items-center justify-between font-mono text-[11px]">
                                <span className="text-white font-bold uppercase">{feat}</span>
                                <span className="text-glacier text-[9px] uppercase tracking-wider">✔ Enabled</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Phone Bottom Bezel Simulation */}
                      <div className="mt-8 pt-4 border-t border-borderGray/15 flex justify-center">
                        <div className="w-16 h-1 bg-gray-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rehabTab === "visual" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Activity className="text-glacier w-5 h-5" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Interface & Brand Mechanics
                      </h3>
                    </div>
                    
                    <div className="space-y-3 font-mono text-[11px]">
                      <div className="flex justify-between border-b border-borderGray/25 pb-2">
                        <span className="text-gray-500 uppercase">Primary Accent Color</span>
                        <span className="text-glacier font-bold uppercase">{project.visualIdentity?.mainColor}</span>
                      </div>
                      <div className="flex justify-between border-b border-borderGray/25 pb-2">
                        <span className="text-gray-500 uppercase">Auxiliary Contrast Colors</span>
                        <span className="text-white font-bold uppercase">{project.visualIdentity?.auxiliaryColor}</span>
                      </div>
                      <div className="flex justify-between border-b border-borderGray/25 pb-2">
                        <span className="text-gray-500 uppercase">Typography Selection</span>
                        <span className="text-[#A3CEF1] font-bold">Muli Dynamic (Bold/Semi/Reg)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 uppercase">UI/UX Theme Guidelines</span>
                        <span className="text-emerald-400 font-bold uppercase">Grid / Rounded Cards / High Contrast</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6 bg-dark/65 border border-borderGray/40 p-8 rounded text-left">
                    <div className="flex items-center gap-3 border-b border-borderGray/40 pb-4">
                      <Heart className="text-glacier w-5 h-5 animate-pulse" />
                      <h3 className="font-mono text-sm tracking-luxury text-white uppercase font-bold">
                        Patient Interface Features
                      </h3>
                    </div>
                    
                    <div className="space-y-3 text-xs text-gray-400">
                      <div>
                        <strong className="text-white block font-mono text-[10px] uppercase">// 1. 3D ANATOMICAL ANKLE MODEL</strong>
                        {project.appArchitecture?.coreFunctions.ankle_model}
                      </div>
                      <div className="pt-2 border-t border-borderGray/15">
                        <strong className="text-white block font-mono text-[10px] uppercase">// 2. DYNAMIC WORKOUT RECOMMENDATIONS</strong>
                        {project.appArchitecture?.coreFunctions.recommendations}
                      </div>
                      <div className="pt-2 border-t border-borderGray/15">
                        <strong className="text-white block font-mono text-[10px] uppercase">// 3. INTERACTIVE CLINICAL SUPPORT GROUPS</strong>
                        {project.appArchitecture?.coreFunctions.tutorials_and_community}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* SECTION 05: ACADEMIC & OUTCOME PIPELINES (Only for AuraMist or projects with researchPapers / patents) */}
      {(project.researchPapers || project.patents || project.awards) && (
        <section className="py-24 border-b border-borderGray bg-[#0a0a0a] relative overflow-hidden">
          {/* Decorative tech grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-glacier/5 blur-3xl rounded-full pointer-events-none" />

          <div className="px-8 lg:px-16 mb-16 relative z-10">
            <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">04 / Scientific Research</span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 uppercase tracking-tighter text-white">
              Scholarly Pipeline
            </h2>
            <p className="text-gray-400 text-sm font-light mt-3 max-w-2xl">
              Deeply unifying academic theory and engineering practice, this project underwent rigorous academic peer reviews, international patent layouts, and successful real-world technology transfers, working to restore personal autonomy and physical hygiene dignity for the mobility-impaired.
            </p>
          </div>

          <div className="px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            {/* Left: Patents & Awards Portfolio */}
            <div className="lg:col-span-5 space-y-12">
              {/* Patents Sub-Section */}
              {project.patents && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-borderGray/80 pb-3">
                    <Cpu className="text-glacier w-5 h-5" />
                    <h3 className="font-mono text-xs md:text-sm tracking-widest text-glacier uppercase font-bold">
                      Patent Portfolio
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {project.patents.map((pat, patIdx) => (
                      <div 
                        key={patIdx}
                        className="p-5 border border-borderGray/50 bg-dark/60 hover:border-glacier/40 transition-all duration-300 rounded group flex flex-col justify-between relative"
                      >
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-glacier/10 group-hover:border-glacier/40 transition-colors" />
                        <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase mb-1">
                          {pat.authority}
                        </span>
                        <h4 className="text-white text-xs md:text-sm font-semibold mb-2 group-hover:text-glacier transition-colors uppercase text-left">
                          {pat.title}
                        </h4>
                        <div className="flex justify-between items-center font-mono text-[10px] text-gray-400 mt-2">
                          <span className="bg-dark px-2 py-0.5 border border-borderGray text-gray-500 rounded text-[9px]">
                            {pat.patentNo}
                          </span>
                          <span>{pat.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards Sub-Section */}
              {project.awards && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-borderGray/80 pb-3">
                    <Award className="text-glacier w-5 h-5" />
                    <h3 className="font-mono text-xs md:text-sm tracking-widest text-glacier uppercase font-bold">
                      International Honors
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.awards.map((awr, awrIdx) => (
                      <div 
                        key={awrIdx}
                        className="p-5 border border-borderGray/50 bg-[#121212]/30 hover:bg-[#121212]/60 hover:border-glacier/30 transition-all duration-300 rounded relative group"
                      >
                        <div className="absolute bottom-2 right-2 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
                          <Award className="w-12 h-12 text-glacier" />
                        </div>
                        <span className="font-mono text-[9px] text-glacier bg-glacier/5 border border-glacier/15 px-2 py-0.5 rounded tracking-widest block w-fit mb-3 uppercase">
                          {awr.medal === "SILVER" ? "Geneva Silver" : "Best Invention"}
                        </span>
                        <h4 className="text-white text-xs md:text-sm font-bold uppercase leading-tight mb-2 text-left">
                          {awr.title}
                        </h4>
                        <p className="text-gray-500 text-[10px] leading-relaxed text-left">
                          {awr.description}
                        </p>
                        <span className="font-mono text-[9px] text-gray-600 block mt-3 text-left">
                          {awr.awardingBody} / {awr.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Academic Papers & Peer-Review Pipelines */}
            {project.researchPapers && (
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-3 border-b border-borderGray/80 pb-3">
                  <BookOpen className="text-glacier w-5 h-5" />
                  <h3 className="font-mono text-xs md:text-sm tracking-widest text-glacier uppercase font-bold">
                    Academic Papers & Submission Queue
                  </h3>
                </div>

                {/* Paper Selection Tabs */}
                <div className="flex border-b border-borderGray/30 gap-1 overflow-x-auto pb-px">
                  {project.researchPapers.map((pap, papIdx) => (
                    <button
                      key={papIdx}
                      onClick={() => {
                        setActivePaperIdx(papIdx);
                        onHoverOn(`PAPER 0${papIdx + 1}`);
                      }}
                      onMouseLeave={onHoverOff}
                      className={`px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all whitespace-nowrap bg-transparent cursor-none outline-none border-b-2 ${
                        activePaperIdx === papIdx 
                          ? "border-glacier text-glacier font-semibold" 
                          : "border-transparent text-gray-500 hover:text-white"
                      }`}
                    >
                      [ PAPER 0{papIdx + 1} ]
                    </button>
                  ))}
                </div>

                {/* Selected Paper Details */}
                <div className="space-y-6 pt-2">
                  <div className="bg-[#111]/40 border border-borderGray/40 p-6 rounded relative">
                    <span className="font-mono text-[9px] text-glacier uppercase block mb-3 tracking-widest text-left">
                      Primary Scholarly Output / Principal Author PI
                    </span>
                    <h4 className="text-white text-base md:text-xl font-bold tracking-tight mb-2 uppercase leading-snug text-left">
                      {project.researchPapers[activePaperIdx]?.title}
                    </h4>
                    <p className="font-mono text-[10px] text-gray-400 mb-6 italic text-left">
                      Authors: {(() => {
                        const authorStr = project.researchPapers[activePaperIdx]?.authors || "";
                        if (!authorStr.includes("Lu Haoxuan")) return authorStr;
                        const parts = authorStr.split("Lu Haoxuan");
                        return (
                          <>
                            {parts.map((part, index) => (
                              <span key={index}>
                                {part}
                                {index < parts.length - 1 && (
                                  <span className="text-[#51D3FF] font-bold underline underline-offset-2 decoration-[#51D3FF]/80 bg-[#51D3FF]/10 px-1.5 py-0.5 rounded-sm">
                                    Lu Haoxuan
                                  </span>
                                )}
                              </span>
                            ))}
                          </>
                        );
                      })()}
                    </p>

                    <div className="space-y-2 border-t border-borderGray/30 pt-4">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block text-left">Paper Abstract</span>
                      <p className="text-gray-400 text-xs leading-relaxed font-light font-sans text-justify">
                        {project.researchPapers[activePaperIdx]?.abstract}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 04 / Final Realization */}
      {project.finalGallery && project.id !== "defensive-pulse" && (
        <section className="py-24 border-b border-borderGray bg-[#0d0d0d]/40">
          <div className="px-8 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">
                {project.id === "auramist" 
                  ? "03 / Sub-assemblies" 
                  : "04 / Final Realization"}
              </span>
              <h2 className="text-3xl font-bold tracking-tighter mt-4 uppercase">
                {project.id === "auramist" 
                  ? "Sub-mechanical Breakdown" 
                  : "Physical Artifacts Photo Album"}
              </h2>
              <p className="text-titanium/60 text-xs sm:text-sm mt-3 max-w-xl font-light font-sans">
                {project.id === "auramist"
                  ? "A comprehensive design chronicle mapping the entire end-to-end development lifecycle of AuraMist—documenting initial participatory research, mechanical subsystem prototyping, thermal fluidic simulations, custom PCB electronics, and real-world clinical tryout assemblies."
                  : "A curated physical photographic collection of the completed artifact, engineering components, structural linkages, and close-up detail captures."}
              </p>
            </div>
          </div>

          {/* Interactive Bento/Grid Photo Album or Slideshow of Sub-mechanical breakdown */}
          <div className="px-8 lg:px-16">
            {project.id === "auramist" ? (
              <div className="max-w-4xl mx-auto flex flex-col items-center">
                {/* Media viewer slide container */}
                <div 
                  className="relative w-full aspect-video md:aspect-[16/10] bg-[#111] border border-borderGray overflow-hidden group cursor-none"
                  onClick={() => {
                    setActiveFinalArtifactIdx(activeFinalSlideIdx);
                  }}
                  onMouseEnter={() => {
                    const currentItem = project.finalGallery![activeFinalSlideIdx];
                    if (currentItem) {
                      onHoverOn(currentItem.badge || "ZOOM VIEW");
                    }
                  }}
                  onMouseLeave={onHoverOff}
                >
                  {/* Slides view wrapper */}
                  <AnimatePresence mode="wait">
                    {project.finalGallery[activeFinalSlideIdx] && (
                      <motion.div
                        key={activeFinalSlideIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={project.finalGallery[activeFinalSlideIdx].image}
                          decoding="sync"
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 select-none pointer-events-none"
                          alt={project.finalGallery[activeFinalSlideIdx].title}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Fade overlay on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent pointer-events-none" />

                  {/* Arrow navigation buttons OVER overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFinalSlideIdx((prev) => (prev - 1 + project.finalGallery!.length) % project.finalGallery!.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("PREV")}
                    onMouseLeave={() => {
                      const currentItem = project.finalGallery![activeFinalSlideIdx];
                      if (currentItem) {
                        onHoverOn(currentItem.badge || "ZOOM VIEW");
                      }
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFinalSlideIdx((prev) => (prev + 1) % project.finalGallery!.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("NEXT")}
                    onMouseLeave={() => {
                      const currentItem = project.finalGallery![activeFinalSlideIdx];
                      if (currentItem) {
                        onHoverOn(currentItem.badge || "ZOOM VIEW");
                      }
                    }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Step Tag watermark */}
                  <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-glacier/70 bg-dark/80 px-2 py-1 border border-borderGray/30 rounded backdrop-blur-[2px] select-none uppercase">
                    Step {String(activeFinalSlideIdx + 1).padStart(2, '0')} // {String(project.finalGallery.length).padStart(2, '0')}
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-2.5 mt-6 mb-8 select-none">
                  {project.finalGallery.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveFinalSlideIdx(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full cursor-none ${
                        idx === activeFinalSlideIdx ? "w-8 bg-glacier" : "w-1.5 bg-gray-600 hover:bg-gray-400"
                      }`}
                      onMouseEnter={() => onHoverOn(`GOTO ${idx + 1}`)}
                      onMouseLeave={onHoverOff}
                    />
                  ))}
                </div>

                {/* Description Block */}
                {project.finalGallery[activeFinalSlideIdx] && (
                  <div className="text-center max-w-2xl mt-2 select-none">
                    <span className="inline-block font-mono text-[10px] text-glacier tracking-[0.25em] uppercase mb-2">
                      {project.finalGallery[activeFinalSlideIdx].badge || "SUB-ASSEMBLY"}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3">
                      {project.finalGallery[activeFinalSlideIdx].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-titanium/75 font-light leading-relaxed">
                      {project.finalGallery[activeFinalSlideIdx].description}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.finalGallery.map((artifact, aIdx) => (
                  <div
                    key={aIdx}
                    onClick={() => setActiveFinalArtifactIdx(aIdx)}
                    className="group relative bg-dark border border-borderGray/40 overflow-hidden cursor-none aspect-[4/3] rounded-sm transition-all duration-500 hover:border-glacier/40"
                    onMouseEnter={() => onHoverOn(`VIEW IMAGE 0${aIdx + 1}`)}
                    onMouseLeave={onHoverOff}
                  >
                    {/* Photo Frame Container */}
                    <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a]">
                      <img
                        src={artifact.image}
                        alt={artifact.title}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90 pointer-events-none"
                      />
                      
                      {/* Dark gradient gloss */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Album Frame Labels & Corner accents */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                      <span className="font-mono text-[9px] text-gray-400 bg-black/60 px-2 py-0.5 rounded tracking-widest border border-borderGray/30 uppercase">
                        NO. 0{aIdx + 1}
                      </span>
                      {artifact.badge && (
                        <span className="font-mono text-[9px] text-[#51D3FF] bg-[#51D3FF]/10 px-2.5 py-0.5 rounded border border-[#51D3FF]/20 uppercase tracking-wider">
                          {artifact.badge}
                        </span>
                      )}
                    </div>

                    {/* Interactive Expand Glyph */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-7 h-7 bg-glacier text-dark flex items-center justify-center rounded-sm shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Text Strip */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-left bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none">
                      <span className="font-mono text-[9px] text-glacier/80 tracking-widest uppercase block mb-1">
                        {artifact.badge || "PORTFOLIO CAPTURE"}
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1 group-hover:text-glacier transition-colors duration-300">
                        {artifact.title}
                      </h3>
                      <p className="text-[11px] text-titanium/70 line-clamp-2 mt-1.5 font-light leading-relaxed">
                        {artifact.description}
                      </p>
                    </div>

                    {/* Aesthetic Corner Brackets */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-glacier/30 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-glacier/30 transition-colors duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 04 / AuraMist Concept Design */}
      {project.id === "auramist" && project.conceptGallery && (
        <section className="py-24 border-b border-borderGray bg-[#080808]">
          <div className="px-8 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-glacier text-[11px] tracking-[0.5em] uppercase">
                04 / Concept Design
              </span>
              <h2 className="text-3xl font-bold tracking-tighter mt-4 uppercase">
                Latest AuraMist Concept Design
              </h2>
              <p className="text-titanium/60 text-xs sm:text-sm mt-3 max-w-xl font-light">
                An immersive conceptual design collection documenting the latest aesthetic visions, next-generation structural simulations, design styling iterations, and spatial integrations of the AuraMist system.
              </p>
            </div>
          </div>

          <div className="px-8 lg:px-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {/* Media viewer slide container */}
              <div 
                className="relative w-full aspect-video md:aspect-[16/10] bg-[#111] border border-borderGray overflow-hidden group cursor-none"
                onClick={() => {
                  // Interactive preview index hook
                }}
                onMouseEnter={() => {
                  const currentItem = project.conceptGallery![activeConceptSlideIdx];
                  if (currentItem) {
                    onHoverOn(currentItem.badge || "ZOOM VIEW");
                  }
                }}
                onMouseLeave={onHoverOff}
              >
                {/* Slides view wrapper */}
                <AnimatePresence mode="wait">
                  {project.conceptGallery[activeConceptSlideIdx] && (
                    <motion.div
                      key={activeConceptSlideIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={project.conceptGallery[activeConceptSlideIdx].image}
                        decoding="sync"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 select-none pointer-events-none"
                        alt={project.conceptGallery[activeConceptSlideIdx].title}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fade overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent pointer-events-none" />

                {/* Arrow navigation buttons OVER overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveConceptSlideIdx((prev) => (prev - 1 + project.conceptGallery!.length) % project.conceptGallery!.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                  onMouseEnter={() => onHoverOn("PREV")}
                  onMouseLeave={() => {
                    const currentItem = project.conceptGallery![activeConceptSlideIdx];
                    if (currentItem) {
                      onHoverOn(currentItem.badge || "ZOOM VIEW");
                    }
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveConceptSlideIdx((prev) => (prev + 1) % project.conceptGallery!.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-dark/80 backdrop-blur-sm border border-borderGray hover:border-glacier text-white hover:text-glacier transition-all cursor-none"
                  onMouseEnter={() => onHoverOn("NEXT")}
                  onMouseLeave={() => {
                    const currentItem = project.conceptGallery![activeConceptSlideIdx];
                    if (currentItem) {
                      onHoverOn(currentItem.badge || "ZOOM VIEW");
                    }
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Step Tag watermark */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-glacier/70 bg-dark/80 px-2 py-1 border border-borderGray/30 rounded backdrop-blur-[2px] select-none uppercase">
                  Step {String(activeConceptSlideIdx + 1).padStart(2, '0')} // {String(project.conceptGallery.length).padStart(2, '0')}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2.5 mt-6 mb-8 select-none">
                {project.conceptGallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveConceptSlideIdx(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-none ${
                      idx === activeConceptSlideIdx ? "w-8 bg-glacier" : "w-1.5 bg-gray-600 hover:bg-gray-400"
                    }`}
                    onMouseEnter={() => onHoverOn(`GOTO ${idx + 1}`)}
                    onMouseLeave={onHoverOff}
                  />
                ))}
              </div>

              {/* Description Block */}
              {project.conceptGallery[activeConceptSlideIdx] && (
                <div className="text-center max-w-2xl mt-2 select-none">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3">
                    {project.conceptGallery[activeConceptSlideIdx].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-titanium/75 font-light leading-relaxed">
                    {project.conceptGallery[activeConceptSlideIdx].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer / Dynamic Slide Next Case Study */}
      <footer className="w-full py-24 px-8 border-t border-borderGray bg-dark text-center select-none">
        <span className="font-mono text-gray-600 text-[10px] tracking-[0.5em] uppercase mb-4 block">
          NEXT CASE STUDY
        </span>
        <button
          onClick={() => onNextProject(nextProject)}
          onMouseEnter={() => onHoverOn("GO NEXT")}
          onMouseLeave={onHoverOff}
          className="group relative inline-block bg-transparent border-none outline-none cursor-none py-2"
        >
          <h3 className="text-4xl md:text-8xl font-black tracking-tighter uppercase transition-colors hover:text-glacier leading-none text-white">
            {nextProject.title}
          </h3>
          <div className="w-0 h-[2px] bg-glacier group-hover:w-full transition-all duration-500 mx-auto mt-2" />
        </button>

        <div className="mt-28 flex justify-between items-center text-[9px] font-mono text-gray-700 tracking-wider uppercase">
          <span>© 2026 NICK LU — DESIGN HUB</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => onHoverOn("UP")}
            onMouseLeave={onHoverOff}
            className="hover:text-glacier transition-colors cursor-none bg-transparent border-none text-[9px] font-mono text-gray-600 outline-none"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>

      {/* Immersive Cinematic Video Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-xl p-4 md:p-8 select-none"
          >
            {/* Ambient Glowing Background */}
            <div className="absolute inset-x-0 top-1/4 h-1/2 bg-glacier/10 blur-3xl rounded-full opacity-50 mix-blend-screen pointer-events-none" />

            <div className="relative w-full max-w-5xl bg-[#090909] border border-borderGray rounded overflow-hidden shadow-2xl flex flex-col justify-between">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between p-4 border-b border-borderGray bg-[#0d0d0d] font-mono text-[9px] md:text-[10px] tracking-widest text-glacier uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping shrink-0" />
                  <span>// SYS_FEED: {activeVideo.title} // READY</span>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-gray-500">
                  <span>RES: 3840x2160 (4K)</span>
                  <span>FPS: 24.00</span>
                  <span>CODEC: H.264 / AAC</span>
                </div>
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    setIsPlaying(false);
                    setIsMuted(false);
                  }}
                  onMouseEnter={() => onHoverOn("CLOSE")}
                  onMouseLeave={onHoverOff}
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-none bg-transparent border-none outline-none leading-none flex items-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Workspace */}
              <div className="relative aspect-video w-full bg-black">
                {/* Decorative brackets overlay */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-glacier/30 pointer-events-none" />
                <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-glacier/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-glacier/30 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-glacier/30 pointer-events-none" />

                {activeVideo.youtubeUrl ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={getYoutubeEmbedUrl(activeVideo.youtubeUrl)}
                      className="w-full h-full object-contain"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ border: 0 }}
                    />
                    {!isModalVideoInteracting && (
                      <div 
                        className="absolute inset-0 bg-black/15 backdrop-blur-[1.5px] cursor-none flex items-center justify-center z-20 hover:bg-black/35 transition-all duration-300"
                        onMouseEnter={() => onHoverOn("PLAY")}
                        onMouseLeave={onHoverOff}
                        onClick={() => {
                          setIsModalVideoInteracting(true);
                          onHoverOff();
                        }}
                      >
                        {/* Elegant overlay to capture hover events smoothly */}
                        <div className="w-16 h-16 rounded-full bg-[#0d0d0d]/90 backdrop-blur-sm border border-glacier/30 flex items-center justify-center text-glacier hover:scale-110 hover:bg-glacier hover:text-dark transition-all duration-300 shadow-xl">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={activeVideo.videoUrl}
                      className="w-full h-full object-contain cursor-none"
                      autoPlay
                      loop
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          setCurrentTime(videoRef.current.currentTime);
                        }
                      }}
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          setDuration(videoRef.current.duration);
                        }
                      }}
                    />

                    {/* Big Center Play toggle overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/25 cursor-none"
                      onClick={togglePlay}
                    >
                      <div className="w-16 h-16 rounded-full bg-dark/80 backdrop-blur-sm border border-glacier/25 flex items-center justify-center text-glacier">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Console Dashboard Controls */}
              <div className="p-4 bg-[#0d0d0d] border-t border-borderGray flex flex-col gap-3">
                {activeVideo.youtubeUrl ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888] uppercase py-1">
                    <div className="flex items-center gap-2 text-glacier">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>SECURE YT EMBED ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                      <span>AUDIO SYSTEM: CINEMATIC OUTPUT</span>
                      <span className="hidden md:inline">SYSTEM: INTERACTIVE OUTWARD LINK FEED</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Timeline and scrubber */}
                    <div className="flex items-center gap-3 font-mono text-[9px] text-gray-500">
                      <span>{formatTime(currentTime)}</span>
                      <div 
                        onClick={(e) => {
                          if (!videoRef.current || duration === 0) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const percentage = clickX / rect.width;
                          const newTime = percentage * duration;
                          videoRef.current.currentTime = newTime;
                          setCurrentTime(newTime);
                        }}
                        className="flex-1 h-1.5 bg-[#161616] border border-borderGray/40 rounded overflow-hidden cursor-none relative"
                      >
                        <div 
                          className="absolute top-0 left-0 bottom-0 bg-glacier"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controller Bar */}
                    <div className="flex items-center justify-between">
                      {/* Left Play/Pause controller */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-glacier/5 hover:bg-glacier hover:text-dark text-glacier border border-glacier/15 rounded text-[10px] font-mono tracking-wider uppercase cursor-none transition-all duration-300"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>PAUSE</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>PLAY REEL</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={toggleMute}
                          className="flex items-center justify-center p-1.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-400 hover:text-white rounded border border-borderGray cursor-none transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Right Telemetry indicators */}
                      <div className="font-mono text-[9px] text-gray-500 flex items-center gap-4">
                        <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded uppercase">
                          HOLOGRAPHIC PIPELINE ACTIVE
                        </span>
                        <span className="hidden md:inline">AUDIO STREAM: STEREO 48KHZ</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SubWork Photo Gallery Lightbox Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveGallery(null)}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActiveGallery(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-none"
              onMouseEnter={() => onHoverOn("CLOSE")}
              onMouseLeave={onHoverOff}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Inner Container */}
            <div 
              className="relative w-full max-w-5xl h-full flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Info */}
              <div className="pt-6 pb-3 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#51D3FF] uppercase bg-[#51D3FF]/10 px-2.5 py-1 rounded-sm border border-[#51D3FF]/20">
                    {displayCategory}
                  </span>
                  <h3 className="text-lg md:text-xl font-sans font-medium tracking-tight text-white mt-3">
                    {displayTitle}
                  </h3>
                </div>
                <div className="text-xs font-mono text-gray-500 mt-1 md:mt-0">
                  {activeGallery.currentIndex + 1} / {activeGallery.images.length}
                </div>
              </div>

              {/* Main Image Slider Area */}
              <div className="flex-1 relative flex items-center justify-center my-4 min-h-0">
                {/* Left navigation */}
                {activeGallery.images.length > 1 && (
                  <button
                    onClick={() => {
                      setActiveGallery((prev) => {
                        if (!prev) return null;
                        const nextId = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
                        if (project.id === "defensive-pulse" || project.id === "shuangxin") {
                          setActiveSubWorkIdx(nextId);
                        }
                        return { ...prev, currentIndex: nextId };
                      });
                    }}
                    className="absolute left-0 md:left-2 z-40 p-2.5 md:p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("PREV")}
                    onMouseLeave={onHoverOff}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Main image content */}
                <div className="w-full h-full max-h-[45vh] md:max-h-[55vh] flex items-center justify-center relative px-10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeGallery.currentIndex}
                      src={activeGallery.images[activeGallery.currentIndex]}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="max-h-full max-w-full object-contain shadow-2xl border border-white/10 rounded-sm"
                      alt={`${displaySubwork?.title || ""} - ${activeGallery.currentIndex + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackImage(displaySubwork?.title || "", activeGallery.currentIndex);
                      }}
                    />
                  </AnimatePresence>
                </div>

                {/* Right navigation */}
                {activeGallery.images.length > 1 && (
                  <button
                    onClick={() => {
                      setActiveGallery((prev) => {
                        if (!prev) return null;
                        const nextId = (prev.currentIndex + 1) % prev.images.length;
                        if (project.id === "defensive-pulse" || project.id === "shuangxin") {
                          setActiveSubWorkIdx(nextId);
                        }
                        return { ...prev, currentIndex: nextId };
                      });
                    }}
                    className="absolute right-0 md:right-2 z-40 p-2.5 md:p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("NEXT")}
                    onMouseLeave={onHoverOff}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Bottom Description Area */}
              {displayDescription && (
                <div className="px-1 text-center md:text-left bg-white/[0.01] p-3 rounded border border-white/5">
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {displayDescription}
                  </p>
                </div>
              )}

              {/* Middle Action / Option row */}
              <div className="py-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 mt-3">
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">
                  PRESS LEFT/RIGHT ARROWS TO BROWSE, ESC TO CLOSE
                </div>
                
                {/* Play Video button inside gallery detail if it's a video item */}
                {displaySubwork?.isVideo && displaySubwork?.videoUrl && (
                  <button
                    onClick={() => {
                      const videoItem = displaySubwork;
                      setActiveGallery(null); // Close gallery first
                      setTimeout(() => {
                        setActiveVideo({
                          title: videoItem.title,
                          videoUrl: videoItem.videoUrl!,
                          youtubeUrl: videoItem.youtubeUrl
                        });
                      }, 200);
                    }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded bg-glacier hover:bg-cyan-400 text-dark text-xs font-mono tracking-wider uppercase transition-colors cursor-none whitespace-nowrap"
                    onMouseEnter={() => onHoverOn("PLAY REEL")}
                    onMouseLeave={onHoverOff}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PLAY MULTIMEDIA REEL</span>
                  </button>
                )}
              </div>

              {/* Thumbnail strip selection */}
              {activeGallery.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto max-w-full">
                  {activeGallery.images.map((img, i) => (
                    <button
                      key={img}
                      className={`relative w-12 h-12 rounded overflow-hidden border transition-all cursor-none shrink-0 ${
                        activeGallery.currentIndex === i 
                          ? "border-[#51D3FF] scale-102 bg-white/10" 
                          : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
                      }`}
                      onClick={() => {
                        if (project.id === "defensive-pulse" || project.id === "shuangxin") {
                          setActiveSubWorkIdx(i);
                        }
                        setActiveGallery((prev) => prev ? { ...prev, currentIndex: i } : null);
                      }}
                      onMouseEnter={() => onHoverOn(`PHOTO ${i + 1}`)}
                      onMouseLeave={onHoverOff}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        alt="" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage(displaySubwork?.title || "", i);
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Physical Realization Gallery Lightbox Modal */}
      <AnimatePresence>
        {activeFinalArtifactIdx !== null && project.finalGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveFinalArtifactIdx(null)}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActiveFinalArtifactIdx(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-none"
              onMouseEnter={() => onHoverOn("CLOSE")}
              onMouseLeave={onHoverOff}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Inner Container */}
            <div 
              className="relative w-full max-w-5xl h-full flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Info */}
              <div className="pt-6 pb-3 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#51D3FF] uppercase bg-[#51D3FF]/10 px-2.5 py-1 rounded-sm border border-[#51D3FF]/20">
                    {project.finalGallery[activeFinalArtifactIdx]?.badge || "PHYSICAL DISPOSITION"}
                  </span>
                  <h3 className="text-lg md:text-xl font-sans font-medium tracking-tight text-white mt-3">
                    {project.finalGallery[activeFinalArtifactIdx]?.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-gray-500 mt-1 md:mt-0">
                  {activeFinalArtifactIdx + 1} / {project.finalGallery.length}
                </div>
              </div>

              {/* Main Image Slider Area */}
              <div className="flex-1 relative flex items-center justify-center my-4 min-h-0">
                {/* Left navigation */}
                {project.finalGallery.length > 1 && (
                  <button
                    onClick={() => {
                      setActiveFinalArtifactIdx((prev) => {
                        if (prev === null) return null;
                        return (prev - 1 + project.finalGallery!.length) % project.finalGallery!.length;
                      });
                    }}
                    className="absolute left-0 md:left-2 z-40 p-2.5 md:p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("PREV")}
                    onMouseLeave={onHoverOff}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Main image content */}
                <div className="w-full h-full max-h-[45vh] md:max-h-[55vh] flex items-center justify-center relative px-10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFinalArtifactIdx}
                      src={project.finalGallery[activeFinalArtifactIdx]?.image}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="max-h-full max-w-full object-contain shadow-2xl border border-white/10 rounded-sm"
                      alt={project.finalGallery[activeFinalArtifactIdx]?.title}
                    />
                  </AnimatePresence>
                </div>

                {/* Right navigation */}
                {project.finalGallery.length > 1 && (
                  <button
                    onClick={() => {
                      setActiveFinalArtifactIdx((prev) => {
                        if (prev === null) return null;
                        return (prev + 1) % project.finalGallery!.length;
                      });
                    }}
                    className="absolute right-0 md:right-2 z-40 p-2.5 md:p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-none"
                    onMouseEnter={() => onHoverOn("NEXT")}
                    onMouseLeave={onHoverOff}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Bottom Description Area */}
              {project.finalGallery[activeFinalArtifactIdx]?.description && (
                <div className="px-1 text-center md:text-left bg-white/[0.01] p-3 rounded border border-white/5">
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {project.finalGallery[activeFinalArtifactIdx]?.description}
                  </p>
                </div>
              )}

              {/* Middle Action Info Row */}
              <div className="py-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 mt-3">
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">
                  PRESS LEFT/RIGHT ARROWS TO BROWSE, ESC TO CLOSE
                </div>
              </div>

              {/* Thumbnail strip selection */}
              {project.finalGallery.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto max-w-full">
                  {project.finalGallery.map((artifact, i) => (
                    <button
                      key={i}
                      className={`relative w-12 h-12 rounded overflow-hidden border transition-all cursor-none shrink-0 ${
                        activeFinalArtifactIdx === i 
                          ? "border-[#51D3FF] scale-102 bg-white/10" 
                          : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
                      }`}
                      onClick={() => setActiveFinalArtifactIdx(i)}
                      onMouseEnter={() => onHoverOn(`PHOTO ${i + 1}`)}
                      onMouseLeave={onHoverOff}
                    >
                      <img 
                        src={artifact.image} 
                        className="w-full h-full object-cover" 
                        alt="" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
