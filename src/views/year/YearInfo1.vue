<template>
  <FilterComponent
    :multiple-select="true"
    :showClassification="false"
    v-model:countries="form.countries"
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
import { getCountryCountLine } from '@/api/country';
import { ElMessage } from 'element-plus';
import { useSelectStore } from '@/stores/filter';
import FilterComponent from '@/components/FilterComponent.vue';

const store = useSelectStore();

interface formType {
  countries: string[];
  yearRange: {
    start: string;
    end: string;
  };
}

const form: formType = reactive({
  countries: [],
  yearRange: {
    start: '0',
    end: '0'
  }
});

function init() {
  form.countries[0] = 'UnitedStates';
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  loadCountryCountLine(
    form.countries,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
}

onMounted(() => {
  init();
});

function updateData() {
  loadCountryCountLine(
    form.countries,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end)
  );
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
  // if (form.countries.length > 1) {
  //
  // } else if (form.countries[0] == 'all') {
  // }
}

watch(store.yearRange, () => {
  init();
});

const paneData = reactive([
  {
    label: '各国数学家数量变化比较',
    data: [],
    id: 'country',
    x: 'year',
    y: 'num',
    show: false
  }
]);

function loadCountryCountLine(countries: string[], start: number, end: number) {
  getCountryCountLine({
    countries: countries,
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
