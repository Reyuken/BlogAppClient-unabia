<script>
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components: {
    BannerComponent
  },
  data() {
    return {
      bannerProps: {
        title: "Vanilla Blog",
        tagline: "Share ideas. Write stories. Build your digital voice.",
        destination: "posts",
        buttonLabel: "Explore Blog Posts"
      }
    }
  }
}
</script>

<template>
  <div class="home-wrapper">

    <section class="hero">

      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>

      <div class="hero-content">

        <div class="badge">📝 Blog Posting System</div>

        <BannerComponent :bannerProps="bannerProps" />

        <p class="subtext">
          Read posts, share your thoughts, and publish your own blog entries in a clean and simple platform.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top,
      #fffaf5,
      #fdf2e9 55%,
      #f5e6da 120%);
  color: #6d4c41;
  overflow-x: hidden;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.glow {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.25;
}

.glow-1 {
  background: #f4a261;
  top: -120px;
  left: -120px;
}

.glow-2 {
  background: #e9c46a;
  bottom: -140px;
  right: -140px;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: rgba(244, 162, 97, 0.15);
  border: 1px solid rgba(176, 137, 104, 0.35);
  color: #b08968;

  margin-bottom: 1rem;
  box-shadow: 0 0 12px rgba(244, 162, 97, 0.15);
}

.subtext {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #7b5e57;
  line-height: 1.6;
}

.hero-content h1,
.hero-content h2 {
  color: #6d4c41;
  text-shadow: 0 0 18px rgba(244, 162, 97, 0.15);
}

@media (max-width: 768px) {
  .glow {
    width: 260px;
    height: 260px;
  }

  .subtext {
    font-size: 0.9rem;
  }
}
</style>