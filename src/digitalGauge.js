const VERTIVAL_TYPE = "vertical";
const HORIZONTAL_TYPE = "horizontal";
const CIRCLT_TYPE = "circle";
const SEMICIRCLE_TYPE = "semi-circle";
const COLOR_TYPE_FIXED = "fixed";
const COLOR_TYPE_STEP_SINGLE = "stepSingle";
const COLOR_TYPE_STEP_MULTIPLE = "stepMultiple";
const COLOR_TYPE_GRADIENT = "gradual";
const PI = Math.PI;
class DigitalGauge {
  dom = null;
  canvas = null;
  ctx = null;
  timer = null;
  timerTime = 20;
  resizeTimer = null;
  currentValue = 0;
  realValue = 0;
  size = { w: 0, h: 0 };
  defaultOption = {
    type: VERTIVAL_TYPE, //见上面的type
    value: 90, //
    unit: '',
    min: 0,
    max: 100,
    tickWidthPercent: 0.3,
    minTickWidth: 20,
    maxTickWidth: 60,
    lineCap: "butt", //square  butt  round
    backgroundColor: "#eee",
    foreColor: "#00ff00",
    tickMinColor: "rgba(0,255,0,1)",
    tickMaxColor: "rgba(255,0,0,1)",
    colorType: COLOR_TYPE_STEP_MULTIPLE, //见上面的colortype
    showValue: true,
    showMinLabel: true,
    showMaxLabel: true,
    minLabelColor: "#ddd",
    maxLabelColor: "#ddd",
    stepColors: [
      [0.95, "#ff031b"],
      [0.9, "#ff4828"],
      [0.8, "#ff710a"],
      [0.7, "#ffad02"],
      [0.6, "#ffdb00"],
      [0.5, "#f1f502"],
      [0.4, "#b1eb05"],
      [0.3, "#81eb0a"],
      [0.2, "#38d912"],
      [0.1, "#04cc17"],
      [0, "#02b013"]
    ],
    animation: true,
    animationDuration: 500
  };
  gaugeOptionForType = {
    [VERTIVAL_TYPE]: {
      minLabelOffset: [8, 5],
      maxLabelOffset: [8, 5],
      padding: [15, 5],
      valueOffset: [0, -5],
      valueTextAlign: "center",
      minLabelTextAlign: "left",
      maxLabelTextAlign: "left",
      valueTextBaseline: "bottom",
      minLabelTextBaseline: "bottom",
      maxLabelTextBaseline: "top",
      tickRatio: 10,
      BlankTickRatio: 1
    },
    [HORIZONTAL_TYPE]: {
      padding: [5, 25],
      minLabelOffset: [0, 5],
      maxLabelOffset: [0, 5],
      valueOffset: [0, 0],
      valueTextAlign: "center",
      minLabelTextAlign: "left",
      maxLabelTextAlign: "right",
      valueTextBaseline: "bottom",
      minLabelTextBaseline: "top",
      maxLabelTextBaseline: "top",
      tickRatio: 10,
      BlankTickRatio: 1
    },
    [CIRCLT_TYPE]: {
      padding: [25],
      minLabelOffset: [0, 5],
      maxLabelOffset: [0, 5],
      valueOffset: [0, 0],
      valueTextAlign: "center",
      minLabelTextAlign: "left",
      maxLabelTextAlign: "right",
      valueTextBaseline: "middle",
      minLabelTextBaseline: "top",
      maxLabelTextBaseline: "top",

      subText: "",
      subTextOffset: [0, 0],
      subTextColor: '',
      subTextAlign: 'center',
      subTextBaseline: "top",
      tickRatio: 10,
      BlankTickRatio: 1,
      startArg: 0,
      endArg: 2 * PI
    },
    [SEMICIRCLE_TYPE]: {
      // paddingPercent: [0.1, 0.1],
      padding: [25, 25],
      minLabelOffset: [0, 5],
      maxLabelOffset: [0, 5],
      valueOffset: [0, 0],
      valueTextAlign: "center",
      minLabelTextAlign: "center",
      maxLabelTextAlign: "center",
      valueTextBaseline: "middle",
      minLabelTextBaseline: "top",
      maxLabelTextBaseline: "top",
      tickRatio: 10,
      centerPosition: "bottom", //left top right bottom
      BlankTickRatio: 1,
      autoArg: true,
      startArg: PI,
      endArg: 2 * PI
    }
  };
  option = {}
  lastOption = {}
  constructor(dom, option) {
    this.dom = dom;
    this.draw = this.draw.bind(this);
    this.setOption(option, true);
  }

