<template>
    <v-btn @click="askButton" :disabled="(value <= 0) || (value == false)">Ask</v-btn>
    <v-dialog v-model="dialog" width="800">
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card :elevation="0" class="pa-5">
                            <v-row>
                                <v-col cols="auto">
                                    <div v-if="type == 'resource'" class="text-h4 font-weight-bold">Buying {{ room.resourceName[keyName] }}</div>
                                    <div v-else class="text-h4 font-weight-bold">Buying a {{ room.technologyName[keyName] }} Power Plant</div>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="5">
                                    <v-row>
                                        <v-col cols="auto">
                                            <div class="text-h5 d-inline-block font-weight-bold"> {{ partner.name }} </div>
                                            <span class="text-h5 d-inline-block">&nbsp;has:</span>
                                        </v-col>
                                    </v-row>
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto" class="pt-0">
                                            <v-table style="border: 0.1px solid rgb(148, 148, 148);">
                                                <thead style="background-color: #BBDEFB;">
                                                    <tr>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">Resource</th>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">Quantity(bt)</th>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">Power Plant</th>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">Technology</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">{{ room.resourceName[keyName] }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">{{ value }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">{{ room.technologyName[keyName] }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">{{ value }}</td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                    <v-row align="center" justify="center" v-if="type == 'powerPlant'">
                                        <v-col cols="auto">
                                            <div class="text-subtitle-1 font-weight-bold">
                                                Construction Cost: 
                                                <span class="text-subtitle-1">€{{ room.ppInfo[keyName].price }} M</span>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="7">
                                    <span v-if="type=='resource'">
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="text-h5"> Quantity(bt): </div>
                                                <v-text-field v-model="quantity" :rules="ruleForQuantity" label=""></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <div class="text-h5"> Pay(M): </div>
                                                <v-text-field v-model="payment" :rules="ruleForPayment" label=""></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="auto">
                                                <v-btn color="green" size="large" class="font-weight-bold" :disabled="!(quantity > 0 && quantity <= value) || !(payment <= this.user.resourceSet.remainingBalance)" @click="ask">Ask</v-btn>
                                            </v-col>
                                        </v-row>
                                    </span>
                                    <span v-else>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="text-h5"> Quantity(bt): </div>
                                                <v-text-field v-model="quantity" label=""></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <div class="text-h5"> Pay(M): </div>
                                                <v-text-field v-model="payment" :rules="ruleForPayment" label=""></v-text-field>
                                            </v-col>
                                            <v-col cols="12" v-if="parseInt(quantity) >= 1">
                                                <div class="text-h6 text-center font-weight-bold" v-if="calculateProfit > 0" style="color: #4CAF50;"> {{ partner.name }} will earn a profit of €{{ calculateProfit }} M</div>
                                                <div class="text-h6 text-center font-weight-bold" v-else style="color: #F44336;"> {{ partner.name }} will lose €{{ calculateProfit * -1 }} M</div>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="auto">
                                                <v-btn color="green" size="large" class="font-weight-bold" :disabled="!(payment <= this.user.resourceSet.remainingBalance)" @click="ask">Ask</v-btn>
                                            </v-col>
                                        </v-row>
                                    </span>
                                    <v-row align="center" justify="center">
                                        <v-col cols="auto">
                                            <span v-if="!message_error_flag" class="text-h6" style="color: #4CAF50;">{{ message }}</span>
                                            <span v-else class="text-h6" style="color: red;">{{ message }}</span>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "AskDialog",
    props: ["keyName", "partnerId", "type"],
    data() {
        return {
            dialog: false,
            quantity: 0,
            payment: 0,
            message: "",
            message_error_flag: false
        }
    },
    methods: {
        askButton() {
            this.dialog = true
            this.message = ""
            this.message_error_flag = false
        },

        ask() {
            if(this.type == 'powerPlant') {
                if(this.calculateProfit * -1 > this.partner.resourceSet.remainingBalance) {
                    this.message_error_flag = true
                    this.message = this.partner.name + " doesn't have enough money"
                }
                else {
                    this.message = ""
                    this.message_error_flag = false
                    this.socket.emit("ask", this.room.id, this.user.id, this.partnerId, this.type, this.keyName, parseInt(this.quantity), parseInt(this.payment))
                }
            }
            else {
                this.message = ""
                this.message_error_flag = false
                this.socket.emit("ask", this.room.id, this.user.id, this.partnerId, this.type, this.keyName, parseInt(this.quantity), parseInt(this.payment))
            }
        }
    },
    mounted() {
        this.socket.on("askSuccess", (message) => {
            this.message = message
        })
    },
    computed: {
        ...mapState(["socket", "user", "room"]),
        partner() {
            return this.room.users.find(user => user.id === this.partnerId);
        },

        value() {
            let value = null
            const partner = this.partner
            if(this.type == "resource") {
                value = partner.resourceSet.resource[this.keyName]
                return value
            }
            else {
                value = partner.resourceSet.technology[this.keyName]
                return value
            }
        },

        ruleForQuantity() {
            const rules = [];
            if (parseInt(this.quantity) > this.value || parseInt(this.quantity) <= 0) {
                rules.push('Check the quantity');
            }
            return rules;
        },

        ruleForPayment() {
            const rules = [];
            if (parseInt(this.payment) > this.user.resourceSet.remainingBalance) {
                rules.push('Check the amount to pay');
            }
            return rules;
        },

        calculateProfit() {
            const price = (this.room.ppInfo[this.keyName].price) * this.quantity
            const profit = this.payment - price
            return profit
        }
    },
    beforeUnmount() {
        this.socket.off("askSuccess")
    }
}
</script>