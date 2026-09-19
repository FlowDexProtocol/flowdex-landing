'use client';

import { useEffect, useState } from 'react';
import { cms, type CmsPageData } from '@/lib/cms';

const STORAGE_KEY = 'fdp_cookie';

export default function CookieConsent({ cmsGlobal = {} }: { cmsGlobal?: CmsPageData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let alreadySet = false;
    try {
      alreadySet = localStorage.getItem(STORAGE_KEY) != null;
    } catch {
      alreadySet = false;
    }
    if (alreadySet) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable — banner simply won't persist across reloads
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie">
      <p>
        {cms(
          cmsGlobal,
          'cookie',
          'text',
          'We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies.'
        )}
      </p>
      <div className="cookie-btns">
        <button type="button" className="cookie-accept" onClick={() => dismiss('accepted')}>
          Accept
        </button>
        <button type="button" className="cookie-accept cookie-decline" onClick={() => dismiss('declined')}>
          Decline
        </button>
      </div>
    </div>
  );
}
