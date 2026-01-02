import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
    endDate: Date;
    onExpire?: () => void;
    showDays?: boolean;
    compact?: boolean;
}

const CountdownTimer = ({
    endDate,
    onExpire,
    showDays = true,
    compact = false
}: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const end = endDate.getTime();
            const distance = end - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
                onExpire?.();
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
                expired: false
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endDate, onExpire]);

    if (timeLeft.expired) {
        return (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Sale has ended</p>
            </div>
        );
    }

    if (compact) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-mono">
                <Clock className="w-4 h-4" />
                <span>
                    {showDays && timeLeft.days > 0 && `${timeLeft.days}d `}
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
            </div>
        );
    }

    const timeUnits = [
        ...(showDays && timeLeft.days > 0 ? [{ value: timeLeft.days, label: 'Days' }] : []),
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
    ];

    return (
        <div className="flex items-center justify-center gap-2">
            {timeUnits.map((unit, index) => (
                <div key={unit.label}>
                    <div className="flex flex-col items-center">
                        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-lg p-3 min-w-[60px] shadow-lg">
                            <div className="text-2xl font-bold font-mono text-center">
                                {String(unit.value).padStart(2, '0')}
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-medium">
                            {unit.label}
                        </div>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <div className="text-2xl font-bold text-muted-foreground mx-1">:</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
