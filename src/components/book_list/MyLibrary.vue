<template>
    <div>
        <div class='search-div'>
            <SearchInput class='search-input' v-model="searchQuery" @keyup.enter="searchBooks(searchQuery)"/>
            <button id="search-btn" @click="searchBooks(searchQuery)">Search</button>
        </div>
        <ul id="search-list">
            <li v-for="(book, index) in getMyBooks" :key="index">
                <BookPreview :imgURL="book.imgURL" :title="book.title" :author="book.author" :myBook="book"/>
            </li>
        </ul>
    </div>
</template>

<script>
import SearchInput from '../utilities/SearchInput.vue'
import BookPreview from '../book_list/BookPreview.vue'
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

    }, 
    computed: {
        getMyBooks() {
            return this.$store.state.myBooks
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