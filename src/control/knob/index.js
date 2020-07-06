require('./style.less');
const { render, bindMethods, unbindMethods, getPosition, eventToArg, valueToColor, valueColor, isUndef, isDef, noop, getModuleDefault } = require('../../util');
const bgImg = getModuleDefault(require('./knob.svg'));

// 插件使用原生编写，任何框架均可使用
class Knob {
  constructor(el, options) {
    this.$el = el;
    this.$options = options;
    this._init();
  }
  minValue = 0;
  maxValue = 100;
  bgColor = '#000';
  color = '#fff';
  title = '';
  tickWidth = 2; //tick 绘制的宽度
  tickCellArg = 3; //tick 绘制的角度
  decimals = 2;
  size = 100;
  ismouseIn = false;
  colors = valueColor;
  ctx = null;
  onChange = noop;
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
    // const { minValue = 0, maxValue = 100, title, bgColor = '#000', tickCellArg = 3, value = 0, onChange = noop, decimals = 2, errorMsg = '' } = options
  }
  initDom() {
    const box = render('div', { className: 'knob-control-box' }, this.$el);
    const bgDiv = render('div', { className: 'knob-bg' }, box);
    const img = render(
      'img',
      {
        src: bgImg,
        className: 'knob-bg-img',
        methods: {
          load: this.load,
        },
      },
      bgDiv,
    );
    const canvas = render('canvas', { className: 'knob-canvas' }, box);
    this.ctx = canvas.getContext('2d');
    const valueDiv = render('div', { className: 'knob-value' }, box);
    const minmaxLabel = render('div', { className: 'minmaxlabel' }, box);
    const minSpan = render('span', { text: 'min' }, minmaxLabel);
    const maxSpan = render('span', { text: 'max' }, minmaxLabel);
    const titleDiv = render('div', { className: 'knob-title', text: this.title }, box);
    const errorDiv = render('div', { className: 'konb-error', text: this.errorMsg }, box);
    const pointerBox = render(
      'div',
      {
        className: 'knob-pointer-box',
        methods: {
          mouseleave: this.mouseLeave,
          mouseenter: this.mouseEnter,
        },
      },
      box,
    );
    const pointer = render(
      'div',
      {
        className: 'knob-pointer',
        methods: {
          mousedown: this.mouseDom,
        },
      },
      pointerBox,
    );
    this.$doms = {
      box,
      bgDiv,
      img,
      canvas,
      valueDiv,
      minmaxLabel,
      minSpan,
      maxSpan,
      titleDiv,
      pointerBox,
      pointer,
      errorDiv,
    };
    this.resize();
  }
  resize() {
    const width = this.$el.offsetWidth,
      height = this.$el.offsetHeight;
    const minSize = Math.min(width, height);
    this.size = minSize;
    this.tickWidth = minSize > 300 ? minSize / 100 : 2;
    let titlesize = minSize / 14 + 'px';
    let minmaxSize = minSize / 20 + 'px';
    const size = { width: minSize, height: minSize };
    const boxStyle = { width: minSize + 'px', height: minSize + 'px' };
    const valueStyle = { fontSize: titlesize, lineHeight: titlesize };
    const minmaxStyle = { fontSize: minmaxSize, lineHeight: minmaxSize };
    render(this.$doms.box, { style: boxStyle });
    render(this.$doms.canvas, size);
    render(this.$doms.valueDiv, { style: valueStyle });
    render(this.$doms.titleDiv, { style: valueStyle });
    render(this.$doms.errorDiv, { style: valueStyle });
    render(this.$doms.maxSpan, { style: minmaxStyle });
    render(this.$doms.minSpan, { style: minmaxStyle });
    this.draw();
  }
  __ready = false;
  load = e => {
    this.__ready = true;
    this.value = this.value;
  };
  draw() {
    if (!this.__ready) return;
    if (!this.$doms || !this.$doms.canvas) return;
    let ctx = this.ctx;
    let r = this.size / 2;
    if (r < 5) return;
    ctx.beginPath();
    ctx.arc(r, r, r * 0.95, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = this.bgColor;
    ctx.stroke();
    ctx.fillStyle = this.bgColor;
    ctx.fill();

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.tickWidth;
    let startArg = 135;
    let endArg = startArg + this.valueToArg(this.value);
    let cellArg = this.tickCellArg;
    startArg += cellArg / 2;
    ctx.beginPath();
    while (startArg < endArg) {
      let [p1, p2] = this.calcTickPoint(startArg);
      ctx.moveTo(...p1);
      ctx.lineTo(...p2);
      startArg += cellArg;
    }
    ctx.closePath();
    ctx.stroke();
  }
  valueToArg(val) {
    if (val <= this.minValue) return 0;
    if (val >= this.maxValue) return 270;
    val = (val - this.minValue) / (this.maxValue - this.minValue);
    return val * 270;
  }
  calcTickPoint(arg) {
    arg = ((arg % 360) / 180) * Math.PI;
    let innerR = (this.size / 2) * 0.5;
    let outerR = this.size / 2 - 3;
    let center = this.size / 2;
    let sin = Math.sin(arg);
    let cos = Math.cos(arg);
    let inX = center + innerR * cos;
    let inY = center + innerR * sin;
    let ouX = center + outerR * cos;
    let ouY = center + outerR * sin;
    return [
      [inX, inY],
      [ouX, ouY],
    ];
  }
  mouseMove = e => {
    if (!this.ismouseIn) return;
    const arg = eventToArg(e, this.center);
    if (isUndef(arg)) return;
    const arg2 = (arg + 45) % 360;
    let value = ((this.maxValue - this.minValue) * arg2) / 270 + this.minValue;
    this.value = value;
    this.onChange(value);
  };
  _value = 0;
  _errorMsg = '';
  get value() {
    return this._value;
  }
  set value(val) {
    val = parseFloat(val);
    if (isNaN(val)) return;
    this._value = val;
    if (!this.$doms) return;
    const color = valueToColor(val - this.minValue, this.colors);
    const arg = this.valueToArg(val);
    render(this.$doms.pointerBox, { style: { transform: `rotate(${arg - 45}deg)` } });
    render(this.$doms.pointer, {
      style: {
        backgroundColor: color,
        boxShadow: `rgb(4, 4, 4) 1px 0px 2px inset, ${color} 1px 1px 8px 2px`,
      },
    });
    render(this.$doms.valueDiv, {
      text: val.toFixed(this.decimals),
      style: {
        color,
        textShadow: `${color} 1px 1px 10px,${color} 1px 1px 10px`,
      },
    });
    this.color = color;
    this.draw();
  }
  get errorMsg() {
    return this._errorMsg;
  }
  set errorMsg(val) {
    val = '' + val;
    this._errorMsg = val;
    if (!this.$doms) return;
    render(this.$doms.errorDiv, { text: val });
  }
  valueToArg(val) {
    if (val <= this.minValue) return 0;
    if (val >= this.maxValue) return 270;
    val = (val - this.minValue) / (this.maxValue - this.minValue);
    return val * 270;
  }
  mouseEnter = e => {
    this.ismouseIn = true;
  };
  mouseLeave = e => {
    this.ismouseIn = false;
  };
  mouseDom = e => {
    const width = this.$el.offsetWidth,
      height = this.$el.offsetHeight;
    const { x, y } = getPosition(this.$el);
    this.center = {
      x: x + width / 2,
      y: y + height / 2,
    };
    bindMethods(document, {
      mousemove: this.mouseMove,
      mouseup: this.mouseUp,
    });
  };
  mouseUp = () => {
    unbindMethods(document, { mousemove: this.mouseMove, mouseup: this.mouseUp });
  };
  destroy() {
    unbindMethods(this.$doms.pointerBox, {
      mouseleave: this.mouseLeave,
      mouseenter: this.mouseEnter,
    });
    unbindMethods(this.$doms.pointer, {
      mousedown: this.mouseDom,
    });
    unbindMethods(document, {
      mousemove: this.mouseMove,
      mouseup: this.mouseUp,
    });
    this.$el.removeChild(this.$doms.box);
  }
}

export default Knob;
