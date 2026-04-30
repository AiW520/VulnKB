<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  vulnerableCode: Object,
  fixedCode: Object,
})

const vulnRef = ref(null)
const fixedRef = ref(null)

function highlight() {
  if (vulnRef.value) {
    vulnRef.value.querySelectorAll('pre code').forEach(block => {
      window.hljs?.highlightElement(block)
    })
  }
  if (fixedRef.value) {
    fixedRef.value.querySelectorAll('pre code').forEach(block => {
      window.hljs?.highlightElement(block)
    })
  }
}

onMounted(highlight)
watch(() => [props.vulnerableCode, props.fixedCode], () => {
  setTimeout(highlight, 0)
})

function escapeHtml(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}
</script>

<template>
  <div class="code-compare">
    <div class="code-block-wrapper" ref="vulnRef">
      <div class="code-header vulnerable">
        <span>❌ 不安全代码</span>
        <span class="lang-tag">{{ vulnerableCode?.language }}</span>
      </div>
      <pre><code :class="`language-${vulnerableCode?.language}`" v-text="vulnerableCode?.code"></code></pre>
    </div>
    <div class="code-block-wrapper" ref="fixedRef">
      <div class="code-header fixed">
        <span>✅ 安全代码</span>
        <span class="lang-tag">{{ fixedCode?.language }}</span>
      </div>
      <pre><code :class="`language-${fixedCode?.language}`" v-text="fixedCode?.code"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 720px) {
  .code-compare {
    grid-template-columns: 1fr;
  }
}
.code-block-wrapper {
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 600;
}
.code-header.vulnerable {
  background: var(--critical-bg);
  color: var(--critical);
}
.code-header.fixed {
  background: var(--low-bg);
  color: var(--low);
}
.lang-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--bg-tertiary);
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
}
pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
  background: transparent !important;
}
pre code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  background: transparent !important;
  padding: 0 !important;
}
</style>
