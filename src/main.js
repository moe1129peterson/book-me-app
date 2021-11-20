import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'
import App from './App.vue'

// Components for router
import Home from './views/Home.vue'
import MyBooks from './views/MyBooks.vue'

const router = createRouter({
    history: createWebHistory(), 
    routes: [
        {
            path: '/', 
            name: 'Search', 
            component: Home
        }, 
        {
            path: '/mybooks', 
            name: 'About', 
            component: MyBooks
        }
    ]
})

createApp(App).use(store).use(router).mount('#app')
