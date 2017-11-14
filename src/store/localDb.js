const IS_LOGINED = 'isLogined'
export default {
    setLogined(vue) {
        vue.localStorage.setItem(IS_LOGINED, true)
    },

    setLogout(vue) {
        vue.localStorage.setItem(IS_LOGINED, false)
    },

    isLogined(vue) {
        return vue.localStorage.getItem(IS_LOGINED) === true
    }
}