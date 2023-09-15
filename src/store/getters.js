const getters = {
    userInfo: (state) => {
        return {
            id: state.user.id,
            nickname: state.user.nickname,
            role: state.user.role,
            username: state.user.username,
        }
    },
    isLogin: state => state.user.isLogin,
};

export default getters;