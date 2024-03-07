<template>
    <v-bottom-navigation v-model="value" :bg-color="color" mode="shift" density="comfortable" height="80">

        <v-btn width="200" :to="{name: 'main'}">
            <v-icon size="30">mdi-map-outline</v-icon>
            <span class="text-subtitle-2 font-weight-bold">Main</span>
        </v-btn>

        <v-btn width="200" :to="{name: 'fuel'}">
            <v-icon size="30">mdi-fuel</v-icon>
            <span class="text-subtitle-2 font-weight-bold">Fuel</span>
        </v-btn>

        <v-btn width="200" :to="{name: 'trade'}">
            <v-icon size="30">mdi-handshake-outline</v-icon>
            <span class="text-subtitle-2 font-weight-bold">Trade</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Footer",
    components: {
    },
    data() {
        return {
            value: 0
        }
    },
    computed: {
        color() {
            switch (this.value) {
                case 0:
                    return 'primary'
                case 1:
                    return 'red'
                case 2:
                    return 'green'
                default:
                    return 'primary'
            }
        },
    },
}
</script>