const state = {
    objectivePoints: [],
    notification: '',
}

const mutations = {
    updateObjectivePoints(state, payload){
        state.objectivePoints.unshift(payload)

        if (state.objectivePoints.length >= 4) {
            state.objectivePoints.pop()
        }
    },

    addNewNotifications(state, payload){
        state.notification = ''
        state.notification = payload.notification
    },

    removeObjectivePoints(state){
        state.objectivePoints = []
    },
}

export default {
    state, mutations
}