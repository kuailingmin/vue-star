import { HIDE_HOME_MODAL } from '../types.js'
import local from '../localDb.js'
const state = {
    show_home_modal: true,
    token: local.getToken()
};

const actions = {

}

const mutations = {
    [HIDE_HOME_MODAL](state) {
        state.show_home_modal = false
    }
}

export default {
    state,
    actions,
    mutations
}
