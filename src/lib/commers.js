import Commers from '@chec/commerce.js';

export const commerce = new Commers(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true,
);
