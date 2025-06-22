import type { PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  label: string;
  disabled?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div
      x-data="{ open: false }"
      {...{ 'x-on:keydown.escape': 'open = false' }}
    >
      {!props.disabled ? (
        <button x-on:click="open = true">{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      <dialog x-bind:open="open" x-cloak x-trap="open">
        <article>
          <div>{props.children}</div>
          <button>Cancel</button>
        </article>
      </dialog>
    </div>
  );
}
