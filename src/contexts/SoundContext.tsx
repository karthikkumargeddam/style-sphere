import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SoundContextType {
    isSoundEnabled: boolean;
    toggleSound: () => void;
    playSound: (soundType: SoundType) => void;
}

export type SoundType =
    | "click"
    | "addToCart"
    | "removeFromCart"
    | "success"
    | "error"
    | "notification"
    | "toggle"
    | "hover"
    | "wishlist"
    | "welcome";

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Sound effect URLs (using Web Audio API to generate sounds)
const generateSound = (type: SoundType): void => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure sound based on type
    switch (type) {
        case "click":
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;

        case "addToCart":
            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);

            // Add a second tone for richness
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 659.25; // E5
                gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.2);
            }, 100);
            break;

        case "removeFromCart":
            oscillator.frequency.value = 400;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;

        case "success":
            // Play ascending notes
            [523.25, 659.25, 783.99].forEach((freq, index) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + 0.15);
                }, index * 80);
            });
            break;

        case "error":
            oscillator.frequency.value = 200;
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;

        case "notification":
            oscillator.frequency.value = 880;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;

        case "toggle":
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;

        case "hover":
            oscillator.frequency.value = 1000;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;

        case "wishlist":
            oscillator.frequency.value = 700;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.25);
            break;

        case "welcome":
            // EPIC CINEMATIC OPENING - Dramatic and Powerful

            // 1. DEEP IMPACT BASS (Immediate power)
            const impact = audioContext.createOscillator();
            const impactGain = audioContext.createGain();
            impact.connect(impactGain);
            impactGain.connect(audioContext.destination);
            impact.frequency.value = 65.41; // C2 (very deep, powerful)
            impact.type = "sine";
            impactGain.gain.setValueAtTime(0.6, audioContext.currentTime);
            impactGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
            impact.start(audioContext.currentTime);
            impact.stop(audioContext.currentTime + 1.5);

            // 2. RISING TENSION (Build-up)
            const riser = audioContext.createOscillator();
            const riserGain = audioContext.createGain();
            riser.connect(riserGain);
            riserGain.connect(audioContext.destination);
            riser.type = "sawtooth";
            riser.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
            riser.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 1.0);
            riserGain.gain.setValueAtTime(0.15, audioContext.currentTime + 0.2);
            riserGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
            riser.start(audioContext.currentTime + 0.2);
            riser.stop(audioContext.currentTime + 1.0);

            // 3. EPIC ORCHESTRAL PROGRESSION
            const epicNotes = [
                { freq: 130.81, delay: 300, duration: 1.0, gain: 0.35 },   // C3 (foundation)
                { freq: 196.00, delay: 500, duration: 0.9, gain: 0.30 },   // G3 (power)
                { freq: 261.63, delay: 700, duration: 0.8, gain: 0.32 },   // C4 (rising)
                { freq: 392.00, delay: 900, duration: 0.7, gain: 0.28 },   // G4 (building)
                { freq: 523.25, delay: 1100, duration: 1.2, gain: 0.35 }   // C5 (triumphant)
            ];

            epicNotes.forEach(({ freq, delay, duration, gain: gainValue }) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    const filter = audioContext.createBiquadFilter();

                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(audioContext.destination);

                    osc.frequency.value = freq;
                    osc.type = "triangle";

                    filter.type = "lowpass";
                    filter.frequency.value = 1500;
                    filter.Q.value = 2;

                    gain.gain.setValueAtTime(gainValue, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + duration);
                }, delay);
            });

            // 4. DRAMATIC HITS (Percussion-like impacts)
            [400, 800, 1200].forEach((delay) => {
                setTimeout(() => {
                    const hit = audioContext.createOscillator();
                    const hitGain = audioContext.createGain();
                    const hitFilter = audioContext.createBiquadFilter();

                    hit.connect(hitFilter);
                    hitFilter.connect(hitGain);
                    hitGain.connect(audioContext.destination);

                    hit.frequency.value = 80;
                    hit.type = "square";

                    hitFilter.type = "lowpass";
                    hitFilter.frequency.value = 200;

                    hitGain.gain.setValueAtTime(0.3, audioContext.currentTime);
                    hitGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

                    hit.start(audioContext.currentTime);
                    hit.stop(audioContext.currentTime + 0.15);
                }, delay);
            });

            // 5. EPIC FINALE SHIMMER (Magical sparkle)
            setTimeout(() => {
                [1046.50, 1318.51, 1567.98].forEach((freq, index) => {
                    setTimeout(() => {
                        const shimmer = audioContext.createOscillator();
                        const shimmerGain = audioContext.createGain();
                        shimmer.connect(shimmerGain);
                        shimmerGain.connect(audioContext.destination);
                        shimmer.frequency.value = freq;
                        shimmer.type = "sine";
                        shimmerGain.gain.setValueAtTime(0.2, audioContext.currentTime);
                        shimmerGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                        shimmer.start(audioContext.currentTime);
                        shimmer.stop(audioContext.currentTime + 0.8);
                    }, index * 100);
                });
            }, 1300);
            break;

        default:
            oscillator.frequency.value = 440;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
    }
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        const saved = localStorage.getItem("soundEnabled");
        return saved !== null ? saved === "true" : true; // Default to enabled
    });

    useEffect(() => {
        localStorage.setItem("soundEnabled", isSoundEnabled.toString());
    }, [isSoundEnabled]);

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
        // Play a toggle sound when enabling/disabling
        if (!isSoundEnabled) {
            generateSound("toggle");
        }
    };

    const playSound = (soundType: SoundType) => {
        if (isSoundEnabled) {
            try {
                generateSound(soundType);
            } catch (error) {
                console.error("Error playing sound:", error);
            }
        }
    };

    return (
        <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
};
