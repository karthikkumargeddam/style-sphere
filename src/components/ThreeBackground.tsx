import { useEffect, useRef } from "react";

const ThreeBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle system with physics
        class Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;
            color: string;
            alpha: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 1000;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.vz = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 3 + 1;
                const hue = 40 + Math.random() * 20; // Gold range
                this.color = `hsl(${hue}, 100%, 50%)`;
                this.alpha = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
                if (this.z < 0) this.z = 1000;
                if (this.z > 1000) this.z = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const scale = 1000 / (1000 + this.z);
                const x2d = this.x * scale + canvas.width / 2 * (1 - scale);
                const y2d = this.y * scale + canvas.height / 2 * (1 - scale);
                const size = this.size * scale;

                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha * scale;
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 20 * scale;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Create particles
        const particles: Particle[] = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = "rgba(17, 20, 26, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw(ctx);
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Canvas for particle system */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Ambient gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent pointer-events-none" />

            {/* Floating orbs with depth */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse floating-3d" />
            <div
                className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse floating-3d"
                style={{ animationDelay: '2s', animationDuration: '8s' }}
            />
            <div
                className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse floating-3d"
                style={{ animationDelay: '4s', animationDuration: '10s' }}
            />

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/50 pointer-events-none" />
        </div>
    );
};

export default ThreeBackground;
