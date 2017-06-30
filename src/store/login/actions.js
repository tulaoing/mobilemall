export default {
    login: ({commit},param) => commit('Login',{loginstate: param}),
    logout: ({commit}) => commit('logout')
}