const getters = {
    userInfo: {
        id: state => state.user.id,
        nickname: state => state.user.nickname,
        role: state => state.user.role,
        username: state => state.user.username,
    },
    isLogin: state => state.user.isLogin,
};

export default getters;