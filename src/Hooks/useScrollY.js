import { useEffect, useState } from 'react';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const setScrollYFromEvent = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', setScrollYFromEvent);

    return () => {
      window.removeEventListener('scroll', setScrollYFromEvent);
    };
  }, []);

  return scrollY;
};
export default useScrollY;
