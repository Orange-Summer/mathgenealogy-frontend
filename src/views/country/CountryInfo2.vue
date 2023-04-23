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
import { getSingleCountryClassificationWithYear } from '@/api/country';
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
    label: '一个国家各学科数学家数量变化',
    data: [],
    id: 'classification',
    x: 'year',
    y: 'num',
    show: false
  }
]);

function loadSingleCountryClassificationWithYear(country: string, start: number, end: number) {
  getSingleCountryClassificationWithYear({
    country: country,
    start: start,
    end: end
  }).then((res) => {
    if (res.code === 1000) {
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
  loadSingleCountryClassificationWithYear(
    form.country,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
}

onMounted(() => {
  init();
});

function updateData() {
  loadSingleCountryClassificationWithYear(
    form.country,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
  store.changeCountry(form.country);
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
  // if (form.countries.length > 1) {
  //
  // } else if (form.countries[0] == 'all') {
  // }
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
