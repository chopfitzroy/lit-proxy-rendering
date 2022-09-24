import { render as lit } from "lit-html";

const createComponent = <T = {}>({
  name,
  data,
  render
}: {
  name: string;
  data: T;
  render: (data: T) => unknown;
}) => (node: HTMLElement | null) => {
  if (node === null) {
    throw new Error(`Throw cannot render '${name}' invalid node provided.`);
  }

  const handler: ProxyHandler<any> = {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      target[prop] = value;

      // SIDE EFFECTS
      const output = render(target);
      lit(output, node);
      return true;
    }
  };

  // Setup Proxy for ongoing updates
  const proxy = new Proxy(
    data,
    handler
  );


  // Draw first render manually
  const output = render(proxy);
  lit(output, node);
};

export { createComponent };