import { useState, type PropsWithChildren } from 'react';
import clsx from 'clsx';

interface PopoverProps extends PropsWithChildren {
  label: string;
}

export default function Popover(props: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>{props.label}</button>
      <section
        className={clsx({ modal: true, 'is-active': open, 'is-clipped': open })}
      >
        <div className="modal-background"></div>
        <article className="modal-content card">
          {props.children}
          <button onClick={() => setOpen(false)}>Close</button>
        </article>
      </section>
    </>
  );
}
