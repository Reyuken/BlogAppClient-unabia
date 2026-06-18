<script setup>
import { ref, onMounted, computed } from 'vue'
import { Notyf } from 'notyf'
import api from '../api.js'

import ViewBlogPostComponent from '@/components/ViewBlogPostComponent.vue'

const notyf = new Notyf()

const blogPosts = ref([])
const loading = ref(true)

const viewModal = ref(null)

const searchTitle = ref('')

async function loadBlogPosts() {
  try {
    const res = await api.get('/posts')
    blogPosts.value = res.data
  } catch (err) {
    notyf.error('Failed to load blog posts')
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadBlogPosts)

function viewPost(post) {
  viewModal.value?.openViewModal(post)
}

function clearSearch() {
  searchTitle.value = ''
}

const filteredPosts = computed(() => {
  if (!searchTitle.value.trim()) {
    return blogPosts.value
  }

  return blogPosts.value.filter(p =>
    p.title.toLowerCase().includes(searchTitle.value.toLowerCase())
  )
})
</script>

<template>
  <div class="blog-wrapper">

    <div class="header">
      <h1 class="title">Blog Feed</h1>
    </div>

    <div class="search-bar">
      <input v-model="searchTitle" type="text" placeholder="Search posts..." />
      <button v-if="searchTitle" @click="clearSearch">Clear</button>
    </div>

    <div v-if="loading" class="loading">
      Loading blog posts...
    </div>

    <div v-else-if="filteredPosts.length === 0" class="empty">
      No blog posts found 📝
    </div>

    <div v-else class="feed">

      <div v-for="p in filteredPosts" :key="p._id" class="post">

        <h2 class="post-title">{{ p.title }}</h2>

        <div class="meta">
          ✍️ {{ p.author?.userName || 'Unknown' }}
          • {{ new Date(p.createdAt).toLocaleDateString() }}
        </div>

        <p class="preview">
          {{ p.content?.slice(0, 180) }}...
        </p>

        <button class="read-btn" @click="viewPost(p)">
          Read Post
        </button>

      </div>

    </div>

    <ViewBlogPostComponent ref="viewModal" />

  </div>
</template>

<style scoped>
.blog-wrapper {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: radial-gradient(circle at top, #fffaf5, #fdf2e9 60%, #f5e6da 140%);
  color: #6d4c41;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: #b08968;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(176, 137, 104, 0.25);
  background: rgba(255, 250, 245, 0.9);
  color: #6d4c41;
  outline: none;
  transition: 0.25s ease;
}

.search-bar input:focus {
  border-color: rgba(244, 162, 97, 0.75);
  box-shadow: 0 0 14px rgba(244, 162, 97, 0.25);
  transform: translateY(-1px);
}

.search-bar button {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(176, 137, 104, 0.25);
  background: rgba(244, 162, 97, 0.2);
  color: #6d4c41;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.search-bar button:hover {
  background: rgba(244, 162, 97, 0.35);
  transform: translateY(-2px);
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post {
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(176, 137, 104, 0.2);
  background: rgba(255, 250, 245, 0.85);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  transition: 0.25s ease;
}

.post::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(244, 162, 97, 0.08),
      transparent);
  transition: 0.5s ease;
}

.post:hover {
  transform: translateY(-6px);
  border-color: rgba(244, 162, 97, 0.6);
  box-shadow: 0 12px 28px rgba(244, 162, 97, 0.15);
}

.post:hover::before {
  left: 100%;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #b08968;
}

.meta {
  color: #7b5e57;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.preview {
  margin-top: 0.8rem;
  color: #6d4c41;
  line-height: 1.6;
}

.read-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(176, 137, 104, 0.25);
  background: rgba(244, 162, 97, 0.2);
  color: #6d4c41;
  cursor: pointer;
  transition: 0.2s ease;
}

.read-btn:hover {
  background: rgba(244, 162, 97, 0.35);
  transform: translateY(-2px);
}

.loading,
.empty {
  text-align: center;
  color: #7b5e57;
}
</style>