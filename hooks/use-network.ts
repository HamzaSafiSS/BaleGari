import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const update = () => setOnline(navigator.onLine);
      update();
      window.addEventListener('online', update);
      window.addEventListener('offline', update);
      return () => {
        window.removeEventListener('online', update);
        window.removeEventListener('offline', update);
      };
    }
    // Native fallback: assume online (would use NetInfo in production)
    return () => {};
  }, []);

  return { online };
}
