<template>
  <el-row> 筛选条件</el-row>
  <el-row>
    <el-form :label-position="'right'">
      <el-form-item label="年份范围">
        <el-col :span="6">
          <el-date-picker
            v-model="form.yearRange.start"
            type="year"
            format="YYYY"
            value-format="YYYY"
            label="start year"
            placeholder="start year"
            style="width: 100%"
          />
        </el-col>
        <el-col class="text-center" :span="1" style="text-align: center">-</el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="form.yearRange.end"
            type="year"
            format="YYYY"
            value-format="YYYY"
            label="end year"
            placeholder="end year"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">确认</el-button>
      </el-form-item>
    </el-form>
  </el-row>
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
import { useSelectStore } from '@/stores/counter';

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
