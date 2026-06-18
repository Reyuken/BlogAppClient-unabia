<script>
import BannerComponent from '@/components/BannerComponent.vue';

export default {
    components: {
        BannerComponent,
    },
    data() {
        return {
            bannerProps: {
                title: "404 - Post Not Found",
                logo: "/favicon/android-chrome-512x512.png",
                tagline: "This blog post was deleted, moved, or never published in this collection.",
                destination: { name: "Home" },
                buttonLabel: "Back to Home"
            }
        }
    },
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push({ name: "Home" });
        }
    }
}
</script>

<template>
    <div class="error-wrapper">

        <div class="glow-bg"></div>

        <div class="content">

            <BannerComponent :bannerProps="bannerProps" />

            <div class="hint">
                Looks like this post melted away 🍦📝
            </div>

            <button class="back-btn" @click="goBack">
                ← Go Back
            </button>

        </div>

    </div>
</template>

<style scoped>
.error-wrapper {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background: radial-gradient(circle at top,
            #fffaf5,
            #fdf2e9 60%,
            #f5e6da 140%);

    color: #6d4c41;
    overflow: hidden;
}

.glow-bg {
    position: absolute;
    width: 520px;
    height: 520px;
    background: rgba(244, 162, 97, 0.18);
    filter: blur(140px);
    top: -140px;
    left: -140px;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(30px);
    }
}

.content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 700px;
    padding: 2rem;
}

.hint {
    margin-top: 1.5rem;
    font-size: 0.95rem;
    color: #7b5e57;
}

.back-btn {
    margin-top: 1.5rem;
    padding: 0.65rem 1.4rem;
    border-radius: 999px;
    border: 1px solid rgba(176, 137, 104, 0.35);
    background: rgba(244, 162, 97, 0.18);
    color: #6d4c41;
    font-weight: 600;
    cursor: pointer;
    transition: 0.25s ease;
    backdrop-filter: blur(8px);
}

.back-btn:hover {
    background: rgba(244, 162, 97, 0.28);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(244, 162, 97, 0.15);
}

:deep(button) {
    border-radius: 999px;
}

:deep(img) {
    filter: drop-shadow(0 0 10px rgba(244, 162, 97, 0.25));
}
</style>