<template>
    <span class="px-2">
        <v-btn size="small" color="primary" height="60" class="text-h6 font-weight-bold" @click="dialogBuildPP = true">
            Build Power Plants
            <v-icon icon="mdi-hammer" size="40" color="white"></v-icon>
        </v-btn>
        <v-dialog v-model="dialogBuildPP" width="1200">
            <v-card class="pa-10">
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="auto">
                        <div class="font-weight-bold" style="font-size: 2.3rem" model="user.resourceSet.remainingBalance">Balance: €{{ user.resourceSet.remainingBalance }} M</div>
                    </v-col>
                </v-row>

                <v-card :elevation="4" class="mt-5 pa-3">
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-row style="max-height: 30px;" align="center" justify="center">
                                            <v-col cols="12" class="justify-center">
                                                <span class="text-h5"> Fossil Fuel </span>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="justify-center">
                                                <v-icon icon="mdi-fire-station" size="100" color="red-darken-2"></v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-sheet color="cyan-lighten-5" class="pa-3">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-lightning-bolt" size="40" color="yellow-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Energy Output:  {{ room.ppInfo.fossil.energyOutput }} TWh </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-fire" size="40" color="red-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Consumption: {{ room.ppInfo.fossil.consumption }} bt </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon icon="mdi-molecule-co2" size="40" color="green-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> CO2 Emission: {{ room.ppInfo.fossil.co2Emission }} bt </div>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-btn size="small" color="primary" height="60" class="text-h6 font-weight-bold" @click="buildFossilPP" :disabled="!(user.resourceSet.remainingBalance >= room.ppInfo.fossil.price) || !user.resourceSet.technology.fossil">
                                            Build
                                            <v-icon icon="mdi-hammer" size="40" color="white"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-sheet color="white" class="pa-5">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> - €{{ room.ppInfo.fossil.price }} M </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.remainingBalance >= room.ppInfo.fossil.price" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> Fossil Technology </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.technology.fossil" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card :elevation="4" class="mt-5 pa-3">
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-row style="max-height: 30px;" align="center" justify="center">
                                            <v-col cols="12" class="justify-center">
                                                <span class="text-h5"> Renewable </span>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="justify-center">
                                                <v-icon icon="mdi-wind-power" size="100" color="green-darken-2"></v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-sheet color="cyan-lighten-5" class="pa-3">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-lightning-bolt" size="40" color="yellow-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Energy Output: {{ room.ppInfo.renewable.energyOutput - room.weatherParam }} ~ {{ room.ppInfo.renewable.energyOutput }} TWh </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-fire" size="40" color="red-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Consumption: {{ room.ppInfo.renewable.consumption }} </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon icon="mdi-molecule-co2" size="40" color="green-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> CO2 Emission: {{ room.ppInfo.renewable.co2Emission }} </div>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-btn size="small" color="primary" height="60" class="text-h6 font-weight-bold"  @click="buildRenewablePP" :disabled="!(user.resourceSet.remainingBalance >= room.ppInfo.renewable.price) || !user.resourceSet.technology.renewable">
                                            Build
                                            <v-icon icon="mdi-hammer" size="40" color="white"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-sheet color="white" class="pa-5">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> - €{{ room.ppInfo.renewable.price }} M </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.remainingBalance >= room.ppInfo.renewable.price" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> Renewable Technology </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.technology.renewable" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card :elevation="4" class="mt-5 pa-3">
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-row style="max-height: 30px;" align="center" justify="center" class="mb-1">
                                            <v-col cols="12" class="justify-center">
                                                <span class="text-h5"> Nuclear </span>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="justify-center">
                                                <v-img max-height="100" max-width="100" aspect-ratio="1/1" cover :src="nuclearImage"></v-img>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-sheet color="cyan-lighten-5" class="pa-3">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-lightning-bolt" size="40" color="yellow-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Energy Output:  {{ room.ppInfo.nuclear.energyOutput }} TWh </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center pb-0">
                                                    <v-icon icon="mdi-fire" size="40" color="red-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> Consumption: {{ room.ppInfo.nuclear.consumption }} bt </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon icon="mdi-molecule-co2" size="40" color="green-darken-3" class="mr-2"></v-icon>
                                                    <div class="text-h6"> CO2 Emission: {{ room.ppInfo.nuclear.co2Emission }} </div>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="text-center">
                                <v-row>
                                    <v-col cols="auto" class="d-flex align-center justify-center">
                                        <v-btn size="small" color="primary" height="60" class="text-h6 font-weight-bold"  @click="buildNuclearPP" :disabled="!(user.resourceSet.remainingBalance >= room.ppInfo.nuclear.price) || !user.resourceSet.technology.nuclear">
                                            Build
                                            <v-icon icon="mdi-hammer" size="40" color="white"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-sheet color="white" class="pa-5">
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> - €{{ room.ppInfo.nuclear.price }} M </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.remainingBalance >= room.ppInfo.nuclear.price" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <div class="text-h5"> Nuclear Technology </div>
                                                </v-col>
                                                <v-col cols="auto" class="d-flex align-center justify-center">
                                                    <v-icon v-if="user.resourceSet.technology.nuclear" icon="mdi-check-outline" size="30" color="green" ></v-icon>
                                                    <v-icon v-else icon="mdi-cancel" size="30" color="red"></v-icon>
                                                </v-col>
                                            </v-row>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card>
        </v-dialog>
    </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "BuildPP",
    data() {
        return {
            dialogBuildPP: false,
            nuclearImage: require("../assets/nuclear-plant.png"),
        }
    },
    methods: {
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
        ...mapState(["socket", "user", "room"])
    },
}
</script>