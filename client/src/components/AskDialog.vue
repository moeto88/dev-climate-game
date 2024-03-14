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
                                    <div class="text-h4 font-weight-bold">Ask the Trade Partner</div>
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
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">Inactive</th>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'technology' }">Technology</th>
                                                        <th class="font-weight-bold text-subtitle-1" :class="{ 'd-none': type !== 'technology' }">Owned</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">{{ room.resourceName[keyName] }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'resource' }">{{ value }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">{{ room.technologyName[keyName] }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'powerPlant' }">{{ value }}</td>
                                                        <td class="text-subtitle-1" :class="{ 'd-none': type !== 'technology' }">{{ room.technologyName[keyName] }}</td>
                                                        <td v-if="value==true" class="text-subtitle-1" :class="{ 'd-none': type !== 'technology' }">Yes</td>
                                                        <td v-else class="text-subtitle-1" :class="{ 'd-none': type !== 'technology' }">No</td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="7">
                                    <span v-if="type=='technology'">
                                        <v-row >
                                            <v-col cols="12">
                                                <div class="text-h5"> Pay: </div>
                                                <v-text-field v-model="payment" :rules="ruleForPayment" label=""></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="auto">
                                                <v-btn color="green" size="large" class="font-weight-bold" :disabled="!(payment <= this.user.resourceSet.remainingBalance)" @click="ask">Ask</v-btn>
                                            </v-col>
                                        </v-row>
                                    </span>
                                    <span v-else>
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
        },

        ask() {
            this.message = ""
            this.socket.emit("ask", this.room.id, this.user.id, this.partnerId, this.type, this.keyName, parseInt(this.quantity), parseInt(this.payment))
        }
    },
    mounted() {
        this.socket.on("askSuccess", (message) => {
            this.message = message
            if(message == "Error") {
                this.message_error_flag = true
            }
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
            else if(this.type == "powerPlant") {
                value = partner.resourceSet.remainingFuelingTime[this.keyName]
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
        }
    },
    beforeUnmount() {
        this.socket.off("askSuccess")
    }
}
</script>