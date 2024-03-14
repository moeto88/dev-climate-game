<template>
    <v-row class="justify-center">
        <v-col cols="auto" class="pt-0 pb-4">
            <span class="text-h5 font-weight-bold">Resource</span>
        </v-col>
    </v-row>
    <v-row class="justify-center">
        <v-col cols="auto" class="pa-0">
            <v-card max-width="300" max-height="400" class="mx-auto" :elevation="5">
                <v-container>
                    <v-row dense>
                        <v-col cols="12">
                            <v-card color="red-lighten-4" max-height="110">
                                <v-row align="center" justify="space-between">
                                    <v-col>
                                        <v-card-title class="text-h5">Fossil Fuel</v-card-title>
                                    </v-col>
                                    <v-col class="text-right pr-8">
                                        <v-icon icon="mdi-barrel" size="40" color="red-darken-2"></v-icon>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.resource.fossilFuel }} bt</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
            
                        <v-col cols="12">
                            <v-card color="blue-grey-lighten-4" max-height="110">
                                <v-row align="center" justify="space-between">
                                    <v-col>
                                        <v-card-title class="text-h5">Uranium</v-card-title>
                                    </v-col>
                                    <v-col class="pr-8">
                                        <v-img max-height="40" max-width="40" aspect-ratio="1/1" cover :src="uraniumImage" style="margin-left: auto;"></v-img>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-right pt-0">
                                        <v-card-text class="font-weight-bold" style="font-size: 2.3rem">{{ user.resourceSet.resource.uranium }} bt</v-card-text>
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
    name: "ResourceCard",
    props: ["user", "room"],
    data() {
        return {
            uraniumImage: require("../assets/uranium.png"),
        }
    }
}
</script>