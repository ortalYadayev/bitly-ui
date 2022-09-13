import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {
        prevInstitution: localStorage.getItem('prevInstitution') || null,
    },
    getters: {},
    mutations: {
        setPrevInstitution(state, institution) {
            state.prevInstitution = institution
            localStorage.setItem('prevInstitution', institution)
        },

        removePrevInstitution(state) {
            state.prevInstitution = null;
            localStorage.removeItem('prevInstitution');
        },
    },
    actions: {
        async sign({commit}, payload) {
            commit('setPrevInstitution', payload.institution);
            return await axiosInstance.post('/sign', payload);
        },
        async getStudents() {
            return await axiosInstance.get('/students');
        },
        async getLastStudent() {
            return await axiosInstance.get('/get-student');
        },
    },
})

export default store;
