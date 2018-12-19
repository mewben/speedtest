import Pusher from 'pusher-js';

// Pusher.logToConsole = true;
export const pusher = new Pusher(process.env.GATSBY_PUSHER_KEY, {
  authEndpoint: process.env.GATSBY_API_HOST + '/e1/public/pusher/auth',
  cluster: 'mt1',
  useTLS: true,
});
export const channel = pusher.subscribe('private-lh');
