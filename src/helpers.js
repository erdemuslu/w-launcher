export const updateCssVariable = ({ target, value }) => {
  document.documentElement.style.setProperty(target, value);
};

export const test = () => console.log('test');
