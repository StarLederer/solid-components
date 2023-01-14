import { createEffect, createSignal, ParentComponent, Show } from "solid-js";
import router from "./index";

type IRouteProps = {
  path: string;
  strict?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const Route: ParentComponent<IRouteProps> = (props) => {
  const { route } = router;
  const baseClasses = "absolute inset-0 overflow-auto";
  const classes = () => (
    baseClasses
    + (routeIn() ? " animate-in" : "")
    + (routeOut() ? " animate-out" : "")
  );

  // Transitions

  const pathLast = () => props.path.split("/").pop();

  const routeIn = () => route().firstDifferent[1] === pathLast();
  const routeOut = () => route().firstDifferent[0] === pathLast();

  // State

  let timeout = setTimeout(() => { }, 0);

  const isOpen = () => {
    let open = false;

    if (props.strict) {
      open = route().current === props.path;
    } else {
      open = route().current.startsWith(props.path);
    }

    if (open) props.onOpen?.();
    else props.onClose?.();

    return open;
  };

  const [hasDom, setHasDom] = createSignal(false);

  createEffect(() => {
    if (isOpen()) {
      setHasDom(true);
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(() => {
        setHasDom(false);
      }, 500);
    }
  })

  // Render

  return (
    <Show when={hasDom()}>
      <section class={classes()}>
        {props.children}
      </section>
    </Show>
  );
};

export default Route;
