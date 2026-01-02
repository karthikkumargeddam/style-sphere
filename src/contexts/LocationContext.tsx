import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Coords = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

type LocationState = {
  permission: PermissionState | "unknown";
  coords?: Coords;
  address?: string;
  error?: string;
  watching: boolean;
};

type LocationContextValue = {
  state: LocationState;
  requestPermission: () => Promise<PermissionState | undefined>;
  startWatch: () => void;
  stopWatch: () => void;
  getCurrentPosition: () => Promise<Coords | undefined>;
};

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocationState>({ permission: "unknown", watching: false });
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.permissions) return;
    let mounted = true;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((res) => {
        if (!mounted) return;
        setState((s) => ({ ...s, permission: res.state }));
        res.onchange = () => setState((s) => ({ ...s, permission: res.state }));
      })
      .catch(() => {
        /* ignore */
      });

    return () => {
      mounted = false;
    };
  }, []);

  const getCurrentPosition = () =>
    new Promise<Coords | undefined>((resolve) => {
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        setState((s) => ({ ...s, error: "Geolocation not supported" }));
        resolve(undefined);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy };
          // reverse geocode
          const address = await reverseGeocode(coords);
          setState((s) => ({ ...s, coords, address, error: undefined }));
          resolve(coords);
        },
        (err) => {
          setState((s) => ({ ...s, error: err.message }));
          resolve(undefined);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    });

  const requestPermission = async () => {
    if (typeof navigator === "undefined") return undefined;
    try {
      const p = await (navigator.permissions ? navigator.permissions.query({ name: "geolocation" as PermissionName }) : Promise.resolve(undefined));
      if (p && p.state) setState((s) => ({ ...s, permission: p.state }));
      return p ? p.state : undefined;
    } catch {
      return undefined;
    }
  };

  const startWatch = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    if (watchIdRef.current != null) return;

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        (async () => {
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy };
          const address = await reverseGeocode(coords);
          setState((s) => ({ ...s, coords, address, watching: true, error: undefined }));
        })();
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message }));
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );

    watchIdRef.current = id as unknown as number;
    setState((s) => ({ ...s, watching: true }));
  };

  const reverseGeocode = async (coords: Coords): Promise<string | undefined> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
        coords.latitude
      )}&lon=${encodeURIComponent(coords.longitude)}&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "UniFab/1.0 (+https://unifab.example)"
        }
      });
      if (!res.ok) return undefined;
      const data = await res.json();
      // prefer display_name, fall back to structured address
      if (data?.display_name) return data.display_name as string;
      if (data?.address) return Object.values(data.address).join(", ");
      return undefined;
    } catch {
      return undefined;
    }
  };

  const stopWatch = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current as number);
      watchIdRef.current = null;
    }
    setState((s) => ({ ...s, watching: false }));
  };

  useEffect(() => {
    return () => stopWatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider value={{ state, requestPermission, startWatch, stopWatch, getCurrentPosition }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};

export default LocationContext;
