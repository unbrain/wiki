declare module "micromorph" {
  function micromorph(
    old: Element | string,
    new_: Element | string,
    options?: { useMicrodata?: boolean }
  ): void;
  export default micromorph;
}
