import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api.js'

export const useGlobalStore = defineStore('global', () => {

    const user = reactive({
        token: localStorage.getItem('token') || null,
        id: null,
        email: null,
        isAdmin: false
    })

    async function getUserDetails() {
        const token = localStorage.getItem('token')
        user.token = token

        if (!token) {
            clearUser()
            return
        }

        try {
            const { data } = await api.get('/users/details')

            user.id = data._id
            user.email = data.email
            user.isAdmin = data.isAdmin || false

        } catch (err) {
            console.error('Failed to fetch user details:', err)
            clearUser()
        }
    }

    function setUser(token) {
        user.token = token
        localStorage.setItem('token', token)

        getUserDetails()
    }

    function clearUser() {
        user.token = null
        user.id = null
        user.email = null
        user.isAdmin = false
        localStorage.removeItem('token')
    }

    return {
        user,
        getUserDetails,
        setUser,
        clearUser
    }
})