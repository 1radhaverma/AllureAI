import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

/**
 * Modern minimalist gender signs:
 * - Mars (♂) for Luna theme (men)
 * - Venus (♀) for Moon theme (women)
 * Toggle swaps the active theme.
 */
export const GenderToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const isLuna = theme === "luna";

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-1 p-1 rounded-full glass shadow-3d",
        className,
      )}
      role="radiogroup"
      aria-label="Style preference"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full gradient-brand shadow-glow",
          isLuna ? "left-1" : "left-[calc(50%+0rem)]",
        )}
        aria-hidden
      />
      <button
        type="button"
        role="radio"
        aria-checked={isLuna}
        onClick={() => setTheme("luna")}
        className={cn(
          "relative z-10 h-9 w-9 rounded-full grid place-items-center transition-colors",
          isLuna ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Luna — men"
      >
        <MarsSign />
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={!isLuna}
        onClick={() => setTheme("moon")}
        className={cn(
          "relative z-10 h-9 w-9 rounded-full grid place-items-center transition-colors",
          !isLuna ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Moon — women"
      >
        <VenusSign />
      </button>
    </div>
  );
};

const MarsSign = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="10" cy="14" r="5" />
    <path d="M14.5 9.5 20 4" />
    <path d="M15 4h5v5" />
  </svg>
);

const VenusSign = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7" />
    <path d="M9 18h6" />
  </svg>
);
