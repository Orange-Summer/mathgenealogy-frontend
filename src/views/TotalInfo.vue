<template>
  <el-row>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane v-for="(item, index) in paneData" :key="index" :label="item.label" lazy>
        <ColumnChart
          :data="item.data"
          :x="item.x"
          :y="item.y"
          :index="index"
          v-if="item.show"
        ></ColumnChart>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import { getClassificationCount, getCountryCount, getInstitutionCount } from '@/api/basic';
import { onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import ColumnChart from '@/components/graph/ColumnChart.vue';

const paneData = reactive([
  {
    label: '各国数学家数量',
    data: [],
    x: 'country',
    y: 'num',
    show: false
  },
  {
    label: '各学校数学家数量',
    data: [],
    x: 'institution',
    y: 'num',
    show: false
  },
  {
    label: '各领域数学家数量',
    data: [],
    x: 'classification',
    y: 'num',
    show: false
  }
]);

function loadCountryData() {
  getCountryCount().then((res) => {
    if (res.code == 1000) {
      paneData[0].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[0].show = true;
  });
}

function loadInstitutionData() {
  getInstitutionCount().then((res) => {
    if (res.code == 1000) {
      paneData[1].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[1].show = true;
  });
}

function loadClassificationData() {
  getClassificationCount().then((res) => {
    if (res.code == 1000) {
      paneData[2].data = res.data;
    } else {
      ElMessage.error(res.msg);
    }
    paneData[2].show = true;
  });
}

onMounted(() => {
  loadCountryData();
  loadInstitutionData();
  loadClassificationData();
});
</script>

<style scoped></style>
