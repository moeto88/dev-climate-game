const express = require("express")
const { v4: uuidv4 } = require('uuid');

const app = express()

const http = require("http")
const expServer = http.createServer(app)

const {Server} = require("socket.io");
const io = new Server(expServer, {
    cors: {
        origin: "http://localhost:8081",
        methods: ["GET", "POST"],
        credentials: true
    }
})

const rooms = []

const resource_name = {
    fossilFuel: "Fossil Fuel",
    uranium: "Uranium"
}

const technology_name = {
    fossil: "Fossil Fuel",
    renewable: "Renewable",
    nuclear: "Nuclear"
}

const countryList_autoAssign = ["A", "B", "C", "D"];

function getRandomCountry(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

io.on("connection", (socket) => {
    socket.on("createRoom", (userName, countryList, setting_co2Emission, setting_historicalEmission, emission_fineList, ppInfo, maxRoundNum, setting_naturalDisaster, setting_RG) => {
        const roomId = generateRoomId()
        const randomCountry = getRandomCountry(countryList_autoAssign);

        const user = {
            id: socket.id,
            name: userName,
            roomId: roomId,
            ready: false,
            country: randomCountry,
            budget: 0,
            resourceSet: {},
            tradeButtonFlag: false,
            host: true
        }

        const set_A = {
            resource: countryList[0].resourceSet.resource,
            powerPlant: countryList[0].resourceSet.powerPlant,
            remainingFuelingTime: countryList[0].resourceSet.powerPlant,
            technology: countryList[0].resourceSet.technology,
            energyTarget: countryList[0].resourceSet.energyTarget,
            historicalEmission: "high",
            remainingBalance: countryList[0].budget,
            currentCO2Emission: 0,
            currentEnergyOutput: 0,
            totalCO2Emission: 0,
            totalEnergyOutput: 0
        }
        
        const set_B = {
            resource: countryList[1].resourceSet.resource,
            powerPlant: countryList[1].resourceSet.powerPlant,
            remainingFuelingTime: countryList[1].resourceSet.powerPlant,
            technology: countryList[1].resourceSet.technology,
            energyTarget: countryList[1].resourceSet.energyTarget,
            historicalEmission: "middle",
            remainingBalance: countryList[1].budget,
            currentCO2Emission: 0,
            currentEnergyOutput: 0,
            totalCO2Emission: 0,
            totalEnergyOutput: 0
        }
        
        const set_C = {
            resource: countryList[2].resourceSet.resource,
            powerPlant: countryList[2].resourceSet.powerPlant,
            remainingFuelingTime: countryList[2].resourceSet.powerPlant,
            technology: countryList[2].resourceSet.technology,
            energyTarget: countryList[2].resourceSet.energyTarget,
            historicalEmission: "low",
            remainingBalance: countryList[2].budget,
            currentCO2Emission: 0,
            currentEnergyOutput: 0,
            totalCO2Emission: 0,
            totalEnergyOutput: 0
        }
        
        const set_D = {
            resource: countryList[3].resourceSet.resource,
            powerPlant: countryList[3].resourceSet.powerPlant,
            remainingFuelingTime: countryList[3].resourceSet.powerPlant,
            technology: countryList[3].resourceSet.technology,
            energyTarget: countryList[3].resourceSet.energyTarget,
            historicalEmission: "low",
            remainingBalance: countryList[3].budget,
            currentCO2Emission: 0,
            currentEnergyOutput: 0,
            totalCO2Emission: 0,
            totalEnergyOutput: 0
        }

        const countryBudgetList = {
            "A": countryList[0].budget,
            "B": countryList[1].budget,
            "C": countryList[2].budget,
            "D": countryList[3].budget
        }

        const countryFineList = {
            "A": countryList[0].fine,
            "B": countryList[1].fine,
            "C": countryList[2].fine,
            "D": countryList[3].fine
        }

        const room = {
            id: roomId,
            users: [user],
            readyCountryList: [],
            roundNum: 1,
            maxRoundNum: maxRoundNum,
            ppInfo: ppInfo,
            countryResource: {
                "A": set_A,
                "B": set_B,
                "C": set_C,
                "D": set_D
            },
            weather: "Good",
            weatherParam: 1,
            resourceName: resource_name,
            technologyName: technology_name,
            countryBudgetList: countryBudgetList,
            countryFineList: countryFineList,
            setting_co2Emission: setting_co2Emission,
            setting_historicalEmission: setting_historicalEmission,
            emission_fineList: emission_fineList,
            setting_naturalDisaster: setting_naturalDisaster,
            totalCO2Emission_first3Round: 0,
            naturalDisasterFine: 50,
            setting_RG: setting_RG
        }
        rooms.push(room)
        socket.join(roomId)
        io.to(user.id).emit("initUser", room, user)
        io.to(user.id).emit("updateRoom", room)
    })

    socket.on("joinRoom", (userName, roomId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        if(roomIndex == -1) {
            io.to(socket.id).emit("notifyError", "Cannot find a room. Please enter a valid room ID again")
            return
        }
        const room = rooms[roomIndex]

        const userCountries = room.users.map(user => user.country);
        let randomCountry;
        do {
            randomCountry = getRandomCountry(countryList_autoAssign);
        } while (userCountries.includes(randomCountry));

        const user = {
            id: socket.id,
            name: userName,
            roomId: roomId,
            ready: false,
            country: randomCountry,
            budget: 0,
            resourceSet: {},
            tradeButtonFlag: false,
            host:false
        }

        room.users.push(user)
        socket.join(room.id)
        io.to(user.id).emit("initUser", room, user)
        io.in(room.id).emit("updateRoom", room)
    })

    socket.on("ready", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        room.readyCountryList.push(user.country)
        user.ready = true
        io.to(user.id).emit("updateUser", user)
        io.in(roomId).emit("updateRoom", room)
    })

    socket.on("notReady", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        room.readyCountryList = room.readyCountryList.filter(country => country !== user.country);
        user.ready = false
        io.to(user.id).emit("updateUser", user)
        io.in(roomId).emit("updateRoom", room)
    })

    socket.on("startGame", (roomId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        room.users.forEach(user => {
            user.budget = room.countryBudgetList[user.country]
            user.resourceSet = deepCopy(room.countryResource[user.country]);
            io.to(user.id).emit("setUsername", room)
        })
        io.in(roomId).emit("goToMainPage", room)
    })

    socket.on("updateUserAndRoom", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        io.to(user.id).emit("initGame", user)
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("nextRound", (roomId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        room.roundNum = room.roundNum + 1

        const weatherOptions = ["Good", "Bad"];
        const randomIndex = Math.random() < 0.5 ? 0 : 1;
        const selectedWeather = weatherOptions[randomIndex];
        room.weather = selectedWeather;

        room.users.forEach(user => {
            user.resourceSet.remainingBalance += user.budget
            user.resourceSet.remainingFuelingTime = deepCopy(user.resourceSet.powerPlant)

            
            let fine = 0
            let energyTargetFine = 0
            let co2EmissionFine = 0
            let historicalEmissionFine = 0
            let historicalEmissionEarning = 0

            if(room.setting_RG == "green") {
                if(user.resourceSet.currentEnergyOutput < user.resourceSet.energyTarget) {
                    energyTargetFine = room.countryFineList[user.country]
                    user.resourceSet.currentEnergyOutput = 0
                }
                else {
                    user.resourceSet.currentEnergyOutput -= user.resourceSet.energyTarget
                }
    
                if(room.setting_co2Emission) {
                    co2EmissionFine = (user.resourceSet.currentCO2Emission / 10) * room.emission_fineList.fine_co2Emission
                }
    
                if(room.setting_historicalEmission) {
                    if(user.resourceSet.historicalEmission == "high") {
                        historicalEmissionFine = room.emission_fineList.fine_high_historicalEmission
                    }
    
                    if(user.resourceSet.historicalEmission == "middle") {
                        historicalEmissionFine = room.emission_fineList.fine_middle_historicalEmission
                    }
    
                    if(user.resourceSet.historicalEmission == "low") {
                        historicalEmissionEarning = (room.emission_fineList.fine_high_historicalEmission + room.emission_fineList.fine_middle_historicalEmission) / 2
                        user.resourceSet.remainingBalance += historicalEmissionEarning
                    }
                }
                
                if(room.setting_naturalDisaster) {
                    room.totalCO2Emission_first3Round += user.resourceSet.currentCO2Emission
                }
            }
            

            fine = energyTargetFine + co2EmissionFine + historicalEmissionFine


            user.resourceSet.remainingBalance -= fine
            user.resourceSet.currentCO2Emission = 0

            io.to(user.id).emit("updateUser", user)
            io.to(user.id).emit("show_nextRoundInfo", room.roundNum, user.budget, fine, energyTargetFine, co2EmissionFine, historicalEmissionFine, historicalEmissionEarning)
            io.to(user.id).emit("history", "You moved on to Round " + room.roundNum + ".")
            io.to(user.id).emit("history", "You received €" + (user.budget + historicalEmissionEarning) + ".")
            io.to(user.id).emit("history", "You got fined €" + fine + ".")
        })

        if(room.setting_naturalDisaster && room.setting_RG == "green") {
            if(room.totalCO2Emission_first3Round >= 300) {
                room.users.forEach(user => {
                    user.resourceSet.remainingBalance -= room.naturalDisasterFine
                    io.to(user.id).emit("updateUser", user)
                    io.to(user.id).emit("show_naturalDisaster", room.naturalDisasterFine)
                    io.to(user.id).emit("history", "You paid €" + room.naturalDisasterFine + " to address natural disaster.")
                })
                room.totalCO2Emission_first3Round = 0
            }
        }
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("buildFossilPP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        user.resourceSet.remainingBalance -= room.ppInfo.fossil.price
        user.resourceSet.powerPlant.fossil++
        user.resourceSet.remainingFuelingTime.fossil++
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You built a fossil power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("buildRenewablePP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        user.resourceSet.remainingBalance -= room.renewable.price
        user.resourceSet.powerPlant.renewable++
        user.resourceSet.remainingFuelingTime.renewable++
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You built a renewable power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("buildNuclearPP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        user.resourceSet.remainingBalance -= room.ppInfo.nuclear.price
        user.resourceSet.powerPlant.nuclear++
        user.resourceSet.remainingFuelingTime.nuclear++
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You built a nuclear power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("fuelFossilPP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        user.resourceSet.remainingFuelingTime.fossil--
        user.resourceSet.currentEnergyOutput += room.ppInfo.fossil.energyOutput
        user.resourceSet.currentCO2Emission += room.ppInfo.fossil.co2Emission
        user.resourceSet.totalEnergyOutput += room.ppInfo.fossil.energyOutput
        user.resourceSet.totalCO2Emission += room.ppInfo.fossil.co2Emission
        user.resourceSet.resource.fossilFuel -= room.ppInfo.fossil.consumption
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You fueled a fossil power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("operateRenewablePP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        const weather = room.weather
        user.resourceSet.remainingFuelingTime.renewable--
        if(weather == "Good") {
            user.resourceSet.currentEnergyOutput = user.resourceSet.currentEnergyOutput + room.ppInfo.renewable.energyOutput + 1
            user.resourceSet.totalEnergyOutput = user.resourceSet.totalEnergyOutput + room.ppInfo.renewable.energyOutput + 1
        }
        else if(weather == "Bad") {
            user.resourceSet.currentEnergyOutput = user.resourceSet.currentEnergyOutput + room.ppInfo.renewable.energyOutput - 1
            user.resourceSet.totalEnergyOutput = user.resourceSet.totalEnergyOutput + room.ppInfo.renewable.energyOutput - 1
        }
        user.resourceSet.currentCO2Emission += room.ppInfo.renewable.co2Emission
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You operated a renewable power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("fuelNuclearPP", (roomId, userId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        user.resourceSet.remainingFuelingTime.nuclear--
        user.resourceSet.currentEnergyOutput += room.ppInfo.nuclear.energyOutput
        user.resourceSet.totalEnergyOutput += room.ppInfo.nuclear.energyOutput
        user.resourceSet.currentCO2Emission += room.ppInfo.nuclear.co2Emission
        user.resourceSet.resource.uranium -= room.ppInfo.nuclear.consumption
        io.to(user.id).emit("updateUser", user)
        io.to(user.id).emit("history", "You fueled a fossil power plant.")
        io.in(roomId).emit("updateAll", room)
    })

    socket.on("ask", (roomId, userId, partnerId, type, keyName, quantity, payment) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        const partner = room.users.find((p) => p.id == partnerId)
        let message = "Your request has been sent!"

        const randomId = uuidv4()
        let tradeInfo = {}

        if(type == "resource") {
            tradeInfo = {
                tradeId: randomId,
                tradePartner: user.name,
                tradePartnerId: user.id,
                type: "resource",
                keyName: keyName,
                quantity: quantity,
                payment: payment
            }
            io.to(user.id).emit("askSuccess", message)
            io.to(partner.id).emit("request", tradeInfo)
            io.to(user.id).emit("history", "You sent a trade request to " + partner.name + ".")
            io.to(partner.id).emit("history", "You received a trade request from " + user.name + ".")
        }
        else if(type == "powerPlant") {
            tradeInfo = {
                tradeId: randomId,
                tradePartner: user.name,
                tradePartnerId: user.id,
                type: "powerPlant",
                keyName: keyName,
                quantity: quantity,
                payment: payment
            }
            io.to(user.id).emit("askSuccess", message)
            io.to(partner.id).emit("request", tradeInfo)
            io.to(user.id).emit("history", "You sent a trade request to " + partner.name + ".")
            io.to(partner.id).emit("history", "You received a trade request from " + user.name + ".")
        }
        else if(type == "technology") {
            tradeInfo = {
                tradeId: randomId,
                tradePartner: user.name,
                tradePartnerId: user.id,
                type: "technology",
                keyName: keyName,
                quantity: 0,
                payment: payment
            }
            io.to(user.id).emit("askSuccess", message)
            io.to(partner.id).emit("request", tradeInfo)
            io.to(user.id).emit("history", "You sent a trade request to " + partner.name + ".")
            io.to(partner.id).emit("history", "You received a trade request from " + user.name + ".")
        }
        else {
            message = "Error"
            io.to(user.id).emit("askSuccess", message)
        }
    })

    socket.on("acceptRequest", (roomId, userId, request) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        const partner = room.users.find((p) => p.id == request.tradePartnerId)

        if(request.type == "resource") {
            if((user.resourceSet.resource[request.keyName] >= request.quantity) && (partner.resourceSet.remainingBalance >= request.payment)) {
                user.resourceSet.resource[request.keyName] -= request.quantity
                user.resourceSet.remainingBalance += request.payment
                partner.resourceSet.resource[request.keyName] += request.quantity
                partner.resourceSet.remainingBalance -= request.payment

                io.in(roomId).emit("updateAll", room)
                io.to(user.id).emit("updateUser", user)
                io.to(partner.id).emit("updateUser", partner)
                io.to(user.id).emit("deleteTradeRequest", request.tradeId)

                io.to(user.id).emit("history", "You accepted a trade request from " + partner.name)
                io.to(partner.id).emit("history", "Your trade request was accenpted by " + user.name)

                if(request.keyName == "fossilFuel") {
                    io.to(user.id).emit("history", "You sold " + request.quantity + " of fossil fuels for " + request.payment + ".")
                    io.to(partner.id).emit("history", "You bought " + request.quantity + " of fossil fuels for " + request.payment + ".")
                }
                else {
                    io.to(user.id).emit("history", "You sold " + request.quantity + " of uranium for " + request.payment + ".")
                    io.to(partner.id).emit("history", "You bought " + request.quantity + " of uranium for " + request.payment + ".")
                }
            }
            else {
                console.log("else")
                if(user.resourceSet.resource[request.keyName] < request.quantity) {
                    io.to(user.id).emit("noResource")
                }

                if(partner.resourceSet.remainingBalance < request.payment) {
                    io.to(user.id).emit("noMoney", partner)
                }
            }
        }
        else if(request.type == "powerPlant") {
            if(user.resourceSet.powerPlant[request.keyName] >= request.quantity && partner.resourceSet.remainingBalance >= request.payment) {
                user.resourceSet.powerPlant[request.keyName] -= request.quantity
                user.resourceSet.remainingFuelingTime[request.keyName] -= request.quantity
                user.resourceSet.remainingBalance += request.payment
                partner.resourceSet.powerPlant[request.keyName] += request.quantity
                partner.resourceSet.remainingFuelingTime[request.keyName] += request.quantity
                partner.resourceSet.remainingBalance -= request.payment

                io.in(roomId).emit("updateAll", room)
                io.to(user.id).emit("updateUser", user)
                io.to(partner.id).emit("updateUser", partner)
                io.to(user.id).emit("deleteTradeRequest", request.tradeId)

                if(request.quantity > 1) {
                    io.to(user.id).emit("history", "You sold " + request.quantity + " " + request.keyName + " power plants for " + request.payment + ".")
                    io.to(partner.id).emit("history", "You bought " + request.quantity + " " + request.keyName + " power plants for " + request.payment + ".")
                }
                else {
                    io.to(user.id).emit("history", "You sold " + request.quantity + " " + request.keyName + " power plant for " + request.payment + ".")
                    io.to(partner.id).emit("history", "You bought " + request.quantity + " " + request.keyName + " power plant for " + request.payment + ".")
                }
            }
            else {
                if(user.resourceSet.powerPlant[request.keyName] < request.quantity) {
                    io.to(user.id).emit("noPowerPlant")
                }

                if(partner.resourceSet.remainingBalance < request.payment) {
                    io.to(user.id).emit("noMoney", partner)
                }
            }
        }
        else if(request.type == "technology") {
            if(partner.resourceSet.remainingBalance >= request.payment) {
                user.resourceSet.remainingBalance += request.payment
                partner.resourceSet.technology[request.keyName] = true
                partner.resourceSet.remainingBalance -= request.payment

                io.in(roomId).emit("updateAll", room)
                io.to(user.id).emit("updateUser", user)
                io.to(partner.id).emit("updateUser", partner)
                io.to(user.id).emit("deleteTradeRequest", request.tradeId)

                io.to(user.id).emit("history", "You sold " + request.keyName + " technology for " + request.payment + ".")
                io.to(partner.id).emit("history", "You bought " + request.keyName + " technology for " + request.payment + ".")
            }
            else {
                if(partner.resourceSet.remainingBalance < request.payment) {
                    io.to(user.id).emit("noMoney", partner)
                }
            }   
        }
        else {
            console.log("error")
        }
    })

    socket.on("refuseRequest", (roomId, userId, request) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        const user = room.users.find((u) => u.id == userId)
        const partner = room.users.find((p) => p.id == request.tradePartnerId)
        io.to(user.id).emit("deleteTradeRequest", request.tradeId)

        io.to(user.id).emit("history", "You refused a trade request from " + partner.name + ".")
        io.to(partner.id).emit("history", "Your trade request was refused by " + user.name + ".")
    })

    socket.on("endGame", (roomId) => {
        const roomIndex = rooms.findIndex((r) => r.id == roomId)
        const room = rooms[roomIndex]
        room.users.forEach(user => {
            io.to(user.id).emit("endGame_notHost")
        })
    })
})


function generateRoomId() {
    const id = Math.floor(Math.random() * 8999 + 1000);
    if (rooms.some((r) => r.id == id)) {
        return generateRoomId()
    }
    return id
}

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const copy = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key])
        }
    }

    return copy;
}




const PORT = process.env.PORT || 8080
    expServer.listen(PORT, () => {
        console.log("Server is now listening at " + PORT)
})