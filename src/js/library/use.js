import store from '@/store/store'


const notification = (note) => {
    store.commit('addNewNotifications', {
        notification: String(note)
    })
}

export {notification}