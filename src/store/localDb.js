const IS_LOGINED = 'isLogined'
export default {
    setLogined() {
        localStorage.setItem(IS_LOGINED, true)
    },

    setLogout() {
        localStorage.setItem(IS_LOGINED, false)
    },

    isLogined() {
        return localStorage.getItem(IS_LOGINED) === true
    },
    getType(){
        return localStorage.getItem('templet_type');
    },
    getUserId(){
        return localStorage.getItem('userTempletsId');
    },
    getToken(){
        return localStorage.getItem('token');
    }
}
