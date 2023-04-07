<template>
  <div ref="container"></div>
</template>

<script setup>
import G6 from '@antv/g6';
import { onMounted, ref, watchEffect } from 'vue';

const props = defineProps(['treeData']);
let data;

// 画布实例和挂载容器
let graph;
const container = ref(null);

onMounted(() => {
  // console.log(container.value);
  watchEffect(() => {
    if (props.treeData.id) {
      console.log(props);
      data = JSON.parse(JSON.stringify(props.treeData));
      console.log(data);
      createGraph();
    }
  });
});

//画树图
function createGraph() {
  const width = container.value.scrollWidth;
  const height = container.value.scrollHeight || 500;
  graph = new G6.TreeGraph({
    // 图的  DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
    container: container.value,
    // 指定画布宽度，单位为 'px'
    width: 1150,
    // 指定画布高度，单位为 'px'
    height: 500,
    linkCenter: true,
    // 设置画布的模式
    modes: {
      default: [
        {
          // 只适用于树图，展开或收起子树
          type: 'collapse-expand',
          // onChange：收起或展开的回调函数
          onChange: function onChange(item, collapsed) {
            const data = item.getModel();
            data.collapsed = collapsed;
            return true;
          }
        },
        // 拖拽画布
        'drag-canvas',
        // 缩放画布
        'zoom-canvas'
      ]
    },
    defaultNode: {
      // 节点类型,这里是自定义节点,自己取名
      // type: 'tree-node',
      size: 26,
      // 指定边连入节点的连接点的位置（相对于该节点而言），可以为空
      anchorPoints: [
        [0, 0.5],
        [1, 0.5]
      ]
    },
    defaultEdge: {
      // 指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 'line'
      type: 'cubic-horizontal',
      // 边的样式属性
      style: {
        // 边的颜色
        stroke: '#A3B1BF',
        // 开始箭头
        startArrow: {
          path: G6.Arrow.circle(2, 2), // 内置样式
          fill: '#A3B1BF', // 颜色
          d: 4 // 偏移距离
        },
        // 结束箭头
        endArrow: {
          path: 'M 0,0 L 5,4 L 5,-4 Z', // 自定义样式
          fill: '#A3B1BF',
          d: 3
        }
      }
    },
    // 布局配置项，使用 type 字段指定使用的布局方式
    layout: {
      type: 'mindmap',
      direction: 'H',
      // 节点 id 的回调函数
      getId: function getId(d) {
        return d.id;
      },
      // 判断节点向左还是向右
      getSide: (d) => {
        if (d.data.direction === 1) {
          return 'left';
        } else {
          return 'right';
        }
      },
      // 节点高度的回调函数
      getHeight: function getHeight() {
        return 16;
      },
      // 节点宽度的回调函数
      getWidth: function getWidth() {
        return 16;
      },
      // 节点纵向间距的回调函数
      getVGap: function getVGap() {
        return 10;
      },
      // 节点横向间距的回调函数
      getHGap: function getHGap() {
        return 80;
      }
    },
    // 动画
    animate: true
  });

  let centerX = 0;
  graph.node(function (node) {
    if (node.id === data.id) {
      centerX = node.x;
    }

    if (node.depth === 0) {
      return {
        style: {
          fill: node.depth === 0 ? 'red' : 'bule'
        },
        label: node.name,
        labelCfg: {
          position:
            node.children && node.children.length > 0
              ? 'left'
              : node.x > centerX
              ? 'right'
              : 'left',
          offset: 5
        }
      };
    }

    return {
      label: node.name,
      labelCfg: {
        position:
          node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left',
        offset: 5
      }
    };
  });
  // 初始化的图数据
  graph.data(data);
  // 根据提供的数据渲染视图。
  graph.render();
  // graph.fitView();
  // 平移图到中心将对齐到画布中心，但不缩放
  graph.fitCenter();

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container.value || !container.value.scrollWidth || !container.value.scrollHeight) return;
      graph.changeSize(container.value.scrollWidth, container.value.scrollHeight);
    };
}
</script>

<style scoped></style>
