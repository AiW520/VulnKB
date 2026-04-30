<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VulnCard from '../components/VulnCard.vue'
import { categories, vulnerabilities } from '../data/vulnerabilities.js'

const route = useRoute()

const categoryKey = computed(() => route.params.category)
const cat = computed(() => categories[categoryKey.value])
const items = computed(() => vulnerabilities.filter(v => v.category === categoryKey.value))
</script>

<template>
  <div class="category-view" v-if="cat">
    <div class="page-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <div class="page-title-row">
        <span class="page-icon">{{ cat.icon }}</span>
        <div>
          <h1 class="page-title">{{ cat.name }}</h1>
          <p class="page-desc">{{ cat.desc }}</p>
        </div>
      </div>
      <div class="page-meta">
        <span class="meta-badge">📋 {{ items.length }} 个漏洞</span>
      </div>
    </div>

    <div v-if="items.length" class="vuln-grid">
      <VulnCard v-for="v in items" :key="v.id" :vulnerability="v" />
    </div>
    <div v-else class="empty-state">
      <div class="empty-icon">📂</div>
      <h3>该分类暂无内容</h3>
    </div>
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">❓</div>
    <h3>未找到该分类</h3>
    <router-link to="/" class="back-link">返回首页</router-link>
  </div>
</template>

<style scoped>
.category-view {
  max-width: 1200px;
}
.page-header {
  margin-bottom: 28px;
}
.back-link {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: 13px;
  margin-bottom: 16px;
  transition: color var(--transition);
}
.back-link:hover {
  color: var(--accent-hover);
}
.page-title-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}
.page-icon {
  font-size: 36px;
}
.page-title {
  font-size: 26px;
  font-weight: 800;
  margin: 0 0 4px;
}
.page-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  max-width: 700px;
}
.page-meta {
  display: flex;
  gap: 10px;
}
.meta-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
.vuln-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.empty-state h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

@media (max-width: 860px) {
  .vuln-grid {
    grid-template-columns: 1fr;
  }
}
</style>
