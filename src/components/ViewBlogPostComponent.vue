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

import EditCommentComponent from '@/components/EditCommentComponent.vue'

const editCommentRef = ref(null)

function onCommentUpdated() {
  loadComments(post.value._id)
}


function openViewModal(selectedPost) {
  if (!store.user.token) {
    notyf.error('Please login to view post details')
    router.push({ name: 'Login' })
    return
  }

  post.value = selectedPost
  isOpen.value = true

  loadComments(selectedPost._id)
}

function closeModal() {
  isOpen.value = false
  post.value = null
  comments.value = []
  commentInput.value = ''
  editCommentRef.value?.cancelEdit()
}

async function loadComments(postId) {
  loadingComments.value = true
  // c.user === store.user.id"
  // console.log(store.user.id)
  try {
    const res = await api.get(`/comments/${postId}/`)
    comments.value = res.data.comments
    // console.log(comments);
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

async function deleteComment(commentId) {
  try {
    await api.delete(`/comments/${post.value._id}/${commentId}`)
    await loadComments(post.value._id)
    notyf.success('Comment deleted')
  } catch (err) {
    console.error(err)
    notyf.error('Failed to delete comment')
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
              <span class="comment-author">👤 {{ c.user.userName }}</span>
              <div class="comment-content">
                <p class="comment-text">{{ c.comment }}</p>
                <div>
                  <button v-if="c.user._id === store.user.id" class="edit-btn" @click="editCommentRef.startEdit(c)">
                    Edit
                  </button>
                  <button v-if="c.user._id === store.user.id || store.user.isAdmin === true" class="delete-btn" @click="deleteComment(c._id)">Delete</button>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
      <EditCommentComponent ref="editCommentRef" :postId="post?._id" @commentUpdated="onCommentUpdated" />
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
  width: 50vw;
  max-height: 90vh;
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
  max-height: 25vh;
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

.comment-content {
  display: flex;
  justify-content: space-between;
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

.edit-btn {
  background: rgba(244, 162, 97, 0.2);
  border: 1px solid rgba(176, 137, 104, 0.25);
  color: #6d4c41;

  padding: 0.5rem 1rem;
  border-radius: 999px;

  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s ease;

  backdrop-filter: blur(6px);
}

.edit-btn:hover {
  background: rgba(244, 162, 97, 0.35);
  border-color: rgba(244, 162, 97, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 162, 97, 0.15);
}

.edit-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.delete-btn {
    background: rgba(220, 38, 38, 0.12);
    border: 1px solid rgba(220, 38, 38, 0.25);
    color: #b91c1c;

    padding: 0.5rem 1rem;
    border-radius: 999px;

    font-size: 0.85rem;
    font-weight: 600;

    cursor: pointer;
    transition: 0.2s ease;

    backdrop-filter: blur(6px);
}

.delete-btn:hover {
    background: rgba(220, 38, 38, 0.2);
    border-color: rgba(220, 38, 38, 0.45);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.12);
}

.delete-btn:active {
    transform: translateY(0);
    box-shadow: none;
}

.delete-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}
</style>