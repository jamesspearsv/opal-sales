import { useEffect, useRef, useState, type PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  label: string;
  disabled?: boolean;
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal.current) {
      if (open) modal.current.showModal();
      if (!open) modal.current.close();
    }
  }, [open]);
  return (
    <div>
      {!props.disabled ? (
        <button onClick={() => setOpen(true)}>{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      <dialog ref={modal}>
        <article>
          <div>{props.children}</div>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </article>
      </dialog>
    </div>
  );
}
