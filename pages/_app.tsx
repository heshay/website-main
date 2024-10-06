import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config';
import { AppProps } from 'next/app'
import '../styles/index.css'
import posthog from 'posthog-js';

function setupPostHog() {
  // setup posthog
  const router = useRouter();
  useEffect(() => {
    // Init PostHog
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST });

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

}

export default function MyApp({ Component, pageProps }: AppProps) {
  setupPostHog();
  return (
    <>
      <DefaultSeo {...SEO}/>
      <Component {...pageProps} />
    </>
  )
}
