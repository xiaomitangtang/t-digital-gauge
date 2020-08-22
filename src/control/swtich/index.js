const { render, isDef, noop, getModuleDefault } = require('../../util');
const thumb = getModuleDefault(require('./thumb.svg'));
const thumBar = getModuleDefault(require('./thumb-bar.svg'));
const thumbChecked = getModuleDefault(require('./thumb-checked.svg'));
const thumbBarChecked = getModuleDefault(require('./thumb-bar-checked.svg'));
require('./style.less');

class Switch {
  constructor(el, options) {
    this.$el = el;
    this.$options = options;
    this._init();
  }
  showOnOffLabels = true;

  _init() {
    this.setOption(this.$options);
    this.initDom();
  }
  setOption(options = {}) {
    Object.keys(options).forEach(key => {
      if (isDef(options[key])) {
        this[key] = options[key];
      }
    });
  }
  onChange = noop;
  initDom() {
    this.$el.innerHtml = ''
    this.$el.innerText = ''
    const fragment = document.createDocumentFragment()
    const box = render(
      'div',
      {
        className: 'switch-control-box',
        methods: {
          click: this.onClick,
        },
      },
      fragment
    );
    const tipSpan = render('span', { className: 'offline-tip', text: this.errorMsg }, box);
    const titleDiv = render('div', { className: 'switch-title' }, box);
    const barDiv = render('div', { className: 'thumb-bar', style: { backgroundImage: `url(${thumBar})` } }, box);
    const barOnDiv = render('div', { className: 'thumb-bar-on hidden', style: { backgroundImage: `url(${thumbBarChecked})` } }, box);
    const thumbDiv = render('div', { className: 'thumb', style: { backgroundImage: `url(${thumb})` } }, barDiv);
    const thumbOnDiv = render('div', { className: 'thumb-on hidden', style: { backgroundImage: `url(${thumbChecked})` } }, barOnDiv);
    const labelDiv = this.showOnOffLabels ? render('div', { className: 'thumb-label', text: 'OFF' }, thumbDiv) : null;
    const labelOnDiv = this.showOnOffLabels ? render('div', { className: 'thumb-label-on hidden', text: 'ON' }, thumbOnDiv) : null;
    this.$doms = {
      box,
      tipSpan,
      titleDiv,
      barDiv,
      thumbDiv,
      labelDiv,
      barOnDiv,
      thumbOnDiv,
      labelOnDiv,
    };
    this.value = this.value;
    render(fragment, {}, this.$el)
    this.resize();
  }
  ratio = 2.815;
  resize() {
    const width = this.$el.offsetWidth,
      height = this.$el.offsetHeight;
    let w = width;
    let h = height / 2;
    let ratio = w / h;
    if (ratio > this.ratio) {
      // 宽度大一些
      w = h * this.ratio;
    } else {
      // 高度大一些
      h = w / this.ratio;
    }
    const barStyle = {
      width: `${w}px`,
      height: `${h}px`,
    };
    const labelStyle = {
      fontSize: h / 3 + 'px',
      lineHeight: h / 3 + 'px',
    };
    const tipStyle = {
      fontSize: h / 5 + 'px',
      lineHeight: h / 5 + 'px',
    };
    render(this.$doms.barDiv, { style: barStyle });
    render(this.$doms.barOnDiv, { style: barStyle });
    render(this.$doms.tipSpan, { style: tipStyle });
    render(this.$doms.titleDiv, { style: labelStyle });
    render(this.$doms.labelDiv, { style: labelStyle });
    render(this.$doms.labelOnDiv, { style: labelStyle });
  }
  _value = false;
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    if (!this.$doms) return;
    if (!!val) {
      // on
      render(this.$doms.barDiv, { className: 'thumb-bar hidden' });
      render(this.$doms.barOnDiv, { className: 'thumb-bar-on' });
      render(this.$doms.thumbDiv, { className: 'thumb hidden right-thumb' });
      render(this.$doms.thumbOnDiv, { className: 'thumb-on right-thumb' });
      render(this.$doms.labelDiv, { className: 'thumb-label hidden' });
      render(this.$doms.labelOnDiv, { className: 'thumb-label-on' });
    } else {
      // off
      render(this.$doms.barDiv, { className: 'thumb-bar ' });
      render(this.$doms.barOnDiv, { className: 'thumb-bar-on hidden' });
      render(this.$doms.thumbDiv, { className: 'thumb' });
      render(this.$doms.thumbOnDiv, { className: 'thumb-on hidden' });
      render(this.$doms.labelDiv, { className: 'thumb-label ' });
      render(this.$doms.labelOnDiv, { className: 'thumb-label-on hidden' });
    }
  }
  _errorMsg = '';
  get errorMsg() {
    return this._errorMsg;
  }
  set errorMsg(val) {
    this._errorMsg = val;
    if (!this.$doms) return;
    render(this.$doms.tipSpan, { text: '' + val });
  }
  onClick = e => {
    this.value = !this.value;
    this.onChange(this.value);
  };
  destroy() {
    this.$el.removeChild(this.$doms.box);
  }
}

export default Switch;
