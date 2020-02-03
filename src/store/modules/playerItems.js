import {toolboxes, toolboxAddOns} from '@/js/items.js'

const state = {
    inventory: {},
    equipedItems: {
        toolbox: [],
        addOns: []
    },
}

const getters =  {
    getInventory(state){
        let playerItems = {}
        for(const [key, value] of Object.entries(state.inventory)){
            playerItems[key] = {
                quantity: value.quantity,
                what: value.what,
                description: value.what == 'toolbox' ? toolboxes[key].description : toolboxAddOns[key].description
            }
        }
        return playerItems
    }
}

const actions = {
    inventory({ commit }){
        commit('updateInventory')
    }
}

const mutations = {
    updateInventory(state){
        const reParseObject = JSON.parse(JSON.stringify(state.inventory))
        state.inventory = reParseObject
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}