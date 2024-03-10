<template>
    <v-col cols="auto" class="pa-0">
        <v-card max-width="315" max-height="400" class="mx-auto" :elevation="5">
            <v-container>
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="yellow-lighten-2" max-height="110">
                            <v-row align="center" justify="space-between">
                                <v-col>
                                    <v-card-title class="text-h5">Total Energy Output</v-card-title>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-right pt-0">
                                    <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.totalEnergyOutput }} kW</v-card-text>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
        
                    <v-col cols="12">
                        <v-card color="light-green-lighten-2" max-height="110">
                            <v-row align="center" justify="space-between" class="pr-1">
                                <v-col>
                                    <v-card-title class="text-h5">Total CO2 Emissions</v-card-title>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-right pt-0">
                                    <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.totalCO2Emission }} kt</v-card-text>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name: "SummaryCard",
    props: ["user"],
    data() {
        return {
        }
    },
    computed: {
    },
}
</script>