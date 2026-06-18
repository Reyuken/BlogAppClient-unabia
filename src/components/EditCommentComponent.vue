<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import { useGlobalStore } from '@/stores/global'
import api from '@/api'

const store = useGlobalStore()
const notyf = new Notyf()

const editingCommentId = ref(null)
const editInput = ref('')

const props = defineProps({
    postId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['commentUpdated'])

function startEdit(comment) {
    editingCommentId.value = comment._id
    editInput.value = comment.comment
}

function cancelEdit() {
    editingCommentId.value = null
    editInput.value = ''
}

async function editComment(commentId) {
    if (!editInput.value.trim()) return

    try {
        await api.patch(`/comments/${props.postId}/${commentId}`, {
            comment: editInput.value.trim()
        })

        editingCommentId.value = null
        editInput.value = ''
        emit('commentUpdated')

    } catch (err) {
        console.error(err)
        notyf.error('Failed to edit comment')
    }
}

defineExpose({
    startEdit,
    cancelEdit
})
</script>

<template>
    <div v-if="editingCommentId" class="edit-box">
        <textarea v-model="editInput" class="input" placeholder="Edit your comment..." rows="1" @input="autoResize"
            ref="textareaRef"></textarea>
        <button class="btn-save" @click="editComment(editingCommentId)">Save</button>
        <button class="btn-cancel" @click="cancelEdit">Cancel</button>
    </div>
</template>

<style scoped>
.edit-box {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
    align-items: center;
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
    height: 100px;

}

.input:focus {
    border-color: rgba(244, 162, 97, 0.7);
    box-shadow: 0 0 10px rgba(244, 162, 97, 0.2);
    transform: translateY(-1px);
}

.btn-save {
    background: rgba(244, 162, 97, 0.25);
    border: 1px solid rgba(176, 137, 104, 0.25);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    color: #6d4c41;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
    height: 40px;
}

.btn-save:hover {
    background: rgba(244, 162, 97, 0.35);
    transform: translateY(-2px);
}

.btn-cancel {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(176, 137, 104, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    color: #6d4c41;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
    height: 40px;
}

.btn-cancel:hover {
    background: rgba(255, 250, 245, 0.95);
    transform: translateY(-2px);
}
</style>