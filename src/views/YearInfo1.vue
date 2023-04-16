<template>
  <el-row> 筛选条件</el-row>
  <el-row>
    <el-form :label-position="'right'">
      <el-form-item label="国家">
        <el-select v-model="form.countries" filterable placeholder="Select" multiple>
          <el-option v-for="item in countryList" :key="item" :value="item" />
        </el-select>
      </el-form-item>
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
import { onMounted, reactive, ref } from 'vue';
import { getAllCountry, getCountryCountLine } from '@/api/country';
import { ElMessage } from 'element-plus';

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

let countryList = ref<Array<string | undefined>>([]);

function loadAllCountry() {
  getAllCountry().then((res) => {
    countryList.value = res.data;
    // countryList.value.unshift('all');
  });
}

function init() {
  form.countries[0] = 'UnitedStates';
  form.yearRange.start = '1900';
  form.yearRange.end = '1950';
  loadAllCountry();
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
  // if (form.countries.length > 1) {
  //
  // } else if (form.countries[0] == 'all') {
  // }
}

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
