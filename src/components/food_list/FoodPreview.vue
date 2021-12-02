<template>
    <div id='previewCard'>
        <div class='coverImg'>
            <img v-if="imgURL" class="food-cover" :src="`https://covers.openlibrary.org/b/isbn/${imgURL}-M.jpg`" />
        </div>
        <div class='foodInfo'>
            <h2>{{ title }}</h2>
            <h4>{{ author }}</h4>
        </div>
        <div class="remove-icon" v-if="myfood">
            <button @click="removefood(myfood._id)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="action-btns">
            <button @click="toggleReadLater({ title: title, author: author, imgURL: imgURL})">
                <i class="fas fa-foodmark"></i>
            </button>
            <button @click="toggleHaveRead({ title: title, author: author, imgURL: imgURL})">
                <i class="fas fa-food-open"></i>
            </button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'food Preview', 
    props: {
        imgURL: { type: String }, 
        title: { type: String }, 
        author: { type: String }, 
        myfood: { type: Object }
    },
    methods: {
        async toggleReadLater(query) {
            let food = await this.checkDBForExisting(query);
            if (food) {
                this.updatefood(food._id, {
                    readLater: !food.readLater
                })
            } else {
                this.addNewfood(query);
            }
        },
        async toggleHaveRead(query) {
            let food = await this.checkDBForExisting(query);
            if (food) {
                this.updatefood(food._id, {
                    haveRead: !food.haveRead
                })
            } else {
                this.addNewfood(query);
            }
        }, 
        async checkDBForExisting(query) {
            return this.$store.getters.getfood(query);
        }, 
        async addNewfood(body) {
            let response = await this.$store.dispatch('crudAction', {
                route: 'foods', 
                method: 'POST', 
                body: body
            })
            this.$store.commit('addToMyfoods', response);
        }, 
        async updatefood(id, body) {
            let response = await this.$store.dispatch('crudAction', {
                route: 'foods', 
                method: 'PUT', 
                id: id, 
                body: body
            })
            this.$store.commit('updateMyfoods', response);
        }, 
        async removefood(id) {
            let firstCall = await this.$store.dispatch('crudAction', {
                route: 'foods', 
                method: 'DELETE', 
                id: id
            })
            let secondCall = await this.$store.dispatch('crudAction', {
                route: 'foods', 
                method: 'GET'
            })
            this.$store.commit('updateMyfoods', secondCall)
        }
    }, 
    computed: {
        haveReadColor() {
            return this.myfood?.haveRead ? '#0000ff' : '#383838' 
        }, 
        readLaterColor() {
            return this.myfood?.readLater ? '#0000ff' : '#383838'
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

    .foodInfo {
        width: 100%;
        padding: 32px;
    }

    .food-cover {
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

    .fa-foodmark {
        color: v-bind(readLaterColor);
    }
    
    .fa-food-open {
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