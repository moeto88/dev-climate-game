<template>
    <v-row justify="center" align="center">
        <v-col cols="auto" class="pt-0 pb-4">
            <span class="text-h5 font-weight-bold">Money</span>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="auto" class="pa-0">
            <v-card max-width="315" max-height="400" class="mx-auto" :elevation="5">
                <v-container>
                    <v-row dense>
                        <v-col cols="12">
                            <v-card color="blue-lighten-3" max-height="110">
                                <v-row align="center" justify="space-between">
                                    <v-col>
                                        <v-card-title class="text-h5">Annual Budget</v-card-title>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">€{{ user.budget }} M</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
            
                        <v-col cols="12">
                            <v-card color="green-lighten-3" max-height="110">
                                <v-row align="center" justify="space-between" class="pr-1">
                                    <v-col>
                                        <v-card-title class="text-h5">Total Spending</v-card-title>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">€{{ user.resourceSet.totalSpending }} M</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card color="deep-orange-lighten-3" max-height="110">
                                <v-row align="center" justify="space-between" class="pr-1">
                                    <v-col>
                                        <v-card-title class="text-h5">Total Fine</v-card-title>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">€{{ user.resourceSet.totalFine }} M</v-card-text>
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
    name: "SummaryMoneyCard",
    props: ["user"],
    data() {
        return {
        }
    },
    computed: {
    },
}
</script>