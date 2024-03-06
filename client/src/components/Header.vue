<template>
<v-app-bar :elevation="2">
    <v-row align="center" justify="space-between" class="w-100">
        <span v-if="mainPageFlag">
            <v-col cols="auto" class="ml-12">
                <v-app-bar-title class="text-h5 font-weight-bold">Round {{ room.roundNum }}</v-app-bar-title>
            </v-col>
        </span>
        <span v-if="!mainPageFlag">
            <v-col cols="auto" class="ml-6 d-flex align-center justify-center">
                <router-link to="/game" style="text-decoration: none; color: inherit;" class="mr-8">
                    <v-icon icon="mdi-arrow-left-thin" size="50" color="black"></v-icon>
                </router-link>
                <v-app-bar-title class="text-h5 font-weight-bold">Round {{ room.roundNum }}</v-app-bar-title>
            </v-col>
        </span>
        <v-col cols="auto">
            <v-app-bar-title class="text-h4 font-weight-bold">Climate Game</v-app-bar-title>
        </v-col>
        <v-col cols="auto" class="mr-5">
            <v-row align="center" justify="center">
                <span v-if="user.host">
                    <v-col cols="auto">
                        <v-btn color="primary" variant="outlined" @click="dialog_caution=true" class="font-weight-bold text-h6">Next Round</v-btn>
                    </v-col>
                </span>
                <v-col cols="auto">
                    <v-btn stacked @click.stop="tradeDrawer = !tradeDrawer" v-if="tradeRequests.length > 0">
                        <v-badge color="error" dot>
                            <v-icon icon="mdi-briefcase-arrow-left-right"></v-icon>
                        </v-badge>
                        Request
                    </v-btn>
                    <v-btn stacked @click.stop="tradeDrawer = !tradeDrawer" v-else>
                        <v-icon icon="mdi-briefcase-arrow-left-right"></v-icon>
                        Request
                    </v-btn>
                    <v-btn stacked @click.stop="historyDrawer = !historyDrawer" v-if="!historyListOpened">
                        <v-badge color="error" dot>
                            <v-icon icon="mdi-clipboard-text-clock-outline"></v-icon>
                        </v-badge>
                        History
                    </v-btn>
                    <v-btn stacked @click.stop="historyDrawer = !historyDrawer" v-else>
                        <v-icon icon="mdi-clipboard-text-clock-outline"></v-icon>
                        History
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-app-bar>
<v-navigation-drawer v-model="tradeDrawer" location="right" temporary width="450" class="pa-7">
    <span v-if="tradeRequests.length > 0">
        <div v-for="request in tradeRequests" :key="request">
            <v-row justify="center" align="center">
                <v-col cols="auto">
                    <v-card variant="outlined" width="300">
                        <v-card-item class="text-center pb-0">
                            <div>
                                <div class="text-h5 font-weight-bold mb-2">{{ request.tradePartner }}</div>
                                <span v-if="request.type == 'resource'">
                                    <div class="text-h6 mb-1">Ask: {{ room.resourceName[request.keyName] }}</div>
                                    <div class="text-h6 mb-1">Quantity: {{ request.quantity }}</div>
                                </span>
                                <span v-if="request.type == 'powerPlant'">
                                    <div class="text-h6 mb-1">Ask: {{ request.keyName.charAt(0).toUpperCase() + request.keyName.slice(1) }} Power Plant</div>
                                    <div class="text-h6 mb-1">Quantity: {{ request.quantity }}</div>
                                </span>
                                <span v-if="request.type == 'technology'">
                                    <div class="text-h6 mb-1">Ask: {{ request.keyName.charAt(0).toUpperCase() + request.keyName.slice(1) }} Technology</div>
                                </span>
                                <div class="text-h6 mb-1">Pay: €{{ request.payment }}</div>
                                <span v-if="!(message1 == '')" style="color: #F44336;" class="text-body-1 mb-1">{{ message1 }}</span>
                                <span v-if="!(message2 == '')" style="color: #F44336;" class="text-body-1 mb-1">{{ message2 }}</span>
                            </div>
                        </v-card-item>
                        <v-card-actions class="justify-center">
                            <v-btn rounded="xl" class="mr-2" color="green" variant="tonal" style="border: 0.1px solid #4CAF50;" @click="accept(request)">
                                Accept
                            </v-btn>
                            <v-btn rounded="xl" class="ml-2" color="red" variant="tonal" style="border: 0.1px solid #F44336;" @click="refuse(request)">
                                Refuse
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </span>
    <span v-else>
        <div class="text-center text-h6">You don't receive any trade requests.</div>
    </span>
