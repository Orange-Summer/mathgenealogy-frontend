<template>
  <el-row>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane label="各国数学家数量">
        <ColumnChart
          :data="data.countryCount"
          :x="'country'"
          :y="'num'"
          :index="0"
          v-if="showData.showCountryData"
        ></ColumnChart>
      </el-tab-pane>
      <el-tab-pane label="各学校数学家数量" lazy>
        <ColumnChart
          :data="data.institutionCount"
          :x="'institution'"
          :y="'num'"
          :index="1"
          v-if="showData.showInstitutionData"
        ></ColumnChart>
      </el-tab-pane>
      <el-tab-pane label="各学科数学家数量" lazy>
        <ColumnChart
          :data="data.classificationCount"
          :x="'classification'"
          :y="'num'"
          :index="2"
          v-if="showData.showClassificationData"
        ></ColumnChart>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import { getClassificationCount, getCountryCount, getInstitutionCount } from '@/api/basic';
import { onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import ColumnChart from '@/components/ColumnChart.vue';

const data = reactive({
  countryCount: [],
  institutionCount: [],
  classificationCount: []
});
const showData = reactive({
  showCountryData: false,
  showInstitutionData: false,
  showClassificationData: false
});

function loadCountryData() {
  getCountryCount().then((res) => {
    if (res.code == 1000) {
      data.countryCount = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    showData.showCountryData = true;
  });
}

function loadInstitutionData() {
  getInstitutionCount().then((res) => {
    if (res.code == 1000) {
      data.institutionCount = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    showData.showInstitutionData = true;
  });
}

function loadClassificationData() {
  getClassificationCount().then((res) => {
    if (res.code == 1) {
      data.classificationCount = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    showData.showClassificationData = true;
  });
}

onMounted(() => {
  loadCountryData();
  loadInstitutionData();
  loadClassificationData();
});
</script>

<style scoped></style>
