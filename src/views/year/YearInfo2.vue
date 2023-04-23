<template>
  <FilterComponent
    :showCountry="false"
    :showClassification="false"
    v-model:yearStart="form.yearRange.start"
    v-model:year-end="form.yearRange.end"
    @updateData="updateData"
  ></FilterComponent>
  <el-row>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane v-for="(item, index) in paneData" :key="index" :label="item.label">
        <LineChart
          :data="item.data"
          :id="item.id"
          :x="item.x"
          :y="item.y"
          :index="index"
          v-if="item.show"
        >
        </LineChart>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import LineChart from '@/components/LineChart.vue';
import { onMounted, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getClassificationCountWithYear } from '@/api/year';
import { useSelectStore } from '@/stores/filter';
import FilterComponent from "@/components/FilterComponent.vue";

const store = useSelectStore();

interface formType {
  yearRange: {
    start: string;
    end: string;
  };
}

const form: formType = reactive({
  yearRange: {
    start: '0',
    end: '0'
  }
});

function init() {
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  loadClassificationCountWithYear(parseInt(form.yearRange.start), parseInt(form.yearRange.end));
}

onMounted(() => {
  init();
});

function updateData() {
  loadClassificationCountWithYear(parseInt(form.yearRange.start), parseInt(form.yearRange.end));
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
}

watch(store.yearRange, () => {
  init();
});

const paneData = reactive([
  {
    label: '各学科数学家数量变化比较',
    data: [],
    id: 'classification',
    x: 'year',
    y: 'num',
    show: false
  }
]);

function loadClassificationCountWithYear(start: number, end: number) {
  getClassificationCountWithYear({
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
</script>

<style scoped></style>