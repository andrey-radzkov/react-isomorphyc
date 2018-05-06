export const isSSR = () => {
  return global.__SERVER__;
};
export const isClient = () => {
  return !isSSR();
};
