import {checkUser} from '@/db/system/userDB';
import {isNotEmptyObject} from "@/utils/ObjectUtils";
import {Message} from 'element-ui'

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
        login({commit}, loginForm) {
            checkUser(loginForm).then((data) => {
                console.log(data);
                if (isNotEmptyObject(data)) {
                    Message.success('登录成功');
                    commit('LOGIN', data);
                } else {
                    Message.error('用户名或密码错误');
                }
            }).catch((err) => {
                console.log(err);
                Message.error('出错');
            });
        },
        Logout({commit}) {
            commit('LOGOUT');
        }
    },
}

export default user;