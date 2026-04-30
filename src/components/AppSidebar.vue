<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { categories, vulnerabilities } from '../data/vulnerabilities.js'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()

const currentCategory = computed(() => route.params.category || 'all')

const navItems = computed(() => {
  const catCounts = {}
  vulnerabilities.forEach(v => {
    catCounts[v.category] = (catCounts[v.category] || 0) + 1
  })
  const items = [
    { key: 'all', name: '全部漏洞', icon: '📋', count: vulnerabilities.length },
  ]
  for (const [key, cat] of Object.entries(categories)) {
    if (catCounts[key]) {
      items.push({ key, name: cat.name, icon: cat.icon, count: catCounts[key] })
    }
  }
  return items
})

function navigateTo(key) {
  if (key === 'all') {
    router.push('/')
  } else {
    router.push(`/category/${key}`)
  }
  emit('close')
}
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-header">
      <router-link to="/" class="sidebar-logo" @click="emit('close')">
        <span class="logo-icon">🛡️</span>
        <div>
          <div class="logo-title">VulnKB</div>
          <div class="logo-subtitle">代码漏洞知识库</div>
        </div>
      </router-link>
    </div>
    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.key"
        class="nav-item"
        :class="{ active: currentCategory === item.key }"
        @click="navigateTo(item.key)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.name }}</span>
        <span class="nav-count">{{ item.count }}</span>
      </button>
    </nav>
    <div class="sidebar-footer">
      <span class="footer-text">收录 {{ vulnerabilities.length }} 个漏洞 · {{ Object.keys(categories).length }} 个分类</span>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform var(--transition);
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.logo-icon {
  font-size: 28px;
}
.logo-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
}
.logo-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 1px;
}
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 2px;
  border-radius: 6px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-secondary);
  transition: all var(--transition);
  text-align: left;
}
.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
.nav-item.active {
  background: var(--accent-muted);
  color: var(--accent);
  font-weight: 500;
}
.nav-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.nav-label {
  flex: 1;
}
.nav-count {
  font-size: 11px;
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--text-muted);
}
.nav-item.active .nav-count {
  background: var(--accent-muted);
}
.sidebar-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
}

@media (max-width: 860px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
