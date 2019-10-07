<template>
  <div class="gauge-box">
    <div class="digital-gauge" ref="content"></div>
  </div>
</template>

<script>
import { DigitalGauge } from "./digitalGauge";
export default {
  name: "",
  data() {
    return {
      gauge: null
    };
  },
  mounted() {
    let option = {
      type: "semi-circle",
      // colorType: "stepSingle"
      colorType: "stepMultiple",
      centerPosition: "bottom",
      startArg: 0,
      endArg: Math.PI
      // colorType: "gradual"
      // value: 10
      // min: 900,
      // max: 1500,
      // value: 1300
    };
    this.gauge = new DigitalGauge(this.$refs.content, option);
    window.gauge = this.gauge;
    window.addEventListener("resize", () => {
      this.gauge.resize();
    });
  }
};
</script>

<style lang="less" scoped>
.gauge-box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.digital-gauge {
  width: 80%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: 80%;
  background-color: rgb(255, 255, 255);
}
</style>