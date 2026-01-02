import { useEffect, useState } from "react";
import { useSound } from "@/contexts/SoundContext";

const WelcomeSound = () => {
    const { playSound } = useSound();
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Check if welcome sound has already played
        const hasPlayedWelcome = sessionStorage.getItem("hasPlayedWelcome");

        if (hasPlayedWelcome) {
            return;
        }

        // Wait for first user interaction (required by browser autoplay policy)
        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);

                // Play welcome sound after first interaction
                setTimeout(() => {
                    playSound("welcome");
                    sessionStorage.setItem("hasPlayedWelcome", "true");
                }, 300);

                // Remove listeners after first interaction
                document.removeEventListener("click", handleFirstInteraction);
                document.removeEventListener("keydown", handleFirstInteraction);
                document.removeEventListener("touchstart", handleFirstInteraction);
            }
        };

        // Listen for any user interaction
        document.addEventListener("click", handleFirstInteraction);
        document.addEventListener("keydown", handleFirstInteraction);
        document.addEventListener("touchstart", handleFirstInteraction);

        return () => {
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
        };
    }, [playSound, hasInteracted]);

    return null;
};

export default WelcomeSound;
