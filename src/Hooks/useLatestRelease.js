import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useLatestRelease() {
  const [latestRelease, setLatestRelease] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  async function getLatestRelease() {
    const url = 'https://api.github.com/repos/dataesr/scanr/releases/latest';
    try {
      const { data } = await axios.get(url);
      setLatestRelease(data.name);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  useEffect(() => {
    getLatestRelease();
    if (latestRelease && (latestRelease !== `v${process.env.REACT_APP_VERSION}`)) {
      window.location.reload(true);
    }
  }, []);
  return {
    latestRelease, isLoading, isError,
  };
}
