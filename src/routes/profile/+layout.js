
import { env } from '$env/dynamic/public';
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init(
      env.PUBLIC_POSTHOG_TOKEN,
      { 
        api_host: 'https://eu.i.posthog.com',
        person_profiles: 'always',
        // person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      }
    )
  }
  return
};