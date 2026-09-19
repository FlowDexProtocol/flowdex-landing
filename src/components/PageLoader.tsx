'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');
    const show = () => {
      const timer = setTimeout(() => {
        setHidden(true);
        document.body.classList.remove('loading');
      }, 1200);
      return timer;
    };

    if (document.readyState === 'complete') {
      const timer = show();
      return () => clearTimeout(timer);
    }

    let timer: ReturnType<typeof setTimeout>;
    const onLoad = () => {
      timer = show();
    };
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loader ${hidden ? 'hide' : ''}`} aria-hidden={hidden}>
      <div className="loader-drops">
        <div className="ld1" />
        <div className="ld2" />
      </div>
      <div className="loader-text">FlowDex Protocol</div>
    </div>
  );
}
