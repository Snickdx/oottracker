import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { PrecacheFallbackPlugin, precacheAndRoute} from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';

// Ensure that /offline.html is part of your precache manifest!
precacheAndRoute(self.__WB_MANIFEST);

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