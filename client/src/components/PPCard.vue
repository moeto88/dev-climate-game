<template>
    <v-row class="justify-center">
        <v-col cols="auto" class="pt-0 pb-4">
            <span class="text-h5 font-weight-bold">Power Plants</span>
        </v-col>
    </v-row>
    <v-row class="justify-center">
        <v-col cols="auto" class="pa-0">
            <v-card class="pa-3" max-width="300" :elevation="3">
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="red-lighten-5 pa-3">
                            <v-row align="center" justify="center" style="max-height: 40px;">
                                <v-col cols="auto" class="pa-0 pt-2">
                                    <span class="text-h6 font-weight-bold"> Fossil Fuel </span>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex align-center justify-space-between mx-10">
                                <v-col cols="auto">
                                    <v-icon icon="mdi-fire-station" size="50" color="red-darken-2"></v-icon>
                                </v-col>
                                <v-col cols="auto">
                                    <v-icon icon="mdi-close" size="30"></v-icon>
                                </v-col>
                                <v-col cols="auto">
                                    <span class="text-h4 font-weight-bold"> {{ user.resourceSet.powerPlant.fossil }} </span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="green-lighten-5 pa-3">
                            <v-row align="center" justify="center" style="max-height: 40px;">
                                <v-col cols="auto" class="pa-0 pt-2">
                                    <span class="text-h6 font-weight-bold"> Renewable </span>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex align-center justify-space-between mx-10">
                                <v-col cols="auto">
                                    <v-icon icon="mdi-wind-power" size="50" color="green-darken-2"></v-icon>
                                </v-col>
                                <v-col cols="auto">
                                    <v-icon icon="mdi-close" size="30"></v-icon>
                                </v-col>
                                <v-col cols="auto">
                                    <span class="text-h4 font-weight-bold"> {{ user.resourceSet.powerPlant.renewable }} </span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="yellow-lighten-5 pa-3">
                            <v-row align="center" justify="center" style="max-height: 40px;">
                                <v-col cols="auto" class="pa-0 pt-2">
                                    <span class="text-h6 font-weight-bold"> Nuclear </span>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex align-center justify-space-between mx-10">
                                <v-col cols="auto">
                                    <v-img :width="50" aspect-ratio="1/1" cover :src="nuclearImage"></v-img>
                                </v-col>
                                <v-col cols="auto">
                                    <v-icon icon="mdi-close" size="30"></v-icon>
                                </v-col>
                                <v-col cols="auto">
                                    <span class="text-h4 font-weight-bold"> {{ user.resourceSet.powerPlant.nuclear }} </span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "PPCard",
    props: ["user"],
    components: {
    },
    data() {
        return {
            nuclearImage: require("../assets/nuclear-plant.png"),
        }
    },
}
</script>