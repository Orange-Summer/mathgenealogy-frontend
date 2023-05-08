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
import { onMounted, reactive, watch } from 'vue';
import { getSingleCountryClassification } from '@/api/country';
import PieChart from '@/components/graph/PieChart.vue';
import { ElMessage } from 'element-plus';
import { useSelectStore } from '@/stores/filter';
import { storeToRefs } from 'pinia';
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
    label: '一个国家各领域数学家数量总计',
    data: [],
    id: 'classification',
    value: 'num',
    show: false
  }
]);

function loadSingleCountryClassification(country: string, start: number, end: number) {
  getSingleCountryClassification({
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
  loadSingleCountryClassification(
    form.country,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
}

onMounted(() => {
  init();
});

function updateData() {
  loadSingleCountryClassification(
    form.country,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
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
