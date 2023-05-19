<template>
  <div class="lineChartContainer"></div>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, watchEffect } from 'vue';

const props = defineProps(['data', 'id', 'x', 'y', 'index']);

let chart: Chart;
// eslint-disable-next-line vue/no-setup-props-destructure
let data = props.data;
// eslint-disable-next-line vue/no-setup-props-destructure
const id = props.id;
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
    chart.render();
  });
});

function createChart(data: any) {
  const container = document.getElementsByClassName('lineChartContainer')[index] as HTMLElement;
  chart = new Chart({
    container: container,
    theme: 'classic',
    width: 1150,
    height: 600,
    paddingLeft: 60,
    paddingRight: 100
  });

  chart
    .line()
    .data(data)
    .encode('x', x)
    .encode('y', y)
    .encode('series', id)
    .encode('color', id)
    .style('lineWidth', 2)
    .label({
      text: id,
      selector: 'first',
      style: {
        fontSize: 13
      }
    });

  chart.interaction('tooltip', { filter: (d: any, i: number) => i < 10 });

  chart.render();
}
</script>

<style scoped></style>
