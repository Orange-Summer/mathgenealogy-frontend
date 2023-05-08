<template>
  <div class="chartContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { Chart } from '@antv/g2';

const props = defineProps(['data', 'x', 'y', 'index']);

let chart: Chart;
// eslint-disable-next-line vue/no-setup-props-destructure
let data = props.data;
// eslint-disable-next-line vue/no-setup-props-destructure
const x = props.x;
// eslint-disable-next-line vue/no-setup-props-destructure
const y = props.y;
// eslint-disable-next-line vue/no-setup-props-destructure
const index = props.index;

onMounted(() => {
  // console.log(props.data);
  createChart(data);
  watchEffect(() => {
    data = props.data;
    chart.changeData(data);
  });
});

function createChart(data: any) {
  const container = document.getElementsByClassName('chartContainer')[index] as HTMLElement;
  // 初始化图表实例
  chart = new Chart({
    container: container,
    theme: 'classic',
    width: 1150,
    height: 600
  });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', x) // 编码 x 通道
    .encode('y', y); // 编码 y 通道

  // 渲染可视化
  chart.render();
}
</script>

<style scoped></style>
