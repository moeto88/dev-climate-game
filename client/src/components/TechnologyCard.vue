<template>
    <v-row class="justify-center">
        <v-col cols="auto" class="pt-0 pb-4">
            <span class="text-h5 font-weight-bold">Technology</span>
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
                                    <span class="text-subtitle-1 font-weight-bold"> Fossil Fuel Power Plants </span>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center" class="ma-0 mt-4">
                                <v-col cols="auto" class="pa-0">
                                    <v-icon v-if="user.resourceSet.technology.fossil" icon="mdi-check-circle-outline" size="50" color="blue-darken-2"></v-icon>
                                    <v-icon v-else icon="mdi-close-circle-outline" size="50" color="red-darken-2"></v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="green-lighten-5 pa-3">
                            <v-row align="center" justify="center" style="max-height: 40px;">
                                <v-col cols="auto" class="pa-0 pt-2">
                                    <span class="text-subtitle-1 font-weight-bold"> Renewable Power Plants </span>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center" class="ma-0 mt-4">
                                <v-col cols="auto" class="pa-0">
                                    <v-icon v-if="user.resourceSet.technology.renewable" icon="mdi-check-circle-outline" size="50" color="blue-darken-2"></v-icon>
                                    <v-icon v-else icon="mdi-close-circle-outline" size="50" color="red-darken-2"></v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="yellow-lighten-5 pa-3">
                            <v-row align="center" justify="center" style="max-height: 40px;">
                                <v-col cols="auto" class="pa-0 pt-2">
                                    <span class="text-subtitle-1 font-weight-bold"> Nuclear Power Plants </span>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center" class="ma-0 mt-4">
                                <v-col cols="auto" class="pa-0">
                                    <v-icon v-if="user.resourceSet.technology.nuclear" icon="mdi-check-circle-outline" size="50" color="blue-darken-2"></v-icon>
                                    <v-icon v-else icon="mdi-close-circle-outline" size="50" color="red-darken-2"></v-icon>
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
    name: "TechnologyCard",
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