  initGauge() {
    if (!this.dom) {
      console.log("没有设置dom元素");
      return;
    }
    this.dom.innerHTML = "";
    this.canvas = document.createElement("canvas");
    this.setSize();
    this.ctx = this.canvas.getContext("2d");
    this.dom.appendChild(this.canvas);
    this.setValue(this.option.value);
  }
  setOption(option, forceLoad = false) {
    let type = "";
    let typeOption = {};
    if (option && option.type) {
      type = option.type;
    } else {
      type = this.defaultOption.type;
    }
    typeOption = this.gaugeOptionForType[type];
    if (forceLoad) {
      this.option = {
        ...this.defaultOption,
        ...typeOption,
        ...option
      };
    } else {
      this.option = {
        ...this.option,
        ...option
      }
    }


    if (forceLoad) {
      this.initGauge();
    } else {
      this.update();
    }
  }
  setSize(size) {
    let w;
    let h;
    if (!size) {
      h = this.dom.offsetHeight;
      w = this.dom.offsetWidth;
    } else {
      w = size.w;
      h = size.h;
    }
    this.size = { w, h };
    this.canvas.width = w;
    this.canvas.height = h;
  }
  resize(size = null) {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.setSize(size);
      this.update();
    }, 50);
  }
  update() {
    this.setValue(+this.option.value);
  }
  draw(val) {
    switch (this.option.type) {
      case VERTIVAL_TYPE:
        this.drawVertiva(val);
        break;
      case HORIZONTAL_TYPE:
        this.drawHorizontal(val);
        break;
      case CIRCLT_TYPE:
        this.drawCircle(val);
        break;
      case SEMICIRCLE_TYPE:
        this.drawSemiCircle(val);
        break;
    }
  }

  setValue(val, noAnimation = false) {
    this.realValue = val;
    this.option.value = val.toFixed(2);
    val = this.correctVal(val);
    clearInterval(this.timer);
    if (this.option.animation && !noAnimation) {
      let tempVal = this.currentValue;
      let times = this.option.animationDuration / this.timerTime;
      let valStep = (val - this.currentValue) / times;
      let isPlus = val > this.currentValue;
      this.currentValue = val;
      this.timer = setInterval(() => {
        if (isPlus) {
          if (tempVal > val) {
            clearInterval(this.timer);
            tempVal = val;
          }
        } else {
          if (tempVal < val) {
            clearInterval(this.timer);
            tempVal = val;
          }
        }
        this.draw(tempVal);
        tempVal += valStep;
      }, this.timerTime);
    } else {
      this.currentValue = val;
      this.draw(val);
    }
  }
  correctVal(val) {
    let { min, max } = this.option;
    if (val < min) return 0;
    if (val > max) return 100;
    return ((val - min) * 100) / (max - min);
  }
  calcColor(val) {
    switch (this.option.colorType) {
      case COLOR_TYPE_FIXED:
        return this.option.foreColor;
      case COLOR_TYPE_STEP_SINGLE:
        return this.getStecpColor(this.currentValue / 100);
      case COLOR_TYPE_STEP_MULTIPLE:
        return this.getStecpColor(val);
      case COLOR_TYPE_GRADIENT:
        return this.translateColor(val);
    }
  }
  getStecpColor(val) {
    for (let index = 0; index < this.option.stepColors.length; index++) {
      if (val >= this.option.stepColors[index][0]) {
        return this.option.stepColors[index][1];
      }
    }
    return this.option.stepColors[0][1];
  }
  translateColor(val) {
    let { tickMaxColor, tickMinColor } = this.option;
    let [minR, minG, minB, minA] = this.getRGBA(tickMinColor);
    let [maxR, maxG, maxB, maxA] = this.getRGBA(tickMaxColor);
    let r = this.valToColormeta(val, maxR, minR);
    let g = this.valToColormeta(val, maxG, minG);
    let b = this.valToColormeta(val, maxB, minB);
    let a = this.valToColormeta(val, maxA, minA, true);
    return `rgba(${r},${g},${b},${a})`;
  }
  valToColormeta(val, max, min, isA = false) {
    max = +max;
    min = +min;
    if (isA) {
      return min + (max - min) * val;
    } else {
      return Math.round(min + (max - min) * val);
    }
  }
  getRGBA(color) {
    // 由于正则比较简单，所以rgba的透明度不支持小数，只允许 0 1
    if (color.startsWith("rgb")) {
      let reg = /rgb[a]?\((\d{1,3}),(\d{1,3}),(\d{1,3})[,]?(\d{1,3})?\)/;
      let [, r, g, b, a] = color.match(reg);
      return [r, g, b, a || 1];
    } else if (color.startsWith("#")) {
      let metaLen = (color.length - 1) / 3;
      let reg = `/#(\\S{${metaLen}})(\\S{${metaLen}})(\\S{${metaLen}})/`;
      let [, r, g, b] = color.match(reg);
      return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1];
    }
  }
  getFZ(tickWidth, onlysize = false) {
    if (onlysize) {
      return tickWidth / 3;
    }
    return tickWidth / 3 + "px Arial";
  }
  drawText(
    text,
    x,
    y,
    font,
    filStyle,
    textAlign,
    textBaseline,
    angle = 0,
    maxWidth = null
  ) {
    this.ctx.save();
    this.ctx.font = font;
    this.ctx.fillStyle = filStyle;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    if (angle !== 0) {
      this.ctx.translate(x, y);
      this.ctx.rotate((angle / 180) * PI);
      x = 0;
      y = 0;
    }
    maxWidth
      ? this.ctx.fillText(text, x, y, maxWidth)
      : this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }
  drawVertiva(val) {
    // background;
    this.ctx.clearRect(0, 0, this.size.w, this.size.h);
    let centerX = this.size.w / 2;
    let minH = this.size.h - this.option.padding[0];
    let maxH = this.option.padding[0];
    let tickWidth = this.option.tickWidthPercent * this.size.w;
    if (tickWidth < this.option.minTickWidth) {
      tickWidth = this.option.minTickWidth;
    }
    if (tickWidth > this.option.maxTickWidth) {
      tickWidth = this.option.maxTickWidth;
    }
    let tickH = tickWidth / this.option.tickRatio;
    let tickGutter = tickH * this.option.BlankTickRatio;
    this.ctx.beginPath();
    while (minH > maxH) {
      this.ctx.moveTo(centerX - tickWidth / 2, minH);
      this.ctx.lineTo(centerX + tickWidth / 2, minH);
      minH = minH - tickH - tickGutter;
    }
    this.ctx.lineWidth = tickH;
    this.ctx.lineCap = this.option.lineCap;
    this.ctx.strokeStyle = this.option.backgroundColor;
    // this.ctx.closePath();
    this.ctx.stroke();
    // fore
    minH = this.size.h - this.option.padding[0];
    let minHH = this.size.h - this.option.padding[0];
    let len = minH - maxH;
    maxH = minH - ((minH - maxH) * val) / 100;
    while (minH > maxH) {
      this.ctx.beginPath();
      this.ctx.moveTo(centerX - tickWidth / 2, minH);
      this.ctx.lineTo(centerX + tickWidth / 2, minH);
      this.ctx.lineWidth = tickH;
      this.ctx.strokeStyle = this.calcColor((minHH - minH) / len);
      minH = minH - tickH - tickGutter;
      if (minH < 0) minH = 0;
      this.ctx.stroke();
    }
    // this.ctx.closePath();
    // label
    if (this.option.showValue) {
      let { value, unit, valueTextAlign, valueTextBaseline, valueOffset } = this.option
      let text = value + unit
      let font = this.getFZ(tickWidth);
      let fillStyle = this.calcColor(val / 100);
      let [x, y] = valueOffset;
      x = centerX + x;
      y = maxH + y;
      let w = tickWidth - 4;
      this.drawText(text, x, y, font, fillStyle, valueTextAlign, valueTextBaseline, 0, w);
    }
    if (this.option.showMinLabel) {
      let text = this.option.min;
      let font = this.getFZ(tickWidth);
      minH = this.size.h - this.option.padding[0];
      let [x, y] = this.option.minLabelOffset;
      let textAlign = this.option.minLabelTextAlign;
      let textBaseline = this.option.minLabelTextBaseline;
      let fillStyle = this.option.minLabelColor;
      x = centerX + tickWidth / 2 + x;
      y = minH + y;
      this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0);
    }
    if (this.option.showMaxLabel) {
      let text = this.option.max;
      let font = this.getFZ(tickWidth);
      maxH = this.option.padding[0];
      let textAlign = this.option.maxLabelTextAlign;
      let textBaseline = this.option.maxLabelTextBaseline;
      let [x, y] = this.option.maxLabelOffset;
      let fillStyle = this.option.maxLabelColor;
      x = centerX + tickWidth / 2 + x;
      y = maxH + y;
      this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0);
    }
  }
  drawHorizontal(val) {
    // background;
    this.ctx.clearRect(0, 0, this.size.w, this.size.h);
    let centerY = this.size.h / 2;
    let maxL = this.size.w - this.option.padding[1];
    let minL = this.option.padding[1];
    let tickWidth = this.option.tickWidthPercent * this.size.h;
    if (tickWidth < this.option.minTickWidth) {
      tickWidth = this.option.minTickWidth;
    }
    if (tickWidth > this.option.maxTickWidth) {
      tickWidth = this.option.maxTickWidth;
    }
    let tickH = tickWidth / this.option.tickRatio;
    let tickGutter = tickH * this.option.BlankTickRatio;
    this.ctx.beginPath();
    while (maxL > minL) {
      this.ctx.moveTo(minL, centerY - tickWidth / 2);
      this.ctx.lineTo(minL, centerY + tickWidth / 2);
      minL = minL + tickH + tickGutter;
    }
    this.ctx.lineWidth = tickH;
    this.ctx.lineCap = this.option.lineCap;
    this.ctx.strokeStyle = this.option.backgroundColor;
    // this.ctx.closePath();
    this.ctx.stroke();
    // fore
    minL = this.option.padding[1];
    let minLl = this.option.padding[1];
    let len = maxL - minL;
    maxL = minL + ((maxL - minL) * val) / 100;
    while (maxL > minL) {
      this.ctx.beginPath();
      this.ctx.moveTo(minL, centerY - tickWidth / 2);
      this.ctx.lineTo(minL, centerY + tickWidth / 2);
      this.ctx.lineWidth = tickH;
      this.ctx.strokeStyle = this.calcColor((minL - minLl) / len);
      minL = minL + tickH + tickGutter;
      if (minL > maxL) minL = maxL;
      this.ctx.stroke();
    }
    // this.ctx.closePath();
    // label
    if (this.option.showValue) {
      let { value, unit, valueTextAlign, valueTextBaseline, valueOffset } = this.option
      let text = value + unit
      let font = this.getFZ(tickWidth);
      let fillStyle = this.calcColor(val / 100);
      let [x, y] = valueOffset;
      x = minL + x;
      y = centerY + y;
      let w = tickWidth - 4;
      this.drawText(
        text,
        x,
        y,
        font,
        fillStyle,
        valueTextAlign,
        valueTextBaseline,
        90,
        w
      );
    }
    if (this.option.showMinLabel) {
      let text = this.option.min;
      let font = this.getFZ(tickWidth);
      minL = this.option.padding[1];
      let [x, y] = this.option.minLabelOffset;
      let textAlign = this.option.minLabelTextAlign;
      let textBaseline = this.option.minLabelTextBaseline;
      let fillStyle = this.option.minLabelColor;
      x = minL + x;
      y = centerY + tickWidth / 2 + y;
      this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0);
    }
    if (this.option.showMaxLabel) {
      let text = this.option.max;
      let font = this.getFZ(tickWidth);
      maxL = this.size.w - this.option.padding[1];
      let textAlign = this.option.maxLabelTextAlign;
      let textBaseline = this.option.maxLabelTextBaseline;
      let fillStyle = this.option.maxLabelColor;
      let [x, y] = this.option.maxLabelOffset;
      x = maxL + x;
      y = centerY + tickWidth / 2 + y;
      this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0);
    }
  }
  calcArgPoint(x, y, arg, r, R) {
    let xr = Math.cos(arg) * r + x;
    let yr = Math.sin(arg) * r + y;
    let xR = Math.cos(arg) * R + x;
    let yR = Math.sin(arg) * R + y;
    return [[xr, yr], [xR, yR]];
  }
  correctArgAndGutterArg(arg, gutterArg, argLen) {
    let num = Math.ceil(argLen / (arg + gutterArg));
    let per = argLen / num;
    arg = (per * arg) / (arg + gutterArg);
    return [arg, per - arg];
  }
  drawCircle(val) {
    // background
    this.ctx.clearRect(0, 0, this.size.w, this.size.h);
    let centerX = this.size.w / 2;
    let centerY = this.size.h / 2;
    let maxR = Math.min(
      this.size.w / 2 - this.option.padding[0],
      this.size.h / 2 - this.option.padding[0]
    );
    let tickWidth = maxR * this.option.tickWidthPercent;
    if (tickWidth < this.option.minTickWidth) {
      tickWidth = this.option.minTickWidth;
    }
    if (tickWidth > this.option.maxTickWidth) {
      tickWidth = this.option.maxTickWidth;
    }
    let minR = maxR - tickWidth;
    minR = minR > 0 ? minR : 0.1;
    let tickH = tickWidth / this.option.tickRatio;
    let tickArg = tickH / minR;
    let tickGutterArg = tickArg * this.option.BlankTickRatio;
    let { startArg, endArg } = this.option;
    let argLen = endArg - startArg;
    [tickArg, tickGutterArg] = this.correctArgAndGutterArg(
      tickArg,
      tickGutterArg,
      argLen
    );
    this.ctx.beginPath();
    while (startArg < endArg) {
      let [p1, p2] = this.calcArgPoint(centerX, centerY, startArg, minR, maxR);
      this.ctx.moveTo(...p1);
      this.ctx.lineTo(...p2);
      startArg = startArg + tickArg + tickGutterArg;
      if (startArg > endArg) startArg = endArg;
    }
    this.ctx.lineWidth = tickH;
    this.ctx.lineCap = this.option.lineCap;
    this.ctx.strokeStyle = this.option.backgroundColor;
    this.ctx.stroke();

    // fore
    let minArg = this.option.startArg;
    startArg = this.option.startArg;
    endArg = (argLen * val) / 100 + startArg;
    while (endArg > startArg) {
      let [p1, p2] = this.calcArgPoint(centerX, centerY, startArg, minR, maxR);
      this.ctx.beginPath();
      this.ctx.moveTo(...p1);
      this.ctx.lineTo(...p2);
      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.calcColor((startArg - minArg) / argLen);
      this.ctx.stroke();
      startArg = startArg + tickArg + tickGutterArg;
      if (startArg > endArg) startArg = endArg;
    }

    // label
    let font = this.getFZ(minR);
    let valColor = this.calcColor(val / 100);
    let w = minR - 4;
    if (this.option.showValue) {
      let { value, unit, valueTextAlign, valueTextBaseline, valueOffset } = this.option
      let text = value + unit

      let [x, y] = valueOffset;
      x = centerX + x;
      y = centerY + y;

      this.drawText(text, x, y, font, valColor, valueTextAlign, valueTextBaseline, 0, w);
    }
    if (this.option.subText) {
      let { subText, subTextColor, subTextOffset, subTextAlign, subTextBaseline } = this.option
      let subFont = this.getFZ(minR / 2.5)
      let extraOffsetY = this.getFZ(minR / 2, true)
      let [x, y] = subTextOffset;
      x = centerX + x;
      y = centerY + y + extraOffsetY;
      let fillStyle = subTextColor || valColor
      this.drawText(subText, x, y, subFont, fillStyle, subTextAlign, subTextBaseline, 0, w);
    }

  }
  drawSemiCircle(val) {
    // background
    this.ctx.clearRect(0, 0, this.size.w, this.size.h);
    if (this.option.paddingPercent) {
      let [xp, yp] = this.option.paddingPercent;
      this.option.padding = [this.size.w * xp, this.size.h * yp];
    }
    let centerX;
    let centerY;
    let maxR;
    let minLabelX = 0;
    let minLabelY = 0;
    let minLabelRotate = 0;
    let maxLabelX = 0;
    let maxLabelY = 0;
    let maxLabelRotate = 0;
    let autoArg = this.option.autoArg;
    switch (this.option.centerPosition) {
      case "left":
        centerX = this.option.padding[0];
        centerY = this.size.h / 2;
        maxR = Math.min(
          this.size.w - 2 * this.option.padding[0],
          this.size.h / 2 - this.option.padding[1]
        );
        if (autoArg) {
          this.option.startArg = -PI / 2;
          this.option.endArg = PI / 2;
        }
        break;
      case "right":
        centerX = this.size.w - this.option.padding[0];
        centerY = this.size.h / 2;
        maxR = Math.min(
          this.size.w - 2 * this.option.padding[0],
          this.size.h / 2 - this.option.padding[1]
        );
        if (autoArg) {
          this.option.startArg = PI / 2;
          this.option.endArg = (3 * PI) / 2;
        }
        break;
      case "top":
        centerX = this.size.w / 2;
        centerY = this.option.padding[1];
        maxR = Math.min(
          this.size.w / 2 - this.option.padding[0],
          this.size.h - 2 * this.option.padding[1]
        );
        if (autoArg) {
          this.option.startArg = 0;
          this.option.endArg = PI;
        }
        break;
      case "bottom":
        centerX = this.size.w / 2;
        centerY = this.size.h - this.option.padding[1];
        maxR = Math.min(
          this.size.w / 2 - this.option.padding[0],
          this.size.h - 2 * this.option.padding[1]
        );
        if (autoArg) {
          this.option.startArg = PI;
          this.option.endArg = 2 * PI;
        }
        break;
    }
    let tickWidth = maxR * this.option.tickWidthPercent;
    if (tickWidth < this.option.minTickWidth) {
      tickWidth = this.option.minTickWidth;
    }
    if (tickWidth > this.option.maxTickWidth) {
      tickWidth = this.option.maxTickWidth;
    }
    let minR = maxR - tickWidth;
    minR = minR > 0 ? minR : 0.1;
    switch (this.option.centerPosition) {
      case "left":
        minLabelX = centerX - tickWidth * 0.6;
        minLabelY = centerY - minR - tickWidth / 2;
        minLabelRotate = 90;
        maxLabelX = centerX - tickWidth * 0.6;
        maxLabelY = centerY + minR + tickWidth / 2;
        maxLabelRotate = 90;
        this.option.minLabelTextBaseline = "top";
        this.option.maxLabelTextBaseline = "top";
        this.option.valueTextAlign = "left";
        break;
      case "right":
        minLabelX = centerX;
        minLabelY = centerY - minR - tickWidth / 2;
        minLabelRotate = -90;
        maxLabelX = centerX;
        maxLabelY = centerY + minR + tickWidth / 2;
        maxLabelRotate = -90;
        this.option.valueTextAlign = "right";
        this.option.minLabelTextBaseline = "bottom";
        this.option.maxLabelTextBaseline = "bottom";
        break;
      case "top":
        minLabelX = centerX - minR - tickWidth / 2;
        minLabelY = centerY - tickWidth / 6;
        maxLabelX = centerX + minR + tickWidth / 2;
        maxLabelY = centerY - tickWidth / 6;
        this.option.minLabelTextBaseline = "bottom";
        this.option.maxLabelTextBaseline = "bottom";
        this.option.valueTextBaseline = "top";
        break;
      case "bottom":
        minLabelX = centerX - minR - tickWidth / 2;
        minLabelY = centerY;
        maxLabelX = centerX + minR + tickWidth / 2;
        maxLabelY = centerY;
        this.option.minLabelTextBaseline = "top";
        this.option.maxLabelTextBaseline = "top";
        this.option.valueTextBaseline = "bottom";
        break;
    }

    let tickH = tickWidth / this.option.tickRatio;
    let tickArg = tickH / minR;
    let tickGutterArg = tickArg * this.option.BlankTickRatio;
    let { startArg, endArg } = this.option;
    let argLen = endArg - startArg;
    [tickArg, tickGutterArg] = this.correctArgAndGutterArg(
      tickArg,
      tickGutterArg,
      argLen
    );
    this.ctx.beginPath();
    while (startArg < endArg) {
      let [p1, p2] = this.calcArgPoint(centerX, centerY, startArg, minR, maxR);
      this.ctx.moveTo(...p1);
      this.ctx.lineTo(...p2);
      startArg = startArg + tickArg + tickGutterArg;
      if (startArg > endArg) startArg = endArg;
    }
    this.ctx.lineWidth = tickH;
    this.ctx.lineCap = this.option.lineCap;
    this.ctx.strokeStyle = this.option.backgroundColor;
    this.ctx.stroke();

    // fore
    let minArg = this.option.startArg;
    startArg = this.option.startArg;
    endArg = (argLen * val) / 100 + startArg;
    while (endArg > startArg) {
      let [p1, p2] = this.calcArgPoint(centerX, centerY, startArg, minR, maxR);
      this.ctx.beginPath();
      this.ctx.moveTo(...p1);
      this.ctx.lineTo(...p2);
      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.calcColor((startArg - minArg) / argLen);
      this.ctx.stroke();
      startArg = startArg + tickArg + tickGutterArg;
      if (startArg > endArg) startArg = endArg;
    }

    // label
    if (this.option.showValue) {
      let { value, unit, valueTextAlign, valueTextBaseline, valueOffset } = this.option
      let text = value + unit;
      let font = this.getFZ(minR);
      let fillStyle = this.calcColor(val / 100);
      let [x, y] = valueOffset;
      x = centerX + x;
      y = centerY + y;
      let w = minR - 4;
      this.drawText(text, x, y, font, fillStyle, valueTextAlign, valueTextBaseline, 0, w);
    }

    if (this.option.showMinLabel) {
      let text = this.option.min;
      let font = this.getFZ(tickWidth);
      let textAlign = this.option.minLabelTextAlign;
      let textBaseline = this.option.minLabelTextBaseline;
      let fillStyle = this.option.minLabelColor;
      let [x, y] = this.option.minLabelOffset;
      x = minLabelX + tickWidth / 2 + x;
      y = minLabelY + y;
      this.drawText(
        text,
        x,
        y,
        font,
        fillStyle,
        textAlign,
        textBaseline,
        minLabelRotate
      );
    }
    if (this.option.showMaxLabel) {
      let text = this.option.max;
      let font = this.getFZ(tickWidth);
      let textAlign = this.option.maxLabelTextAlign;
      let textBaseline = this.option.maxLabelTextBaseline;
      let [x, y] = this.option.maxLabelOffset;
      let fillStyle = this.option.maxLabelColor;
      x = maxLabelX + tickWidth / 2 + x;
      y = maxLabelY + y;
      this.drawText(
        text,
        x,
        y,
        font,
        fillStyle,
        textAlign,
        textBaseline,
        maxLabelRotate
      );
    }
  }
}

export default DigitalGauge
