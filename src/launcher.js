class WLauncher {
  constructor() {
    this.appName = 'WLauncher';
    this.view = null;
    this.keyList = [];
  }

  fetchKey() {
    document.addEventListener('keydown', (e) => {
      this.keyList.push(e.key);
    });
  }

  checkKeyList() {
    document.addEventListener('keyup', () => {
      console.log('this.keyList', this.keyList);
      if (
        this.keyList[0] === 'Control'
        && this.keyList[1] === 'Shift'
        && this.keyList[2] === 'L'
      ) {
        console.log('pressed');
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

  appendView() {
    document.body.appendChild(this.view);
  }

  init() {
    this.fetchKey();
    this.checkKeyList();
    this.createView();
    this.appendView();
  }
}

export default new WLauncher();
