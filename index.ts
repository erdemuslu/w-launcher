import {
  createElement
} from './utils';

class WLauncher {
  root: string;

  constructor(root : string) {
    this.root = root;
  }

  render() {
    const wrapper = createElement({ type: 'div' });
    console.log('hello TS', wrapper );
  }
}

export default WLauncher;
