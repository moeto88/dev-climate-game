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
                    <v-row justify="center" align="center" class="mt-10">
                        <v-col cols="auto">
                            <BuildPP />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="8" class="mt-8 px-0">
                    <v-card class="pa-8 pt-3" width="1100" color="lime-lighten-5">
                        <v-row justify="center">
                            <v-col cols="12" class="d-flex align-center justify-center pb-0">
                                <v-card-title class="text-h4 font-weight-bold">Fuel Power Plants</v-card-title>
                                <v-card-title class="text-h5 font-weight-bold">Weather Condition: {{ weather }}</v-card-title>
                            </v-col>
                        </v-row>
                        <v-card :elevation="4" class="mt-5 py-5 px-13">
                            <v-row>
                                <v-col cols="4">
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <span class="text-h5"> Fossil Fuel Power Plant</span>
                                        </v-col>
                                    </v-row>
                                    <v-card border :elevation="0" rounded="xl" color="cyan-lighten-5" class="pa-3">
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-lightning-bolt" size="25" color="yellow-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> Energy Output:  {{ room.ppInfo.fossil.energyOutput }} kW </div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-fire" size="25" color="red-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> Consumption: {{ room.ppInfo.fossil.consumption }} </div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex">
                                                <v-icon icon="mdi-molecule-co2" size="25" color="green-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> CO2 Emission: {{ room.ppInfo.fossil.co2Emission }} </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" class="d-flex align-center">
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <v-icon icon="mdi-fire-station" size="100" color="red-darken-2"></v-icon>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-icon icon="mdi-close" size="40"></v-icon>
                                        </v-col>
                                        <v-col cols="auto">
                                            <span class="text-h3 font-weight-bold"> {{ user.resourceSet.remainingFuelingTime.fossil }} </span>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="2" align-self="center">
                                    <v-row justify="center">
                                        <v-col cols="auto">
                                            <v-btn size="x-large" color="primary" class="text-h5 font-weight-bold pa-3" @click="fuelFossilPP" :disabled="(user.resourceSet.remainingFuelingTime.fossil <= 0) || (user.resourceSet.resource.fossilFuel < room.ppInfo.fossil.consumption)">
                                                Fuel
                                                <v-icon icon="mdi-fuel" size="30" color="white"></v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" v-if="(user.resourceSet.resource.fossilFuel < room.ppInfo.fossil.consumption)">
                                        <v-col cols="auto">
                                                <div class="text-h6" style="color: red;"> No Fossil Fuel </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>

                        <v-card :elevation="4" class="mt-5 py-5 px-13">
                            <v-row>
                                <v-col cols="4">
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <span class="text-h5"> Renewable Power Plant </span>
                                        </v-col>
                                    </v-row>
                                    <v-card border :elevation="0" rounded="xl" color="cyan-lighten-5" class="pa-3">
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-lightning-bolt" size="25" color="yellow-darken-3" class="mr-2"></v-icon>
                                                <span class="text-body-1" v-if="weather == 'Good'"> Energy Output:  {{ room.ppInfo.renewable.energyOutput + room.weatherParam }} kW </span>
                                                <span class="text-body-1" v-if="weather == 'Bad'"> Energy Output:  {{ room.ppInfo.renewable.energyOutput - room.weatherParam }} kW </span>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-fire" size="25" color="red-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> Consumption: {{ room.ppInfo.renewable.consumption }} </div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex">
                                                <v-icon icon="mdi-molecule-co2" size="25" color="green-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> CO2 Emission: {{ room.ppInfo.renewable.co2Emission }} </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" class="d-flex align-center">
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <v-icon icon="mdi-wind-power" size="100" color="green-darken-2"></v-icon>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-icon icon="mdi-close" size="40"></v-icon>
                                        </v-col>
                                        <v-col cols="auto">
                                            <span class="text-h3 font-weight-bold"> {{ user.resourceSet.remainingFuelingTime.renewable }} </span>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="2" align-self="center">
                                    <v-row justify="center">
                                        <v-col cols="auto">
                                            <v-btn size="x-large" color="primary" class="text-h5 font-weight-bold pa-3" @click="operateRenewablePP" :disabled="(user.resourceSet.remainingFuelingTime.renewable <= 0)">
                                                Operate
                                                <v-icon icon="mdi-pinwheel-outline" size="30" color="white"></v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>

                        <v-card :elevation="4" class="mt-5 py-5 px-13">
                            <v-row>
                                <v-col cols="4">
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <span class="text-h5"> Nuclear Power Plant </span>
                                        </v-col>
                                    </v-row>
                                    <v-card border :elevation="0" rounded="xl" color="cyan-lighten-5" class="pa-3">
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-lightning-bolt" size="25" color="yellow-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> Energy Output:  {{ room.ppInfo.nuclear.energyOutput }} kW </div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex pb-0">
                                                <v-icon icon="mdi-fire" size="25" color="red-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> Consumption: {{ room.ppInfo.nuclear.consumption }} </div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify=center>
                                            <v-col cols="auto" class="d-flex">
                                                <v-icon icon="mdi-molecule-co2" size="25" color="green-darken-3" class="mr-2"></v-icon>
                                                <div class="text-body-1"> CO2 Emission: {{ room.ppInfo.nuclear.co2Emission }} </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" class="d-flex align-center">
                                    <v-row align="center" justify="center">
                                        <v-col cols="3">
                                            <v-img max-height="100" max-width="100" aspect-ratio="1/1" cover :src="nuclearImage"></v-img>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-icon icon="mdi-close" size="40"></v-icon>
                                        </v-col>
                                        <v-col cols="auto">
                                            <span class="text-h3 font-weight-bold"> {{ user.resourceSet.remainingFuelingTime.nuclear }} </span>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="2" align-self="center">
                                    <v-row justify="center">
                                        <v-col cols="auto">
                                            <v-btn size="x-large" color="primary" class="text-h5 font-weight-bold pa-3" @click="fuelNuclearPP" :disabled="(user.resourceSet.remainingFuelingTime.nuclear <= 0) || (user.resourceSet.resource.uranium < room.ppInfo.nuclear.consumption)">
                                                Fuel
                                                <v-icon icon="mdi-fuel" size="30" color="white"></v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" v-if="(user.resourceSet.resource.uranium < room.ppInfo.nuclear.consumption)">
                                        <v-col cols="auto">
                                                <div class="text-h6" style="color: red;"> No Uranium </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
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
import BuildPP from '../components/BuildPP.vue'
import PPCard from '../components/PPCard.vue'
import TechnologyCard from '../components/TechnologyCard.vue'
import Footer from "../components/Footer.vue"

export default {
    name: "FuelPP",
    components: {
        Header,
        Mission,
        ParamCard,
        ResourceCard,
        PPCard,
        TechnologyCard,
        BuildPP,
        Footer
    },  
    data() {
        return {
            cardRadio: "1",
            nuclearImage: require("../assets/nuclear-plant.png"),
        }
    },
    methods: {
        ...mapMutations(["setUser", "setRoom", "setWeather", "setTradeRequest", "setHistory"]),
        fuelFossilPP() {
            this.socket.emit("fuelFossilPP", this.room.id, this.user.id)
        },

        operateRenewablePP() {
            this.socket.emit("operateRenewablePP", this.room.id, this.user.id)
        },

        fuelNuclearPP() {
            this.socket.emit("fuelNuclearPP", this.room.id, this.user.id)
        },

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
    computed: {
        ...mapState(["socket", "user", "room", "weather"])
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
.main {
    margin-top: 5em;
}
</style>