</v-navigation-drawer>
<v-navigation-drawer v-model="historyDrawer" location="right" temporary width="450" class="pa-7">
    <span v-if="historyList.length > 0">
        <div v-for="(history, index) in historyList" :key="index">
            <v-row justify="center" align="center">
                <v-col cols="auto">
                    <div :class="{'new-history': index >= historyReadIndex}" class="text-center text-h6">{{ history }}</div>
                </v-col>
            </v-row>
        </div>
    </span>
    <span v-else>
        <div class="text-center text-h6">You don't have any transaction history.</div>
    </span>
</v-navigation-drawer>

<v-dialog v-model="dialog_caution" width="1200">
    <v-card class="pa-10">
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <div class="text-h3" style="color: red">Caution!</div>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <div class="text-h5">Is everyone happy to move on to the next round?</div>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <v-btn color="primary" @click="nextRound">Yes</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="error" @click="dialog_caution=false">No</v-btn>
            </v-col>
        </v-row>
    </v-card>
</v-dialog>

<v-dialog v-model="dialog_nextRoundInfo" width="1200">
    <v-card class="pa-10">
        <div class="text-h4 mb-4">Now, Round {{ roundNum }}</div>
        <div class="text-h5 mb-1">You received a budget of €{{ budget }}</div>
        <div v-if="(room.setting_historicalEmission) && (user.resourceSet.historicalEmission == 'low')" class="text-h5 mb-1">You received €{{ historicalEmissionEarning }} from the developing countries fund</div>
        <div class="text-h5" style="color: red">You got fined €{{ fine }} in total</div>
        <ul>
            <li class="text-h6" style="color: red">€{{ energyTargetFine }} for not meeting your energy target</li>
            <li v-if="room.setting_co2Emission" class="text-h6" style="color: red">€{{ co2EmissionFine }} for your CO2 emissions</li>
            <li v-if="(room.setting_historicalEmission) && (user.resourceSet.historicalEmission !== 'low')" class="text-h6" style="color: red">€{{ historicalEmissionFine }} for contributing the historical emissions</li>
        </ul>
    </v-card>
</v-dialog>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Header",
    props: ["room", "user", "mainPageFlag"],
    data() {
        return {
            tradeDrawer: false,
            historyDrawer: false,
            group: null,
            message1: "",
            message2: "",
            dialog_caution: false,
            dialog_nextRoundInfo: false,
            roundNum: 0,
            budget: 0,
            fine: 0,
            energyTargetFine: 0, 
            co2EmissionFine: 0, 
            historicalEmissionFine: 0, 
            historicalEmissionEarning: 0
        }
    },
    computed: {
        ...mapState(["socket", "tradeRequests","historyList", "historyListOpened", "historyReadIndex"]),
    },
    mounted() {
        this.socket.on("noResource", () => {
            this.message1 = "You don't have enough resource"
        })

        this.socket.on("noPowerPlant", () => {
            this.message1 = "You don't have enough power plant"
        })

        this.socket.on("noMoney", (partner) => {
            this.message2 = partner.name + " doesn't have enough money"
        })

        this.socket.on("deleteTradeRequest", (tradeId) => {
            this.deleteTradeRequest_method(tradeId)
        })

        this.socket.on("show_nextRoundInfo", (roundNum, budget, fine, energyTargetFine, co2EmissionFine, historicalEmissionFine, historicalEmissionEarning) => {
            this.roundNum = roundNum
            this.budget = budget
            this.fine = fine
            this.energyTargetFine = energyTargetFine
            this.co2EmissionFine = co2EmissionFine
            this.historicalEmissionFine = historicalEmissionFine
            this.historicalEmissionEarning = historicalEmissionEarning
            this.dialog_nextRoundInfo = true
        })
    },
    methods: {
        ...mapMutations(["deleteTradeRequest", "updateHistoryListOpened", "setHistoryReadIndex"]),
        nextRound() {
            this.dialog_caution = false
            this.socket.emit("nextRound", this.room.id)
        },

        accept(request) {
            this.socket.emit("acceptRequest", this.room.id, this.user.id, request)
        },

        refuse(request) {
            this.socket.emit("refuseRequest", this.room.id, this.user.id, request)
        },

        deleteTradeRequest_method(tradeId) {
            this.deleteTradeRequest(tradeId)
        },

        updateHistoryListOpened_method() {
            this.updateHistoryListOpened()
        },

        setHistoryReadIndex_method(index) {
            this.setHistoryReadIndex(index)
        }
    },
    watch: {
        group() {
            this.drawer = false
        },

        historyDrawer: function(newVal) {
            if (newVal) {
                this.updateHistoryListOpened_method()
            }

            if (!newVal) {
                this.setHistoryReadIndex_method(this.historyList.length)
            }
        }
    },
    beforeUnmount() {
        this.socket.off("noResource")
        this.socket.off("noPowerPlant")
        this.socket.off("noMoney")
        this.socket.off("deleteTradeRequest")
    }
}
</script>

<style scoped>
.new-history {
    font-weight: bold;
}
</style>