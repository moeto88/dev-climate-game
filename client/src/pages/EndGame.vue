<template>
    <RoomHeader />
    <v-main>
        <v-container>
            <v-row justify="center" align="center" class="mt-5">
                <v-col cols="auto">
                    <span class="text-h3 font-weight-bold">Game Summary</span>
                </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-10">
                <v-col cols="auto" class="mr-7">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[0].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[0].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <SummaryCard :user="room.users[0]" />
                    </v-row>
                </v-col>
                <v-col cols="auto" class="ml-7">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[1].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[1].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <SummaryCard :user="room.users[1]" />
                    </v-row>
                </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-10">
                <v-col cols="auto" class="mr-7">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[2].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[2].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <SummaryCard :user="room.users[2]" />
                    </v-row>
                </v-col>
                <v-col cols="auto" class="ml-7">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[3].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[3].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <SummaryCard :user="room.users[3]" />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapState } from 'vuex';
import SummaryCard from "../components/SummaryCard"
import RoomHeader from "../components/RoomHeader"
export default {
    name: "EndGame",
    components: { 
        SummaryCard,
        RoomHeader
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(["room"])
    },
}
</script>