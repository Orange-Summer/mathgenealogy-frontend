<template>
  <div class="sceneContainer"></div>
</template>

<script setup lang="ts">
import { type ILayer, LineLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { onMounted, watchEffect } from 'vue';

const props = defineProps(['data', 'index', 'x', 'y', 'x1', 'y1']);

let layer: ILayer;
// eslint-disable-next-line vue/no-setup-props-destructure
let data = props.data;
// eslint-disable-next-line vue/no-setup-props-destructure
const x = props.x;
// eslint-disable-next-line vue/no-setup-props-destructure
const y = props.y;
// eslint-disable-next-line vue/no-setup-props-destructure
const x1 = props.x1;
// eslint-disable-next-line vue/no-setup-props-destructure
const y1 = props.y1;
// eslint-disable-next-line vue/no-setup-props-destructure
const index = props.index;

const options = {
  parser: {
    type: 'json',
    x: x,
    y: y,
    x1: x1,
    y1: y1
  }
};

onMounted(() => {
  createScene(data);
  watchEffect(() => {
    data = props.data;
    if (layer) {
      layer.setData(data);
    }
  });
});

function createScene(data: any) {
  const container = document.getElementsByClassName('sceneContainer')[index] as HTMLDivElement;
  const scene = new Scene({
    id: container,
    map: new GaodeMap({
      pitch: 60,
      style: 'dark',
      center: [104.34278, 41.12554],
      zoom: 2,
      rotation: 42.3999
    })
  });
  scene.on('loaded', function () {
    layer = new LineLayer({}).source(data, options).size(1).shape('arc3d').color('#FF7C6A').style({
      segmentNumber: 15,
      opacity: 0.8
    });
    scene.addLayer(layer);
  });
}
</script>

<style scoped>
.sceneContainer {
  width: 1150px;
  height: 600px;
}
</style>
