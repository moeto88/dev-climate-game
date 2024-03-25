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
                <v-col cols="auto" class="mr-7 mb-10">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[0].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[0].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold">Ending Balance: €{{ room.users[0].resourceSet.remainingBalance }} M</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold" v-if="room.users[0].num_meetingTarget <= 1">Energy Target: Achieved {{ room.users[0].num_meetingTarget }} time</span>
                            <span class="text-h5 font-weight-bold" v-else>Energy Target: Achieved {{ room.users[0].num_meetingTarget }} times</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="py-0">
                            <v-radio-group v-model="cardRadio_1" inline>
                                <v-radio style="color: black" label="Main" value="1"></v-radio>
                                <v-radio style="color: black" label="Money" value="2"></v-radio>
                                <v-radio style="color: black" label="Resource" value="3"></v-radio>
                                <v-radio style="color: black" label="Power Plants" value="4"></v-radio>
                                <v-radio style="color: black" label="Technology" value="5"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <div v-if="cardRadio_1=='1'">
                            <v-col cols="12" class="pt-0">
                                <SummaryCard :user="room.users[0]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_1=='2'">
                            <v-col cols="12" class="pt-0">
                                <SummaryMoneyCard :user="room.users[0]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_1=='3'">
                            <v-col cols="12" class="pt-0">
                                <ResourceCard :user="room.users[0]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_1=='4'">
                            <v-col cols="12" class="pt-0">
                                <PPCard :user="room.users[0]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_1=='5'">
                            <v-col cols="12" class="pt-0">
                                <TechnologyCard :user="room.users[0]" />
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="auto" class="ml-7 mb-10">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[1].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[1].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold">Ending Balance: €{{ room.users[1].resourceSet.remainingBalance }} M</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold" v-if="room.users[1].num_meetingTarget <= 1">Energy Target: Achieved {{ room.users[1].num_meetingTarget }} time</span>
                            <span class="text-h5 font-weight-bold" v-else>Energy Target: Achieved {{ room.users[1].num_meetingTarget }} times</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="py-0">
                            <v-radio-group v-model="cardRadio_2" inline>
                                <v-radio style="color: black" label="Main" value="1"></v-radio>
                                <v-radio style="color: black" label="Money" value="2"></v-radio>
                                <v-radio style="color: black" label="Resource" value="3"></v-radio>
                                <v-radio style="color: black" label="Power Plants" value="4"></v-radio>
                                <v-radio style="color: black" label="Technology" value="5"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <div v-if="cardRadio_2=='1'">
                            <v-col cols="12" class="pt-0">
                                <SummaryCard :user="room.users[1]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_2=='2'">
                            <v-col cols="12" class="pt-0">
                                <SummaryMoneyCard :user="room.users[1]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_2=='3'">
                            <v-col cols="12" class="pt-0">
                                <ResourceCard :user="room.users[1]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_2=='4'">
                            <v-col cols="12" class="pt-0">
                                <PPCard :user="room.users[1]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_2=='5'">
                            <v-col cols="12" class="pt-0">
                                <TechnologyCard :user="room.users[1]" />
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-10">
                <v-col cols="auto" class="mr-7 mb-10">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[2].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[2].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold">Ending Balance: €{{ room.users[2].resourceSet.remainingBalance }} M</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold" v-if="room.users[2].num_meetingTarget <= 1">Energy Target: Achieved {{ room.users[2].num_meetingTarget }} time</span>
                            <span class="text-h5 font-weight-bold" v-else>Energy Target: Achieved {{ room.users[2].num_meetingTarget }} times</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="py-0">
                            <v-radio-group v-model="cardRadio_3" inline>
                                <v-radio style="color: black" label="Main" value="1"></v-radio>
                                <v-radio style="color: black" label="Money" value="2"></v-radio>
                                <v-radio style="color: black" label="Resource" value="3"></v-radio>
                                <v-radio style="color: black" label="Power Plants" value="4"></v-radio>
                                <v-radio style="color: black" label="Technology" value="5"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <div v-if="cardRadio_3=='1'">
                            <v-col cols="12" class="pt-0">
                                <SummaryCard :user="room.users[2]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_3=='2'">
                            <v-col cols="12" class="pt-0">
                                <SummaryMoneyCard :user="room.users[2]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_3=='3'">
                            <v-col cols="12" class="pt-0">
                                <ResourceCard :user="room.users[2]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_3=='4'">
                            <v-col cols="12" class="pt-0">
                                <PPCard :user="room.users[2]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_3=='5'">
                            <v-col cols="12" class="pt-0">
                                <TechnologyCard :user="room.users[2]" />
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="auto" class="ml-7 mb-10">
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <span class="text-h4 font-weight-bold">{{ room.users[3].name }}</span>
                            <span class="text-h5 font-weight-bold"> - Country {{ room.users[3].country }}</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold">Ending Balance: €{{ room.users[3].resourceSet.remainingBalance }} M</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="pt-0">
                            <span class="text-h5 font-weight-bold" v-if="room.users[3].num_meetingTarget <= 1">Energy Target: Achieved {{ room.users[3].num_meetingTarget }} time</span>
                            <span class="text-h5 font-weight-bold" v-else>Energy Target: Achieved {{ room.users[3].num_meetingTarget }} times</span>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="auto" class="py-0">
                            <v-radio-group v-model="cardRadio_4" inline>
                                <v-radio style="color: black" label="Main" value="1"></v-radio>
                                <v-radio style="color: black" label="Money" value="2"></v-radio>
                                <v-radio style="color: black" label="Resource" value="3"></v-radio>
                                <v-radio style="color: black" label="Power Plants" value="4"></v-radio>
                                <v-radio style="color: black" label="Technology" value="5"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <div v-if="cardRadio_4=='1'">
                            <v-col cols="12" class="pt-0">
                                <SummaryCard :user="room.users[3]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_4=='2'">
                            <v-col cols="12" class="pt-0">
                                <SummaryMoneyCard :user="room.users[3]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_4=='3'">
                            <v-col cols="12" class="pt-0">
                                <ResourceCard :user="room.users[3]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_4=='4'">
                            <v-col cols="12" class="pt-0">
                                <PPCard :user="room.users[3]" />
                            </v-col>
                        </div>
                        <div v-if="cardRadio_4=='5'">
                            <v-col cols="12" class="pt-0">
                                <TechnologyCard :user="room.users[3]" />
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapState } from 'vuex';
import SummaryCard from "../components/SummaryCard.vue"
import SummaryMoneyCard from "../components/SummaryMoneyCard.vue"
import ResourceCard from "../components/ResourceCard.vue";
import PPCard from '../components/PPCard.vue';
import TechnologyCard from '../components/TechnologyCard.vue';
import RoomHeader from "../components/RoomHeader.vue"
export default {
    name: "EndGame",
    components: { 
        SummaryCard,
        SummaryMoneyCard,
        ResourceCard,
        PPCard,
        TechnologyCard,
        RoomHeader
    },
    data() {
        return {
            cardRadio_1: "1",
            cardRadio_2: "1",
            cardRadio_3: "1",
            cardRadio_4: "1",
        }
    },
    computed: {
        ...mapState(["room"])
    },
}
</script>