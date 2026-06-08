import { useCallback, useEffect, useState } from 'react'
import type { MlResults, PaysimSummary } from '../data/types'
import { loadMlResults, loadPaysimSummary } from '../lib/loadData'
import type { View } from '../components/view/types'
import { MIN_VIEW_SWITCH_MS } from '../components/view/types'

export const useDashboardData = () => {
  const [error, setError] = useState<string | null>(null);
  const [paysim, setPaysim] = useState<PaysimSummary | null>(null);
  const [ml, setMl] = useState<MlResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [paysimData, mlData] = await Promise.all([
          loadPaysimSummary(),
          loadMlResults(),
        ]);

        if (!cancelled) {
          setPaysim(paysimData);
          setMl(mlData);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Грешка при зареждане');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [])

  return { error, paysim, ml, loading }
}

export const useViewSwitch = (initialView: View = 'dataset') => {
  const [activeView, setActiveView] = useState<View>(initialView);
  const [viewSwitching, setViewSwitching] = useState(false);
  const [switchTarget, setSwitchTarget] = useState<View | null>(null);

  const handleViewChange = useCallback(
    (next: View) => {
      if (next === activeView || viewSwitching) return;
      setSwitchTarget(next);
      setViewSwitching(true);
      requestAnimationFrame(() => setActiveView(next));
    },
    [activeView, viewSwitching],
  );

  useEffect(() => {
    if (!viewSwitching) return;

    const started = performance.now();
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      const wait = Math.max(0, MIN_VIEW_SWITCH_MS - (performance.now() - started))
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setViewSwitching(false);
          setSwitchTarget(null);
        }
      }, wait)
    }

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(finish);
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [activeView, viewSwitching])

  return {
    activeView,
    switchTarget,
    viewSwitching,
    handleViewChange,
    displayView: switchTarget ?? activeView,
  }
}
