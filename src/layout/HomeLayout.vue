<template>
  <el-container>
    <el-header>
      <el-menu
        background-color="var(--el-color-primary)"
        text-color="white"
        active-text-color="black"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item>数学家族谱的可视化系统</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="18%">
        <el-menu
          default-active="/all"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
        >
          <SubMenu :subMenuList="data"></SubMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import SubMenu from '@/components/SubMenu.vue';
import { getAllCountry } from '@/api/country';
import { useSelectStore } from '@/stores/counter';

const data = reactive([
  {
    title: '数学家列表',
    index: '/all',
    content: '数学家列表'
  },
  {
    title: '总体统计',
    index: '/total',
    content: '总体统计'
  },
  {
    title: '按年份分析',
    index: '按年份分析',
    content: '按年份分析',
    children: [
      {
        title: '各国数学家数量变化比较折线图',
        index: '/year1',
        content: '各国数学家数量变化比较折线图'
      },
      {
        title: '各学科数学家数量变化比较折线图',
        index: '/year2',
        content: '各学科数学家数量变化比较折线图'
      },
      {
        title: '一个时间段各国数学家数量总计',
        index: '/year3',
        content: '一个时间段各国数学家数量总计扇形图'
      },
      {
        title: '一个时间段各学科数学家数量总计',
        index: '/year4',
        content: '一个时间段各学科数学家数量总计扇形图'
      }
    ]
  },
  {
    title: '按国家分析',
    index: '/country',
    content: '按国家分析',
    children: [
      {
        title: '一个国家数学家数量变化折线图',
        index: '/country1',
        content: '一个国家数学家数量变化折线图'
      },

      {
        title: '一个国家各学科数学家数量变化折线图',
        index: '/country2',
        content: '一个国家各学科数学家数量变化折线图'
      },
      {
        title: '一个国家各学科数学家数量总计扇形图',
        index: '/country3',
        content: '一个国家各学科数学家数量总计扇形图'
      },
      {
        title: '一个国家知识流出图',
        index: '/country4',
        content: '一个国家知识流出图'
      },
      {
        title: '一个国家知识流入图',
        index: '/country5',
        content: '一个国家知识流入图'
      }
    ]
  }
]);

const store = useSelectStore();

function loadAllCountry() {
  getAllCountry().then((res) => {
    store.saveCountryList(res.data);
    // countryList.value.unshift('all');
  });
}

onMounted(() => {
  loadAllCountry();
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding: 0;
}
</style>
