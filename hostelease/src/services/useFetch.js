import { useEffect, useState, useCallback } from 'react';

// Runs an API call on mount; exposes data, loading, error and reload.
export default function useFetch(apiCall) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setData(await apiCall()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [apiCall]);

  useEffect(() => { load(); }, [load]);
  return { data, setData, loading, error, reload: load };
}
