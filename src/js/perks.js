import store from '@/store/store'

const perks = {
    killer: {
        hexRuin: {
            applyOnStart: true,
            goodSkillChecks: -5,
            greatSkillChecks: 0,
            icon: 'hexRuin',
            randomPick(){
                return{
                    active: store.state.gameStatus.now.gameMode == 'ds' ? false : store.state.gameStatus.now.gameMode == 'normal' ? Math.random() > 0.5 : true,
                    applyOnStart: this.applyOnStart,
                    tier: 'tier3', // default
                    goodSkillChecks: this.goodSkillChecks,
                    greatSkillChecks: this.greatSkillChecks,
                    icon: this.icon,
                }
            }
        },
        huntressLullaby: {
            applyOnStart: true,
            failedSkillChecks: [
                {tier1: 2},
                {tier2: 4},
                {tier3: 6}
            ],
            tokens: {
                0: 0, 
                1: 20, // Time between the
                2: 40, // Skill Check warning sound and the
                3: 60, // Skill Check becomes shorter. 
                4: 80, //
                5: 'no sounds'
            },
            icon: 'huntressLullaby',
            randomPick(){
                // let active = Math.random > 0.5 ? true : false
                let normalModeTier = this.failedSkillChecks[Math.floor(Math.random()*3)]
                let trainingModeTier = this.failedSkillChecks[2]
                return {
                    active: store.state.gameStatus.now.gameMode == 'ds' ? false : store.state.gameStatus.now.gameMode == 'normal' ? Math.random() > 0.5 : true,
                    applyOnStart: this.applyOnStart,
                    tier: store.state.gameStatus.now.gameMode == 'normal' ? Object.keys(normalModeTier)[0] : Object.keys(trainingModeTier)[0],
                    failedSkillChecks: store.state.gameStatus.now.gameMode == 'normal' ? Object.values(normalModeTier)[0] : Object.values(trainingModeTier)[0],
                    // tokens: this.tokens,
                    currentTokens: store.state.gameStatus.now.gameMode == 'training' ? 5 : 0,
                    icon: this.icon,
                    tokens: this.tokens
                }
            }
        },
        unnervingPresence: {
            applyOnStart: true,
            successZone: [
                {tier1: 40},
                {tier2: 50},
                {tier3: 60}
            ],
            icon: 'unnervingPresence',
            randomPick(){
                let normalModeTier = this.successZone[Math.floor(Math.random() * 3)]
                let trainingModeTier = this.successZone[2]
                return {
                    active: store.state.gameStatus.now.gameMode == 'ds' ? false : store.state.gameStatus.now.gameMode == 'normal' ? Math.random() > 0.5 : true,
                    activated: false,
                    applyOnStart: this.applyOnStart,
                    tier: store.state.gameStatus.now.gameMode == 'normal' ? Object.keys(normalModeTier)[0] : Object.keys(trainingModeTier)[0],
                    successZone: store.state.gameStatus.now.gameMode == 'normal' ? Object.values(normalModeTier)[0] : Object.values(trainingModeTier)[0],
                    icon: this.icon,
                }
            }
        }
    },
}


const generateKillerPerks = () => {
    let possiblePerks = Object.keys(perks.killer)
    let killerPerks = {}
    for (let index = 0; index < possiblePerks.length; index++) {
        let currentPerk = possiblePerks[index]
        // killerPerks[currentPerk] = perks.killer[possiblePerks[index]].randomPick()
        killerPerks[currentPerk] = perks.killer[possiblePerks[index]].randomPick()
    }
    store.state.gameStatus.killerPerks = killerPerks
    console.log(store.state.gameStatus.killerPerks)
}

export {perks, generateKillerPerks}