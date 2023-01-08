import { ParentComponent } from "solid-js";
import styles from './style.module.css';

type IBaseProps = {
  style?: "ghost" | "half" | "secondary" | "solid";
  hue?: number;
  class?: string;
};

type IMainProps = IBaseProps & {
  as: ParentComponent<{
    class: string;
    style: string;
  }>;
};

const Main: ParentComponent<IMainProps> = (props) => {
  const As = props.as;

  return (
    <As
      class={[
        props.class ?? "round-m0 pd-m0",
        styles.button,
        (() => {
          if (props.style === "solid") return styles.isSolid;
          if (props.style === "secondary") return styles.isSecondary;
          if (props.style === "half") return styles.isHalf;
          return styles.isGhost;
        })(),
      ].join(" ")}
      style={`${props.hue != null ? `--hue: ${props.hue};` : ""}`}
    >
      <div class="flex flex-row items-center justify-center flex-1 gap-s++">
        {props.children}
      </div>
    </As>
  );
};

export default Main;
export type { IBaseProps };
