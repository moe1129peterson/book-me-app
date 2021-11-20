import { createStore } from 'vuex'
import axios from 'axios'

const state = () => ({
    searchResults: [], 
    myBooks: []
})

const getters = {
    getUrl: () => {
        if (location.hostname.includes('localhost')) {
            return 'http://localhost:3000/api'
        } else {
            return 'https://immense-oasis-85895.herokuapp.com/api'
        }
    }, 

    getBook: (state) => (query) => {
        let results = state.myBooks;
        for (let key in query) {
            results = results.filter(e => e[key] === query[key]);
        }
        return results[0];
    }
}

const actions = {
    async searchBooks(context, payload) {
        try {
            let response = await axios({
                method: 'GET', 
                url: `https://openlibrary.org/search.json?q=${payload.query}`
            })
            if (response.status === 200) {
                context.commit('updateResults', response.data.docs)
            } else {
                console.error(response)
            }
        } catch (error) {
            throw error
        }
    }, 
    async crudAction(context, payload) {
        try {
            let requestUrl = `${context.getters.getUrl}/${payload.route}`;
            if (payload.id) {
                requestUrl += `/${payload.id}`
            } else if (payload.query) {
                for (let key in payload.query) {
                    let index = Object.keys(payload.query).indexOf(key)
                    if (index === 0) {
                        requestUrl += `?${key}=${payload.query[key]}`
                    } else {
                        requestUrl += `&${key}=${payload.query[key]}`
                    }
                }
            }
            let response = await axios({
                method: payload.method, 
                url: requestUrl, 
                data: payload.body, 
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}

const mutations = {
    updateResults(state, docs) {
        state.searchResults = []
        for (let book of docs) {
            if (book.isbn && book.title && book.author_name)
            state.searchResults.push({
                imgURL: book.isbn[0], 
                title: book.title, 
                author: book.author_name[0]
            })
        }
    }, 
    updateMyBooks(state, data) {
        if (Array.isArray(data)) {
            for (let doc of data) {
                let index = state.myBooks.findIndex(e => e.id === doc.id);
                state.myBooks.splice(index, 1);
                state.myBooks.push(doc);
            }
        } else {
            let index = state.myBooks.findIndex(e => e.id === data.id);
            state.myBooks.splice(index, 1);
            state.myBooks.push(data);
        }
    },
    addToMyBooks(state, doc) {
        state.myBooks.push(doc)
    }
}

export default createStore({
    state, 
    getters, 
    actions, 
    mutations
})