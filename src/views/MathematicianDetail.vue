<template>
  <el-row>
    <el-descriptions title="个人详情" :border="true">
      <el-descriptions-item label="姓名">{{ data.students['name'] }}</el-descriptions-item>
      <el-descriptions-item label="国家">{{ data.students['country'] }}</el-descriptions-item>
      <el-descriptions-item label="学位">{{ data.students['title'] }}</el-descriptions-item>
      <el-descriptions-item label="学校">{{ data.students['institution'] }}</el-descriptions-item>
      <el-descriptions-item label="年份">{{ data.students['year'] }}</el-descriptions-item>
      <el-descriptions-item label="论文">{{ data.students['dissertation'] }}</el-descriptions-item>
      <el-descriptions-item label="领域"
        >{{ data.students['classification'] }}
      </el-descriptions-item>
      <el-descriptions-item label="数学家谱系项目链接">
        <a :href="url" target="_blank">{{ url }}</a>
      </el-descriptions-item>
    </el-descriptions>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-row>导师</el-row>
      <el-row>
        <el-table :data="data.advisors['children']">
          <el-table-column prop="name" label="姓名" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handlePerson(scope.$index, 1)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row>学生</el-row>
      <el-row>
        <el-table :data="data.students['children']">
          <el-table-column prop="name" label="姓名" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handlePerson(scope.$index, 2)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <TreeGraph :treeData="treeData"></TreeGraph>
  </el-row>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watchEffect } from 'vue';
import { getMathematicianTree } from '@/api/graph';
import { useRoute, useRouter } from 'vue-router';
import TreeGraph from '@/components/TreeGraph.vue';

const router = useRouter();
const route = useRoute();

const data = reactive({
  students: {},
  advisors: {}
});

const url = ref('');

//加载数据
function loadData(mid: any, depth: number) {
  getMathematicianTree({ mid, depth }).then((res) => {
    data.students = res.data[0];
    data.advisors = res.data[1];
  });
  url.value = 'https://mathgenealogy.org/id.php?id=' + mid;
}

//跳转其他数学家个人详情
function handlePerson(index: number, type: number) {
  let id = 0;
  if (type == 1) {
    id = data.advisors['children'][index]['mid'];
  } else if (type == 2) {
    id = data.students['children'][index]['mid'];
  }
  router.push({
    name: 'person',
    params: { id }
  });
}

//监控 route id 重新加载数据
const idChange = watchEffect(() => {
  loadData(route.params.id, 2);
});

onUnmounted(() => {
  idChange();
});

// 计算传到 TreeGraph 中的值
const treeData = computed(() => {
  let temp = JSON.parse(JSON.stringify(data));
  let treeData = temp.students;
  if (temp.advisors.children && temp.advisors.children.length > 0) {
    if (temp.students.children) {
      treeData.children.push(...temp.advisors.children);
    } else {
      treeData.children = temp.advisors.children;
    }
  }
  return reactive(treeData);
});
</script>

<style scoped></style>
