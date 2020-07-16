import { Knob, Swtich, DigitalGauge } from './index.dayjs'
let knobBOX = document.getElementById('knob')
let swtichBOX = document.getElementById('swtich')
let digitalgaigeBOX = document.getElementById('digitalgaige')
let knob = new Knob(knobBOX)
let swtich = new Swtich(swtichBOX)
let digitalgaige = new DigitalGauge(digitalgaigeBOX)
setInterval(() => {
  digitalgaige.value = Math.random() * 100
}, 2000)