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
    const res = await api.get('/blogPosts')
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
      <h1 class="title">Blog Posts</h1>
    </div>

    <div class="search-bar">
      <input v-model="searchTitle" type="text" placeholder="Search blog posts by title..." />

      <button v-if="searchTitle" @click="clearSearch">
        Clear
      </button>
    </div>

    <div v-if="loading" class="loading">
      Loading blog posts...
    </div>

    <div v-else-if="filteredPosts.length === 0" class="empty">
      No blog posts found 📝
    </div>

    <div v-else class="grid">

      <div v-for="p in filteredPosts" :key="p._id" class="card">

        <div class="card-body">

          <h3 class="title-text">{{ p.title }}</h3>

          <p class="meta">✍️ Author: {{ p.author?.userName || 'Unknown' }}</p>
          <p class="meta">
            📅 Posted: {{ new Date(p.createdAt).toLocaleDateString() }}
          </p>

        </div>

        <div class="actions">
          <button class="btn view" @click="viewPost(p)">
            View
          </button>
        </div>

      </div>

    </div>

    <ViewBlogPostComponent ref="viewModal" />

  </div>
</template>

<style scoped>
.blog-wrapper {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: radial-gradient(circle at top,
      #fffaf5,
      #fdf2e9 60%,
      #f5e6da 140%);
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
  border: 1px solid rgba(176, 137, 104, 0.35);
  background: rgba(255, 250, 245, 0.9);
  color: #6d4c41;
  outline: none;
  backdrop-filter: blur(6px);
}

.search-bar input:focus {
  border-color: #f4a261;
  box-shadow: 0 0 10px rgba(244, 162, 97, 0.2);
}

.search-bar button {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: rgba(244, 162, 97, 0.25);
  color: #6d4c41;
  font-weight: 600;
  transition: 0.2s ease;
  border: 1px solid rgba(176, 137, 104, 0.3);
}

.search-bar button:hover {
  background: rgba(244, 162, 97, 0.35);
  transform: translateY(-2px);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255, 250, 245, 0.85);
  border: 1px solid rgba(176, 137, 104, 0.25);
  border-radius: 18px;
  padding: 1.5rem;
  transition: 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-5px);
  border-color: #f4a261;
  box-shadow: 0 10px 25px rgba(244, 162, 97, 0.15);
}

.title-text {
  color: #b08968;
  font-weight: 800;
}

.meta {
  color: #7b5e57;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.actions {
  display: flex;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.55rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s ease;
}

.view {
  background: rgba(244, 162, 97, 0.25);
  color: #6d4c41;
  border: 1px solid rgba(176, 137, 104, 0.3);
}

.view:hover {
  background: rgba(244, 162, 97, 0.35);
  transform: translateY(-2px);
}

.loading,
.empty {
  text-align: center;
  color: #7b5e57;
}
</style>