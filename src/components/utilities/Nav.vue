<template>

    <header>
        <h1>Book Me</h1>
        <h2>For DGM 3760</h2>
    </header>

    <div class="nav">
        <ul>
            <li v-for="(link, index) in links" :key="index">
                <router-link :to="link.path">{{ link.text }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Nav Bar', 
    data() {
        return {
            links: [
                {
                    name: 'Search', 
                    text: 'Search', 
                    path: '/'
                }, 
                {
                    name: 'MyBooks', 
                    text: 'My Books', 
                    path: '/mybooks'
                }
            ]
        }
    }
}
</script>

<style>
    .nav {
        display: flex;
        flex-direction: column;
        background-color: gray;
        padding: 12px;
        margin-bottom: 2rem;
    }

    nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    }

    .nav ul li {
        float: left;
        width: 25%;
        list-style-type: none;
    }

    .nav ul li a {
        display: block;
        background-color: #444;
        color: #eee;
        border-left: 1px solid #777;
        padding: .5rem 0;
        text-decoration: none;
        font-size: .9rem;
        text-align: center;
    }

    .nav ul li:first-child a {border-left: none;}

    .nav ul li a:hover {
        background-color: #eee;
        color: #333;
    }

    .nav ul li.active a {
        background-color: #000;
        color: #fff;
    }

    header {
        height: 100px;
        text-align: center;
        background-color: #383838;
        color: #fff;
    }

</style>