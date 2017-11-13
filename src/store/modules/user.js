// 用户 Store
import { LOGIN, LOGOUT } from '../types.js'
const state = {
    user: null,
    logined: false,
    token: '',
    account: ''
};

const actions = {

}

const mutations = {
    [LOGIN](state, _token) {
        state.logined = true
        state.token = _token
        localStorage.setItem('token', _token)
        localStorage.setItem('logined', true)
    },
    [LOGOUT](state) {
        state.logined = false
        state.token = ''
        state.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('logined')
    }
}

export default {
    state,
    actions,
    mutations
}
