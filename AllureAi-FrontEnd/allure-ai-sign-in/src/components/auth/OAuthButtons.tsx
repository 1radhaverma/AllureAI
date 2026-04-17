import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const OAuthButtons = () => {
  const signIn = async (provider: "google" | "apple") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-11 glass hover:bg-secondary"
        onClick={() => signIn("google")}
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 glass hover:bg-secondary"
        onClick={() => signIn("apple")}
      >
        <AppleIcon />
        Apple
      </Button>
    </div>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 35.5 24 35.5c-6.3 0-11.5-5.2-11.5-11.5S17.7 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.7 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5l-6-5.1c-1.9 1.4-4.3 2.2-6.9 2.2-5.3 0-9.7-3-11.3-7.4l-6.5 5C9.5 39.2 16.2 43.5 24 43.5z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6 5.1c-.4.4 6.5-4.7 6.5-14.6 0-1.2-.1-2.3-.4-3.5z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M16.365 1.43c0 1.14-.41 2.22-1.23 3.06-.83.84-1.97 1.5-3.07 1.4-.13-1.07.43-2.2 1.2-3.05.85-.95 2.2-1.65 3.1-1.74zM20.5 17.42c-.5 1.16-.74 1.68-1.4 2.7-.92 1.42-2.22 3.18-3.83 3.2-1.43.02-1.8-.93-3.74-.92-1.94.01-2.34.94-3.78.92-1.6-.02-2.83-1.6-3.75-3.02-2.6-4.04-2.87-8.78-1.27-11.3 1.14-1.79 2.94-2.84 4.62-2.84 1.72 0 2.8.94 4.21.94 1.37 0 2.2-.94 4.2-.94 1.5 0 3.1.82 4.23 2.23-3.71 2.03-3.1 7.34.51 9.03z"/>
  </svg>
);
