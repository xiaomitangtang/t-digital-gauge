import DigitalGauge from './digitalGauge.js'
let dom = document.getElementById('root')
let option = {
  type: 'circle',
  unit: ""
}
let chart = new DigitalGauge(dom, option)
window.chart = chart