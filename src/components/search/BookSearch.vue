<template>
    <div>
        <div class='search-div'>
            <SearchInput class='search-input' v-model="searchQuery" @keyup.enter="searchBooks(searchQuery)"/>
            <button id="search-btn" @click="searchBooks(searchQuery)">Search</button>
        </div>
        <ul id="search-list">
            <li v-for="(book, index) in searchResults" :key="index">
                <BookPreview :coverUrl="book.coverUrl" :title="book.title" :author="book.author"/>
            </li>
        </ul>
    </div>
</template>

<script>
import SearchInput from '../utilities/SearchInput.vue'
import BookPreview from '../search/BookPreview.vue'
export default {
    data() {
        return {
            searchQuery: '', 
        }
    },
    components: {
        SearchInput,
        BookPreview
    }, 
    methods: {
        searchBooks(value) {
            this.$store.dispatch('searchBooks', {
                query: value
            })
        }
    }, 
    computed: {
        searchResults() {
            return this.$store.state.searchResults
        }
    }
}
</script>

<style scoped="true">

    body {
        font-family: 'Poppins', sans-serif;
    }


    #search-list {

    }

    body input {
        background-color: #fff;
    }

    .search-div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
    }

    .search-input {
        height: 30px;
        width: 300px;
        margin-right: 5px;
        border-radius: 5px;
    }

    #search-btn {
        height: 34px;
        width: 100px;
        background-color: #383838;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    

</style>