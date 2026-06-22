<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import api from '@/api'

const notyf = new Notyf()

const editingPostId = ref(null)
const editTitle = ref('')
const editContent = ref('')

const emit = defineEmits(['postUpdated'])

function startEdit(post) {
    editingPostId.value = post._id
    editTitle.value = post.title
    editContent.value = post.content
}

function cancelEdit() {
    editingPostId.value = null
    editTitle.value = ''
    editContent.value = ''
}

async function editPost(postId) {
    if (!editTitle.value.trim() || !editContent.value.trim()) return

    try {
        await api.patch(`/posts/update/${postId}`, {
            title: editTitle.value.trim(),
            content: editContent.value.trim()
        })

        editingPostId.value = null
        editTitle.value = ''
        editContent.value = ''

        emit('postUpdated')
        notyf.success('Post updated successfully')

    } catch (err) {
        const message = err.response?.data?.message || 'Failed to update post'
        notyf.error(message)
    }
}

defineExpose({
    startEdit,
    cancelEdit
})
</script>

<template>
    <div v-if="editingPostId" class="modal-backdrop" @click.self="cancelEdit">
        <div class="modal-box">

            <h2 class="modal-title">Edit Post</h2>

            <input v-model="editTitle" class="input" placeholder="Edit title..." />

            <textarea v-model="editContent" class="input textarea" placeholder="Edit content..."></textarea>

            <div class="actions">
                <button class="btn-save" @click="editPost(editingPostId)">Save</button>
                <button class="btn-cancel" @click="cancelEdit">Cancel</button>
            </div>

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
    overflow-y: auto;
    background: rgba(255, 250, 245, 0.95);
    border: 1px solid rgba(176, 137, 104, 0.25);
    border-radius: 18px;
    padding: 2rem;
    color: #6d4c41;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.modal-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #b08968;
}

.input {
    width: 100%;
    padding: 0.6rem;
    border-radius: 12px;
    border: 1px solid rgba(176, 137, 104, 0.25);
    background: rgba(255, 250, 245, 0.9);
    color: #6d4c41;
    outline: none;
    transition: 0.2s ease;
    box-sizing: border-box;
}

.input:focus {
    border-color: rgba(244, 162, 97, 0.7);
    box-shadow: 0 0 10px rgba(244, 162, 97, 0.2);
    transform: translateY(-1px);
}

.textarea {
    min-height: 180px;
    resize: none;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.btn-save {
    flex: 1;
    background: rgba(244, 162, 97, 0.25);
    border: 1px solid rgba(176, 137, 104, 0.25);
    padding: 0.6rem 1rem;
    border-radius: 999px;
    color: #6d4c41;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
}

.btn-save:hover {
    background: rgba(244, 162, 97, 0.35);
    transform: translateY(-2px);
}

.btn-cancel {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(176, 137, 104, 0.2);
    padding: 0.6rem 1rem;
    border-radius: 999px;
    color: #6d4c41;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
}

.btn-cancel:hover {
    background: rgba(255, 250, 245, 0.95);
    transform: translateY(-2px);
}
</style>