## t-digital-gauge 说明

### 安装

> npm install t-digital-gauge -S

### 使用

```
      import { Knob, Swtich, DigitalGauge } from './index'
      let knobBOX = document.getElementById('knob')
      let swtichBOX = document.getElementById('swtich')
      let digitalgaigeBOX = document.getElementById('digitalgaige')

      let knob = new Knob(knobBOX)
      let swtich = new Swtich(swtichBOX)
      let digitalgaige = new DigitalGauge(digitalgaigeBOX)

      setInterval(() => {
        digitalgaige.value = Math.random() * 100
      }, 2000)
```

### 补充说明

> 如何使用报错，请拷贝 src 下的 digitalGauge 到项目中，通过 import 直接导入

### 配置项（option）

| 参数 | 说明 | 备注 |

### demo

![demo](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/1.png)
![demo](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/2.png)
