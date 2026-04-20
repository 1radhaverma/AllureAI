import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import maleFigure from "@/assets/figure-male.png";
import femaleFigure from "@/assets/figure-female.png";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set listener BEFORE getSession (per Lovable Cloud auth guidance)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

// ✅ BACKEND CONNECTION TEST (ADD THIS)
  useEffect(() => {
    fetch("https://localhost:7229/api/Product")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Backend error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("CONNECTED ✅ Frontend + Backend", data);
      })
      .catch((err) => {
        console.error("ERROR ❌ Backend not connected", err);
      });
  }, []);
  
  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/login");
  };

  const figure = theme === "luna" ? maleFigure : femaleFigure;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-xs tracking-[0.4em] uppercase text-primary/90">
            {theme === "luna" ? "Luna · for him" : "Moon · for her"}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 text-balance leading-[1.05]">
            Fashion, <span className="shimmer-text">curated</span> by AI.
          </h1>
          <p className="font-serif-soft italic text-xl mt-5 text-muted-foreground max-w-lg">
            Switch the sign in the navbar to flip the entire wardrobe between
            Luna and Moon — two worlds, one Allure.
          </p>

          {session ? (
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Hi, {session.user.email}
              </span>
              <Button onClick={signOut} variant="outline" className="glass">
                Sign out
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 px-6 gradient-brand text-primary-foreground shadow-glow">
                <Link to="/signup">Create your style</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 glass">
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          )}
        </motion.div>

        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-scene"
        >
          <div className="absolute inset-10 rounded-full blur-3xl opacity-60 gradient-side" />
          <img
            src={figure}
            alt={theme === "luna" ? "Luna 3D male figure" : "Moon 3D female figure"}
            width={1024}
            height={1024}
            className="relative h-[70vh] w-auto mx-auto float-slower"
            style={{ filter: "drop-shadow(0 60px 60px hsl(0 0% 0% / 0.6))" }}
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
