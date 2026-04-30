<script setup>
import { computed } from 'vue'
import { vulnerabilities } from '../data/vulnerabilities.js'

const stats = computed(() => {
  const critical = vulnerabilities.filter(v => v.severity === 'critical').length
  const high = vulnerabilities.filter(v => v.severity === 'high').length
  const medium = vulnerabilities.filter(v => v.severity === 'medium').length
  const low = vulnerabilities.filter(v => v.severity === 'low').length
  const categories = new Set(vulnerabilities.map(v => v.category)).size
  const total = vulnerabilities.length

  return [
    { label: '收录漏洞', value: total, icon: '📊' },
    { label: '严重 (Critical)', value: critical, icon: '🔴' },
    { label: '高危 (High)', value: high, icon: '🟠' },
    { label: '中危 (Medium)', value: medium, icon: '🟡' },
    { label: '低危 (Low)', value: low, icon: '🟢' },
    { label: '分类', value: categories, icon: '📂' },
  ]
})
</script>

<template>
  <div class="stats-bar">
    <div class="stat-card" v-for="stat in stats" :key="stat.label">
      <span class="stat-icon">{{ stat.icon }}</span>
      <div class="stat-info">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 14px;
}
.stat-icon {
  font-size: 28px;
}
.stat-value {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}
.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
