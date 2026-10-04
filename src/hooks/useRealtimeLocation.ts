import { useState, useEffect, useCallback } from 'react';

export interface LocationData {
  locationName: string;
  coords: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
  refreshLocation: () => void;
}

export const useRealtimeLocation = (defaultLocation = 'Salem, Tamil Nadu'): LocationData => {
  const [locationName, setLocationName] = useState<string>(() => {
    return localStorage.getItem('irrigo_live_location') || defaultLocation;
  });
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(() => {
    return localStorage.getItem('irrigo_is_live_loc') === 'true';
  });
  const [error, setError] = useState<string | null>(null);

  const fetchReverseGeocode = async (lat: number, lon: number): Promise<string> => {
    try {
      // Primary: BigDataCloud free client-side reverse geocoding API (fast, no rate limits, reliable CORS)
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      if (res.ok) {
        const data = await res.json();
        const city = data.city || data.locality || data.principalSubdivisionCode || data.localityInfo?.administrative?.[2]?.name;
        const state = data.principalSubdivision || data.countryName;
        
        if (city && state) {
          return `${city}, ${state}`;
        } else if (city) {
          return city;
        } else if (state) {
          return `${state}, India`;
        }
      }
    } catch (e) {
      console.warn('BigDataCloud reverse geocode failed, trying fallback Nominatim', e);
    }

    try {
      // Fallback: OpenStreetMap Nominatim
      const res2 = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
        { headers: { 'User-Agent': 'IrriGo-AgriPulse-App' } }
      );
      if (res2.ok) {
        const data2 = await res2.json();
        const addr = data2.address || {};
        const place = addr.city || addr.town || addr.village || addr.county || addr.district;
        const state = addr.state || addr.country;
        if (place && state) {
          return `${place}, ${state}`;
        }
      }
    } catch (e) {
      console.warn('Nominatim reverse geocode failed', e);
    }

    // Secondary Fallback: Format GPS coordinates cleanly
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lon).toFixed(2)}° ${lonDir}`;
  };

  const refreshLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        const resolvedName = await fetchReverseGeocode(latitude, longitude);
        setLocationName(resolvedName);
        setIsLive(true);
        setIsLoading(false);

        localStorage.setItem('irrigo_live_location', resolvedName);
        localStorage.setItem('irrigo_is_live_loc', 'true');
      },
      (err) => {
        console.warn('Geolocation position error:', err);
        setIsLoading(false);
        setError(err.message || 'Unable to retrieve location');
        // Keep default location if permission denied
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, []);

  useEffect(() => {
    // Automatically attempt geolocation request on mount
    refreshLocation();
  }, [refreshLocation]);

  return {
    locationName,
    coords,
    isLoading,
    isLive,
    error,
    refreshLocation
  };
};
