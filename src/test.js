import { Knob, Swtich, DigitalGauge } from './index'
function test() {
  let knobBOX = document.getElementById('knob')
  let swtichBOX = document.getElementById('swtich')
  let digitalgaigeBOX = document.getElementById('digitalgaige')
  // let knob = new Knob(knobBOX)
  // let swtich = new Swtich(swtichBOX)
  const Options = {
    "gaugeType": "donut",
    "minValue": "0",
    "maxValue": "100",
    "value": 10,
    "showValue": true,
    "valueFont": {
      "family": "Roboto", "style": "normal", "weight": "500", "size": 18, "color": "#000000"
    }
  }
  let digitalgaige = new DigitalGauge(digitalgaigeBOX, Options)
  window.digitalgaige = digitalgaige
  // setInterval(() => {
  //   digitalgaige.value = Math.random() * 100
  // }, 2000)
}

setTimeout(() => {
  test()
}, 1000)