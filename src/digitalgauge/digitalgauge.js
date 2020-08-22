require('./style.less');
const { render, isDef, fontParse, numberFixRange, timeFormat } = require('../util');
// 插件使用原生编写，任何框架均可使用
const ts = 20;
const PI2 = Math.PI * 2;
const PI = Math.PI;
const REG = PI / 180;
class DigitalGauge {
  constructor(el, options) {
    this.$el = el;
    this.$options = options;
    this._init();
  }
  _maxValue = 100;
  _minValue = 0;
  _time = null;
  _unitTitle = '';
  _title = '';
  _valueSuffix = '';
  get maxValue() {
    return this._maxValue;
  }
  get minValue() {
    return this._minValue;
  }
  set maxValue(val) {
    this._maxValue = val;
    this.showValue && this.$doms && render(this.$doms.maxSpan, { text: val });
  }
  set minValue(val) {
    this._minValue = val;
    this.showValue && this.$doms && render(this.$doms.minSpan, { text: val });
  }
  get time() {
    return this._time;
  }
  set time(val) {
    // let str = moment(val).format('YYYY-MM-DD HH:mm:ss');
    str = timeFormat(val, 'YYYY-MM-DD HH:mm:ss')
    this._time = str;
    this.showTimestamp && this.$doms && render(this.$doms.timeOrunitTitleDiv, { text: str });
  }
  get unitTitle() {
    return this._unitTitle;
  }
  set unitTitle(val) {
    if (this._unitTitle === val) return;
    this._unitTitle = val;
    !this.showTimestamp && this.showUnitTitle && this.$doms && render(this.$doms.timeOrunitTitleDiv, { text: val });
  }
  get title() {
    return this._title;
  }
  set title(val) {
    if (this._title === val) return;
    this._title = val;
    this.showTitle && this.$doms && render(this.$doms.titleDiv, { text: val });
  }
  get valueSuffix() {
    return this._valueSuffix;
  }
  set valueSuffix(val = '') {
    this._valueSuffix = val;
    this.updateValue(this.value);
  }
  donutStartAngle = 90;
  showValue = true;
  showMinMax = true;
  showTitle = true;
  showTimestamp = true;
  showUnitTitle = false;
  gaugeType = 'horizontalBar'; //verticalBar donut   arc
  gaugeWidthScale = 0.75; //条形或圆环的宽度
  titleFont = { family: 'Roboto', size: 12, style: 'normal', weight: '500', color: '#999999' };
  labelFont = { family: 'Roboto', size: 8, style: 'normal', weight: '500' };
  valueFont = { family: 'Roboto', style: 'normal', weight: '500', size: 18, color: '#666666' };
  minMaxFont = { family: 'Roboto', size: 12, style: 'normal', weight: '500', color: '#666666' };
  neonGlowBrightness = 0; //亮度
  levelColors = [];
  animation = true;
  animationDuration = 500;
  roundedLineCap = false;
  animationRule = 'linear'; //这个不好做暂时不做
  dashThickness = 1; //donut 模式下的间隔
  stripBasic = 2;
  gaugeColor = '#eeeeee'; //背景条的颜色
  defaultColor = '#65a0f8'; //前景色
  timestampFormat = 'yyyy-MM-dd HH:mm:ss';

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
  ctx = null;
  initDom() {
    this.$el.innerHtml = ''
    this.$el.innerText = ''
    const fragment = document.createDocumentFragment()

    const box = render('div', { className: `digital-gauge ${this.gaugeType}` }, fragment);
    const canvas = render('canvas', { className: `digital-canvas` }, box);
    this.ctx = canvas.getContext('2d');
    window.ctx = this.ctx;
    const textDiv = render('div', { className: `digital-texts` }, box);
    const titleDiv = render('div', { className: `digital-title`, text: this.showTitle ? this.title : '', style: fontParse(this.titleFont) }, textDiv);
    const valueDiv = render('div', { className: `digital-value`, text: '', style: fontParse(this.valueFont) }, textDiv);
    let temp = '';
    if (!this.showTimestamp && this.showUnitTitle) {
      temp = this.unitTitle;
    }
    const timeOrunitTitleDiv = render('div', { className: `digital-time`, style: { color: this.defaultColor }, text: temp }, textDiv);
    const minmaxDiv = render('div', { className: `digital-minmax`, style: fontParse(this.minMaxFont) }, box);
    const maxSpan = render('span', { className: `digital-max-span`, text: this.showMinMax ? this.maxValue : '' }, minmaxDiv);
    const minSpan = render('span', { className: `digital-min-span`, text: this.showMinMax ? this.minValue : '' }, minmaxDiv);

    this.$doms = {
      box,
      canvas,
      titleDiv,
      valueDiv,
      minmaxDiv,
      minSpan,
      maxSpan,
      timeOrunitTitleDiv,
    };
    render(fragment, {}, this.$el)
    this.resize();
  }

