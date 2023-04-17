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
