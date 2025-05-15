import type { PropsWithChildren } from 'hono/jsx';

interface ModalProps extends PropsWithChildren {
  label: string;
  disabled?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div x-data>
      {!props.disabled ? (
        <button x-on:click="$refs.modal.showModal()">{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      <dialog x-ref="modal">
        <article class={'new-item-modal'}>
          <div>{props.children}</div>
          <button x-on:click="$refs.modal.close()" class="btn">
            Cancel
          </button>
        </article>
      </dialog>
    </div>
  );
}
