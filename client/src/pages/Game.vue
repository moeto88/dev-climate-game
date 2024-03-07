<template>
<v-layout>
    <Header :room="room" :user="user" />
    <v-main class="mt-3">
        <v-container class="mx-0" fluid>
            <Mission :user="user"/>
            <v-row class="px-10 mt-10">
                <v-col cols="12" md="8">
                    <v-row>
                        <v-col cols="12">
                            <v-card :elevation="3" class="d-flex align-center justify-center position-relative" style="border: 0.1px solid rgb(148, 148, 148);">
                                <v-img :width="1000" aspect-ratio="16/9" cover :src="worldImage"></v-img>
                                
                                <span v-if="usernameList.username_A == user.name">
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-A mt-1" color="green-accent-4" size="35" @click="showInfo('A')"></v-icon>
                                    <div class="text-on-image-A font-weight-bold text-h5">{{ usernameList.username_A }}</div>
                                </span>
                                <span v-else>
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-A" color="red-darken-1" size="30" @click="showInfo('A')"></v-icon>
                                    <div class="text-on-image-A font-weight-bold">{{ usernameList.username_A }}</div>
                                </span>
                                
                                <span v-if="usernameList.username_B == user.name">
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-B mt-1" color="green-accent-4" size="35" @click="showInfo('B')"></v-icon>
                                    <div class="text-on-image-B font-weight-bold text-h5">{{ usernameList.username_B }}</div>
                                </span>
                                <span v-else>
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-B" color="red-darken-1" size="30" @click="showInfo('B')"></v-icon>
                                    <div class="text-on-image-B font-weight-bold">{{ usernameList.username_B }}</div>
                                </span>
                                
                                <span v-if="usernameList.username_C == user.name">
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-C mt-1" color="green-accent-4" size="35" @click="showInfo('C')"></v-icon>
                                    <div class="text-on-image-C font-weight-bold text-h5">{{ usernameList.username_C }}</div>
                                </span>
                                <span v-else>
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-C" color="red-darken-1" size="30" @click="showInfo('C')"></v-icon>
                                    <div class="text-on-image-C font-weight-bold">{{ usernameList.username_C }}</div>
                                </span>
                                
                                <span v-if="usernameList.username_D == user.name">
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-D mt-1" color="green-accent-4" size="35" @click="showInfo('D')"></v-icon>
                                    <div class="text-on-image-D font-weight-bold text-h5">{{ usernameList.username_D }}</div>
                                </span>
                                <span v-else>
                                    <v-icon icon="mdi-radiobox-marked" class="button-on-image-D" color="red-darken-1" size="30" @click="showInfo('D')"></v-icon>
                                    <div class="text-on-image-D font-weight-bold">{{ usernameList.username_D }}</div>

                                </span>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="4">
                    <v-row class="justify-center">
                        <v-col align="center" cols="auto" class="pb-0">
                            <v-radio-group v-model="cardRadio" inline>
                                <v-radio style="color: black" label="Main" value="1"></v-radio>
                                <v-radio style="color: black" label="Resource" value="2"></v-radio>
                                <v-radio style="color: black" label="Power Plants" value="3"></v-radio>
                                <v-radio style="color: black" label="Technology" value="4"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center" v-if="selectedUser">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h4 font-weight-bold">{{ selectedUser.name }} <span v-if="youFlag" class="text-h4 font-weight-bold" style="color:red">(You)</span></span><span class="text-h5 font-weight-bold mx-2"> - Country {{ user.country }}</span>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center" v-if="selectedUser && !youFlag">
                        <v-col cols="auto" class="pt-0">
                            <div class="text-h6 font-weight-bold">Energy Target: {{ selectedUser.resourceSet.energyTarget }}</div>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center" class="mt-6">
                        <div v-if="cardRadio=='1'">
                            <v-col cols="12" class="pt-0">
                                <ParamCard :user="selectedUser" :room="room" v-if="selectedUser" />
                                <v-card class="d-flex align-center justify-center position-relative mx-auto" max-width="300" height="400" :elevation="5" v-if="!selectedUser">
                                    <v-card-text class="text-center font-weight-bold text-body-1">
                                        Select a country on the map.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='2'">
                            <v-col cols="12" class="pt-0">
                                <ResourceCard :user="selectedUser" v-if="selectedUser" />
                                <v-card class="d-flex align-center justify-center position-relative mx-auto" max-width="300" height="400" :elevation="5" v-if="!selectedUser">
                                    <v-card-text class="text-center font-weight-bold text-body-1">
                                        Select a country on the map.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='3'">
                            <v-col cols="12" class="pt-0">
                                <PPCard :user="selectedUser" v-if="selectedUser" />
                                <v-card class="d-flex align-center justify-center position-relative mx-auto" max-width="300" height="400" :elevation="5" v-if="!selectedUser">
                                    <v-card-text class="text-center font-weight-bold text-body-1">
                                        Select a country on the map.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='4'">
                            <v-col cols="12" class="pt-0">
                                <TechnologyCard :user="selectedUser" v-if="selectedUser" />
                                <v-card class="d-flex align-center justify-center position-relative mx-auto" max-width="300" height="400" :elevation="5" v-if="!selectedUser">
                                    <v-card-text class="text-center font-weight-bold text-body-1">
                                        Select a country on the map.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-layout>
