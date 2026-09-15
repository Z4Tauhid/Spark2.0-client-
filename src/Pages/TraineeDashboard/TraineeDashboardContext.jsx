import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { matchVectorAPI } from '../../services/api';
import { OPPORTUNITIES } from './data/opportunities';

const TraineeDashboardContext = createContext(null);

export function TraineeDashboardProvider({ children }) {
  const [vector, setVector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVector = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await matchVectorAPI.get();
      setVector(res.data.vector);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your Match Vector.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVector(); }, [fetchVector]);

  const saveVector = useCallback(async (axes) => {
    const res = await matchVectorAPI.save(axes);
    setVector(res.data.vector);
    return res.data.vector;
  }, []);

  const expressInterest = useCallback(async (opportunityId) => {
    const res = await matchVectorAPI.expressInterest(opportunityId);
    setVector(res.data.vector);
    return res.data.vector;
  }, []);

  const expressedOpportunity = useMemo(
    () => OPPORTUNITIES.find(o => o.id === vector?.expressedInterestId) ?? null,
    [vector?.expressedInterestId]
  );

  const value = {
    vector,
    loading,
    error,
    refetch: fetchVector,
    saveVector,
    expressInterest,
    opportunities: OPPORTUNITIES,
    expressedOpportunity,
  };

  return (
    <TraineeDashboardContext.Provider value={value}>
      {children}
    </TraineeDashboardContext.Provider>
  );
}

export function useTraineeDashboard() {
  const ctx = useContext(TraineeDashboardContext);
  if (!ctx) throw new Error('useTraineeDashboard must be used within TraineeDashboardProvider');
  return ctx;
}
