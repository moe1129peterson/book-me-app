<template>
    <NavBar/>
    <div>
       <MyLibrary/>
    </div>
</template>

<script>
import NavBar from '../components/utilities/Nav.vue'
import MyLibrary from '../components/book_list/MyLibrary.vue'
export default {
    name: 'About', 
    components: {
        NavBar, 
        MyLibrary
    }
}

// const filterList = (event) => {
//   let selectElement = event.target;
//   let value = selectElement.value;
//   let filteredList = toggleReadLater.filter(e => e.toggleReadLater == value) || let filteredList = toggleHaveRead.filter(e => e.toggleHaveRead == value)
// }
// const categoryDropDown = document.getElementById('filterCategory');

</script>

<style>
</style>