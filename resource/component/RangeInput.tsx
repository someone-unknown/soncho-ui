import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  type Accessor,
  type Component,
  type JSX,
  type JSXElement,
  type Signal,
} from 'solid-js';
import requestAnimationFrame from 'raf';
import classNames from 'classnames';
import styles from './RangeInput.module.css';

export interface RangeInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>;
  onInput?: JSX.InputEventHandler<HTMLInputElement, InputEvent>;
  ref?: HTMLInputElement | ((element: HTMLInputElement) => void);
  step?: number;
  value?: number;
}

export const RangeInput: Component<RangeInputProps> = (props: RangeInputProps): JSXElement => {
  const min: Accessor<number> = createMemo((): number => props.min ?? 0);
  const max: Accessor<number> = createMemo((): number => props.max ?? 100);
  const step: Accessor<number> = createMemo((): number => props.step ?? 1);
  const [innerValue, setInnerValue]: Signal<number> = createSignal<number>(props.value ?? min());
  const value: Accessor<number> = createMemo((): number => typeof props.value !== 'undefined' ? props.value : innerValue());
  const [transformStyle, setTransformStyle]: Signal<JSX.CSSProperties> = createSignal<JSX.CSSProperties>({transform: `translate3d(${percentOf(value())}%,0,0)`});

  function clampValue(value: number): number {
    return Math.min(Math.max(value, min()), max());
  }

  function percentOf(value: number): number {
    const delta: number = max() - min();
    return delta <= 0 ? 0 : ((clampValue(value) - min()) / delta) * 100;
  }

  const handleInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (event): void => {
    if (typeof props.value === 'undefined') {
      setInnerValue(clampValue(event.currentTarget.valueAsNumber));
    }

    props.onInput?.(event);
  };

  let animationFrame: number | null = null;
  createEffect((): void => {
    const updatedValue: number = value();

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame((): void => {
        setTransformStyle({transform: `translate3d(${percentOf(updatedValue)}%,0,0)`});
        animationFrame = null;
      });
    }
  });

  onCleanup((): void => {
    if (animationFrame !== null) {
      requestAnimationFrame.cancel(animationFrame);
      animationFrame = null;
    }
  });

  return (
    <div
      class={classNames(styles.container, props.class)}
      classList={props.classList}
      id={props.id}
      style={props.style}
    >
      <input
        class={styles.input}
        disabled={props.disabled}
        max={max()}
        min={min()}
        name={props.name}
        onChange={props.onChange}
        onInput={handleInput}
        ref={props.ref}
        step={step()}
        type="range"
        value={value()}
      />
      <div class={styles.trackContainer}>
        <div class={styles.trackViewport}>
          <div
            class={styles.trackTransform}
            style={transformStyle()}
          >
            <div class={classNames(styles.track, styles.trackFilled)} />
            <div class={styles.thumb} />
            <div class={classNames(styles.track, styles.trackEmpty)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;