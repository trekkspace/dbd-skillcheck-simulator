import store from '@/store/store'

const perks = {
    killer: {
        hexRuin: {
            name: "[old] Hex: Ruin",
            mode:["hard"],
            icon: 'hexRuin',
            switches:[]
        },
        oppression: {
            name:"Opression / Overcharge",
            icon: 'oppression',
            mode:["hard"],
            switches:[]
        },
        huntressLullaby: {
            mode:["medium","hard"],
            name:"Hex: Huntress Lullaby",
            switches:[
                {
                    type:"int",
                    from:0,
                    to:5,
                    val:0,
                    name:"Tokens",
                    attr:"tokens"
                }
            ],
            icon: 'huntressLullaby'
        },
        unnervingPresence: {
            mode:["medium","hard"],
            name:"Hex: Unnerving Presence",
            switches:[
                {
                    type:"int",
                    from:1,
                    to:3,
                    val:1,
                    name:"Tier",
                    attr:"tier"
                }
            ],
            icon: 'unnervingPresence',
        }
    },
    survivor:{
        thisIsNotHappening: {
            mode:["easy"],
            name:"This Is Not Happening",
            switches:[

            ],
            icon: 'thisIsNotHappening',
        }
    }
}


const generateKillerPerks = () => {
    let possiblePerks = Object.keys(perks.killer)
    let killerPerks = {}
    for (let index = 0; index < possiblePerks.length; index++) {
        let currentPerk = possiblePerks[index]

        killerPerks[currentPerk] = perks.killer[possiblePerks[index]]
        killerPerks[currentPerk]["active"]=false;
    }
    store.state.gameStatus.killerPerks = killerPerks
    let survPossiblePerks = Object.keys(perks.survivor)
    let survivorPerks = {}
    for (let index = 0; index < survPossiblePerks.length; index++) {
        let currentPerk = survPossiblePerks[index]
        survivorPerks[currentPerk] = perks.survivor[survPossiblePerks[index]]
        survivorPerks[currentPerk]["active"]=false;

    }
    store.state.gameStatus.survivorPerks = survivorPerks
}

export {perks, generateKillerPerks}
