<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    async fetchMyBooks() {
      let response = await this.$store.dispatch('crudAction', {
        route: 'books', 
        method: 'GET'
      })
      this.$store.commit('updateMyBooks', response)
    }
  }, 
  mounted() {
    this.fetchMyBooks()
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,900;1,400&display=swap');

* {
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #FAF9F6;
}

</style>
