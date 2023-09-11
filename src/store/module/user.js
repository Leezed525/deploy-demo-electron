const user = {
    state: {
        id: '',
        isLogin: false,
        username: '',
        nickname: '',
        role: '',

    },
    mutations: {
        SET_ID: (state, id) => {
            state.id = id
        },
        LOGIN: (state, data) => {
            state.isLogin = true
            state.username = data.username
            state.nickname = data.nickname
            state.role = data.role
        },
        LOGOUT: (state) => {
            state.isLogin = false
            state.username = ''
            state.nickname = ''
            state.role = ''
        },
    },
    actions: {
        Login({commit}, userInfo) {
            commit('LOGIN', userInfo);
        },
        Logout({commit}) {
            commit('LOGOUT');
        }
    },
}

export default user;