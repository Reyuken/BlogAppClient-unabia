<script setup>
import { useGlobalStore } from '../stores/global'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { user } = storeToRefs(store)
</script>

<template>
	<nav class="navbar navbar-expand-lg sticky-top custom-navbar shadow-sm">
		<div class="container">

			<router-link :to="{ path: '/' }" class="navbar-brand fw-bold brand-text d-flex align-items-center gap-2">
				Vanilla Blog
			</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav ms-auto">

					<div v-if="user?.isAdmin" class="admin-badge">
						<span class="dot"></span>
						Admin
					</div>

					<router-link :to="{ name: 'Posts' }" class="nav-link nav-item-custom">
						Posts
					</router-link>

					<router-link v-if="!user?.token" :to="{ name: 'Register' }" class="nav-link nav-item-custom">
						Register
					</router-link>

					<router-link v-if="!user?.token" :to="{ name: 'Login' }" class="nav-link nav-item-custom">
						Login
					</router-link>

					<router-link v-if="user?.token" :to="{ name: 'Logout' }"
						class="nav-link nav-item-custom text-danger">
						Logout
					</router-link>

				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.navbar-toggler {
	border-color: rgba(255, 255, 255, 0.6);
}

.navbar-toggler-icon {
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(120,120,120,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.admin-badge {
	color: #b08968;
	font-weight: 700;
	font-size: 0.85rem;
	letter-spacing: 0.8px;

	display: flex;
	align-items: center;
	gap: 6px;

	padding: 6px 10px;
	margin-right: 10px;

	border: 1px solid rgba(176, 137, 104, 0.35);
	background: rgba(255, 240, 230, 0.8);
	border-radius: 999px;
	text-transform: uppercase;
	backdrop-filter: blur(6px);
}

.admin-badge .dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #f4a261;
	box-shadow: 0 0 10px rgba(244, 162, 97, 0.6);
}

.custom-navbar {
	background: linear-gradient(135deg, #fffaf5, #fdf2e9);
	padding: 0.8rem 1rem;
	border-bottom: 1px solid rgba(176, 137, 104, 0.2);
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.brand-text {
	color: #6d4c41 !important;
	font-size: 1.4rem;
	letter-spacing: 0.5px;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-item-custom {
	color: #7b5e57 !important;
	font-weight: 500;
	padding: 6px 12px;
	border-radius: 12px;
	transition: 0.25s ease;
}

.nav-item-custom:hover {
	background: rgba(244, 162, 97, 0.15);
	color: #b08968 !important;
	transform: translateY(-2px);
}

.router-link-active {
	color: #f4a261 !important;
	background: rgba(244, 162, 97, 0.2);
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(244, 162, 97, 0.2);
}

.text-danger:hover {
	background: rgba(229, 115, 115, 0.15);
	color: #e57373 !important;
}
</style>