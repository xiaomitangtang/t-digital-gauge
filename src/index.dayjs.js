import Knob from './control/knob/index'
import Swtich from './control/swtich/index'
import DigitalGauge from './digitalgauge/digitalgauge.dayjs'
if (window) {
  window.Knob = Knob
  window.Swtich = Swtich
  window.DigitalGauge = DigitalGauge
}
export {
  Knob, Swtich, DigitalGauge
}