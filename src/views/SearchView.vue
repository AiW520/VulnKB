<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import VulnCard from '../components/VulnCard.vue'
import { vulnerabilities } from '../data/vulnerabilities.js'

const props = defineProps({ searchQuery: { type: String, default: '' } })
const route = useRoute()

const query = ref(route.query.q || props.searchQuery || '')

watch(() => route.query.q, (val) => {
  if (val) query.value = val
})

watch(() => props.searchQuery, (val) => {
  query.value = val
})

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return vulnerabilities.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.titleEn.toLowerCase().includes(q) ||
    v.description.toLowerCase().includes(q) ||
    v.cause.toLowerCase().includes(q) ||
    v.cwe.toLowerCase().includes(q) ||
    v.owasp.toLowerCase().includes(q) ||
    v.category.toLowerCase().includes(q) ||
    v.languages.some(l => l.toLowerCase().includes(q))
  )
})
</script>

<template>
  <div class="search-view">
    <div class="page-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <h1 class="page-title">
        {{ query ? `搜索结果: "${query}"` : '搜索' }}
      </h1>
    </div>

    <div v-if="query && results.length" class="search-meta">
      <span class="result-count">找到 {{ results.length }} 个匹配漏洞</span>
    </div>

    <div v-if="results.length" class="vuln-grid">
      <VulnCard v-for="v in results" :key="v.id" :vulnerability="v" />
    </div>

    <div v-else-if="query" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>未找到匹配结果</h3>
      <p>尝试: 使用不同关键词、CWE编号 (如 "CWE-89")、漏洞类型 (如 "注入")、或编程语言名称</p>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">⌨️</div>
      <h3>输入关键词搜索漏洞</h3>
      <p>按 <kbd>/</kbd> 或 <kbd>Ctrl+K</kbd> 快速聚焦搜索框</p>
      <div class="suggestions">
        <span class="suggestion-label">热门搜索:</span>
        <button class="suggestion-tag" @click="query = 'SQL 注入'">SQL 注入</button>
        <button class="suggestion-tag" @click="query = 'XSS'">XSS</button>
        <button class="suggestion-tag" @click="query = 'CWE-502'">CWE-502</button>
        <button class="suggestion-tag" @click="query = 'Python'">Python</button>
        <button class="suggestion-tag" @click="query = 'Java'">Java</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  max-width: 1200px;
}
.page-header {
  margin-bottom: 24px;
}
.back-link {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: 13px;
  margin-bottom: 12px;
}
.page-title {
  font-size: 24px;
  font-weight: 700;
}
.search-meta {
  margin-bottom: 20px;
}
.result-count {
  font-size: 13px;
  color: var(--text-muted);
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
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
  margin-bottom: 8px;
}
.empty-state p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
kbd {
  padding: 2px 7px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg-tertiary);
  font-family: monospace;
}
.suggestions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.suggestion-label {
  font-size: 13px;
  color: var(--text-muted);
}
.suggestion-tag {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--accent);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
}
.suggestion-tag:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

@media (max-width: 860px) {
  .vuln-grid {
    grid-template-columns: 1fr;
  }
}
</style>
