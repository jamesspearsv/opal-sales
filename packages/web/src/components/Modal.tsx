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

  useEffect(() => setOpen(false), [props.updater]);

  return (
    <>
      {!props.disabled ? (
        <button onClick={() => setOpen(true)}>{props.label}</button>
      ) : (
        <button disabled={props.disabled}>{props.label}</button>
      )}
      {open && (
        <dialog ref={modal} onClose={() => setOpen(false)}>
          <article>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {props.children}
            </div>
            <button type="reset" onClick={() => setOpen(false)}></button>
          </article>
        </dialog>
      )}
    </>
  );
}
