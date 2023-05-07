<template>
  <el-row>
    <el-table
      :data="tableData"
      stripe
      border
      table-layout="auto"
      :default-sort="{ prop: 'average', order: 'descending' }"
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column prop="num" label="数学家数量" sortable></el-table-column>
      <el-table-column prop="population" label="人口" sortable></el-table-column>
      <el-table-column prop="average" label="人均数学家数量" sortable></el-table-column>
    </el-table>
  </el-row>
</template>

<script setup lang="ts">
import { getAverage } from '@/api/basic';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

interface average {
  country: string;
  num: number;
  population: number;
  average: number;
}

const tableData = ref<average[]>([]);

function loadAverage() {
  getAverage().then((res) => {
    if (res.code == 1000) {
      tableData.value = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
}

onMounted(() => {
  loadAverage();
});
</script>

<style scoped></style>
