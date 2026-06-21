import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  cursorLabel: string;
  isHovered: boolean;
}

export default function CustomCursor({ cursorLabel, isHovered }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 600, mass: 0.25 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch screens
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct update to motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
        transform: "translate(-50%, -50%)",
      }}
      className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center border"
      animate={{
        width: isHovered ? (cursorLabel === "EXPLORE" ? 30 : 84) : 12,
        height: isHovered ? (cursorLabel === "EXPLORE" ? 30 : 84) : 12,
        backgroundColor: isHovered 
          ? (cursorLabel === "EXPLORE" ? "rgba(81, 211, 255, 0.08)" : "rgba(163, 206, 241, 1)") 
          : "rgba(163, 206, 241, 0.8)",
        borderColor: isHovered && cursorLabel === "EXPLORE" ? "rgba(81, 211, 255, 0.85)" : "transparent",
        borderWidth: isHovered && cursorLabel === "EXPLORE" ? 1.5 : 0,
        mixBlendMode: isHovered && cursorLabel !== "EXPLORE" ? "difference" : "normal",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.1
      }}
    >
      {isHovered && cursorLabel && cursorLabel !== "EXPLORE" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[9px] font-mono font-bold text-dark tracking-widest uppercase text-center block whitespace-nowrap"
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>
  );
}
