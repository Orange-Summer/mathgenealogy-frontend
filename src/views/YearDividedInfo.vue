<template>
  <el-row> 年份范围</el-row>
  <el-row>
    <el-col :span="3">
      <el-input-number v-model="yearRange.start" />
    </el-col>
    <el-col :span="3" :offset="1">
      <el-input-number v-model="yearRange.end" />
    </el-col>
    <el-col :span="2" :offset="1">
      <el-button type="primary" :loading="loading" @click="updataData()">确认</el-button>
    </el-col>
  </el-row>
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
import { onMounted, reactive, ref } from 'vue';
import { getYearClassificationCount, getYearCountryCount } from '@/api/year';
import { ElMessage } from 'element-plus';
import PieChart from '@/components/PieChart.vue';

const paneData = reactive([
  {
    label: '各国数学家数量',
    data: [],
    id: 'country',
    value: 'num',
    show: false
  },
  {
    label: '各学科数学家数量',
    data: [],
    id: 'classification',
    value: 'num',
    show: false
  }
]);

const yearRange = reactive({
  start: 1700,
  end: 1750
});

function loadYearCountryData(start: number, end: number) {
  getYearCountryCount({ start, end }).then((res) => {
    console.log(res);
    if (res.code == 1000) {
      paneData[0].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[0].show = true;
  });
}

function loadYearClassificationData(start: number, end: number) {
  getYearClassificationCount({ start, end }).then((res) => {
    if (res.code == 1000) {
      paneData[1].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[1].show = true;
  });
}

onMounted(() => {
  loadYearCountryData(1700, 1750);
  loadYearClassificationData(1700, 1750);
});

const loading = ref(false);

function updataData() {
  loading.value = true;
  loadYearCountryData(yearRange.start, yearRange.end);
  loadYearClassificationData(yearRange.start, yearRange.end);
  loading.value = false;
}
</script>

<style scoped></style>
