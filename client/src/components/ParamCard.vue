<template>
    <v-row class="justify-center">
        <v-col cols="auto" class="pt-0 pb-4">
            <span class="text-h5 font-weight-bold">Main Info</span>
        </v-col>
    </v-row>
    <v-row class="justify-center">
        <v-col cols="auto" class="pa-0">
            <v-card max-width="315" max-height="400" class="mx-auto" :elevation="5">
                <v-container>
                    <v-row dense>
                        <v-col cols="12">
                            <v-card color="#EC407A" max-height="110">
                                <v-row align="center" justify="space-between">
                                    <v-col>
                                        <v-card-title class="text-h5">Balance</v-card-title>
                                    </v-col>
                                    <v-col class="text-right pr-8">
                                        <v-icon icon="mdi-cash-100" size="40" color="pink-lighten-5"></v-icon>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">€{{ user.resourceSet.remainingBalance }} M</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card color="yellow-lighten-2" max-height="110">
                                <v-row align="center" justify="space-between">
                                    <v-col>
                                        <v-card-title class="text-h5">Energy Output</v-card-title>
                                    </v-col>
                                    <v-col class="text-right pr-8">
                                        <v-icon icon="mdi-lightning-bolt" size="40" color="yellow-darken-3"></v-icon>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.currentEnergyOutput }} TWh</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
            
                        <v-col cols="12">
                            <v-card color="light-green-lighten-2" max-height="110">
                                <v-row align="center" justify="space-between" class="pr-1">
                                    <v-col>
                                        <v-card-title class="text-h5">CO2 Emissions</v-card-title>
                                    </v-col>
                                    <v-col class="text-right pr-7">
                                        <v-icon icon="mdi-molecule-co2" size="40" color="green-darken-3"></v-icon>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.currentCO2Emission }} bt</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "ParamCard",
    props: ["user", "room"],
}
</script>