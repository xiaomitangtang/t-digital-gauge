export const render = (tag = 'div', option = {}, parent) => {
  if (isUndef(tag)) return;
  const { className, text, style, methods, ...attrs } = option;
  const dom = typeof tag === 'string' ? document.createElement(tag) : tag;
  isDef(className) && (dom.classList = className);
  isDef(text) && setText(dom, text);
  isDef(style) && setStyle(dom, style);
  isDef(methods) && bindMethods(dom, methods);
  isDef(attrs) && setAttr(dom, attrs);
  isDef(parent) && parent.appendChild(dom);
  return dom;
};
export const setText = (dom, text) => {
  if (isDef(text)) {
    dom.innerText = text;
  }
};
export const setAttr = (dom, attrs = EmptyObj) => {
  Object.keys(attrs).forEach(key => {
    if (isDef(attrs[key])) {
      // dom[key] = attrs[key];
      dom.setAttribute(key, attrs[key]);
    }
  });
};
export const setStyle = (dom, style = EmptyObj) => {
  Object.keys(style).forEach(key => {
    if (isDef(style[key])) {
      dom.style[key] = style[key];
    }
  });
};
export const bindMethods = (dom, methods = EmptyObj) => {
  Object.keys(methods).forEach(methodsName => {
    dom.addEventListener(methodsName, methods[methodsName]);
  });
};

export const unbindMethods = (dom, methods = EmptyObj) => {
  Object.keys(methods).forEach(methodsName => {
    dom.removeEventListener(methodsName, methods[methodsName]);
  });
};

export const getPosition = (el, x = 0, y = 0) => {
  if (el.offsetParent) {
    return getPosition(el.offsetParent, el.offsetLeft + x - el.scrollLeft, el.offsetTop + y - el.scrollTop);
  } else {
    return { x, y };
  }
};
export const eventToArg = (e, center) => {
  let x = e.pageX - center.x;
  let y = e.pageY - center.y;
  let arg = (180 * Math.atan2(y, x)) / Math.PI + 180;
  if (arg > 260 && arg < 280) return;
  if (arg < 315 && arg > 280) {
    arg = 315;
  }
  if (arg > 225 && arg < 260) {
    arg = 225;
  }
  return arg;
};
export const valueColor = [
  [95, '#ff0000'],
  [90, '#c02424'],
  [80, '#cb4848'],
  [70, '#ff8c00'],
  [60, '#f49a2c'],
  [50, '#cb9d25'],
  [40, '#d6b359'],
  [30, '#aab566'],
  [20, '#9ab566'],
  [10, '#19b620'],
  [0, '#108315'],
];

export const valueToColor = (val, colors = valueColor) => {
  let innerVal = +val;
  for (let i = 0; i < colors.length; i++) {
    if (innerVal >= colors[i][0]) {
      return colors[i][1];
    }
  }
  return colors[colors.length - 1][1];
};

export const isDef = v => {
  return v !== undefined && v !== null;
};
export const isUndef = v => {
  return v === undefined || v === null;
};
export const EmptyObj = {};

export const noop = () => { };

const fontKeySample = {
  family: {
    fKey: 'fontFamily',
  },
  size: {
    fKey: 'fontSize',
    parse: val => (isNaN(+val) ? val : `${val}px`),
  },
  style: {
    fKey: 'font-style',
  },
  weight: {
    fKey: 'font-weight',
  },
};
export const fontParse = (fontObj = {}) => {
  let newFont = {};
  Object.keys(fontObj).forEach(key => {
    let ts = fontKeySample[key];
    if (!ts) {
      newFont[key] = fontObj[key];
    } else {
      const { fKey, parse } = ts;
      newFont[fKey] = parse ? parse(fontObj[key]) : fontObj[key];
    }
  });
  return newFont;
};

export const numberFixRange = (number, min, max) => {
  return Math.min(Math.max(number, min), max);
};

export const getModuleDefault = module => {
  return module.default ? module.default : module;
};


export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  let date = new Date(timestamp);
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(), // 年
    "y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "m+": (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate().toString(), // 日
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
