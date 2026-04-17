import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { FigurePanel } from "@/components/auth/FigurePanel";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { toast } from "sonner";

interface Props {
  mode: "login" | "signup";
}

export const AuthShell = ({ mode }: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Welcome to Allure AI ✦ check your inbox to verify.");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate("/");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex pt-20">
        <FigurePanel side="left" />

        {/* Center auth card */}
        <div className="flex-1 md:flex-[0.9] flex items-center justify-center px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="glass rounded-3xl p-8 sm:p-10 shadow-elev relative overflow-hidden">
              {/* shine */}
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,hsl(var(--primary)/0.18),transparent_60%)] pointer-events-none" />

              <div className="relative">
                <p className="font-display text-xs tracking-[0.4em] uppercase text-primary/90 mb-3">
                  Allure AI
                </p>
                <h1 className="font-display text-4xl sm:text-5xl text-balance">
                  {isSignup ? "Create your style" : "Welcome back"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isSignup
                    ? "Sign up and let our AI curate looks made for you."
                    : "Sign in to continue your fashion journey."}
                </p>

                <div className="mt-7">
                  <OAuthButtons />
                </div>

                <div className="flex items-center gap-3 my-6">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">or</span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  {isSignup && (
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ava Laurent"
                        className="h-11 bg-input/60"
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@allure.ai"
                      className="h-11 bg-input/60"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-input/60"
                      minLength={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 gradient-brand text-primary-foreground hover:opacity-90 shadow-glow font-medium tracking-wide"
                  >
                    {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground text-center mt-6">
                  {isSignup ? "Already have an account?" : "New to Allure AI?"}{" "}
                  <Link
                    to={isSignup ? "/login" : "/signup"}
                    className="text-primary hover:underline underline-offset-4"
                  >
                    {isSignup ? "Sign in" : "Create one"}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <FigurePanel side="right" />
      </main>
    </div>
  );
};
