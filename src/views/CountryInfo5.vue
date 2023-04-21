<template>
  <el-row> 筛选条件</el-row>
  <el-row>
    <el-form :label-position="'right'">
      <el-form-item label="国家">
        <el-select v-model="form.country" filterable placeholder="Select">
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
      <el-tab-pane v-for="(item, index) in paneData" :key="index" :label="item.label" lazy>
        <ArcMap
          :data="item.data"
          :x="item.x"
          :y="item.y"
          :x1="item.x1"
          :y1="item.y1"
          :index="item.index"
          v-if="item.show"
        ></ArcMap>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup lang="ts">
import { useSelectStore } from '@/stores/counter';
import { onMounted, reactive, watch } from 'vue';
import { getKnowledgeFlowIn } from '@/api/country';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import ArcMap from '@/components/ArcMap.vue';

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

const countryList = store.countryList;

const paneData = reactive([
  {
    label: '一个国家知识流入图',
    data: [],
    x: 'fromLon',
    y: 'fromLat',
    x1: 'toLon',
    y1: 'toLat',
    index: 0,
    show: false
  }
]);

function loadKnowledgeFlowIn(country: string, start: number, end: number) {
  getKnowledgeFlowIn({
    country: country,
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

function init() {
  form.country = store.country;
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  loadKnowledgeFlowIn(form.country, parseInt(form.yearRange.start), parseInt(form.yearRange.end));
}

onMounted(() => {
  init();
});

function updateData() {
  loadKnowledgeFlowIn(form.country, parseInt(form.yearRange.start), parseInt(form.yearRange.end));
  store.changeCountry(form.country);
  store.changeYearRange(form.yearRange.start, form.yearRange.end);
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
