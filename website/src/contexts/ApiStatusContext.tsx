import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkApiHealth } from '@/lib/apiHealth';

type ApiStatus = 'unknown' | 'up' | 'down';

interface ApiStatusContextValue {
  status: ApiStatus;
  lastChecked: string | null;
  check: () => Promise<void>;
}

const ApiStatusContext = createContext<ApiStatusContextValue | undefined>(undefined);

export function useApiStatus() {
  const ctx = useContext(ApiStatusContext);
  if (!ctx) throw new Error('useApiStatus must be used within ApiStatusProvider');
  return ctx;
}

export function ApiStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ApiStatus>('unknown');
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  async function check() {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '';
      const result = await checkApiHealth(apiBase, 3000);
      if (result.ok) {
        setStatus('up');
      } else {
        setStatus('down');
      }
    } catch (err) {
      setStatus('down');
    } finally {
      setLastChecked(new Date().toISOString());
    }
  }

  useEffect(() => {
    // Run initial check on mount (client-side)
    if (typeof window === 'undefined') return;
    check();
    const timer = window.setInterval(() => check(), 30 * 1000); // re-check every 30s
    return () => window.clearInterval(timer);
  }, []);

  const value: ApiStatusContextValue = {
    status,
    lastChecked,
    check,
  };

  return <ApiStatusContext.Provider value={value}>{children}</ApiStatusContext.Provider>;
}
