<template>
    <RoomHeader />
    <v-main class="d-flex align-center justify-center">
        <v-card class="pa-10" width="900" :elevation="4">
            <span v-if="isJoined">
                <v-card-item>
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <label class="text-h5 font-weight-bold" for="userName" v-if="room.setting_RG=='red'" style="color:#F44336"> Game Mode: Red</label>
                            <label class="text-h5 font-weight-bold" for="userName" v-if="room.setting_RG=='green'" style="color:#4CAF50"> Game Mode: Green</label>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <label class="text-h6" for="userName"> User Name: {{ userName }}</label>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <div class="text-h6">Room ID: {{ roomId }}</div>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="auto" class="pb-0">
                            <div class="text-h6">Room Members: </div>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="auto" class="pt-0">
                            <v-list density="compact" class="text-h6 py-0">
                                <v-list-item v-for="(user, i) in room.users" :key="i" :value="user" lines="one">
                                    <v-list-item-title class="text-h6 mr-4">{{ i + 1 + ". " + user.name }}</v-list-item-title>
                                    <template v-slot:append>
                                        <v-row align="center" justify="center">
                                            <v-col cols="auto" class="pr-0">
                                                <div class="text-subtitle-1">Country: {{ user.country }}</div>
                                            </v-col>
                                            <div v-if="user.ready">
                                                <v-col cols="auto">
                                                    <v-icon color="green-darken-3" >mdi-check-circle</v-icon>
                                                </v-col>
                                            </div>
                                            <div v-else>
                                                <v-col cols="auto">
                                                    <v-icon>mdi-clock</v-icon>
                                                </v-col>
                                            </div>
                                        </v-row>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card-item>
                <v-card-actions>
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <v-btn size="small" color="green" @click="dialog = true" :elevation="0" variant="outlined" style="border: 2px solid #4CAF50;" class="font-weight-bold">Country Info</v-btn>
                            <v-dialog v-model="dialog" width="auto">
                                <v-card>
                                    <v-tabs align-tabs="center" v-model="tab" color="deep-purple-accent-4">
                                        <v-tab v-for="(country, index) in countryList" :key="index" :value="index + 1"
                                            class="font-weight-bold">{{ country.name }}</v-tab>
                                    </v-tabs>

                                    <v-card-text>
                                        <v-window v-model="tab">
                                            <v-window-item v-for="(country, index) in countryList" :key="index"
                                                :value="index + 1">
                                                <v-row justify="center" align="center">
                                                    <v-col cols="auto" class="">
                                                        <div class="text-h5">Annual Budget: €{{ country.budget }}</div>
                                                    </v-col>
                                                    <v-col cols="auto" class="">
                                                        <div class="text-h5">Energy Target: {{
                                                            country.resourceSet.energyTarget }}</div>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="room.setting_historicalEmission" justify="center"
                                                    align="center">
                                                    <v-col cols="auto" class="">
                                                        <div class="text-h5">Historical Emission: {{
                                                            country.resourceSet.historicalEmission }}</div>
                                                    </v-col>
                                                </v-row>
                                                <v-row justify="center" align="center">
                                                    <v-col align="center" cols="auto" class="pb-0">
                                                        <v-radio-group v-model="cardRadio" inline>
                                                            <v-radio label="Resource" value="1"></v-radio>
                                                            <v-radio label="Power Plants" value="2"></v-radio>
                                                            <v-radio label="Technology" value="3"></v-radio>
                                                        </v-radio-group>
                                                    </v-col>
                                                </v-row>
                                                <v-row justify="center" class="pa-5">
                                                    <div v-if="cardRadio=='1'">
                                                        <v-col cols="12" class="pt-0">
                                                            <ResourceCard :user="country" />
                                                        </v-col>
                                                    </div>
                                                    <div v-if="cardRadio=='2'">
                                                        <v-col cols="12" class="pt-0">
                                                            <PPCard :user="country" />
                                                        </v-col>
                                                    </div>
                                                    <div v-if="cardRadio=='3'">
                                                        <v-col cols="12" class="pt-0">
                                                            <TechnologyCard :user="country" />
                                                        </v-col>
                                                    </div>
                                                </v-row>
                                            </v-window-item>
                                        </v-window>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn v-if="!user.ready" class="font-weight-bold" variant="tonal" color="orange-darken-3" style="border: 2px solid #EF6C00;" type="button" @click="ready">Ready</v-btn>
                            <v-btn v-else class="font-weight-bold" variant="tonal" color="blue-grey-darken-2" style="border: 2px solid #455A64;" type="button" @click="notReady">Not Ready</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-card-actions v-if="user.host" class="mt-3">
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <v-btn class="font-weight-bold" variant="tonal" color="primary"
                                style="border: 2px solid #1976D2;" type="button" @click="startGame"
                                :disabled="room.readyCountryList.length <= 3" size="x-large">
                                Start Game
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </span>

            <span v-else>
                <v-card-item>
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <div class="text-h5">Name:</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field :rules="rule" v-model="userName" type="text"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center" class="mt-0">
                        <v-col cols="auto">
                            <v-radio-group v-model="joinType" inline hide-details>
                                <v-radio style="color: black" label="Create Room" value="1" color="success"></v-radio>
                                <v-radio style="color: black" label="Join Room" value="2" color="success"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-card-item>
                <span v-if="joinType == '1'">
                    <v-card-actions>
                        <v-row align="center" justify="center">
                            <v-col cols="12">
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-chip-group mandatory v-model="setting_RG">
                                            <v-chip class="font-weight-bold" variant="outlined" color="red" size="x-large" style="border: 2px solid #F44336;" value="red">Red</v-chip>
                                            <v-chip class="font-weight-bold" variant="outlined" color="green" size="x-large" style="border: 2px solid #4CAF50;" value="green">Green</v-chip>
                                        </v-chip-group>
                                    </v-col>
                                </v-row>
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-btn variant="tonal" size="x-large" class="font-weight-bold" @click="createRoom"
                                            color="primary" style="border: 2px solid #1976D2;"
                                            :disabled="(userName=='') || (setting_RG=='')">Create Room</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row v-if="!setting_valid" align="center" justify="center">
                                    <v-col cols="auto">
                                        <div class="text-h6" style="color: red">Please check if the game setting is
                                            valid</div>
                                    </v-col>
                                </v-row>
                                <v-row align="center" justify="center">
                                    <v-col cols="auto">
                                        <v-btn variant="tonal" class="font-weight-bold" color="yellow-darken-3"
                                            style="border: 2px solid #FDD835;" @click="dialog = true" disabled>Setting</v-btn>
                                        <v-dialog v-model="dialog" max-width="1050">
                                            <v-card class="pa-5">
                                                <v-container>
                                                    <v-row justify="center" align="center">
                                                        <v-col cols="auto">
                                                            <div class="text-h4 font-weight-bold">Game Setting</div>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row justify="center" align="center">
                                                        <v-col cols="auto">
                                                            <div class="text-h6 font-weight-bold">First-time players are
                                                                advised not to change the parameters.</div>
                                                        </v-col>
                                                    </v-row>
                                                    <v-expansion-panels multiple class="mt-5">
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>Game Modes</v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row justify="center" align="center" class="py-3">
                                                                    <v-col cols="auto">
                                                                        <div class="text-h6">The maximum number of rounds: </div>
                                                                    </v-col>
                                                                    <v-col cols="auto" class="px-0">
                                                                        <v-text-field
                                                                            :rules="rule_roundNum(parseInt(maxRoundNum))"
                                                                            v-model="maxRoundNum" type="number"
                                                                            density="compact"></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-card class="py-3 px-4 my-4" :elevation="0" border>
                                                                    <v-row>
                                                                        <v-col cols="auto">
                                                                            <v-switch class="font-weight-bold" style="color: black"
                                                                                base-color="red" hide-details="true"
                                                                                v-model="setting_co2Emission" color="primary"
                                                                                label="CO2 Emission"></v-switch>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row justify="center" align="center"
                                                                        v-if="setting_co2Emission">
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">Pay: €</div>
                                                                        </v-col>
                                                                        <v-col cols="auto" class="px-0">
                                                                            <v-text-field
                                                                                :rules="rule_num(parseInt(fine_co2Emission))"
                                                                                v-model="fine_co2Emission" type="number"
                                                                                density="compact"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">for every 10kt of CO2
                                                                                emissions</div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                                <v-card class="py-3 px-4 mb-4" :elevation="0" border>
                                                                    <v-row>
                                                                        <v-col cols="auto">
                                                                            <v-switch class="font-weight-bold" style="color: black"
                                                                                base-color="red" hide-details="true"
                                                                                v-model="setting_historicalEmission" color="primary"
                                                                                label="Historical Emission"></v-switch>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row justify="center" align="center"
                                                                        v-if="setting_historicalEmission">
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">Pay: €</div>
                                                                        </v-col>
                                                                        <v-col cols="auto" class="px-0">
                                                                            <v-text-field
                                                                                :rules="rule_num(parseInt(fine_high_historicalEmission))"
                                                                                v-model="fine_high_historicalEmission" type="number"
                                                                                density="compact"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">if a country significantly
                                                                                contributes to a historical emission</div>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row justify="center" align="center"
                                                                        v-if="setting_historicalEmission">
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">Pay: €</div>
                                                                        </v-col>
                                                                        <v-col cols="auto" class="px-0">
                                                                            <v-text-field
                                                                                :rules="rule_num(parseInt(fine_middle_historicalEmission))"
                                                                                v-model="fine_middle_historicalEmission"
                                                                                type="number" density="compact"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="auto">
                                                                            <div class="text-subtitle-1">if a country moderately
                                                                                contributes to a historical emission</div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                                <v-card class="py-3 px-4 my-4" :elevation="0" border>
                                                                    <v-row>
                                                                        <v-col cols="auto">
                                                                            <v-switch class="font-weight-bold" style="color: black"
                                                                                base-color="red" hide-details="true"
                                                                                v-model="setting_naturalDisaster" color="primary"
                                                                                label="Natural Disaster"></v-switch>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row justify="center" align="center"
                                                                        v-if="setting_naturalDisaster">
                                                                        <v-col cols="auto" class="pt-0">
                                                                            <p class="text-subtitle-1">If the total amount of the CO2 emissions from all the countries exceeds 300,</p>
                                                                            <p class="text-subtitle-1">a natural disaster will occur in all the countries in the next round.</p>
                                                                            <p class="text-subtitle-1">Players must pay €50 to address it.</p>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                            </v-expansion-panel-text>
                                                        </v-expansion-panel>

                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>Country Parameters</v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row align="center" justify="center">
                                                                    <v-col cols="auto">
                                                                        <v-card :elevation="0" border>
                                                                            <v-tabs align-tabs="center" v-model="tab_setting"
                                                                                color="deep-purple-accent-4">
                                                                                <v-tab v-for="(country, index) in countryList"
                                                                                    :key="index" :value="index + 1"
                                                                                    class="font-weight-bold">{{ country.name
                                                                                    }}</v-tab>
                                                                            </v-tabs>
            
                                                                            <v-card-text>
                                                                                <v-window v-model="tab_setting">
                                                                                    <v-window-item
                                                                                        v-for="(country, index) in countryList"
                                                                                        :key="index" :value="index + 1">
                                                                                        <v-table density="compact">
                                                                                            <thead
                                                                                                style="background-color: #BBDEFB;">
                                                                                                <tr>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Main</th>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Value</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Annual Budget
                                                                                                        <v-tooltip
                                                                                                            activator="parent"
                                                                                                            location="end"
                                                                                                            max-width="800px">
                                                                                                            <div style="color: white"
                                                                                                                class="text-body-1">
                                                                                                                <p>This parameter
                                                                                                                    represents the
                                                                                                                    amount of money
                                                                                                                    each country
                                                                                                                    receives in each
                                                                                                                    round.</p>
                                                                                                            </div>
                                                                                                        </v-tooltip>
                                                                                                    </td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.budget))"
                                                                                                            v-model="country.budget"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Energy Target
                                                                                                        <v-tooltip
                                                                                                            activator="parent"
                                                                                                            location="end"
                                                                                                            max-width="800px">
                                                                                                            <div style="color: white"
                                                                                                                class="text-body-1">
                                                                                                                <p>This parameter
                                                                                                                    represents the
                                                                                                                    amount of
                                                                                                                    electricity each
                                                                                                                    country has to
                                                                                                                    produce in each
                                                                                                                    round.</p>
                                                                                                            </div>
                                                                                                        </v-tooltip>
                                                                                                    </td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.energyTarget))"
                                                                                                            v-model="country.resourceSet.energyTarget"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Fine
                                                                                                        <v-tooltip
                                                                                                            activator="parent"
                                                                                                            location="end"
                                                                                                            max-width="800px">
                                                                                                            <div style="color: white"
                                                                                                                class="text-body-1">
                                                                                                                <p>This parameter
                                                                                                                    represents the
                                                                                                                    amount of money
                                                                                                                    each country has
                                                                                                                    to pay</p>
                                                                                                                <p>when it fails to
                                                                                                                    meet its energy
                                                                                                                    target in each
                                                                                                                    round.</p>
                                                                                                            </div>
                                                                                                        </v-tooltip>
                                                                                                    </td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.fine))"
                                                                                                            v-model="country.fine"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </v-table>
                                                                                        <v-table density="compact">
                                                                                            <thead
                                                                                                style="background-color: #BBDEFB;">
                                                                                                <tr>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Resource</th>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Quantity</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>Fossil Fuel</td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.resource.fossilFuel))"
                                                                                                            v-model="country.resourceSet.resource.fossilFuel"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Uranium</td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.resource.uranium))"
                                                                                                            v-model="country.resourceSet.resource.uranium"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </v-table>
                                                                                        <v-table density="compact">
                                                                                            <thead
                                                                                                style="background-color: #BBDEFB;">
                                                                                                <tr>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Power Plants</th>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Owned</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>Fossil Fuel</td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.powerPlant.fossil))"
                                                                                                            v-model="country.resourceSet.powerPlant.fossil"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Renewable</td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.powerPlant.renewable))"
                                                                                                            v-model="country.resourceSet.powerPlant.renewable"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Nuclear</td>
                                                                                                    <td><v-text-field
                                                                                                            :rules="rule_num(parseInt(country.resourceSet.powerPlant.nuclear))"
                                                                                                            v-model="country.resourceSet.powerPlant.nuclear"
                                                                                                            type="number"
                                                                                                            density="compact"></v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </v-table>
                                                                                        <v-table density="compact">
                                                                                            <thead
                                                                                                style="background-color: #BBDEFB;">
                                                                                                <tr>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Technology</th>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Owned</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>Fossil Fuel</td>
                                                                                                    <td><v-checkbox color="success"
                                                                                                            hide-details
                                                                                                            v-model="country.resourceSet.technology.fossil"></v-checkbox>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Renewable</td>
                                                                                                    <td><v-checkbox color="success"
                                                                                                            hide-details
                                                                                                            v-model="country.resourceSet.technology.renewable"></v-checkbox>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>Nuclear</td>
                                                                                                    <td><v-checkbox color="success"
                                                                                                            hide-details
                                                                                                            v-model="country.resourceSet.technology.nuclear"></v-checkbox>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </v-table>
                                                                                    </v-window-item>
                                                                                </v-window>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-expansion-panel-text>
                                                        </v-expansion-panel>

                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>Power Plant Parameter</v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row align="center" justify="center">
                                                                    <v-col cols="auto">
                                                                        <v-card :elevation="0" border>
                                                                            <v-tabs align-tabs="center" v-model="tab_pp_setting"
                                                                                color="deep-purple-accent-4">
                                                                                <v-tab v-for="(value, key) in ppInfo" 
                                                                                    :key="key"
                                                                                    :value="key"
                                                                                    class="font-weight-bold">
                                                                                    {{ key }}
                                                                                </v-tab>
                                                                            </v-tabs>
            
                                                                            <v-card-text>
                                                                                <v-window v-model="tab_pp_setting">
                                                                                    <v-window-item
                                                                                        v-for="(value, key) in ppInfo" 
                                                                                        :key="key" :value="key">
                                                                                        <v-table density="compact">
                                                                                            <thead
                                                                                                style="background-color: #BBDEFB;">
                                                                                                <tr>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Main</th>
                                                                                                    <th
                                                                                                        class="font-weight-bold text-subtitle-1">
                                                                                                        Value</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Construction Cost
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <v-text-field
                                                                                                            :rules="rule_num(parseInt(value.price))"
                                                                                                            v-model="value.price"
                                                                                                            type="number"
                                                                                                            density="compact">
                                                                                                        </v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Energy Output
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <v-text-field
                                                                                                            :rules="rule_num(parseInt(value.energyOutput))"
                                                                                                            v-model="value.energyOutput"
                                                                                                            type="number"
                                                                                                            density="compact">
                                                                                                        </v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        Consumption
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <v-text-field
                                                                                                            :rules="rule_num(parseInt(value.consumption))"
                                                                                                            v-model="value.consumption"
                                                                                                            type="number"
                                                                                                            density="compact">
                                                                                                        </v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        CO2 Emission
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <v-text-field
                                                                                                            :rules="rule_num(parseInt(value.co2Emission))"
                                                                                                            v-model="value.co2Emission"
                                                                                                            type="number"
                                                                                                            density="compact">
                                                                                                        </v-text-field>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </v-table>
                                                                                    </v-window-item>
                                                                                </v-window>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-expansion-panel-text>
                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                    
                                                </v-container>
                                                <v-card-actions>
                                                    <v-btn color="primary" block @click="dialog = false">Close
                                                        Dialog</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </span>

                <span v-if="joinType == '2'">
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <div class="text-h6">Room ID:</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field hide-details="true" v-model="roomId" type="text"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-row align="center" justify="center" class="mt-10">
                            <v-btn variant="tonal" class="font-weight-bold" color="primary" size="x-large"
                                style="border: 2px solid #1976D2;" @click="joinRoom" :disabled="(userName=='')">Join
                                Room</v-btn>
                        </v-row>
                    </v-card-actions>
                </span>
                <v-card-item v-if="error_message != ''">
                    <v-row align="center" justify="center">
                        <v-col cols="auto">
                            <v-card-text style="color: red;">{{ error_message }}</v-card-text>
                        </v-col>
                    </v-row>
                </v-card-item>
            </span>
        </v-card>
    </v-main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RoomHeader from "../components/RoomHeader.vue"
