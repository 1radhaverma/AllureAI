import { Link } from "react-router-dom";
import { GenderToggle } from "./GenderToggle";

export const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full gradient-brand shadow-glow grid place-items-center">
            <span className="font-display text-lg text-primary-foreground">A</span>
          </div>
          <span className="font-display text-2xl tracking-wide">
            Allure <span className="shimmer-text">AI</span>
          </span>
        </Link>
        <GenderToggle />
      </div>
    </header>
  );
};
