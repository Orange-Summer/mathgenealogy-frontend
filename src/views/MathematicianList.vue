<template>
  <el-row style="">
    <el-page-header>
      <template #content>
        <span>数学家列表</span>
      </template>
    </el-page-header>
  </el-row>
  <el-row>
    <!-- span指定列的宽度 -->
    <el-col :span="12">
      <!-- 搜索框 -->
      <!-- 通过v-model做数据绑定 -->
      <el-input placeholder="请输入要搜索的关键字" class="input-with-select"></el-input>
    </el-col>
    <!-- 查询、新增按钮 -->
    <el-col :span="12">
      <el-button type="primary">查询</el-button>
      <el-button type="primary">新增</el-button>
    </el-col>
  </el-row>
  <el-row>
    <!-- table表格 -->
    <!-- 表格数据绑定和默认宽度 -->
    <el-table :data="listData.data" stripe table-layout="auto" style="width: 100%">
      <!-- 每一个列，prop为主键，label为文案 -->
      <!-- 索引 -->
      <el-table-column type="index" width="50px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="country" label="国家" width="150"></el-table-column>
      <el-table-column prop="institution" label="学校" width="200"></el-table-column>
      <el-table-column prop="title" label="学位" width="80"></el-table-column>
      <el-table-column prop="dissertation" label="论文"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button size="small" @click="handlePerson(scope.$index)">详情</el-button>
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getMathematicianList } from '@/api/basic'
import { useRouter } from "vue-router";

const listData = reactive({
  totalPages: 1,
  data: []
})
function loadList(page: number, size: number) {
  getMathematicianList({ page, size }).then((res) => {
    listData.totalPages = res.data.totalPages
    listData.data = res.data.content
    console.log(listData)
  })
}

onMounted(() => {
  loadList(0, 20)
})

const router = useRouter()
function handlePerson(index: number) {
  const id = listData.data[index]['mid']
  router.push({
    name: 'person',
    params: { id }
  })
}
</script>

<style scoped></style>