<Footer />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import { useLocation } from 'react-router-dom'
import Mission from "../components/Mission.vue"
import Header from "../components/Header.vue"
import ParamCard from "../components/ParamCard.vue"
import PPCard from '../components/PPCard.vue'
import ResourceCard from "../components/ResourceCard.vue"
import TechnologyCard from "../components/TechnologyCard.vue"
import Footer from "../components/Footer.vue"


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Game",
    components: {
        Header,
        Mission,
        ParamCard,
        PPCard,
        ResourceCard,
        TechnologyCard,
        Footer
    },  
    data() {
        return {
            worldImage: require("../assets/world-map.png"),
            selectedUser: null,
            youFlag: true,
            cardRadio: "1",
            initialRendering: true
        }
    },
    mounted() {
        this.socket.on("initGame", (user) => {
            console.log("initGame!!")
            this.updateUser(user)
            this.selectedUser = user
        })
        this.socket.on("updateAll", (room) => {
            console.log("updateAll!!")
            this.updateRoom(room)
            this.updateWeather(room)

            const thisUser = room.users.find(user => user.name === this.user.name);
            this.updateUser(thisUser)
        })
        this.socket.on("updateUser", (user) => {
            console.log("updateUser!!")
            this.updateUser(user)
            this.selectedUser = user
        })
        this.socket.on("setUsername", (room) => {
            this.updateRoom(room)
            const user_A = this.room.users.find(user => user.country === "A");
            const username_A = user_A ? user_A.name : ""
            const user_B = this.room.users.find(user => user.country === "B");
            const username_B = user_B ? user_B.name : ""
            const user_C = this.room.users.find(user => user.country === "C");
            const username_C = user_C ? user_C.name : ""
            const user_D = this.room.users.find(user => user.country === "D");
            const username_D = user_D ? user_D.name : ""
            this.updateUsername(username_A, username_B, username_C, username_D)
        })
        this.socket.on("request", (request) => {
            console.log(request)
            this.updateTradeRequest(request)
        })
        this.socket.on("history", (history) => {
            this.updateHistory(history)
        })
    },
    methods: {
        ...mapMutations(["setUser", "setRoom", "setWeather", "setUsername", "setTradeRequest", "setHistory"]),
        updateUser(user) {
            this.setUser(user)
        },
        updateRoom(room) {
            this.setRoom(room)
        },
        updateWeather(room) {
            this.setWeather(room.weather)
        },
        updateUsername(username_A, username_B, username_C, username_D) {
            this.setUsername({ username_A, username_B, username_C, username_D })
        },
        updateTradeRequest(request) {
            this.setTradeRequest(request)
        },
        updateHistory(history) {
            this.setHistory(history)
        },

        showInfo(country) {
            this.selectedUser = this.room.users.find(user => user.country === country);
            if(this.selectedUser) {
                if(this.selectedUser.id == this.user.id) {
                    this.youFlag = true
                }
                else {
                    this.youFlag = false
                }
            }
        },

        buildFossilPP() {
            this.socket.emit("buildFossilPP", this.room.id, this.user.id)
        },

        buildRenewablePP() {
            this.socket.emit("buildRenewablePP", this.room.id, this.user.id)
        },

        buildNuclearPP() {
            this.socket.emit("buildNuclearPP", this.room.id, this.user.id)
        },
    },
    computed: {
        ...mapState(["socket", "user", "room", "usernameList"])
    },
    beforeUnmount() {
        this.socket.off("initGame");
        this.socket.off("updateAll");
        this.socket.off("updateUser");
        this.socket.off("setUsername");
        this.socket.off("request");
        this.socket.off("history");
    },
}
</script>

<style scoped>
.button-on-image-A {
    position: absolute;
    top: 55%; 
    left: 34%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.text-on-image-A {
    position: absolute;
    top: 51%; 
    left: 34%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: white;
    text-shadow:
        1px 1px 0 #000,
        -1px 1px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000;
}

.button-on-image-B {
    position: absolute;
    top: 40%;
    left: 85%;
    transform: translate(-50%, -50%); 
    z-index: 1;
}

.text-on-image-B {
    position: absolute;
    top: 36%;
    left: 85%;
    transform: translate(-50%, -50%); 
    z-index: 1;
    color: white;
    text-shadow:
        1px 1px 0 #000,
        -1px 1px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000;
}

.button-on-image-C {
    position: absolute;
    top: 65%; 
    left: 63%; 
    transform: translate(-50%, -50%); 
    z-index: 1; 
}

.text-on-image-C {
    position: absolute;
    top: 61%; 
    left: 63%; 
    transform: translate(-50%, -50%); 
    z-index: 1; 
    color: white;
    text-shadow:
        1px 1px 0 #000,
        -1px 1px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000;
}

.button-on-image-D {
    position: absolute;
    top: 80%; 
    left: 78.5%;
    transform: translate(-50%, -50%); 
    z-index: 1; 
}

.text-on-image-D {
    position: absolute;
    top: 76%; 
    left: 78.5%;
    transform: translate(-50%, -50%); 
    z-index: 1; 
    color: white;
    text-shadow:
        1px 1px 0 #000,
        -1px 1px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000;
}
</style>