## t-digital-gauge 说明

### 安装

> npm install t-digital-gauge -S

### 使用

```
  import { DigitalGauge } from "t-digital-gauge";
  let gauge = new DigitalGauge(dom, [option]);
    dom  方式图标的dom元素，可以是div 等等
    option 配置项
```

### 补充说明

> 这个库刚写完，使用 ES6 进行编写，发布的是源码包，还未经过编译成 ES5 语法
> 所以使用的时候可以直接拷贝 src 下的 digitalGauge.js

### 配置项（option）

| 参数              |        说明        |                                                                                                                                                                                               备注 |
| ----------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| type              |      图表类型      |                                                                                                                                                           vertical/ horizontal /circle/semi-circle |
| value             |         值         |                                                                                                                                                                                                    |
| min               |       最小值       |                                                                                                                                                                                             默认 0 |
| max               |       最大值       |                                                                                                                                                                                           默认 100 |
| tickWidthPercent  |   tick 的百分比    |                                                                                                                                                                                           默认 0.3 |
| minTickWidth      |   tick 的最小 px   |                                                                                                                                                                                            默认 20 |
| maxTickWidth      |   tick 的最大 px   |                                                                                                                                                                                            默认 60 |
| lineCap           | canvas 的 lineCap  |                                                                                                                                                                                          默认 butt |
| backgroundColor   | 图的无值部分的颜色 |                                                                                                                                                                                          默认 #eee |
| foreColor         |       前景色       |                                                                                                                                                               colorType 为 fixed 生效 默认 #00ff00 |
| tickMinColor      |  值为 0 的安全色   |                                                                                                                                                   默认 rgba(0,255,0,1) colorType 为 gradual 有效， |
| tickMaxColor      |   最大值的警告色   |                                                                                                                                                   默认 rgba(255,0,0,1) colorType 为 gradual 有效， |
| colorType         |      颜色方案      |                                                                                                                      fixed 固定 foreColor stepSingle 阶梯单色 stepMultiple 阶梯多色 gradual 渐变色 |
| showValue         |   是否显示 value   |                                                                                                                                                                                          默认 true |
| showMinLabel      | 是否显示 minLabel  |                                                                                                                                                                                          默认 true |
| showMaxLabel      | 是否显示 maxLabel  |                                                                                                                                                                                          默认 true |
| minLabelColor     |  minLabel 的颜色   |                                                                                                                                                                                          默认 #ddd |
| maxLabelColor     |  maxLabel 的颜色   |                                                                                                                                                                                          默认 #ddd |
| stepColors        |      阶梯颜色      | 默认 [0.95, "#ff031b"],[0.9, "#ff4828"],[0.8, "#ff710a"],[0.7, "#ffad02"],[0.6, "#ffdb00"],[0.5, "#f1f502"], [0.4, "#b1eb05"], [0.3, "#81eb0a"], [0.2, "#38d912"],[0.1, "#04cc17"], [0, "#02b013"] |
| animation         |  是否开启过渡动画  |                                                                                                                                                                                          默认 true |
| animationDuration |      过渡时间      |                                                                                                                                                                                           默认 500 |

### 以下参数在不同的 type 下有不同的默认值

| 参数                 |                说明                 |                     备注 |
| -------------------- | :---------------------------------: | -----------------------: |
| minLabelOffset       |           minLabel 的偏移           |                    [x,y] |
| maxLabelOffset       |          mmaxLabel 的偏移           |                    [x,y] |
| padding              |        图的 gauge 部分的边界        |                    [x,y] |
| valueOffset          |            value 的偏移             |                    [x,y] |
| valueTextAlign       |          value 的对齐方式           |      canvas 的 textAlign |
| minLabelTextAlign    |         minLabel 的对齐方式         |     canvas 的 textAlign0 |
| maxLabelTextAlign    |         maxLabel 的对齐方式         |      canvas 的 textAlign |
| valueTextBaseline    |        value 的垂直对齐方式         |                          |
| minLabelTextBaseline |       minLabel 的垂直对齐方式       |                          |
| maxLabelTextBaseline |       maxLabel 的垂直对齐方式       |                          |
| tickRatio            |            tick 的宽高比            |                  默认 10 |
| BlankTickRatio       |           tick 与空白的比           |                   默认 1 |
| startArg             |              起始角度               |                  Math.PI |
| endArg               |              结束角度               |               2\*Math.PI |
| centerPosition       |             中心点方位              | type 为 semi-circle 有效 |
| autoArg              | 自动计算 padding label 的对齐方式等 | type 为 semi-circle 有效 |

### 实例方法

| 方法      |       参数       |                                                         说明 |
| --------- | :--------------: | -----------------------------------------------------------: |
| setOption | option forceLoad | option 用于覆盖配置 forceLoad 为 true 会重新生成 canvas 节点 |

| setValue | value noAnimation | value 值 noAnimation 强制不适用动画 |
| resize | [size] | 重新计算尺寸,不传会自动根据 dom 计算,传入则应包含 w（宽） h（高） |

### 工具函数

| 函数           |        参数        |                                                           说明 |
| -------------- | :----------------: | -------------------------------------------------------------: |
| valToColormeta | val, max, min, isA | 通过当前值的比例（比如 0.3），计算 min 和 max 中间对应比例的值 |
| getRGBA        |       color        |                       通过正则的方式取出颜色字符串中的 r,g,b,a |

### demo

| 图片           |        option        |   
| -------------- | :----------------: | -------------------------------------------------------------: |
| valToColormeta | val, max, min, isA | 通过当前值的比例（比如 0.3），计算 min 和 max 中间对应比例的值 |

