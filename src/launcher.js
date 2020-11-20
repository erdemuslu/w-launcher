import { createEl, updateCssVariable } from './helpers';

class WLauncher {
  constructor() {
    this.appName = 'WLauncher';
    this.view = null;
    this.container = null;
    this.keyList = [];
    this.properties = {
      appendChild: false,
      visibility: {
        value: false,
        func: () => this.handleVisibility(),
      },
      search: {
        value: '',
        func: () => this.onKeyup(),
      },
    };

    this.propertiesProxy = new Proxy(this.properties, {
      set: (target, key, value) => {
        const obj = target;
        obj[key] = {
          ...obj[key],
          ...value,
        };

        obj[key].func();

        return true;
      },
    });
  }

  handleVisibility() {
    this.appendView();
  }

  fetchKey() {
    document.addEventListener('keydown', (e) => {
      this.keyList.push(e.key);
    });
  }

  checkKeyList() {
    document.addEventListener('keyup', () => {
      if (
        this.keyList[0] === 'Control'
        && this.keyList[1] === 'Shift'
        && this.keyList[2] === 'L'
        && !this.properties.appendChild
      ) {
        this.propertiesProxy.visibility = { value: true };
      }

      if (
        this.keyList[0] === 'Control'
        && this.keyList[1] === 'Shift'
        && this.keyList[2] !== 'L'
      ) {
        this.keyList.length = 2;
        return;
      }

      this.keyList.length = 0;
    });
  }

  setEventListeners() {
    this.container.querySelector('input').addEventListener('keyup', (e) => this.handleSearch(e));
  }

  onKeyup() {
    console.log('here?', this.properties.search.value);
  }

  handleSearch({ target: { value } }) {
    this.propertiesProxy.search = { value };
  }

  createContainer() {
    this.container = createEl({
      name: 'div',
      className: 'wlauncher-container',
      html: `
        <div class='wlauncher-header'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 125"><g><path d="M66.7,63.4c4.6-5.5,7.4-12.6,7.4-20.3c0-17.4-14.1-31.5-31.5-31.5S11.1,25.7,11.1,43.1s14.1,31.5,31.5,31.5   c8.2,0,15.7-3.2,21.3-8.3l21.6,21.6c0.4,0.4,0.9,0.6,1.4,0.6s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L66.7,63.4z M42.6,70.6   c-15.2,0-27.5-12.3-27.5-27.5s12.3-27.5,27.5-27.5s27.5,12.3,27.5,27.5S57.8,70.6,42.6,70.6z"/></g></svg>
          </span>
          <input type='text' placeholder='Type something' />
        </div>
        <div class='wlauncher-result'>
          Result
        </div>
      `,
    });
  }

  createView() {
    this.view = createEl({
      name: 'div',
      className: this.appName.toLocaleLowerCase(),
      text: 'App rendered',
    });
  }

  createStructure() {
    this.view.appendChild(this.container);
  }

  clearView() {
    document.body.querySelector(this.appName).remove();
  }

  appendView() {
    if (this.properties.appendChild) return;

    document.body.appendChild(this.view);
    this.properties.appendChild = true;
  }

  init({
    zIndex = 2,
  }) {
    updateCssVariable({ target: '--wlauncher-z-index', value: `${zIndex}` });
    this.fetchKey();
    this.checkKeyList();
    this.createView();
    this.createContainer();
    this.createStructure();
    this.setEventListeners();
  }
}

export default new WLauncher();
