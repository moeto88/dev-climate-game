import { createStore } from 'vuex';

export default createStore({
    state: {
        socket: null,
        user: {},
        room: {},
        weather: "",
        usernameList: {},
        tradeRequests: [],
        historyList: [],
        historyListOpened: true,
        historyReadIndex: 0
    },
    mutations: {
        setSocket(state, socket) {
            state.socket = socket;
        },
        setUser(state, user) {
            state.user = user
        },
        setRoom(state, room) {
            state.room = room
        },
        setWeather(state, weather) {
            state.weather = weather
        },
        setUsername(state, { username_A, username_B, username_C, username_D }) {
            state.usernameList = {
                username_A: username_A,
                username_B: username_B,
                username_C: username_C,
                username_D: username_D
            }
        },
        setTradeRequest(state, request) {
            state.tradeRequests = [...state.tradeRequests, request]
        },
        deleteTradeRequest(state, tradeId) {
            state.tradeRequests = state.tradeRequests.filter(request => request.tradeId !== tradeId);
        },
        setHistory(state, history) {
            state.historyList = [...state.historyList, history]
            state.historyListOpened = false
        },
        updateHistoryListOpened(state) {
            state.historyListOpened = true
        },
        setHistoryReadIndex(state, index) {
            state.historyReadIndex = index
        }
    },
    actions: {

    },
    getters: {
        
    },
});