<template>
  <FilterComponent
    :multiple-select="false"
    :showClassification="false"
    v-model:country="form.country"
    v-model:yearStart="form.yearRange.start"
    v-model:year-end="form.yearRange.end"
    @updateData="updateData"
  ></FilterComponent>
  <el-row>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane v-for="(item, index) in paneData" :key="index" :label="item.label" lazy>
        <ArcMap
          :data="item.data"
          :x="item.x"
          :y="item.y"
          :x1="item.x1"
          :y1="item.y1"
          :index="item.index"
          v-if="item.show"
        ></ArcMap>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import { useSelectStore } from '@/stores/filter';
import { onMounted, reactive, watch } from 'vue';
import { getKnowledgeFlowIn } from '@/api/country';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import ArcMap from '@/components/graph/ArcMap.vue';
import FilterComponent from '@/components/FilterComponent.vue';

const store = useSelectStore();

interface formType {
  country: string;
  yearRange: {
    start: string;
    end: string;
  };
}

const form: formType = reactive({
  country: '',
  yearRange: {
    start: '0',
    end: '0'
  }
});

const paneData = reactive([
  {
    label: '一个国家知识流入图',
    data: [],
    x: 'fromLon',
    y: 'fromLat',
    x1: 'toLon',
    y1: 'toLat',
    index: 0,
    show: false
  }
]);

function loadKnowledgeFlowIn(country: string, start: number, end: number) {
  getKnowledgeFlowIn({
    country: country,
    start: start,
    end: end
  }).then((res) => {
    if (res.code == 1000) {
      paneData[0].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[0].show = true;
  });
}

function init() {
  form.country = store.country;
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  loadKnowledgeFlowIn(form.country, parseInt(form.yearRange.start), parseInt(form.yearRange.end));
}

onMounted(() => {
  init();
});

function updateData() {
  loadKnowledgeFlowIn(form.country, parseInt(form.yearRange.start), parseInt(form.yearRange.end));
  store.changeCountry(form.country);
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
}

const { country } = storeToRefs(store);

watch(
  () => [country, store.yearRange],
  () => {
    init();
  }
);
</script>

<style scoped></style>
