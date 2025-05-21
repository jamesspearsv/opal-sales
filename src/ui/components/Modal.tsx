import type { PropsWithChildren } from 'hono/jsx';

interface ModalProps extends PropsWithChildren {
  label: string;
  ref: string;
  disabled?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div
      x-data="{ closed: true }"
      x-effect={`() => {
          if (!closed) $refs.${props.ref}.showModal()
          else $refs.${props.ref}.close()
      }`}
    >
      {!props.disabled ? (
        <button x-on:click="closed = false">{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      <dialog x-ref={`${props.ref}`}>
        <article class={'new-item-modal'}>
          <div>{props.children}</div>
          <button x-on:click="closed = true" class="btn">
            Cancel
          </button>
        </article>
      </dialog>
    </div>
  );
}