  resize() {
    const width = this.$el.offsetWidth,
      height = this.$el.offsetHeight;
    this.drawInfo.clearbox = [0, 0, width, height];
    this[`set${this.gaugeType}`] && this[`set${this.gaugeType}`](width, height);
    this.draw(this.value);
  }
  drawInfo = {
    rect: [0, 0, 100, 100],
    clearbox: [0, 0, 10000, 10000],
    donutCircle: [100, 100, 100],
    lineWidth: 1,
  };
  setverticalBar(w, h) {
    const minS = Math.min(w, h);
    const unitW = numberFixRange(minS / 3, 50, 300);
    const barW = unitW * this.gaugeWidthScale;
    const titleSize = numberFixRange(w / 20, 20, 50);
    const valueSize = numberFixRange(w / 10, 16, 40);
    const timeSize = numberFixRange(w / 25, 14, 30);
    const minmaxSize = numberFixRange(w / 30, 14, 30);
    const x = w / 2 - barW / 2;
    const y = (titleSize + valueSize + minmaxSize) * 1.2;
    const bottom = timeSize + 10;
    this.drawInfo.rect = [x, y, barW, h - y - bottom];
    this.drawInfo.lineWidth = barW;
    const minmaxStyle = { fontSize: `${minmaxSize}px`, left: `calc( 50% + ${barW / 2 + 5}px )`, padding: `${y - minmaxSize}px 0 ${bottom - minmaxSize}px 0` };
    const titleStyle = { fontSize: `${titleSize}px` };
    const valueStyle = { fontSize: `${valueSize}px` };
    const timeStyle = { fontSize: `${timeSize}px` };
    render(this.$doms.canvas, { width: w, height: h });
    render(this.$doms.titleDiv, { style: titleStyle });
    render(this.$doms.valueDiv, { style: valueStyle });
    render(this.$doms.timeOrunitTitleDiv, { style: timeStyle });
    render(this.$doms.minmaxDiv, { style: minmaxStyle });
  }
  sethorizontalBar(w, h) {
    const minS = Math.min(w, h);
    const unitW = numberFixRange(minS / 3, 25, 300);
    const barH = unitW * this.gaugeWidthScale;
    this.drawInfo.lineWidth = barH;
    const showtime = this.showTimestamp;
    const showunit = this.showUnitTitle;
    const titleSize = numberFixRange(h / 20, 12, 50);
    const valueSize = numberFixRange(h / 10, 16, 40);
    const timeSize = numberFixRange(h / 25, 12, 30);
    const minmaxSize = numberFixRange(h / 30, 12, 30);
    const x = w / 15;
    let y = numberFixRange(titleSize + valueSize + minmaxSize, h / 5, h / 2);
    y = showunit || showtime ? y : y + timeSize;
    this.drawInfo.rect = [x, y, w - x * 2, barH];
    const minmaxStyle = { fontSize: `${minmaxSize}px`, top: `${y + barH / 2 - minmaxSize}px`, padding: `0 ${x - minmaxSize * 2}px 0 ${x - minmaxSize}px ` };
    const titleStyle = { fontSize: `${titleSize}px` };
    const valueStyle = { fontSize: `${valueSize}px` };
    const timeStyle = { fontSize: `${timeSize}px` };
    render(this.$doms.canvas, { width: w, height: h });
    render(this.$doms.titleDiv, { style: titleStyle });
    render(this.$doms.valueDiv, { style: valueStyle });
    render(this.$doms.timeOrunitTitleDiv, { style: timeStyle });
    render(this.$doms.minmaxDiv, { style: minmaxStyle });
  }
  setdonut(w, h) {
    const minS = Math.min(w, h);
    const r = (minS * 0.9) / 2;
    const unitW = numberFixRange(r / 3, 15, 3000);
    const x = w / 2;
    const y = h / 2;
    const lineWidth = unitW * this.gaugeWidthScale;
    this.drawInfo.lineWidth = lineWidth;
    this.drawInfo.donutCircle = [x, y, Math.max(r - lineWidth / 2, 0)];
    const titleSize = numberFixRange(r / 10, 12, 90);
    const valueSize = numberFixRange(r / 3, 16, 100);
    const timeSize = numberFixRange(r / 13, 12, 50);
    const titleStyle = { fontSize: `${titleSize}px` };
    const valueStyle = { fontSize: `${valueSize}px` };
    const timeStyle = { fontSize: `${timeSize}px` };
    render(this.$doms.canvas, { width: w, height: h });
    render(this.$doms.titleDiv, { style: titleStyle });
    render(this.$doms.valueDiv, { style: valueStyle });
    render(this.$doms.timeOrunitTitleDiv, { style: timeStyle });
  }
  setarc(w, h) {
    const minS = Math.min(w, h);
    const r = (minS * 0.9) / 2;
    const unitW = numberFixRange(r / 3, 15, 3000);
    const x = w / 2;
    const y = numberFixRange(h * 0.85, h / 2, h - 20);
    this.drawInfo.donutCircle = [x, y, r];
    this.drawInfo.lineWidth = unitW * this.gaugeWidthScale;
    const titleSize = numberFixRange(r / 10, 12, 90);
    const valueSize = numberFixRange(r / 3, 16, 100);
    const timeSize = numberFixRange(r / 13, 12, 50);
    const minmaxSize = numberFixRange(r / 30, 12, 30);
    const titleStyle = { fontSize: `${titleSize}px` };
    const valueStyle = { fontSize: `${valueSize}px` };
    const timeStyle = { fontSize: `${timeSize}px` };
    const minmaxStyle = { fontSize: `${minmaxSize}px`, top: `calc(${y + 5}px )`, padding: `0 ${w / 2 - r - 10}px 0 ${w / 2 - r - 10}px ` };
    render(this.$doms.canvas, { width: w, height: h });
    render(this.$doms.titleDiv, { style: titleStyle });
    render(this.$doms.valueDiv, { style: valueStyle });
    render(this.$doms.timeOrunitTitleDiv, { style: timeStyle });
    render(this.$doms.minmaxDiv, { style: minmaxStyle });
  }
  draw(val = 0) {
    if (!this.$doms || !this.$doms.canvas) return;
    let drawVal = numberFixRange((val - this.minValue) / (this.maxValue - this.minValue), 0, 1);
    let ctx = this.ctx;
    ctx.lineCap = this.roundedLineCap ? 'round' : 'butt';
    ctx.lineWidth = this.drawInfo.lineWidth;
    ctx.clearRect(...this.drawInfo.clearbox);
    ctx.save();
    const strip = this.stripBasic * this.dashThickness;
    this[this.gaugeType] && this[this.gaugeType](ctx, drawVal, strip);
    ctx.restore();
  }
  verticalBar(ctx, val, strip) {
    const [x, y, w, h] = this.drawInfo.rect;
    ctx.translate(x + w / 2, y + h);
    // 画背景
    ctx.beginPath();
    ctx.strokeStyle = this.getColor(true);
    if (!strip) {
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -h);
      ctx.closePath();
      ctx.stroke();
    } else {
      let starty = 0;
      while (starty < h) {
        ctx.moveTo(0, -starty);
        ctx.lineTo(0, -Math.min(starty + strip, h));
        starty += strip * 2;
      }
      ctx.stroke();
    }

