import { useState, type PropsWithChildren } from 'react';

interface PopoverProps extends PropsWithChildren {
  label: string;
}

export default function Popover(props: PopoverProps) {
  const [open, setOpen] = useState(false);

  console.log(open);

  return (
    <>
      <button onClick={() => setOpen(true)}>{props.label}</button>
      <section>
        <div className="modal-background"></div>
        <article className="modal-content card">
          {props.children}
          <button onClick={() => setOpen(false)}>Close</button>
        </article>
      </section>
    </>
  );
}
