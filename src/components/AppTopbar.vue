<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({ searchQuery: String })
const emit = defineEmits(['toggle-sidebar', 'search'])

const router = useRouter()
const localQuery = ref('')
let searchTimer = null

function onInput(e) {
  localQuery.value = e.target.value
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('search', localQuery.value)
    if (localQuery.value) {
      router.push({ path: '/search', query: { q: localQuery.value } })
    } else {
      router.push('/')
    }
  }, 250)
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    localQuery.value = ''
    emit('search', '')
    router.push('/')
  }
}

function toggleTheme() {
  const html = document.documentElement
  const current = html.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
  updateHighlightTheme(next)
  localStorage.setItem('vulnkb-theme', next)
}

function updateHighlightTheme(theme) {
  const link = document.getElementById('hljs-theme')
  if (link) {
    link.href = theme === 'dark'
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
  }
}
</script>

<template>
  <header class="topbar">
    <button class="menu-toggle" @click="emit('toggle-sidebar')" aria-label="菜单">☰</button>
    <div class="search-wrapper">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        class="search-input"
        placeholder="搜索漏洞名称、CWE、描述...（按 / 聚焦）"
        :value="localQuery"
        @input="onInput"
        @keydown="onKeydown"
        id="globalSearch"
      />
      <kbd class="search-shortcut" v-if="!localQuery">/</kbd>
    </div>
    <div class="topbar-actions">
      <button class="btn" @click="toggleTheme" title="切换主题">
        <span class="theme-icon">🌓</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(8px);
}
.menu-toggle {
  display: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  color: var(--text-primary);
  border: none;
  background: none;
}
.search-wrapper {
  flex: 1;
  max-width: 520px;
  position: relative;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 10px 60px 10px 40px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition);
}
.search-input:focus {
  border-color: var(--accent);
}
.search-input::placeholder {
  color: var(--text-muted);
}
.search-shortcut {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 7px;
  font-size: 11px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg-tertiary);
  color: var(--text-muted);
  font-family: monospace;
  pointer-events: none;
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all var(--transition);
}
.btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
}
.theme-icon {
  font-size: 18px;
}

@media (max-width: 860px) {
  .menu-toggle {
    display: block;
  }
  .topbar {
    padding: 12px 16px;
  }
  .search-shortcut {
    display: none;
  }
}
</style>