    ctx.strokeStyle = this.getColor(false, val);
    ctx.beginPath();
    const targety = val * h;
    if (!strip) {
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -targety);
      ctx.closePath();
      ctx.stroke();
    } else {
      let starty = 0;
      while (starty < targety) {
        ctx.moveTo(0, -starty);
        ctx.lineTo(0, -Math.min(starty + strip, targety));
        starty += strip * 2;
      }
      ctx.stroke();
    }
  }
  horizontalBar(ctx, val, strip) {
    const [x, y, w, h] = this.drawInfo.rect;
    ctx.translate(x, y + h / 2);
    // 画背景
    ctx.strokeStyle = this.getColor(true);
    ctx.beginPath();
    if (!strip) {
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.closePath();
      ctx.stroke();
    } else {
      let startx = 0;
      while (startx < w) {
        ctx.moveTo(startx, 0);
        ctx.lineTo(Math.min(startx + strip, w), 0);
        startx += strip * 2;
      }
      ctx.stroke();
    }
    ctx.strokeStyle = this.getColor(false, val);
    const targety = val * w;
    ctx.beginPath();
    if (!strip) {
      ctx.moveTo(0, 0);
      ctx.lineTo(targety, 0);
      ctx.closePath();
      ctx.stroke();
    } else {
      let startx = 0;
      while (startx < targety) {
        ctx.moveTo(startx, 0);
        ctx.lineTo(Math.min(startx + strip, targety), 0);
        startx += strip * 2;
      }
      ctx.stroke();
    }
  }
  donut(ctx, val, strip) {
    const unitArg = strip * REG;
    const [x, y, r] = this.drawInfo.donutCircle;
    ctx.translate(x, y);
    ctx.rotate(-PI / 2);
    ctx.strokeStyle = this.getColor(true);
    ctx.beginPath();
    if (!unitArg) {
      ctx.arc(0, 0, r, 0, PI2);
      ctx.stroke();
    } else {
      let startArg = 0;
      while (startArg < PI2) {
        ctx.beginPath();
        ctx.arc(0, 0, r, startArg, Math.min(startArg + unitArg, PI2));
        startArg += unitArg * 2;
        ctx.stroke();
      }
    }
    const targetArg = PI2 * val;
    ctx.strokeStyle = this.getColor(false, val);
    if (!unitArg) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, targetArg);
      ctx.stroke();
    } else {
      let startArg = 0;
      while (startArg < targetArg) {
        ctx.beginPath();
        ctx.arc(0, 0, r, startArg, Math.min(startArg + unitArg, targetArg));
        startArg += unitArg * 2;
        ctx.stroke();
      }
    }
  }
  arc(ctx, val, strip) {
    const unitArg = strip * REG;
    const [x, y, r] = this.drawInfo.donutCircle;
    ctx.translate(x, y);
    ctx.rotate(-PI);
    ctx.strokeStyle = this.getColor(true);
    ctx.beginPath();
    if (!unitArg) {
      ctx.arc(0, 0, r, 0, PI);
      ctx.stroke();
    } else {
      let startArg = 0;
      while (startArg < PI) {
        ctx.beginPath();
        ctx.arc(0, 0, r, startArg, Math.min(startArg + unitArg, PI));
        startArg += unitArg * 2;
        ctx.stroke();
      }
    }
    const targetArg = PI * val;
    ctx.strokeStyle = this.getColor(false, val);
    if (!unitArg) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, targetArg);
      ctx.stroke();
    } else {
      let startArg = 0;
      while (startArg < targetArg) {
        ctx.beginPath();
        ctx.arc(0, 0, r, startArg, Math.min(startArg + unitArg, targetArg));
        startArg += unitArg * 2;
        ctx.stroke();
      }
    }
  }
  getColor(isBg = true, value) {
    if (isBg) return this.gaugeColor;
    if (this.levelColors && this.levelColors.length) {
      let index = Math.floor(value * (this.levelColors.length - 1));
      return this.levelColors[index];
    }
    return this.defaultColor;
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

  _value = 0;
  _errorMsg = '';
  get value() {
    return this._value;
  }
  lastValue = 0;
  set value(val) {
    val = parseFloat(val);
    if (isNaN(val)) return;
    this.lastValue = this._value;
    this._value = val;
    if (!this.$doms) return;
    if (this.animation) {
      this.animatValue(this.lastValue, val);
    } else {
      this.updateValue(val);
    }
    this.time = new Date();
  }
  animatValue(old, target) {
    if (target === old) return;
    const unitV = (target - old) / Math.ceil(this.animationDuration / ts);
    const nextValue = old + unitV;
    const isPlus = unitV > 0;
    this.nextFrame(nextValue, unitV, isPlus);
  }
  nextFrame = (nextVal, unitV, isPlus) => {
    clearTimeout(this.animatTimer);
    if ((isPlus && nextVal >= this.value) || (!isPlus && nextVal < this.value)) {
      // 到达截止条件
      this.updateValue(nextVal);
      return;
    }
    this.updateValue(nextVal);
    this.animatTimer = setTimeout(this.nextFrame, ts, nextVal + unitV, unitV, isPlus);
  };
  updateValue(value) {
    if (!this.$doms) return;
    if (this.showValue) {
      render(this.$doms.valueDiv, { text: value.toFixed(2) + this.valueSuffix });
    }
    this.draw(value);
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

  destroy() {
    clearTimeout(this.animatTimer);
    this.$el.removeChild(this.$doms.box);
  }
}

export default DigitalGauge;
