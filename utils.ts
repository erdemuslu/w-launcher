interface Element {
  className?: string,
  text?: string,
  type: string
}

export const createElement = ({
  className,
  text,
  type,
}: Element): HTMLElement => {
  const el = document.createElement(type);
  if (className) el.setAttribute('class', className);
  if (text) el.innerText = text;
  return el;
};

export const test = () => 'Test';
