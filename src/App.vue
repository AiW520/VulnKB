<script setup>
import { ref } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import AppTopbar from './components/AppTopbar.vue'

const sidebarOpen = ref(false)
const searchQuery = ref('')

function onSearch(query) {
  searchQuery.value = query
}

function onToggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function onCloseSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="app-layout">
    <div class="sidebar-overlay" :class="{ open: sidebarOpen }" @click="onCloseSidebar"></div>
    <AppSidebar :open="sidebarOpen" @close="onCloseSidebar" />
    <div class="main">
      <AppTopbar
        :search-query="searchQuery"
        @toggle-sidebar="onToggleSidebar"
        @search="onSearch"
      />
      <main class="content">
        <router-view :search-query="searchQuery" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-width: 0;
  transition: margin-left var(--transition);
}
.content {
  padding: 24px;
  max-width: 1400px;
}
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}
.sidebar-overlay.open {
  display: none;
}

@media (max-width: 860px) {
  .main {
    margin-left: 0;
  }
  .content {
    padding: 16px;
  }
  .sidebar-overlay.open {
    display: block;
  }
}
</style>
