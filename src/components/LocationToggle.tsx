import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const LocationToggle: React.FC = () => {
  const { state, startWatch, stopWatch, requestPermission, getCurrentPosition } = useLocation();

  const handleEnable = async () => {
    await requestPermission();
    await getCurrentPosition();
    startWatch();
  };

  const handleDisable = () => stopWatch();

  const handleCopy = async () => {
    const coordsText = state.coords ? `${state.coords.latitude}, ${state.coords.longitude}` : "";
    const addressText = state.address || "";
    const text = `Coords: ${coordsText}\nAddress: ${addressText}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback: create textarea
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex flex-col text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          {state.coords ? (
            <span className="font-medium">{state.coords.latitude.toFixed(4)}, {state.coords.longitude.toFixed(4)}</span>
          ) : (
            <span className="font-medium">Location not set</span>
          )}
        </div>
        <div className="text-xs truncate max-w-xs">{state.address || "Address not available"}</div>
      </div>

      <div className="flex items-center gap-2">
        {state.watching ? (
          <Button size="sm" variant="ghost" onClick={handleDisable}>
            Stop
          </Button>
        ) : (
          <Button size="sm" onClick={handleEnable}>
            Enable
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
};

export default LocationToggle;
