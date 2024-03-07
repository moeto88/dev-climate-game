import { createRouter, createWebHistory } from 'vue-router'
import Room from "../pages/Room.vue"
import Game from "../pages/Game.vue"
import FuelPP from "../pages/FuelPP.vue"
import Trade from "../pages/Trade.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Room
        },
        {
            path: '/game',
            component: Game,
            name: "main"
        },
        {
            path: '/fuel-pp',
            name: "fuel",
            component: FuelPP
        },
        {
            path: "/trade",
            name: "trade",
            component: Trade
        }
    ]
})

export default router