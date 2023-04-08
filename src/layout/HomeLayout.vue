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
        <el-menu-item index="0">数学家族谱的可视化系统</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <el-menu
          default-active="/all"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
        >
          <el-menu-item title="数学家列表" index="/all">
            <span>数学家列表</span>
          </el-menu-item>
          <el-menu-item title="总体统计" index="/total">
            <span>总体统计</span>
          </el-menu-item>
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

<script setup lang="ts"></script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding: 0;
}
</style>
