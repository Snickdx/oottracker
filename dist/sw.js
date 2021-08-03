import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { PrecacheFallbackPlugin, precacheAndRoute} from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';

// Ensure that /offline.html is part of your precache manifest!
precacheAndRoute([{"revision":"3d6d447ca13bdd4ea4f0c38c72c5aa4d","url":"index.html"},{"revision":"36eda011fa9bee898cac49c528b4e393","url":"main.js"}]);

registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({cacheName: 'images'}),
);

registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkOnly({
    plugins: [
      new PrecacheFallbackPlugin({
        fallbackURL: '/offline.html',
      }),
    ],
  }),
);

const cacheName = 'static-resources';
const matchCallback = ({ request }) =>
  // CSS
  request.destination === 'style' ||
  // JavaScript
  request.destination === 'script' ||
  // Web Workers
  request.destination === 'worker';

registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);