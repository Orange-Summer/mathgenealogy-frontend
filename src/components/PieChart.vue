<template>
  <div class="chartContainer"></div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue';
import { Chart } from '@antv/g2';

const props = defineProps(['data', 'id', 'value', 'index']);

let chart;
// eslint-disable-next-line vue/no-setup-props-destructure
const data = props.data;
// eslint-disable-next-line vue/no-setup-props-destructure
const id = props.id;
// eslint-disable-next-line vue/no-setup-props-destructure
const value = props.value;
// eslint-disable-next-line vue/no-setup-props-destructure
const index = props.index;

onMounted(() => {
  // console.log(props.data);
  createChart(data);
  watchEffect(() => {
    chart.changeData(props.data);
  });
});

function createChart(data) {
  const container = document.getElementsByClassName('chartContainer')[index];
  // 初始化图表实例
  chart = new Chart({
    container: container,
    theme: 'classic',
    width: 1150,
    height: 600
  });

  chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 1 });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .transform({ type: 'stackY' })
    .encode('y', value)
    .encode('color', id)
    .scale('color', {
      range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb']
    })
    .label({
      text: value,
      style: {
        fontWeight: 'bold',
        offset: 14
      }
    })
    .label({
      text: id,
      layout: {
        type: 'overlap'
      },
      position: 'spider',
      connectorDistance: 0,
      style: {
        fontWeight: 'bold',
        textBaseline: 'bottom',
        dy: -4
      }
    })
    .style('radius', 4)
    .style('stroke', '#fff')
    .style('lineWidth', 2)
    .animate('enter', { type: 'waveIn' })
    .legend(false);

  // 渲染可视化
  chart.render();
}
</script>

<style scoped></style>