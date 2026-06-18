<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '@/api'

const router = useRouter()
const notyf = new Notyf()

const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isEnabled = ref(false)

watch([userName, email, password, confirmPassword], ([u, e, p, c]) => {
    isEnabled.value = u && e && p && c && p === c
})

async function handleRegister(e) {
    e.preventDefault()

    if (password.value !== confirmPassword.value) {
        return notyf.error('Passwords do not match')
    }

    try {
        await api.post('/users/register', {
            userName: userName.value,
            email: email.value,
            password: password.value
        })

        notyf.success('Welcome to your blog space ✍️')

        router.push({ name: 'Login' })

    } catch (err) {
        const message =
            err.response?.data?.message ||
            'Registration failed'

        notyf.error(message)
    }
}
</script>

<template>
    <div class="register-page">

        <h1 class="title">Start Writing</h1>

        <form class="register-card" @submit="handleRegister">

            <label>Username</label>
            <input v-model="userName" type="text" placeholder="Choose a writer name" />

            <label>Email</label>
            <input v-model="email" type="email" placeholder="Enter email" />

            <label>Password</label>
            <input v-model="password" type="password" placeholder="Create password" />

            <label>Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Confirm password" />

            <button type="submit" :disabled="!isEnabled" :class="isEnabled ? 'btn-primary' : 'btn-disabled'">
                Join Blog
            </button>

            <p class="footer">
                Already writing?
                <router-link :to="{ name: 'Login' }">Login</router-link>
            </p>

        </form>

    </div>
</template>

<style scoped>
.register-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: radial-gradient(circle at top,
            #fff7ed,
            #fef3c7 60%,
            #fde68a 140%);

    color: #3f3f46;
    padding: 2rem;
}

.title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #60a5fa;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.register-card {
    width: 340px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);

    border: 1px solid rgba(253, 186, 116, 0.4);
    border-radius: 18px;

    padding: 2rem;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

label {
    display: block;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #57534e;
}

input {
    width: 100%;
    margin-top: 0.3rem;
    padding: 0.7rem;

    border-radius: 10px;
    border: 1px solid #e7e5e4;

    background: #fff;
    color: #111827;
    outline: none;
}

input:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.btn-primary {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.8rem;

    border-radius: 999px;
    border: none;

    background: linear-gradient(135deg, #60a5fa, #93c5fd);
    color: white;

    font-weight: bold;
    cursor: pointer;

    transition: 0.2s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
}

.btn-disabled {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.8rem;

    border-radius: 999px;
    border: none;

    background: #e7e5e4;
    color: #a8a29e;

    cursor: not-allowed;
}

.footer {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #78716c;
    text-align: center;
}

.footer a {
    color: #60a5fa;
}
</style>