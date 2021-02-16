import { createElement } from '../src/utils';

describe('createElement function', () => {
  test('basic', () => {
    const el = createElement({ type: 'div' });
    expect(el.nodeName).toBe('DIV');
  });
});
