import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {
        links: JSON.parse(localStorage.getItem('links')) || [],
    },
    getters: {},
    mutations: {
        setLinks(state, links) {
            state.links.unshift(links);

            localStorage.setItem('links', JSON.stringify(state.links));
        },

        removeLinks(state) {
            state.links = null;
            localStorage.removeItem('links');
        },
    },
    actions: {
        async createShortLink({commit}, payload) {
            const response = await axiosInstance.post('/short-link', {
                longLink: payload.longLink
            });

            commit('setLinks', {
                shortLink: response.data.shortLink,
                longLink: response.data.longLink
            });

            return response;
        },

        async getLongLink({}, url) {
            return await axiosInstance.post('/redirect-link', { url });
        },
    },
})

export default store;
