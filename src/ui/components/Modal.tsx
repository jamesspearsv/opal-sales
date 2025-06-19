import type { KeyboardEvent, PropsWithChildren } from 'hono/jsx';

interface ModalProps extends PropsWithChildren {
  label: string;
  ref: string;
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
        <article class={'new-item-modal'}>
          <div>{props.children}</div>
          <button x-on:click="open = false" class="btn">
            Cancel
          </button>
        </article>
      </dialog>
    </div>
  );
}
