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
      <el-tab-pane v-for="(item, index) in paneData" :key="index" :label="item.label" lazy>
        <PieChart
          :data="item.data"
          :id="item.id"
          :value="item.value"
          :index="index"
          v-if="item.show"
        ></PieChart>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getYearCountryCount } from '@/api/year';
import { ElMessage } from 'element-plus';
import PieChart from '@/components/PieChart.vue';
import { useSelectStore } from '@/stores/filter';
import FilterComponent from '@/components/FilterComponent.vue';

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

const paneData = reactive([
  {
    label: '一个时间段各国数学家数量总计',
    data: [],
    id: 'country',
    value: 'num',
    show: false
  }
]);

function loadYearCountryData(start: number, end: number) {
  getYearCountryCount({ start, end }).then((res) => {
    // console.log(res);
    if (res.code == 1000) {
      paneData[0].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[0].show = true;
  });
}

function init() {
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  loadYearCountryData(parseInt(form.yearRange.start), parseInt(form.yearRange.end));
}

onMounted(() => {
  init();
});

const loading = ref(false);

function updateData() {
  loading.value = true;
  loadYearCountryData(parseInt(form.yearRange.start), parseInt(form.yearRange.end));
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
  loading.value = false;
}

watch(store.yearRange, () => {
  init();
});
</script>

<style scoped></style>
