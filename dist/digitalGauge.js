"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalGauge = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VERTIVAL_TYPE = "vertical";
var HORIZONTAL_TYPE = "horizontal";
var CIRCLT_TYPE = "circle";
var SEMICIRCLE_TYPE = "semi-circle";
var COLOR_TYPE_FIXED = "fixed";
var COLOR_TYPE_STEP_SINGLE = "stepSingle";
var COLOR_TYPE_STEP_MULTIPLE = "stepMultiple";
var COLOR_TYPE_GRADIENT = "gradual";
var PI = Math.PI;

var DigitalGauge =
/*#__PURE__*/
function () {
  function DigitalGauge(dom, option) {
    var _defineProperty2;

    _classCallCheck(this, DigitalGauge);

    _defineProperty(this, "dom", null);

    _defineProperty(this, "canvas", null);

    _defineProperty(this, "ctx", null);

    _defineProperty(this, "timer", null);

    _defineProperty(this, "timerTime", 20);

    _defineProperty(this, "resizeTimer", null);

    _defineProperty(this, "currentValue", 0);

    _defineProperty(this, "realValue", 0);

    _defineProperty(this, "size", {
      w: 0,
      h: 0
    });

    _defineProperty(this, "defaultOption", {
      type: VERTIVAL_TYPE,
      //见上面的type
      value: 90,
      //
      min: 0,
      max: 100,
      tickWidthPercent: 0.3,
      minTickWidth: 20,
      maxTickWidth: 60,
      lineCap: "butt",
      //square  butt  round
      backgroundColor: "#eee",
      foreColor: "#00ff00",
      tickMinColor: "rgba(0,255,0,1)",
      tickMaxColor: "rgba(255,0,0,1)",
      colorType: COLOR_TYPE_STEP_MULTIPLE,
      //见上面的colortype
      showValue: true,
      showMinLabel: true,
      showMaxLabel: true,
      minLabelColor: "#ddd",
      maxLabelColor: "#ddd",
      stepColors: [[0.95, "#ff031b"], [0.9, "#ff4828"], [0.8, "#ff710a"], [0.7, "#ffad02"], [0.6, "#ffdb00"], [0.5, "#f1f502"], [0.4, "#b1eb05"], [0.3, "#81eb0a"], [0.2, "#38d912"], [0.1, "#04cc17"], [0, "#02b013"]],
      animation: true,
      animationDuration: 500
    });

    _defineProperty(this, "gaugeOptionForType", (_defineProperty2 = {}, _defineProperty(_defineProperty2, VERTIVAL_TYPE, {
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
    }), _defineProperty(_defineProperty2, HORIZONTAL_TYPE, {
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
    }), _defineProperty(_defineProperty2, CIRCLT_TYPE, {
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
      tickRatio: 10,
      BlankTickRatio: 1,
      startArg: 0,
      endArg: 2 * PI
    }), _defineProperty(_defineProperty2, SEMICIRCLE_TYPE, {
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
      centerPosition: "bottom",
      //left top right bottom
      BlankTickRatio: 1,
      autoArg: true,
      startArg: PI,
      endArg: 2 * PI
    }), _defineProperty2));

    this.dom = dom;
    this.draw = this.draw.bind(this);
    this.setOption(option, true);
  }

  _createClass(DigitalGauge, [{
    key: "initGauge",
    value: function initGauge() {
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
  }, {
    key: "setOption",
    value: function setOption(option) {
      var forceLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var type = "";
      var typeOption = {};

      if (option && option.type) {
        type = option.type;
      } else {
        type = this.defaultOption.type;
      }

      typeOption = this.gaugeOptionForType[type];
      this.option = { ...this.defaultOption,
        ...typeOption,
        ...option
      };

      if (forceLoad) {
        this.initGauge();
      } else {
        this.update();
      }
    }
  }, {
    key: "setSize",
    value: function setSize(size) {
      var w;
      var h;

      if (!size) {
        h = this.dom.offsetHeight;
        w = this.dom.offsetWidth;
      } else {
        w = size.w;
        h = size.h;
      }

      this.size = {
        w: w,
        h: h
      };
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this = this;

      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(function () {
        _this.setSize(size);

        _this.update();
      }, 50);
    }
  }, {
    key: "update",
    value: function update() {
      this.setValue(+this.option.value);
    }
  }, {
    key: "draw",
    value: function draw(val) {
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
  }, {
    key: "setValue",
    value: function setValue(val) {
      var _this2 = this;

      var noAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.realValue = val;
      this.option.value = val.toFixed(2);
      val = this.correctVal(val);
      clearInterval(this.timer);

      if (this.option.animation && !noAnimation) {
        var tempVal = this.currentValue;
        var times = this.option.animationDuration / this.timerTime;
        var valStep = (val - this.currentValue) / times;
        var isPlus = val > this.currentValue;
        this.currentValue = val;
        this.timer = setInterval(function () {
          if (isPlus) {
            if (tempVal > val) {
              clearInterval(_this2.timer);
              tempVal = val;
            }
          } else {
            if (tempVal < val) {
              clearInterval(_this2.timer);
              tempVal = val;
            }
          }

          _this2.draw(tempVal);

          tempVal += valStep;
        }, this.timerTime);
      } else {
        this.currentValue = val;
        this.draw(val);
      }
    }
  }, {
    key: "correctVal",
    value: function correctVal(val) {
      var _this$option = this.option,
          min = _this$option.min,
          max = _this$option.max;
      if (val < min) return 0;
      if (val > max) return 100;
      return (val - min) * 100 / (max - min);
    }
  }, {
    key: "calcColor",
    value: function calcColor(val) {
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
  }, {
    key: "getStecpColor",
    value: function getStecpColor(val) {
      for (var index = 0; index < this.option.stepColors.length; index++) {
        if (val >= this.option.stepColors[index][0]) {
          return this.option.stepColors[index][1];
        }
      }

      return this.option.stepColors[0][1];
    }
  }, {
    key: "translateColor",
    value: function translateColor(val) {
      var _this$option2 = this.option,
          tickMaxColor = _this$option2.tickMaxColor,
          tickMinColor = _this$option2.tickMinColor;

      var _this$getRGBA = this.getRGBA(tickMinColor),
          _this$getRGBA2 = _slicedToArray(_this$getRGBA, 4),
          minR = _this$getRGBA2[0],
          minG = _this$getRGBA2[1],
          minB = _this$getRGBA2[2],
          minA = _this$getRGBA2[3];

      var _this$getRGBA3 = this.getRGBA(tickMaxColor),
          _this$getRGBA4 = _slicedToArray(_this$getRGBA3, 4),
          maxR = _this$getRGBA4[0],
          maxG = _this$getRGBA4[1],
          maxB = _this$getRGBA4[2],
          maxA = _this$getRGBA4[3];

      var r = this.valToColormeta(val, maxR, minR);
      var g = this.valToColormeta(val, maxG, minG);
      var b = this.valToColormeta(val, maxB, minB);
      var a = this.valToColormeta(val, maxA, minA, true);
      return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
    }
  }, {
    key: "valToColormeta",
    value: function valToColormeta(val, max, min) {
      var isA = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      max = +max;
      min = +min;

      if (isA) {
        return min + (max - min) * val;
      } else {
        return Math.round(min + (max - min) * val);
      }
    }
  }, {
    key: "getRGBA",
    value: function getRGBA(color) {
      // 由于正则比较简单，所以rgba的透明度不支持小数，只允许 0 1
      if (color.startsWith("rgb")) {
        var reg = /rgb[a]?\((\d{1,3}),(\d{1,3}),(\d{1,3})[,]?(\d{1,3})?\)/;

        var _color$match = color.match(reg),
            _color$match2 = _slicedToArray(_color$match, 5),
            r = _color$match2[1],
            g = _color$match2[2],
            b = _color$match2[3],
            a = _color$match2[4];

        return [r, g, b, a || 1];
      } else if (color.startsWith("#")) {
        var metaLen = (color.length - 1) / 3;

        var _reg = "/#(\\S{".concat(metaLen, "})(\\S{").concat(metaLen, "})(\\S{").concat(metaLen, "})/");

        var _color$match3 = color.match(_reg),
            _color$match4 = _slicedToArray(_color$match3, 4),
            _r = _color$match4[1],
            _g = _color$match4[2],
            _b = _color$match4[3];

        return [parseInt(_r, 16), parseInt(_g, 16), parseInt(_b, 16), 1];
      }
    }
  }, {
    key: "getFZ",
    value: function getFZ(tickWidth) {
      var onlysize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (onlysize) {
        return tickWidth / 3;
      }

      return tickWidth / 3 + "px Arial";
    }
  }, {
    key: "drawText",
    value: function drawText(text, x, y, font, filStyle, textAlign, textBaseline) {
      var angle = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var maxWidth = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      this.ctx.save();
      this.ctx.font = font;
      this.ctx.fillStyle = filStyle;
      this.ctx.textAlign = textAlign;
      this.ctx.textBaseline = textBaseline;

      if (angle !== 0) {
        this.ctx.translate(x, y);
        this.ctx.rotate(angle / 180 * PI);
        x = 0;
        y = 0;
      }

      maxWidth ? this.ctx.fillText(text, x, y, maxWidth) : this.ctx.fillText(text, x, y);
      this.ctx.restore();
    }
  }, {
    key: "drawVertiva",
    value: function drawVertiva(val) {
      // background;
      this.ctx.clearRect(0, 0, this.size.w, this.size.h);
      var centerX = this.size.w / 2;
      var minH = this.size.h - this.option.padding[0];
      var maxH = this.option.padding[0];
      var tickWidth = this.option.tickWidthPercent * this.size.w;

      if (tickWidth < this.option.minTickWidth) {
        tickWidth = this.option.minTickWidth;
      }

      if (tickWidth > this.option.maxTickWidth) {
        tickWidth = this.option.maxTickWidth;
      }

      var tickH = tickWidth / this.option.tickRatio;
      var tickGutter = tickH * this.option.BlankTickRatio;
      this.ctx.beginPath();

      while (minH > maxH) {
        this.ctx.moveTo(centerX - tickWidth / 2, minH);
        this.ctx.lineTo(centerX + tickWidth / 2, minH);
        minH = minH - tickH - tickGutter;
      }

      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.option.backgroundColor; // this.ctx.closePath();

      this.ctx.stroke(); // fore

      minH = this.size.h - this.option.padding[0];
      var minHH = this.size.h - this.option.padding[0];
      var len = minH - maxH;
      maxH = minH - (minH - maxH) * val / 100;

      while (minH > maxH) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - tickWidth / 2, minH);
        this.ctx.lineTo(centerX + tickWidth / 2, minH);
        this.ctx.lineWidth = tickH;
        this.ctx.strokeStyle = this.calcColor((minHH - minH) / len);
        minH = minH - tickH - tickGutter;
        if (minH < 0) minH = 0;
        this.ctx.stroke();
      } // this.ctx.closePath();
      // label


      if (this.option.showValue) {
        var text = this.option.value;
        var font = this.getFZ(tickWidth);
        var textAlign = this.option.valueTextAlign;
        var textBaseline = this.option.valueTextBaseline;
        var fillStyle = this.calcColor(val / 100);

        var _this$option$valueOff = _slicedToArray(this.option.valueOffset, 2),
            x = _this$option$valueOff[0],
            y = _this$option$valueOff[1];

        x = centerX + x;
        y = maxH + y;
        var w = tickWidth - 4;
        this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0, w);
      }

      if (this.option.showMinLabel) {
        var _text = this.option.min;

        var _font = this.getFZ(tickWidth);

        minH = this.size.h - this.option.padding[0];

        var _this$option$minLabel = _slicedToArray(this.option.minLabelOffset, 2),
            _x = _this$option$minLabel[0],
            _y = _this$option$minLabel[1];

        var _textAlign = this.option.minLabelTextAlign;
        var _textBaseline = this.option.minLabelTextBaseline;
        var _fillStyle = this.option.minLabelColor;
        _x = centerX + tickWidth / 2 + _x;
        _y = minH + _y;
        this.drawText(_text, _x, _y, _font, _fillStyle, _textAlign, _textBaseline, 0);
      }

      if (this.option.showMaxLabel) {
        var _text2 = this.option.max;

        var _font2 = this.getFZ(tickWidth);

        maxH = this.option.padding[0];
        var _textAlign2 = this.option.maxLabelTextAlign;
        var _textBaseline2 = this.option.maxLabelTextBaseline;

        var _this$option$maxLabel = _slicedToArray(this.option.maxLabelOffset, 2),
            _x2 = _this$option$maxLabel[0],
            _y2 = _this$option$maxLabel[1];

        var _fillStyle2 = this.option.maxLabelColor;
        _x2 = centerX + tickWidth / 2 + _x2;
        _y2 = maxH + _y2;
        this.drawText(_text2, _x2, _y2, _font2, _fillStyle2, _textAlign2, _textBaseline2, 0);
      }
    }
  }, {
    key: "drawHorizontal",
    value: function drawHorizontal(val) {
      // background;
      this.ctx.clearRect(0, 0, this.size.w, this.size.h);
      var centerY = this.size.h / 2;
      var maxL = this.size.w - this.option.padding[1];
      var minL = this.option.padding[1];
      var tickWidth = this.option.tickWidthPercent * this.size.h;

      if (tickWidth < this.option.minTickWidth) {
        tickWidth = this.option.minTickWidth;
      }

      if (tickWidth > this.option.maxTickWidth) {
        tickWidth = this.option.maxTickWidth;
      }

      var tickH = tickWidth / this.option.tickRatio;
      var tickGutter = tickH * this.option.BlankTickRatio;
      this.ctx.beginPath();

      while (maxL > minL) {
        this.ctx.moveTo(minL, centerY - tickWidth / 2);
        this.ctx.lineTo(minL, centerY + tickWidth / 2);
        minL = minL + tickH + tickGutter;
      }

      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.option.backgroundColor; // this.ctx.closePath();

      this.ctx.stroke(); // fore

      minL = this.option.padding[1];
      var minLl = this.option.padding[1];
      var len = maxL - minL;
      maxL = minL + (maxL - minL) * val / 100;

      while (maxL > minL) {
        this.ctx.beginPath();
        this.ctx.moveTo(minL, centerY - tickWidth / 2);
        this.ctx.lineTo(minL, centerY + tickWidth / 2);
        this.ctx.lineWidth = tickH;
        this.ctx.strokeStyle = this.calcColor((minL - minLl) / len);
        minL = minL + tickH + tickGutter;
        if (minL > maxL) minL = maxL;
        this.ctx.stroke();
      } // this.ctx.closePath();
      // label


      if (this.option.showValue) {
        var text = this.option.value;
        var font = this.getFZ(tickWidth);
        var textAlign = this.option.valueTextAlign;
        var textBaseline = this.option.valueTextBaseline;
        var fillStyle = this.calcColor(val / 100);

        var _this$option$valueOff2 = _slicedToArray(this.option.valueOffset, 2),
            x = _this$option$valueOff2[0],
            y = _this$option$valueOff2[1];

        x = minL + x;
        y = centerY + y;
        var w = tickWidth - 4;
        this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 90, w);
      }

      if (this.option.showMinLabel) {
        var _text3 = this.option.min;

        var _font3 = this.getFZ(tickWidth);

        minL = this.option.padding[1];

        var _this$option$minLabel2 = _slicedToArray(this.option.minLabelOffset, 2),
            _x3 = _this$option$minLabel2[0],
            _y3 = _this$option$minLabel2[1];

        var _textAlign3 = this.option.minLabelTextAlign;
        var _textBaseline3 = this.option.minLabelTextBaseline;
        var _fillStyle3 = this.option.minLabelColor;
        _x3 = minL + _x3;
        _y3 = centerY + tickWidth / 2 + _y3;
        this.drawText(_text3, _x3, _y3, _font3, _fillStyle3, _textAlign3, _textBaseline3, 0);
      }

      if (this.option.showMaxLabel) {
        var _text4 = this.option.max;

        var _font4 = this.getFZ(tickWidth);

        maxL = this.size.w - this.option.padding[1];
        var _textAlign4 = this.option.maxLabelTextAlign;
        var _textBaseline4 = this.option.maxLabelTextBaseline;
        var _fillStyle4 = this.option.maxLabelColor;

        var _this$option$maxLabel2 = _slicedToArray(this.option.maxLabelOffset, 2),
            _x4 = _this$option$maxLabel2[0],
            _y4 = _this$option$maxLabel2[1];

        _x4 = maxL + _x4;
        _y4 = centerY + tickWidth / 2 + _y4;
        this.drawText(_text4, _x4, _y4, _font4, _fillStyle4, _textAlign4, _textBaseline4, 0);
      }
    }
  }, {
    key: "calcArgPoint",
    value: function calcArgPoint(x, y, arg, r, R) {
      var xr = Math.cos(arg) * r + x;
      var yr = Math.sin(arg) * r + y;
      var xR = Math.cos(arg) * R + x;
      var yR = Math.sin(arg) * R + y;
      return [[xr, yr], [xR, yR]];
    }
  }, {
    key: "correctArgAndGutterArg",
    value: function correctArgAndGutterArg(arg, gutterArg, argLen) {
      var num = Math.ceil(argLen / (arg + gutterArg));
      var per = argLen / num;
      arg = per * arg / (arg + gutterArg);
      return [arg, per - arg];
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(val) {
      // background
      this.ctx.clearRect(0, 0, this.size.w, this.size.h);
      var centerX = this.size.w / 2;
      var centerY = this.size.h / 2;
      var maxR = Math.min(this.size.w / 2 - this.option.padding[0], this.size.h / 2 - this.option.padding[0]);
      var tickWidth = maxR * this.option.tickWidthPercent;

      if (tickWidth < this.option.minTickWidth) {
        tickWidth = this.option.minTickWidth;
      }

      if (tickWidth > this.option.maxTickWidth) {
        tickWidth = this.option.maxTickWidth;
      }

      var minR = maxR - tickWidth;
      minR = minR > 0 ? minR : 0.1;
      var tickH = tickWidth / this.option.tickRatio;
      var tickArg = tickH / minR;
      var tickGutterArg = tickArg * this.option.BlankTickRatio;
      var _this$option3 = this.option,
          startArg = _this$option3.startArg,
          endArg = _this$option3.endArg;
      var argLen = endArg - startArg;

      var _this$correctArgAndGu = this.correctArgAndGutterArg(tickArg, tickGutterArg, argLen);

      var _this$correctArgAndGu2 = _slicedToArray(_this$correctArgAndGu, 2);

      tickArg = _this$correctArgAndGu2[0];
      tickGutterArg = _this$correctArgAndGu2[1];
      this.ctx.beginPath();

      while (startArg < endArg) {
        var _this$ctx, _this$ctx2;

        var _this$calcArgPoint = this.calcArgPoint(centerX, centerY, startArg, minR, maxR),
            _this$calcArgPoint2 = _slicedToArray(_this$calcArgPoint, 2),
            p1 = _this$calcArgPoint2[0],
            p2 = _this$calcArgPoint2[1];

        (_this$ctx = this.ctx).moveTo.apply(_this$ctx, _toConsumableArray(p1));

        (_this$ctx2 = this.ctx).lineTo.apply(_this$ctx2, _toConsumableArray(p2));

        startArg = startArg + tickArg + tickGutterArg;
        if (startArg > endArg) startArg = endArg;
      }

      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.option.backgroundColor;
      this.ctx.stroke(); // fore

      var minArg = this.option.startArg;
      startArg = this.option.startArg;
      endArg = argLen * val / 100 + startArg;

      while (endArg > startArg) {
        var _this$ctx3, _this$ctx4;

        var _this$calcArgPoint3 = this.calcArgPoint(centerX, centerY, startArg, minR, maxR),
            _this$calcArgPoint4 = _slicedToArray(_this$calcArgPoint3, 2),
            p1 = _this$calcArgPoint4[0],
            p2 = _this$calcArgPoint4[1];

        this.ctx.beginPath();

        (_this$ctx3 = this.ctx).moveTo.apply(_this$ctx3, _toConsumableArray(p1));

        (_this$ctx4 = this.ctx).lineTo.apply(_this$ctx4, _toConsumableArray(p2));

        this.ctx.lineWidth = tickH;
        this.ctx.lineCap = this.option.lineCap;
        this.ctx.strokeStyle = this.calcColor((startArg - minArg) / argLen);
        this.ctx.stroke();
        startArg = startArg + tickArg + tickGutterArg;
        if (startArg > endArg) startArg = endArg;
      } // label


      if (this.option.showValue) {
        var text = this.option.value;
        var font = this.getFZ(minR);
        var textAlign = this.option.valueTextAlign;
        var textBaseline = this.option.valueTextBaseline;
        var fillStyle = this.calcColor(val / 100);

        var _this$option$valueOff3 = _slicedToArray(this.option.valueOffset, 2),
            x = _this$option$valueOff3[0],
            y = _this$option$valueOff3[1];

        x = centerX + x;
        y = centerY + y;
        var w = minR - 4;
        this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0, w);
      }
    }
  }, {
    key: "drawSemiCircle",
    value: function drawSemiCircle(val) {
      // background
      this.ctx.clearRect(0, 0, this.size.w, this.size.h);

      if (this.option.paddingPercent) {
        var _this$option$paddingP = _slicedToArray(this.option.paddingPercent, 2),
            xp = _this$option$paddingP[0],
            yp = _this$option$paddingP[1];

        this.option.padding = [this.size.w * xp, this.size.h * yp];
      }

      var centerX;
      var centerY;
      var maxR;
      var minLabelX = 0;
      var minLabelY = 0;
      var minLabelRotate = 0;
      var maxLabelX = 0;
      var maxLabelY = 0;
      var maxLabelRotate = 0;
      var autoArg = this.option.autoArg;

      switch (this.option.centerPosition) {
        case "left":
          centerX = this.option.padding[0];
          centerY = this.size.h / 2;
          maxR = Math.min(this.size.w - 2 * this.option.padding[0], this.size.h / 2 - this.option.padding[1]);

          if (autoArg) {
            this.option.startArg = -PI / 2;
            this.option.endArg = PI / 2;
          }

          break;

        case "right":
          centerX = this.size.w - this.option.padding[0];
          centerY = this.size.h / 2;
          maxR = Math.min(this.size.w - 2 * this.option.padding[0], this.size.h / 2 - this.option.padding[1]);

          if (autoArg) {
            this.option.startArg = PI / 2;
            this.option.endArg = 3 * PI / 2;
          }

          break;

        case "top":
          centerX = this.size.w / 2;
          centerY = this.option.padding[1];
          maxR = Math.min(this.size.w / 2 - this.option.padding[0], this.size.h - 2 * this.option.padding[1]);

          if (autoArg) {
            this.option.startArg = 0;
            this.option.endArg = PI;
          }

          break;

        case "bottom":
          centerX = this.size.w / 2;
          centerY = this.size.h - this.option.padding[1];
          maxR = Math.min(this.size.w / 2 - this.option.padding[0], this.size.h - 2 * this.option.padding[1]);

          if (autoArg) {
            this.option.startArg = PI;
            this.option.endArg = 2 * PI;
          }

          break;
      }

      var tickWidth = maxR * this.option.tickWidthPercent;

      if (tickWidth < this.option.minTickWidth) {
        tickWidth = this.option.minTickWidth;
      }

      if (tickWidth > this.option.maxTickWidth) {
        tickWidth = this.option.maxTickWidth;
      }

      var minR = maxR - tickWidth;
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

      var tickH = tickWidth / this.option.tickRatio;
      var tickArg = tickH / minR;
      var tickGutterArg = tickArg * this.option.BlankTickRatio;
      var _this$option4 = this.option,
          startArg = _this$option4.startArg,
          endArg = _this$option4.endArg;
      var argLen = endArg - startArg;

      var _this$correctArgAndGu3 = this.correctArgAndGutterArg(tickArg, tickGutterArg, argLen);

      var _this$correctArgAndGu4 = _slicedToArray(_this$correctArgAndGu3, 2);

      tickArg = _this$correctArgAndGu4[0];
      tickGutterArg = _this$correctArgAndGu4[1];
      this.ctx.beginPath();

      while (startArg < endArg) {
        var _this$ctx5, _this$ctx6;

        var _this$calcArgPoint5 = this.calcArgPoint(centerX, centerY, startArg, minR, maxR),
            _this$calcArgPoint6 = _slicedToArray(_this$calcArgPoint5, 2),
            p1 = _this$calcArgPoint6[0],
            p2 = _this$calcArgPoint6[1];

        (_this$ctx5 = this.ctx).moveTo.apply(_this$ctx5, _toConsumableArray(p1));

        (_this$ctx6 = this.ctx).lineTo.apply(_this$ctx6, _toConsumableArray(p2));

        startArg = startArg + tickArg + tickGutterArg;
        if (startArg > endArg) startArg = endArg;
      }

      this.ctx.lineWidth = tickH;
      this.ctx.lineCap = this.option.lineCap;
      this.ctx.strokeStyle = this.option.backgroundColor;
      this.ctx.stroke(); // fore

      var minArg = this.option.startArg;
      startArg = this.option.startArg;
      endArg = argLen * val / 100 + startArg;

      while (endArg > startArg) {
        var _this$ctx7, _this$ctx8;

        var _this$calcArgPoint7 = this.calcArgPoint(centerX, centerY, startArg, minR, maxR),
            _this$calcArgPoint8 = _slicedToArray(_this$calcArgPoint7, 2),
            p1 = _this$calcArgPoint8[0],
            p2 = _this$calcArgPoint8[1];

        this.ctx.beginPath();

        (_this$ctx7 = this.ctx).moveTo.apply(_this$ctx7, _toConsumableArray(p1));

        (_this$ctx8 = this.ctx).lineTo.apply(_this$ctx8, _toConsumableArray(p2));

        this.ctx.lineWidth = tickH;
        this.ctx.lineCap = this.option.lineCap;
        this.ctx.strokeStyle = this.calcColor((startArg - minArg) / argLen);
        this.ctx.stroke();
        startArg = startArg + tickArg + tickGutterArg;
        if (startArg > endArg) startArg = endArg;
      } // label


      if (this.option.showValue) {
        var text = this.option.value;
        var font = this.getFZ(minR);
        var textAlign = this.option.valueTextAlign;
        var textBaseline = this.option.valueTextBaseline;
        var fillStyle = this.calcColor(val / 100);

        var _this$option$valueOff4 = _slicedToArray(this.option.valueOffset, 2),
            x = _this$option$valueOff4[0],
            y = _this$option$valueOff4[1];

        x = centerX + x;
        y = centerY + y;
        var w = minR - 4;
        this.drawText(text, x, y, font, fillStyle, textAlign, textBaseline, 0, w);
      }

      if (this.option.showMinLabel) {
        var _text5 = this.option.min;

        var _font5 = this.getFZ(tickWidth);

        var _textAlign5 = this.option.minLabelTextAlign;
        var _textBaseline5 = this.option.minLabelTextBaseline;
        var _fillStyle5 = this.option.minLabelColor;

        var _this$option$minLabel3 = _slicedToArray(this.option.minLabelOffset, 2),
            _x5 = _this$option$minLabel3[0],
            _y5 = _this$option$minLabel3[1];

        _x5 = minLabelX + tickWidth / 2 + _x5;
        _y5 = minLabelY + _y5;
        this.drawText(_text5, _x5, _y5, _font5, _fillStyle5, _textAlign5, _textBaseline5, minLabelRotate);
      }

      if (this.option.showMaxLabel) {
        var _text6 = this.option.max;

        var _font6 = this.getFZ(tickWidth);

        var _textAlign6 = this.option.maxLabelTextAlign;
        var _textBaseline6 = this.option.maxLabelTextBaseline;

        var _this$option$maxLabel3 = _slicedToArray(this.option.maxLabelOffset, 2),
            _x6 = _this$option$maxLabel3[0],
            _y6 = _this$option$maxLabel3[1];

        var _fillStyle6 = this.option.maxLabelColor;
        _x6 = maxLabelX + tickWidth / 2 + _x6;
        _y6 = maxLabelY + _y6;
        this.drawText(_text6, _x6, _y6, _font6, _fillStyle6, _textAlign6, _textBaseline6, maxLabelRotate);
      } //

    }
  }]);

  return DigitalGauge;
}();

exports.DigitalGauge = DigitalGauge;