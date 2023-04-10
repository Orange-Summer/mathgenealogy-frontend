<template>
  <el-row>
    <el-descriptions title="个人详情" :border="true">
      <el-descriptions-item label="姓名">{{ data.detail.name }}</el-descriptions-item>
      <el-descriptions-item label="国家">{{ data.detail.country }}</el-descriptions-item>
      <el-descriptions-item label="学位">{{ data.detail.title }}</el-descriptions-item>
      <el-descriptions-item label="学校">{{ data.detail.institution }}</el-descriptions-item>
      <el-descriptions-item label="年份">{{ data.detail.year }}</el-descriptions-item>
      <el-descriptions-item label="论文">{{ data.detail.dissertation }}</el-descriptions-item>
      <el-descriptions-item label="领域">{{ data.detail.classification }}</el-descriptions-item>
      <el-descriptions-item label="数学家谱系项目链接">
        <a :href="url" target="_blank">{{ url }}</a>
      </el-descriptions-item>
    </el-descriptions>
  </el-row>
  <el-row>
    <el-col :span="8">
      <el-card shadow="hover">
        <template #header>
          <span>导师</span>
        </template>
        <el-table :data="data.detail.advisors">
          <el-table-column prop="name" label="姓名" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handlePerson(scope.$index, 1)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8" :offset="1">
      <el-card shadow="hover">
        <template #header>
          <span>学生</span>
        </template>
        <el-table :data="data.detail.students">
          <el-table-column prop="name" label="姓名" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handlePerson(scope.$index, 2)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-card>
      <template #header>
          <el-row justify="center" style="margin: 0 0">
              <span style="font-size: x-large;">可视化树图</span>
          </el-row>
      </template>
      <TreeGraph :data="treeData" v-if="showTree"></TreeGraph>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import TreeGraph from '@/components/TreeGraph.vue';
import { getMathematician } from '@/api/basic';
import { getMathematicianTree } from '@/api/graph';

const router = useRouter();
const route = useRoute();

let data = reactive({
  detail: {
    mid: 0,
    name: '',
    country: '',
    title: '',
    institution: '',
    year: 0,
    dissertation: '',
    classification: 0,
    advisors: [
      {
        mid: 0,
        name: ''
      }
    ],
    students: [
      {
        mid: 0,
        name: ''
      }
    ]
  }
});

const url = ref('');

// 加载数据
function loadData(mid: any) {
  getMathematician({ mid }).then((res) => {
    data.detail = res.data;
  });
  url.value = 'https://mathgenealogy.org/id.php?id=' + mid;
}

// 跳转其他数学家个人详情
function handlePerson(index: number, type: number) {
  let id = 0;
  if (type == 1) {
    id = data.detail.advisors[index].mid;
  } else if (type == 2) {
    id = data.detail.students[index].mid;
  }
  router.push({
    name: 'person',
    params: { id }
  });
}

// 监控 route id 重新加载数据
const idChange = watchEffect(() => {
  loadData(route.params.id);
  loadTreeData(route.params.id, 2);
});
// 退出路由时注销 watch
onBeforeRouteLeave(() => {
  idChange();
});

// 获取树图数据
const showTree = ref(false);
const treeData = ref();

function loadTreeData(mid: any, depth: number) {
  getMathematicianTree({ mid, depth }).then((res) => {
    treeData.value = res.data;
    showTree.value = true;
  });
}
</script>

<style scoped></style>