import PPCard from '../components/PPCard.vue'
import ResourceCard from "../components/ResourceCard.vue"
import TechnologyCard from "../components/TechnologyCard.vue"
import router from "../router/router"
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Room',
    components: {
        RoomHeader,
        PPCard,
        ResourceCard,
        TechnologyCard
    },
    data() {
        return {
            error_message: "",
            setting_valid: true,
            userName: "",
            userId: "",
            joinType: "1",
            roomId: "",
            isJoined: false,
            dialog: false,
            cardRadio: "1",
            tab: null,
            tab_setting: null,
            tab_pp_setting: null,
            setting_co2Emission: true,
            fine_co2Emission: 10,
            setting_historicalEmission: true,
            fine_high_historicalEmission: 40,
            fine_middle_historicalEmission: 20,
            setting_naturalDisaster: false,
            setting_RG: "",
            countryList: [
                { 
                    name: 'Country A',  
                    budget: 400,
                    fine: 120,
                    resourceSet: {
                        resource: {
                            fossilFuel: 800,
                            uranium: 0,
                        },
                        powerPlant: {
                            fossil: 3,
                            renewable: 0,
                            nuclear: 0
                        },
                        technology: {
                            fossil: true,
                            renewable: true,
                            nuclear: false
                        },
                        energyTarget: 120,
                        historicalEmission: "high",
                    },
                },
                { 
                    name: 'Country B', 
                    budget: 300, 
                    fine: 100,
                    resourceSet: {
                        resource: {
                            fossilFuel: 300,
                            uranium: 0,
                        },
                        powerPlant: {
                            fossil: 3,
                            renewable: 0,
                            nuclear: 0
                        },
                        technology: {
                            fossil: true,
                            renewable: true,
                            nuclear: true
                        },
                        energyTarget: 100,
                        historicalEmission: "middle",
                    },
                },
                { 
                    name: 'Country C',  
                    budget: 50,
                    fine: 20,
                    resourceSet: {
                        resource: {
                            fossilFuel: 2000,
                            uranium: 200,
                        },
                        powerPlant: {
                            fossil: 1,
                            renewable: 0,
                            nuclear: 0
                        },
                        technology: {
                            fossil: false,
                            renewable: false,
                            nuclear: false
                        },
                        energyTarget: 50,
                        historicalEmission: "low",
                    },
                },
                { 
                    name: 'Country D',  
                    budget: 40,
                    fine: 20,
                    resourceSet: {
                        resource: {
                            fossilFuel: 1000,
                            uranium: 400,
                        },
                        powerPlant: {
                            fossil: 1,
                            renewable: 0,
                            nuclear: 0
                        },
                        technology: {
                            fossil: false,
                            renewable: false,
                            nuclear: false
                        },
                        energyTarget: 50,
                        historicalEmission: "low",
                    },
                },
            ],
            ppInfo: {
                fossil: {
                    energyOutput: 20,
                    consumption: 50,
                    co2Emission: 10,
                    price: 100
                },
                renewable: {
                    energyOutput: 5,
                    consumption: 0,
                    co2Emission: 0,
                    price: 150
                },
                nuclear: {
                    energyOutput: 40,
                    consumption: 50,
                    co2Emission: 0,
                    price: 250
                }
            },
            maxRoundNum: 6
        }
    },
    created() {
        this.socket.on("connect", () => {
            console.log("connected")
        })
    },
    mounted() {
        this.socket.on("initUser", (room, user) => {
            this.isJoined = true
            this.roomId = room.id
            this.userId = user.id
            this.updateUser(user)
            this.updateRoom(room)
        })
        this.socket.on("updateRoom", (room) => {
            this.updateRoom(room)
        })
        this.socket.on("updateUser", (user) => {
            this.updateUser(user)
        })
        this.socket.on("notifyError", (error) => {
            this.error_message = error
        })
        this.socket.on("goToMainPage", (room) => {
            this.updateRoom(room)
            router.push("/game")
            this.socket.emit("updateUserAndRoom", this.roomId, this.userId)
        })
        this.socket.on("setUsername", (room) => {
            const user_A = room.users.find(user => user.country === "A");
            const username_A = user_A.name
            const user_B = room.users.find(user => user.country === "B");
            const username_B = user_B.name
            const user_C = room.users.find(user => user.country === "C");
            const username_C = user_C.name
            const user_D = room.users.find(user => user.country === "D");
            const username_D = user_D.name
            this.updateUsername(username_A, username_B, username_C, username_D)
        })
    },
    methods: {
        ...mapMutations(["setUser", "setRoom", "setUsername"]),

        createRoom() {
            let createRoomFlag = true
            this.countryList.map(country => {
                if (!this.validateParameter(country)) {
                    createRoomFlag = false;
                }
            })

            this.fine_co2Emission = parseInt(this.fine_co2Emission)
            this.fine_high_historicalEmission = parseInt(this.fine_high_historicalEmission)
            this.fine_middle_historicalEmission = parseInt(this.fine_middle_historicalEmission)

            if(!(
                (Number.isInteger(this.fine_co2Emission) && this.fine_co2Emission >= 0)
                &&
                (Number.isInteger(this.fine_high_historicalEmission) && this.fine_high_historicalEmission >= 0)
                &&
                (Number.isInteger(this.fine_middle_historicalEmission) && this.fine_middle_historicalEmission >= 0)
                )) {
                    createRoomFlag = false;
                }

            const emission_fineList = {
                fine_co2Emission: this.fine_co2Emission,
                fine_high_historicalEmission: this.fine_high_historicalEmission,
                fine_middle_historicalEmission: this.fine_middle_historicalEmission
            }

            if(!this.validatePPParameter(this.ppInfo)) {
                createRoomFlag = false;
            }

            this.maxRoundNum = parseInt(this.maxRoundNum)
            if(!(Number.isInteger(this.maxRoundNum) && this.maxRoundNum >= 1)) {
                createRoomFlag = false;
            }

            if(createRoomFlag) {
                this.socket.emit("createRoom", this.userName, this.countryList, this.setting_co2Emission, this.setting_historicalEmission, emission_fineList, this.ppInfo, this.maxRoundNum, this.setting_naturalDisaster, this.setting_RG)
            }
            else {
                this.setting_valid = false
            }
        },
        setting() {
            this.socket.emit("setting", this.userName)
        },
        joinRoom() {
            this.socket.emit("joinRoom", this.userName, this.roomId)
        },
        startGame() {
            this.socket.emit("startGame", this.roomId)
        },

        ready() {
            this.socket.emit("ready", this.roomId, this.userId)
        },

        notReady() {
            this.socket.emit("notReady", this.roomId, this.userId)
        },

        updateUser(user) {
            this.setUser(user)
        },
        updateRoom(room) {
            this.setRoom(room)
        },

        updateUsername(username_A, username_B, username_C, username_D) {
            this.setUsername({ username_A, username_B, username_C, username_D })
        },

        validateParameter(country) {
            country.budget = parseInt(country.budget)
            country.fine = parseInt(country.fine)
            country.resourceSet.energyTarget = parseInt(country.resourceSet.energyTarget)
            country.resourceSet.resource.fossilFuel = parseInt(country.resourceSet.resource.fossilFuel)
            country.resourceSet.resource.uranium = parseInt(country.resourceSet.resource.uranium)
            country.resourceSet.powerPlant.fossil = parseInt(country.resourceSet.powerPlant.fossil)
            country.resourceSet.powerPlant.renewable = parseInt(country.resourceSet.powerPlant.renewable)
            country.resourceSet.powerPlant.nuclear = parseInt(country.resourceSet.powerPlant.nuclear)


            const isValid = (
                Number.isInteger(country.budget) && country.budget >= 0 &&
                Number.isInteger(country.fine) && country.fine >= 0 &&
                Number.isInteger(country.resourceSet.energyTarget) && country.resourceSet.energyTarget >= 0 &&
                Number.isInteger(country.resourceSet.resource.fossilFuel) && country.resourceSet.resource.fossilFuel >= 0 &&
                Number.isInteger(country.resourceSet.resource.uranium) && country.resourceSet.resource.uranium >= 0 &&
                Number.isInteger(country.resourceSet.powerPlant.fossil) && country.resourceSet.powerPlant.fossil >= 0 &&
                Number.isInteger(country.resourceSet.powerPlant.renewable) && country.resourceSet.powerPlant.renewable >= 0 &&
                Number.isInteger(country.resourceSet.powerPlant.nuclear) && country.resourceSet.powerPlant.nuclear >= 0
            )
            return isValid;
        },

        validatePPParameter(ppInfo) {
            let isValid = true
            for (const key in ppInfo) {
                const obj = ppInfo[key];
                for (const prop in obj) {
                    obj[prop] = parseInt(obj[prop]);
                    if(!((Number.isInteger(obj[prop])) && (obj[prop] >= 0))) {
                        isValid = false
                    }
                }
            }
            return isValid
        },
    },
    computed: {
        ...mapState(["socket", "user", "room"]),
        
        rule() {
            const rules = []
            if(this.userName == "") {
                rules.push("Please enter your name.")
            }
            return rules
        },

        rule_num() {
            return (num) => {
                const rules = [];
                if (!(Number.isInteger(num) && num >= 0)) {
                    rules.push("The value must be a non-negative integer.");
                }
                return rules;
            };
        },

        rule_roundNum() {
            return (num) => {
                const rules = [];
                if (!(Number.isInteger(num) && num >= 1)) {
                    rules.push("The value must be a non-negative integer.");
                }
                return rules;
            };
        }
    },

    beforeUnmount() {
        this.socket.off("initUser");
        this.socket.off("updateRoom");
        this.socket.off("updateUser");
        this.socket.off("notifyError");
        this.socket.off("readyError");
        this.socket.off("goToMainPage")
        this.socket.off("setUsername")
    },
}
</script>