<template>
    <NavBar/>
    <BookSearch/>
    <footer></footer>>

</template>

<script>
import NavBar from '../components/utilities/Nav.vue'
import BookSearch from '../components/book_list/BookSearch.vue'
export default {
    name: 'Home', 
    components: {
        BookSearch,
        NavBar
    }
}
</script>

<style>
    footer {
        height: 100px;
        background-color: #383838;
    }
    
</style>