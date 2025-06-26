import { useEffect, useRef, useState, type PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  label: string;
  disabled?: boolean;
  updater?: number;
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

  useEffect(() => setOpen((open) => !open), [props.updater]);

  return (
    <div>
      {!props.disabled ? (
        <button onClick={() => setOpen(true)}>{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      {open && (
        <dialog ref={modal}>
          <article>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {props.children}
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </article>
        </dialog>
      )}
    </div>
  );
}
