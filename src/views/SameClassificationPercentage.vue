<template>
  <el-row>
    <el-table :data="tableData" stripe border table-layout="auto">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="classification" label="领域" width="500"></el-table-column>
      <el-table-column prop="percent" label="比例" :formatter="formatPercentage" sortable></el-table-column>
    </el-table>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSameClassificationPercentage } from '@/api/basic';

interface Percentage {
  classification: string;
  percent: number;
}

const tableData = ref<Percentage[]>([]);

const formatPercentage = (row: Percentage) => {
  return Math.round(row.percent * 10000) / 100 + '%';
};

function loadPercentage() {
  getSameClassificationPercentage().then((res) => {
    tableData.value = res.data;
  });
}

onMounted(() => {
  loadPercentage();
});
</script>

<style scoped></style>
