class WLauncher {
  constructor() {
    this.appName = 'WLauncher';
    this.view = null;
    this.keyList = [];
    this.properties = {
      appendChild: false,
      visibility: {
        value: false,
        func: () => this.handleVisibility(),
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

  createApp() {
    const app = document.createElement('div');
    app.setAttribute('class', this.appName);
    app.innerText = 'App rendered';
    this.view = app;
  }

  createView() {
    this.createApp();
  }

  clearView() {
    document.body.querySelector(this.appName).remove();
  }

  appendView() {
    if (this.properties.appendChild) return;

    document.body.appendChild(this.view);
    this.properties.appendChild = true;
  }

  init() {
    this.fetchKey();
    this.checkKeyList();
    this.createView();
  }
}

export default new WLauncher();
