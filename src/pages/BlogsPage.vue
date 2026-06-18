<script>
import { useGlobalStore } from '../stores/global.js'
import BlogPostsCatalogPage from './BlogPostsCatalogPage.vue'

export default {
  components: {
    BlogPostsCatalogPage,
  },
  setup() {
    const { user } = useGlobalStore()

    return {
      user,
    }
  }
}
</script>

<template>
  <div class="page-wrapper">

    <div class="page-container">

      <BlogPostsCatalogPage />

    </div>

  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top,
      #fffaf5,
      #fdf2e9 60%,
      #f5e6da 140%);
  color: #6d4c41;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.4s ease-in-out;
}

.page-container {
  width: 100%;
  max-width: 1400px;
  padding: 2rem 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>