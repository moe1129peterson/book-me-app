<template>
    <div>
        <div class='search-div'>
            <SearchInput class='search-input' v-model="searchQuery" @keyup.enter="searchfoods(searchQuery)"/>
            <button id="search-btn" @click="searchfoods(searchQuery)">Search</button>
        </div>
        <ul id="search-list">
            <li v-for="(food, index) in getMyfoods" :key="index">
                <foodPreview :imgURL="food.imgURL" :title="food.title" :author="food.author" :myfood="food"/>
            </li>
        </ul>
    </div>
</template>

<script>
import SearchInput from '../utilities/SearchInput.vue'
import foodPreview from '../food_list/foodPreview.vue'
export default {
    data() {
        return {
            searchQuery: '', 
        }
    },
    components: {
        SearchInput,
        foodPreview
    }, 
    methods: {

    }, 
    computed: {
        getMyfoods() {
            return this.$store.state.myfoods
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