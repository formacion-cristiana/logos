import { useCallback, useEffect, useRef, useState } from "react";

// Countdown hook. Returns { seconds, running, start, pause, resume, reset }.
// `start` bumps a nonce so the interval always restarts even if `running` was
// already true (fixes the "timer freezes after reset+start in same tick" bug).
export function useCountdown(initial, onExpire) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);
  const [nonce, setNonce] = useState(0);
  const idRef = useRef(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clear = () => {
    if (idRef.current) {
      clearInterval(idRef.current);
      idRef.current = null;
    }
  };

  useEffect(() => {
    if (!running) return;
    idRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clear();
          setRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return clear;
  }, [running, nonce]);

  const start = useCallback((from) => {
    clear();
    setSeconds(from ?? initial);
    setNonce((n) => n + 1);
    setRunning(true);
  }, [initial]);
  const pause = useCallback(() => setRunning(false), []);
  const resume = useCallback(() => { setNonce((n) => n + 1); setRunning(true); }, []);
  const reset = useCallback((to) => {
    clear();
    setRunning(false);
    setSeconds(to ?? initial);
  }, [initial]);

  return { seconds, running, start, pause, resume, reset };
}