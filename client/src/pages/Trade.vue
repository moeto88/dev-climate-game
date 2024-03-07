<template>
    <Header :room="room" :user="user" />
    <v-main class="mt-3">
        <v-container class="mx-0" fluid>
            <Mission :user="user"/>
            <v-row class="mt-3">
                <v-col cols="4">
                    <v-row class="mb-2 mt-5" justify="center">
                        <v-col cols="auto">
                            <span class="text-h3 font-weight-bold">{{ user.name }} <span class="text-h4 font-weight-bold"> - Country {{ user.country }} </span></span>
                        </v-col>
                    </v-row>
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
                    <v-row justify="center">
                        <div v-if="cardRadio=='1'">
                            <v-col cols="auto">
                                <ParamCard :user="user" :room="room" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='2'">
                            <v-col cols="auto">
                                <ResourceCard :user="user" :room="room" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='3'">
                            <v-col cols="auto">
                                <PPCard :user="user" :room="room" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio=='4'">
                            <v-col cols="auto">
                                <TechnologyCard :user="user" :room="room" />
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="8" class="mt-8 px-0">
                    <v-card class="pa-5" width="1100" :elevation="4">
                        <v-row justify="center" align="center">
                            <v-col cols="auto">
                                <v-card-title class="text-h4 font-weight-bold"> Trade </v-card-title>
                            </v-col>
                        </v-row>
                        <v-row justify="center" align="center">
                            <v-col cols="12" class="pt-0">
                                <v-card>
                                    <v-tabs align-tabs="center" v-model="tab" color="deep-purple-accent-4">
                                        <v-tab v-for="(partner, index) in otherUsers" :key="index" :value="index + 1">{{ partner.name }}</v-tab>
                                    </v-tabs>
                                
                                    <v-card-text>
                                        <v-window v-model="tab">
                                            <v-window-item v-for="(partner, index) in otherUsers" :key="index" :value="index + 1">
                                                <v-table>
                                                    <thead style="background-color: #BBDEFB;">
                                                        <tr>
                                                            <th class="font-weight-bold text-subtitle-1">Resource</th>
                                                            <th class="font-weight-bold text-subtitle-1">Quantity</th>
                                                            <th class="font-weight-bold text-subtitle-1">Ask</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(value, key) in partner.resourceSet.resource" :key="key">
                                                            <td>{{ room.resourceName[key] }}</td>
                                                            <td>{{ value }}</td>
                                                            <td><AskDialog :keyName="key" :partnerId="partner.id" :type="'resource'"/></td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                                <v-table>
                                                    <thead style="background-color: #BBDEFB;">
                                                        <tr>
                                                            <th class="font-weight-bold text-subtitle-1">Power Plants</th>
                                                            <th class="font-weight-bold text-subtitle-1">Owned</th>
                                                            <th class="font-weight-bold text-subtitle-1">Ask</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(value, key) in partner.resourceSet.powerPlant" :key="key">
                                                            <td>{{ room.technologyName[key] }}</td>
                                                            <td>{{ value }}</td>
                                                            <td><AskDialog :keyName="key" :partnerId="partner.id" :type="'powerPlant'"/></td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                                <v-table>
                                                    <thead style="background-color: #BBDEFB;">
                                                        <tr>
                                                            <th class="font-weight-bold text-subtitle-1">Technology</th>
                                                            <th class="font-weight-bold text-subtitle-1">Owned</th>
                                                            <th class="font-weight-bold text-subtitle-1">Ask</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(value, key) in partner.resourceSet.technology" :key="key">
                                                            <td>{{ room.technologyName[key] }}</td>
                                                            <td v-if="value == true">Yes</td>
                                                            <td v-else>No</td>
                                                            <td><AskDialog :keyName="key" :partnerId="partner.id" :type="'technology'"/></td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </v-window-item>
                                        </v-window>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <Footer />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Mission from "../components/Mission.vue"
import Header from "../components/Header.vue"
import ParamCard from '../components/ParamCard.vue'
import ResourceCard from '../components/ResourceCard.vue'
import PPCard from '../components/PPCard.vue'
import TechnologyCard from '../components/TechnologyCard.vue'
import AskDialog from '../components/AskDialog.vue'
import Footer from "../components/Footer.vue"

export default {
     // eslint-disable-next-line vue/multi-word-component-names
    name: "Trade",
    components: {
        Header,
        Mission,
        ParamCard,
        ResourceCard,
        PPCard,
        TechnologyCard,
        AskDialog,
        Footer
    },  
    data() {
        return {
            cardRadio: "1",
            nuclearImage: require("../assets/nuclear-plant.png"),
            tab: null,
            dialog: false
        }
    },
    methods: {
        ...mapMutations(["setUser", "setRoom", "setWeather", "setTradeRequest", "setHistory"]),

        updateUser(user) {
            this.setUser(user)
        },
        updateRoom(room) {
            this.setRoom(room)
        },
        updateWeather(room) {
            this.setWeather(room.weather)
        },
        updateTradeRequest(request) {
            this.setTradeRequest(request)
        },
        updateHistory(history) {
            this.setHistory(history)
        },
    },
    computed: {
        ...mapState(["socket", "user", "room"]),

        otherUsers() {
            return this.room.users.filter(user => user.id !== this.user.id);
        }
    },
    mounted() {
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
        })
        this.socket.on("request", (request) => {
            console.log(request)
            this.updateTradeRequest(request)
        })
        this.socket.on("history", (history) => {
            this.updateHistory(history)
        })
    },
    beforeUnmount() {
        this.socket.off("updateAll");
        this.socket.off("updateUser");
        this.socket.off("request");
        this.socket.off("history");
    },
}
</script>

<style scoped>
</style>