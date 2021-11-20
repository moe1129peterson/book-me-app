<template>
    <div id='previewCard'>
        <div class='coverImg'>
            <img v-if="coverUrl" class="book-cover" :src="`https://covers.openlibrary.org/b/isbn/${coverUrl}-M.jpg`" />
        </div>
        <div class='bookInfo'>
            <h2>{{ title }}</h2>
            <h4>{{ author }}</h4>
        </div>
        <div class="action-btns">
            <button @click="toggleReadLater({ title: title, author: author, imgURL: coverUrl})">
                <i class="far fa-bookmark"></i>
            </button>
            <button @click="toggleHaveRead({ title: title, author: author, imgURL: coverUrl})">
                <i class="fas fa-book-open"></i>
            </button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Book Preview', 
    props: {
        coverUrl: { type: String }, 
        title: { type: String }, 
        author: { type: String }
    },
    methods: {
        async toggleReadLater(query) {
            let book = await this.checkDBForExisting(query);
            if (book) {
                this.updateBook(book._id, {
                    readLater: !book.readLater
                })
            } else {
                this.addNewBook(query);
            }
        },
        async toggleHaveRead(query) {
            let book = await this.checkDBForExisting(query);
            if (book) {
                this.updateBook(book._id, {
                    haveRead: !book.haveRead
                })
            } else {
                this.addNewBook(query);
            }
        }, 
        async checkDBForExisting(query) {
            return this.$store.getters.getBook(query);
        }, 
        async addNewBook(body) {
            let response = await this.$store.dispatch('crudAction', {
                route: 'books', 
                method: 'POST', 
                body: body
            })
            this.$store.commit('addToMyBooks', response);
        }, 
        async updateBook(id, body) {
            let response = await this.$store.dispatch('crudAction', {
                route: 'books', 
                method: 'PUT', 
                id: id, 
                body: body
            })
            console.log(response)
            this.$store.commit('updateMyBooks', response);
        }
    }
}
</script>

<style scoped="true">

  

     body {
        font-family: 'Poppins', sans-serif;
    }

    #previewCard {
        display: flex;
        position: relative;
        max-width: 700px;
        border-radius: 10px;
        box-shadow: 10px 5px 10px #818181;
        margin-bottom: 24px;
        max-height: 300px;
        margin-left: 1rem;
        overflow: hidden;
    }

    .coverImg {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bookInfo {
        width: 100%;
        padding: 32px;
    }

    .book-cover {
        height: 100%;
    }

    .action-btns {
        display: flex;
        position: absolute;
        bottom: 12px;
        right: 12px;
    }  

    i {
        font-size: 1.4rem;
    }
    
    button {
        background-color: transparent;
        border: none;
        outline: none;
        margin-left: 8px;
        cursor: pointer;
    }

    footer {
        height: 100px;
        background-color: #383838;
    }
    
</style>