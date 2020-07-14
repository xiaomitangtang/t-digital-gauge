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

export const noop = () => {};

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
