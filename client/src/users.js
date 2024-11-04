import data from './temp-data';

export const getUsers = async () => {
    const users = []
    for (let el of data.users) {
        let user = getUser(el.id)
        users.push(user)
    }
    return users
}

export const getUser = (id) => {
    const val = data.users.find(el => el.id == id)
    const user = {
        id: val.id,
        login: val,
        profile: {},
        trips: [],
        lists: []
    }
    user.profile = data.profiles.find((prof) => prof.id === val.id)
    user.trips = data.trips.filter(trip => trip.user = val.id)
    user.lists = data.lists.filter(list => list.user === val.id)
    return user
}