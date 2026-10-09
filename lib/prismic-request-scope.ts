import { cache } from 'react';
import { createPrismicScope } from './prismic-fetch.ts';

// React.cache isolates the deadline and GET memoization to one server render.
export const getPrismicRequestScope = cache(() => createPrismicScope());
