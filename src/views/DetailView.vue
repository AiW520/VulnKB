<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodeCompare from '../components/CodeCompare.vue'
import { categories, vulnerabilities, severityLabels } from '../data/vulnerabilities.js'

const route = useRoute()
const router = useRouter()

const vulnerability = computed(() =>
  vulnerabilities.find(v => v.id === route.params.id)
)

const cat = computed(() =>
  vulnerability.value ? categories[vulnerability.value.category] : null
)

const show = ref(false)

onMounted(() => {
  setTimeout(() => (show.value = true), 50)
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

function close() {
  show.value = false
  setTimeout(() => router.back(), 200)
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) close()
}

const sevLabel = (s) => severityLabels[s] || s
</script>

<template>
  <div class="detail-overlay" :class="{ visible: show }" @click="onBackdropClick">
    <div class="detail-panel" v-if="vulnerability">
      <div class="detail-header">
        <div class="header-left">
          <span class="header-icon">{{ cat?.icon }}</span>
          <div>
            <h2 class="detail-title">{{ vulnerability.title }}</h2>
            <span class="detail-title-en">{{ vulnerability.titleEn }}</span>
          </div>
          <span class="severity" :class="vulnerability.severity">{{ sevLabel(vulnerability.severity) }}</span>
        </div>
        <button class="close-btn" @click="close" aria-label="关闭">✕</button>
      </div>

      <div class="detail-body">
        <div class="meta-row">
          <div class="meta-item"><strong>CWE:</strong> <code>{{ vulnerability.cwe }}</code></div>
          <div class="meta-item"><strong>OWASP:</strong> <code>{{ vulnerability.owasp }}</code></div>
          <div class="meta-item"><strong>分类:</strong> {{ cat?.name }}</div>
          <div class="meta-item"><strong>影响语言:</strong> {{ vulnerability.languages.join(', ') }}</div>
        </div>

        <section class="detail-section">
          <h3>📖 漏洞描述</h3>
          <p>{{ vulnerability.description }}</p>
        </section>

        <section class="detail-section">
          <h3>🔍 根本原因</h3>
          <p>{{ vulnerability.cause }}</p>
        </section>

        <section class="detail-section">
          <h3>💥 安全影响</h3>
          <p>{{ vulnerability.impact }}</p>
        </section>

        <section class="detail-section">
          <h3>🛡️ 防护措施</h3>
          <ul>
            <li v-for="(item, i) in vulnerability.prevention" :key="i">{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section">
          <h3>💻 代码对比</h3>
          <CodeCompare
            :vulnerable-code="vulnerability.vulnerableCode"
            :fixed-code="vulnerability.fixedCode"
          />
        </section>

        <section class="detail-section" v-if="vulnerability.references?.length">
          <h3>📚 参考资源</h3>
          <ul class="ref-list">
            <li v-for="(ref, i) in vulnerability.references" :key="i">
              <a :href="ref" target="_blank" rel="noopener">{{ ref }}</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px 16px;
  overflow-y: auto;
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.detail-overlay.visible {
  opacity: 1;
}
.detail-panel {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 960px;
  box-shadow: var(--shadow-lg);
  transform: translateY(16px);
  transition: transform 0.25s ease;
}
.detail-overlay.visible .detail-panel {
  transform: translateY(0);
}

.detail-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-primary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.header-icon {
  font-size: 24px;
}
.detail-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.detail-title-en {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 4px;
}
.severity {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
}
.severity.critical { background: var(--critical-bg); color: var(--critical); }
.severity.high { background: var(--high-bg); color: var(--high); }
.severity.medium { background: var(--medium-bg); color: var(--medium); }
.severity.low { background: var(--low-bg); color: var(--low); }

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition);
}
.close-btn:hover {
  background: var(--bg-tertiary);
}

.detail-body {
  padding: 24px;
}
.meta-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 14px;
  background: var(--bg-secondary);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.meta-item {
  font-size: 13px;
  color: var(--text-secondary);
}
.meta-item strong {
  color: var(--text-primary);
}
.meta-item code {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 12px;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--bg-tertiary);
}

.detail-section {
  margin-bottom: 28px;
}
.detail-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.detail-section p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
}
.detail-section ul {
  padding-left: 20px;
  margin: 0;
}
.detail-section ul li {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 6px;
}
.ref-list a {
  color: var(--accent);
  text-decoration: none;
  word-break: break-all;
  font-size: 13px;
}
.ref-list a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .detail-overlay {
    padding: 0;
  }
  .detail-panel {
    border-radius: 0;
    min-height: 100vh;
  }
  .detail-body {
    padding: 16px;
  }
}
</style>
