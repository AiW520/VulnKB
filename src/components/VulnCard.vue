<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { categories, severityLabels } from '../data/vulnerabilities.js'

const props = defineProps({ vulnerability: Object })
const router = useRouter()

const cat = computed(() => categories[props.vulnerability.category])
const sevLabel = computed(() => severityLabels[props.vulnerability.severity])

function openDetail() {
  router.push(`/vuln/${props.vulnerability.id}`)
}
</script>

<template>
  <div class="vuln-card" @click="openDetail">
    <div class="card-header">
      <h3 class="card-title">{{ vulnerability.title }}</h3>
      <span class="severity" :class="vulnerability.severity">{{ sevLabel }}</span>
    </div>
    <p class="card-desc">{{ vulnerability.description }}</p>
    <div class="card-footer">
      <span class="tag">{{ vulnerability.cwe }}</span>
      <span class="tag">{{ vulnerability.owasp }}</span>
      <span class="card-category" v-if="cat">
        {{ cat.icon }} {{ cat.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.vuln-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: var(--shadow);
}
.vuln-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}
.severity {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
}
.severity.critical {
  background: var(--critical-bg);
  color: var(--critical);
}
.severity.high {
  background: var(--high-bg);
  color: var(--high);
}
.severity.medium {
  background: var(--medium-bg);
  color: var(--medium);
}
.severity.low {
  background: var(--low-bg);
  color: var(--low);
}
.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
  margin: 0;
}
.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
.tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-tertiary);
  color: var(--text-muted);
  font-family: 'JetBrains Mono', Consolas, monospace;
}
.card-category {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
