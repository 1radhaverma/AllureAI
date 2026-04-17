import { motion } from "framer-motion";
import maleFigure from "@/assets/figure-male.png";
import femaleFigure from "@/assets/figure-female.png";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface Props {
  side: "left" | "right";
}

/**
 * 3D-styled fashion figure panel with parallax tilt and glow.
 * Left = male (Luna), Right = female (Moon).
 */
export const FigurePanel = ({ side }: Props) => {
  const { theme, setTheme } = useTheme();
  const isMale = side === "left";
  const figure = isMale ? maleFigure : femaleFigure;
  const isActive = (isMale && theme === "luna") || (!isMale && theme === "moon");

  return (
    <button
      type="button"
      onClick={() => setTheme(isMale ? "luna" : "moon")}
      className={cn(
        "relative hidden md:flex flex-1 overflow-hidden perspective-scene group focus:outline-none",
        side === "left" ? "items-end justify-end" : "items-end justify-start",
      )}
      aria-label={isMale ? "Choose Luna — men style" : "Choose Moon — women style"}
    >
      {/* themed gradient backdrop */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isMale
            ? "bg-[linear-gradient(160deg,hsl(200_80%_14%)_0%,hsl(195_70%_22%)_50%,hsl(184_65%_30%)_100%)]"
            : "bg-[linear-gradient(200deg,hsl(285_70%_18%)_0%,hsl(300_75%_30%)_50%,hsl(320_85%_55%)_100%)]",
          isActive ? "opacity-100" : "opacity-60",
        )}
      />

      {/* soft halo */}
      <div
        className={cn(
          "absolute -inset-20 blur-3xl opacity-50 transition-opacity duration-700 pointer-events-none",
          isMale
            ? "bg-[radial-gradient(circle_at_70%_40%,hsl(184_90%_50%/0.55),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_30%_40%,hsl(320_95%_60%/0.55),transparent_60%)]",
        )}
      />

      {/* floor reflection */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

      {/* 3D figure */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: isMale ? -20 : 20 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative preserve-3d float-slow",
          isMale ? "tilt-left" : "tilt-right",
        )}
        style={{ filter: "drop-shadow(0 60px 60px hsl(0 0% 0% / 0.55))" }}
      >
        <img
          src={figure}
          alt={isMale ? "Stylized 3D male fashion figure in Luna palette" : "Stylized 3D female fashion figure in Moon palette"}
          width={1024}
          height={1024}
          className="h-[88vh] w-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* label */}
      <div
        className={cn(
          "absolute top-28 px-6",
          side === "left" ? "left-10 text-left" : "right-10 text-right",
        )}
      >
        <h2 className="font-display text-5xl lg:text-6xl text-balance">
          {isMale ? "For him" : "For her"}
        </h2>
        <p className="font-serif-soft italic text-lg mt-3 text-muted-foreground max-w-xs">
          {isMale
            ? "Sharp tailoring, midnight tones, quiet confidence."
            : "Soft silhouettes, magnetic hues, unapologetic glow."}
        </p>
      </div>

      {/* active ring */}
      {isActive && (
        <span className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase gradient-brand text-primary-foreground shadow-glow">
          Active
        </span>
      )}
    </button>
  );
};
