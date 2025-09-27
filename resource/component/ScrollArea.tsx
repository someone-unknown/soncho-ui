import {Component, JSXElement, ComponentProps} from 'solid-js';

export namespace ScrollArea {
  export interface Props extends ComponentProps<'div'> {

  }
}

export const ScrollArea: Component<ScrollArea.Props> = (props: ScrollArea.Props): JSXElement => {
  return (
    <div>

    </div>
  );
}

export default ScrollArea;