<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '@/api'
import { useGlobalStore } from '@/stores/global'

const emit = defineEmits(['refresh'])

const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const isOpen = ref(false)

const title = ref('')
const content = ref('')

function openModal() {
    if (!store.user.token) {
        notyf.error("Please login to create a post")
        router.push({ name: 'Login' })
        return
    }

    isOpen.value = true
}

function closeModal() {
    isOpen.value = false

    title.value = ''
    content.value = ''
}

async function submitPost() {

    if (!title.value.trim() || !content.value.trim()) {
        return notyf.error("Please fill in all fields")
    }

    try {
        await api.post('/posts', {
            title: title.value,
            content: content.value
        })

        notyf.success("Post published successfully")

        closeModal()
        emit('refresh')

    } catch (err) {
        notyf.error("Failed to publish post")
        console.error(err)
    }
}

defineExpose({
    openModal
})
</script>

<template>
    <button class="open-btn" @click="openModal">
        + New Post
    </button>

    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">

        <div class="modal-box">

            <h3>Create Blog Post</h3>

            <input v-model="title" placeholder="Post Title" />

            <textarea v-model="content" placeholder="Write your blog post here..."></textarea>

            <div class="actions">

                <button class="submit" @click="submitPost">
                    Publish
                </button>

                <button class="cancel" @click="closeModal">
                    Cancel
                </button>

            </div>

        </div>

    </div>
</template>

<style scoped>
.open-btn {
    background: rgba(244, 162, 97, 0.2);
    border: 1px solid rgba(176, 137, 104, 0.25);
    padding: 0.7rem 1rem;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1rem;
    color: #6d4c41;
    transition: 0.2s ease;
    backdrop-filter: blur(6px);
}

.open-btn:hover {
    background: rgba(244, 162, 97, 0.35);
    border-color: rgba(244, 162, 97, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(244, 162, 97, 0.15);
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(109, 76, 65, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-box {
    background: rgba(255, 250, 245, 0.96);
    padding: 2rem;
    border-radius: 20px;
    width: 75vw;

    border: 1px solid rgba(176, 137, 104, 0.25);
    color: #6d4c41;
    box-shadow: 0 15px 35px rgba(109, 76, 65, 0.12);
    align-items: center;
}

input,
textarea {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.7rem;
    border-radius: 12px;
    border: 1px solid rgba(176, 137, 104, 0.25);
    background: rgba(255, 255, 255, 0.7);
    color: #6d4c41;
    outline: none;
    transition: 0.2s ease;
}

input:focus,
textarea:focus {
    border-color: rgba(244, 162, 97, 0.6);
    box-shadow: 0 0 10px rgba(244, 162, 97, 0.15);
}

textarea {
    min-height: 25vh;
    resize: none;
}

.actions {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    margin-top: 1rem;
}

.submit {
    background: rgba(244, 162, 97, 0.25);
    border: 1px solid rgba(176, 137, 104, 0.25);
    padding: 0.55rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    color: #6d4c41;
    font-weight: 600;
    transition: 0.2s ease;
}

.submit:hover {
    background: rgba(244, 162, 97, 0.4);
    transform: translateY(-2px);
}

.cancel {
    background: rgba(220, 38, 38, 0.12);
    border: 1px solid rgba(220, 38, 38, 0.2);
    padding: 0.55rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    color: #b91c1c;
    font-weight: 600;
    transition: 0.2s ease;
}

.cancel:hover {
    background: rgba(220, 38, 38, 0.2);
    transform: translateY(-2px);
}
</style>