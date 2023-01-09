export default{
    state: {
        list:[],
        user:[],
    },
    getters: {
        getToken(state){
            return localStorage.getItem('token')
        },
        getUserInfo(state){
            return state.user
        }
    },
    mutations: {
        setToken(state, data){
            state.token = data
            localStorage.setItem('token', data)
        },
        setIngoUser(state, data){
            state.user = data
        }
    },
    actions: {
        
    },
}