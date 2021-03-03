import { useEffect, useRef, useState } from 'react';

const useIntersect = ({ root = null, rootMargin = '0px', threshold = 0 }) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new window.IntersectionObserver(([ent]) => updateEntry(ent), { root, rootMargin, threshold });

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry];
};
export default useIntersect;
