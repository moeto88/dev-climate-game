<template>
    <v-row style="max-height: 75px;" justify="center">
        <v-col cols="auto" md="3">
            <v-card color="yellow-lighten-3 mb-8" height="60">
                <v-card-item class="d-flex justify-center py-4">
                    <div class="text-h6 font-weight-bold">
                        Your Energy Target: {{ user.resourceSet.energyTarget }} TWh
                        <v-tooltip activator="parent" location="end" max-width="800px" v-if="room.setting_RG=='green'">
                            <div style="color: white; font-size: 20px;">
                                <p>Energy Target is the amount of electricity you need to produce in this round.</p>
                                <p>You will be get fined if you cannot meet this target.</p>
                            </div>
                        </v-tooltip>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="auto" md="5" v-if="room.setting_co2Emission">
            <v-card color="red-accent-1 mb-8" height="60">
                <v-card-item class="d-flex justify-center py-4">
                    <div class="text-h6 font-weight-bold">
                        Your CO2 Emission This Round: {{ user.resourceSet.currentCO2Emission }} bt
                        <v-tooltip activator="parent" location="end" v-if="room.setting_RG=='green'">
                            <div style="color: white; font-size: 20px;">
                                <p>This number represents your CO2 Emission this round.</p>
                                <p>You'll have to pay a emission tax according to the tax rate.</p>
                                <p>CO2 Emission Tax Rate: €{{ room.emission_fineList.fine_co2Emission }} M / 10 bt</p>
                            </div>
                        </v-tooltip>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Mission",
    props: ["user"],
    computed: {
        ...mapState(["room"])
    },

}
</script>