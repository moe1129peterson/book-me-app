<template>
    <div id='previewCard'>
        <div class='coverImg'>
            <img v-if="imgURL" class="book-cover" :src="`https://covers.openlibrary.org/b/isbn/${imgURL}-M.jpg`" />
        </div>
        <div class='bookInfo'>
            <h2>{{ title }}</h2>
            <h4>{{ author }}</h4>
        </div>
        <div class="remove-icon" v-if="myBook">
            <button @click="removeBook(myBook._id)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="action-btns">
            <button @click="toggleReadLater({ title: title, author: author, imgURL: imgURL})">
                <i class="fas fa-bookmark"></i>
            </button>
            <button @click="toggleHaveRead({ title: title, author: author, imgURL: imgURL})">
                <i class="fas fa-book-open"></i>
            </button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Book Preview', 
    props: {
        imgURL: { type: String }, 
        title: { type: String }, 
        author: { type: String }, 
        myBook: { type: Object }
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
            this.$store.commit('updateMyBooks', response);
        }, 
        async removeBook(id) {
            let firstCall = await this.$store.dispatch('crudAction', {
                route: 'books', 
                method: 'DELETE', 
                id: id
            })
            let secondCall = await this.$store.dispatch('crudAction', {
                route: 'books', 
                method: 'GET'
            })
            this.$store.commit('updateMyBooks', secondCall)
        }
    }, 
    computed: {
        haveReadColor() {
            return this.myBook?.haveRead ? '#0000ff' : '#383838' 
        }, 
        readLaterColor() {
            return this.myBook?.readLater ? '#0000ff' : '#383838'
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

    .remove-icon {
        position: absolute;
        top: 12px;
        right: 12px;
    }

    i {
        font-size: 1.4rem;
    }

    .fa-bookmark {
        color: v-bind(readLaterColor);
    }
    
    .fa-book-open {
        color: v-bind(haveReadColor);
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