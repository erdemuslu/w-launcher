export const updateCssVariable = ({ target, value }) => {
  document.documentElement.style.setProperty(target, value);
};

export const createEl = ({
  name = 'div',
  className = '',
  html = null,
  text = '',
}) => {
  const el = document.createElement(name);
  el.setAttribute('class', className);
  el.innerText = text;
  el.innerHTML = html;

  return el;
};
