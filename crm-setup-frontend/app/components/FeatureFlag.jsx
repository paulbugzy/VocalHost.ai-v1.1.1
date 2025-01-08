'use client';
    import { useEffect, useState } from 'react';
    import { isFeatureEnabled } from '../../lib/feature-flags';

    export default function FeatureFlag({ feature, children, fallback = null }) {
      const [enabled, setEnabled] = useState(false);

      useEffect(() => {
        const checkFeature = async () => {
          const isEnabled = await isFeatureEnabled(feature);
          setEnabled(isEnabled);
        };
        checkFeature();
      }, [feature]);

      if (!enabled) return fallback;
      return children;
    }
