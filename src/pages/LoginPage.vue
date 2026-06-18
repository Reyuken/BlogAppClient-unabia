<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useGlobalStore } from '../stores/global';
import api from '@/api';
import { useRouter } from 'vue-router';

const store = useGlobalStore();
const router = useRouter();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

onBeforeMount(() => {
    if (store.user.token) {
        router.push({ path: '/posts' });
    }
});

watch([email, password], ([e, p]) => {
    isEnabled.value = e !== "" && p !== "";
});

async function handleSubmit(e) {
    e.preventDefault();

    try {
        const res = await api.post('/users/login', {
            email: email.value,
            password: password.value
        });

        const token = res.data.access;

        notyf.success("Login Successful");

        store.setUser(token);
        await store.getUserDetails();

        email.value = "";
        password.value = "";

        router.push({ path: '/posts' });

    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Login Failed. Please contact administrator.";

        notyf.error(message);
    }
}
</script>

<template>
    <div class="login-page">

        <h1 class="title">Login</h1>

        <div class="login-container">

            <form @submit="handleSubmit" class="login-card">

                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control custom-input" v-model="email" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control custom-input" v-model="password" />
                </div>

                <div class="d-grid mt-4">

                    <button type="submit" class="btn-primary" v-if="isEnabled">
                        Login
                    </button>

                    <button type="submit" class="btn-disabled" disabled v-else>
                        Login
                    </button>

                </div>

            </form>

            <div class="footer-text">
                Don't have an account yet?
                <router-link :to="{ name: 'Register' }">Click here</router-link>
                to register
            </div>

        </div>

    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: radial-gradient(circle at top,
            #fffaf5,
            #fdf2e9 60%,
            #f5e6da 140%);

    color: #6d4c41;
    padding: 2rem 1rem;
}

/* TITLE */
.title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #b08968;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
}

/* CARD */
.login-card {
    background: rgba(255, 250, 245, 0.9);
    backdrop-filter: blur(10px);

    border: 1px solid rgba(176, 137, 104, 0.25);
    border-radius: 18px;

    padding: 2rem;

    box-shadow: 0 10px 25px rgba(244, 162, 97, 0.12);
}

/* LABELS */
.form-label {
    color: #7b5e57;
    font-size: 0.9rem;
}

/* INPUTS */
.custom-input {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(176, 137, 104, 0.25);
    color: #6d4c41;
}

.custom-input:focus {
    border-color: #f4a261;
    box-shadow: 0 0 0 0.2rem rgba(244, 162, 97, 0.25);
}

/* BUTTON */
.btn-primary {
    background: rgba(244, 162, 97, 0.25);
    border: 1px solid rgba(176, 137, 104, 0.3);
    color: #6d4c41;

    padding: 0.8rem;
    border-radius: 999px;
    font-weight: 700;

    transition: 0.2s ease;
}

.btn-primary:hover {
    background: rgba(244, 162, 97, 0.35);
    transform: translateY(-2px);
}

/* DISABLED BUTTON */
.btn-disabled {
    background: rgba(255, 250, 245, 0.8);
    color: #bfa6a0;
    padding: 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(176, 137, 104, 0.15);
}

/* FOOTER */
.footer-text a {
    color: #b08968;
}
</style>