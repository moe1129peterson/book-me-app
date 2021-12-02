<template>
    <div>
        <div class='search-div'>
            <SearchInput class='search-input' v-model="searchQuery" @keyup.enter="searchFoods(searchQuery)"/>
            <button id="search-btn" @click="searchFoods(searchQuery)">Search</button>
        </div>
        <ul id="search-list">
            <li v-for="(food, index) in searchResults" :key="index">
                <FoodPreview :coverUrl="food.coverUrl" :title="food.title" :author="food.author"/>
            </li>
        </ul>
    </div>
</template>

<script>
import SearchInput from '../utilities/SearchInput.vue'
import FoodPreview from '../search/FoodPreview.vue'
export default {
    data() {
        return {
            searchQuery: '', 
        }
    },
    components: {
        SearchInput,
        FoodPreview
    }, 
    methods: {
        searchFoods(value) {
            this.$store.dispatch('searchfoods', {
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