'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
    if (!key) return;
    posthog.init(key, {
      api_host: host,
      capture_pageleave: false,
      mask_all_element_attributes: true,
      mask_all_text: false,
      persistence: 'memory'
    });
    return () => {
      posthog.reset();
    };
  }, []);

  return null;
}
