## t-digital-gauge 说明

- 个人作品，纯 js 编写 canvas 实现
- 已经修复不可正常使用的问题
- 如果好用，点个赞哟

```
 t-digital-gauge2对上一个版本进行了完全重写
 上一代版本是临时版本，建议废弃
 绘制的重原理上进行了重新实现
 支持更多参数


```

### 安装

> npm install t-digital-gauge2 -S

### 使用

```
      import { Knob, Swtich, DigitalGauge } from 't-digital-gauge2'
      let knobBOX = document.getElementById('knob')
      let swtichBOX = document.getElementById('swtich')
      let digitalgaigeBOX = document.getElementById('digitalgaige')

      let knob = new Knob(knobBOX)
      let swtich = new Swtich(swtichBOX)
      let digitalgaige = new DigitalGauge(digitalgaigeBOX)

      setInterval(() => {
        digitalgaige.value = Math.random() * 100
      }, 2000)


      三个组件均提供 resize   destroy  方法，用于重新计算尺寸以及卸载组件
```

### dist

```
  删除对moment  dayjs的依赖

```

### 配置项（option）

#### knob

| 参数        | 说明             | 备注 |
| :---------- | :--------------- | :--- |
| minValue    | 最小值           |      |
| maxValue    | 最大值           |      |
| title       | 标题             |      |
| bgColor     | 背景色           |      |
| tickCellArg | 线条单位角度     |      |
| value       | 指示的值         |      |
| onChange    | 控制变化回调函数 |      |
| decimals    | 精度             |      |
| errorMsg    | 提示问题         |      |

#### swtich

| 参数            | 说明             | 备注 |
| :-------------- | :--------------- | :--- |
| showOnOffLabels | 最小值           |      |
| onChange        | 控制变化回调函数 |      |
| errorMsg        | 提示问题         |      |

#### digital-gauge

| 参数              | 说明                            | 备注                                                     |
| :---------------- | :------------------------------ | :------------------------------------------------------- |
| minValue          | 最小值                          |                                                          |
| maxValue          | 最大值                          |                                                          |
| title             | 标题                            |                                                          |
| time              | 时间                            |                                                          |
| unitTitle         | 单位标题                        | 不显示时间时有效                                         |
| value             | 展示的数值                      |
| valueSuffix       | 数值的后缀                      |                                                          |
| showMinMax        | 是否展示极值                    | donut 无效                                               |
| showTitle         | 是否展示标题                    |                                                          |
| showTimestamp     | 是否展示时间                    |                                                          |
| showUnitTitle     | 是否展示单位标题                | 展示时间时强制不展示                                     |
| gaugeType         | gauge 的类型                    | horizontalBar：水平 verticalBar：竖直 donut 圆 arc：半圆 |
| gaugeWidthScale   | canvas 笔画相对大小             | 1 为宽或高的 1/3                                         |
| titleFont         | 标题样式                        |                                                          |
| labelFont         | label 样式                      |                                                          |
| valueFont         | value 样式                      |                                                          |
| minMaxFont        | 极值样式                        |                                                          |
| levelColors       | 梯度色值                        |                                                          |
| animation         | 动画                            |                                                          |
| animationDuration | 动画持续时间                    |                                                          |
| roundedLineCap    | canvas 笔帽                     |                                                          |
| stripBasic        | 基本间隔                        | 2px 或 2°                                                |
| dashThickness     | 条形间隔                        |                                                          |
| gaugeColor        | 背景色                          |                                                          |
| defaultColor      | 不设置 levelColors 时的默认颜色 |                                                          |

### demo

![水平垂直](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/bar.png?raw=true)

![间隔](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/arcsplit.png?raw=true)

![无间隔](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/arc.png?raw=true)

![控制](https://github.com/xiaomitangtang/t-digital-gauge/blob/master/img/control.png?raw=true)
