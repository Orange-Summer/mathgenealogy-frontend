<template>
  <FilterComponent
    :groupSelect="true"
    :multiple-select="true"
    v-model:countries="form.countries"
    v-model:classifications="form.classifications"
    v-model:yearStart="form.yearRange.start"
    v-model:year-end="form.yearRange.end"
    @updateData="updateData"
  >
  </FilterComponent>
  <el-row>
    <el-table :data="tableData" stripe border table-layout="auto">
      <!-- 每一个列，prop为主键，label为文案 -->
      <!-- 索引 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column prop="classification" label="领域"></el-table-column>
      <el-table-column prop="year" label="年份" width="70"></el-table-column>
      <el-table-column prop="descendants" label="后代数量"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handlePerson(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script setup lang="ts">
import FilterComponent from '@/components/FilterComponent.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRanking } from '@/api/basic';
import { ElMessage } from 'element-plus';
import { useSelectStore } from '@/stores/filter';

interface formType {
  countries: string[];
  classifications: string[];
  yearRange: {
    start: string;
    end: string;
  };
  limit: number;
}

const form: formType = reactive({
  countries: [],
  classifications: [],
  yearRange: {
    start: '0',
    end: '0'
  },
  limit: 0
});

interface ranking {
  mid: number;
  name: string;
  descendants: number;
}

const tableData = ref<ranking[]>([]);

// 跳转其他人详情界面
const router = useRouter();

function handlePerson(index: number) {
  const id = tableData.value[index].mid;
  router.push({
    name: 'person',
    params: { id: id }
  });
}

function loadRanking(
  countries: string[],
  classifications: string[],
  start: number,
  end: number,
  limit: number
) {
  getRanking({
    countries: countries,
    classifications: classifications,
    start: start,
    end: end,
    limit: limit
  }).then((res) => {
    if (res.code == 1000) {
      tableData.value = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
}

const store = useSelectStore();

function init() {
  form.countries[0] = store.country;
  form.classifications[0] = 'Computer science';
  form.yearRange.start = store.yearRange.start;
  form.yearRange.end = store.yearRange.end;
  form.limit = 100;
  loadRanking(
    form.countries,
    form.classifications,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end),
    form.limit
  );
}

onMounted(() => {
  init();
});

function updateData() {
  loadRanking(
    form.countries,
    form.classifications,
    parseInt(form.yearRange.start),
    parseInt(form.yearRange.end),
    form.limit
  );
}
</script>

<style scoped></style>
