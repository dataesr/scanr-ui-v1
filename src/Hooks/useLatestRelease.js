import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useLatestRelease() {
  const [latestRelsease, setLatestRelsease] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const refreshPage = () => {
    window.location.reload(true);
  };
  async function getLatestRelease() {
    const url = 'https://api.github.com/repos/dataesr/scanr/releases/latest';
    try {
      const { data } = await axios.get(url);
      setLatestRelsease(data.name);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  useEffect(() => {
    getLatestRelease();
  }, []);
  return {
    latestRelsease, isLoading, isError, refreshPage,
  };
}
