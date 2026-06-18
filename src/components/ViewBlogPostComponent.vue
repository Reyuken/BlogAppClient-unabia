<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import api from '@/api'

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const isOpen = ref(false)
const post = ref(null)

const comments = ref([])
const commentInput = ref('')
const loadingComments = ref(false)

function openViewModal(selectedPost) {
  if (!store.user.token) {
    notyf.error('Please login to view post details')
    router.push({ name: 'Login' })
    return
  }

  post.value = selectedPost
  isOpen.value = true
    console.log(post);
  loadComments(selectedPost._id)
}

function closeModal() {
  isOpen.value = false
  post.value = null
  comments.value = []
  commentInput.value = ''
}

async function loadComments(postId) {
  loadingComments.value = true

  try {
    const res = await api.get(`/comments/${postId}/`)
    comments.value = res.data.comments
  } catch (err) {
    console.error(err)
    notyf.error('Failed to load comments')
  } finally {
    loadingComments.value = false
  }
}

async function submitComment() {
  if (!commentInput.value.trim()) return

  try {
    await api.post(`/comments/${post.value._id}/`, {
      comment: commentInput.value
    })

    commentInput.value = ''
    await loadComments(post.value._id)

  } catch (err) {
    notyf.error('Failed to add comment')
  }
}

defineExpose({
  openViewModal
})
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

    <div class="modal-box">

      <h2 class="title">{{ post?.title }}</h2>

      <div class="content">
        <p><strong>Author:</strong> {{ post?.author.userName || 'Unknown' }}</p>
        <p><strong>Date:</strong> • {{ new Date(post?.createdAt).toLocaleDateString() }}</p>

        <hr />

        <p class="desc">{{ post?.content }}</p>
      </div>

      <div class="comment-box">
        <input v-model="commentInput" placeholder="Write a comment..." class="input" />

        <button class="btn" @click="submitComment">
          Post
        </button>
      </div>

      <div class="comments-section">

        <h3 class="comments-title">Comments</h3>

        <div v-if="loadingComments" class="loading">
          Loading comments...
        </div>

        <div v-else class="comments-scroll">

          <div v-if="comments.length === 0" class="empty">
            No comments yet
          </div>

          <div v-else>
            <div v-for="c in comments" :key="c._id" class="comment">
              {{ c.comment }}
            </div>
          </div>

        </div>

      </div>

      <button class="close-btn" @click="closeModal">
        Close
      </button>

    </div>

  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(109, 76, 65, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(6px);
}

.modal-box {
  width: 75vw;
  max-height: 85vh;
  overflow: hidden;

  background: rgba(255, 250, 245, 0.95);
  border: 1px solid rgba(176, 137, 104, 0.25);
  border-radius: 18px;
  padding: 1.5rem;

  color: #6d4c41;

  display: flex;
  flex-direction: column;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.title {
  color: #b08968;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.content p {
  margin: 0.3rem 0;
  color: #7b5e57;
}

.content hr {
  border: none;
  border-top: 1px solid rgba(176, 137, 104, 0.25);
  margin: 1rem 0;
}

.desc {
  margin-top: 1rem;
  color: #6d4c41;
  line-height: 1.5;
}

.comment-box {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(176, 137, 104, 0.25);
  background: rgba(255, 250, 245, 0.9);
  color: #6d4c41;
  outline: none;
  transition: 0.2s ease;
}

.input:focus {
  border-color: rgba(244, 162, 97, 0.7);
  box-shadow: 0 0 10px rgba(244, 162, 97, 0.2);
  transform: translateY(-1px);
}

.btn {
  background: rgba(244, 162, 97, 0.25);
  border: 1px solid rgba(176, 137, 104, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  color: #6d4c41;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn:hover {
  background: rgba(244, 162, 97, 0.35);
  transform: translateY(-2px);
}

.comments-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.comments-title {
  font-size: 0.9rem;
  color: #7b5e57;
  margin-bottom: 0.5rem;
}

.comments-scroll {
  flex: 1;
  overflow-y: auto;
  max-height: 180px;
  padding-right: 5px;
}

.comment {
  background: rgba(255, 250, 245, 0.8);
  border: 1px solid rgba(176, 137, 104, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
  margin-bottom: 0.4rem;
  color: #6d4c41;
  font-size: 0.85rem;
  transition: 0.2s ease;
}

.comment:hover {
  transform: translateX(2px);
  border-color: rgba(244, 162, 97, 0.5);
}

.loading,
.empty {
  font-size: 0.8rem;
  color: #7b5e57;
}

.close-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(176, 137, 104, 0.25);
  background: rgba(239, 162, 97, 0.2);
  color: #6d4c41;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

.close-btn:hover {
  background: rgba(239, 162, 97, 0.35);
  transform: translateY(-2px);
}
</style>