<script setup>
import { computed } from 'vue'
import StatsBar from '../components/StatsBar.vue'
import VulnCard from '../components/VulnCard.vue'
import { categories, vulnerabilities } from '../data/vulnerabilities.js'

const groupedVulnerabilities = computed(() => {
  const groups = {}
  for (const [key, cat] of Object.entries(categories)) {
    const items = vulnerabilities.filter(v => v.category === key)
    if (items.length > 0) {
      groups[key] = { ...cat, items }
    }
  }
  return groups
})
</script>

<template>
  <div class="home-view">
    <div class="hero">
      <h1 class="hero-title">🛡️ 代码漏洞知识库</h1>
      <p class="hero-subtitle">
        系统化收录常见代码安全漏洞与修复方案，覆盖 OWASP Top 10 全部类别。
        每个条目包含漏洞描述、根本原因、安全影响、预防措施和代码对比示例。
      </p>
    </div>

    <StatsBar />

    <section v-for="(cat, key) in groupedVulnerabilities" :key="key" class="category-section">
      <div class="category-header">
        <span class="category-icon">{{ cat.icon }}</span>
        <div>
          <h2 class="category-title">
            <router-link :to="`/category/${key}`" class="category-link">{{ cat.name }}</router-link>
            <span class="category-count">{{ cat.items.length }} 条目</span>
          </h2>
          <p class="category-desc">{{ cat.desc }}</p>
        </div>
      </div>
      <div class="vuln-grid">
        <VulnCard v-for="v in cat.items" :key="v.id" :vulnerability="v" />
      </div>
    </section>

    <footer class="site-footer">
      <p>基于 <a href="https://owasp.org/Top10/" target="_blank">OWASP Top 10 (2021)</a> 和 <a href="https://cwe.mitre.org/" target="_blank">CWE</a> 标准构建</p>
      <p>仅供安全教育和防御性参考，请勿用于非法用途</p>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
}
.hero {
  margin-bottom: 28px;
}
.hero-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 10px;
}
.hero-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 800px;
}
.category-section {
  margin-bottom: 44px;
}
.category-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}
.category-icon {
  font-size: 28px;
  flex-shrink: 0;
}
.category-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}
.category-link {
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition);
}
.category-link:hover {
  color: var(--accent);
}
.category-count {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
}
.category-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 4px 0 0;
}
.vuln-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}
.site-footer {
  text-align: center;
  padding: 40px 0 20px;
  font-size: 13px;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  margin-top: 20px;
}
.site-footer p {
  margin: 4px 0;
}
.site-footer a {
  color: var(--accent);
  text-decoration: none;
}
.site-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .hero-title {
    font-size: 22px;
  }
  .vuln-grid {
    grid-template-columns: 1fr;
  }
}
</style>
