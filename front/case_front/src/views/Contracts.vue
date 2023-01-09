<template>
    <Header />
    <div>
        <h1 class="title">Контракты</h1>
        <button v-on:click="test">_______TEST_______</button>
        <div class="contract">
            {{ Math.round(price) }}
            <div class="items_for_contract">
                <div v-for="item in itemsContract" class="cell_item" v-on:click="deleteItem(item)">
                    <img class="item_img" :src="inventory[item].img" alt="">
                    <h2 class="item_name">{{ inventory[item].name }}</h2>
                    <h3 class="item_price">{{ inventory[item].price }}</h3>
                </div>
            </div>
            <div class="balance">
               от {{ Math.round((price / 4)) }} до {{ Math.round(((price * 307) / 100)) }}
               <button v-if="itemsContract.length >= 3" v-on:click="subscribe">Подписать</button>
            </div>
            <div class="inventory">
                <div class="name_block">
                    <h3>Инвентарь</h3>
                </div>
                <div class="list">
                    <div class="cell_item" v-for="item, index in inventory" v-on:click="addItem(index)">
                        <img class="item_img" :src="item.img" alt="">
                        <h2 class="item_name">{{ item.name }}</h2>
                        <h3 class="item_price">{{ item.price }}</h3>
                        <div v-if="selectItem(index)" class="select"></div>
                    </div>
                </div>
            </div>
            <div class="resualt" v-if="resualt != null">
                <div class="window_res">
                    <img :src="resualt.img" alt="">
                    <h1>{{ resualt.name }}</h1>
                    <h2>{{ resualt.price }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/Header.vue'
    export default{
        components:{
            Header,
        },
        data(){
            return{
                inventory:[],
                itemsContract:[],
                price:0,
                resualt:null,
            }
        },
        mounted(){
            var _t = this
            this.socket = new WebSocket('ws://192.168.1.68:8000/ws/user/inventory');
            this.socket.onmessage = function(e){
                var ddata = JSON.parse(e.data)
                if (ddata['action'] = 'inventory'){
                    _t.inventory = JSON.parse(ddata['data'])
                }
            }
            _t.socket.onopen = function () {
                _t.socket.send(
                    JSON.stringify({
                        pk: (localStorage.getItem('token')),
                        action: "getInventory",
                        request_id: new Date().getTime(),
                    })
                );
            }
        },
        methods:{
            addItem(id){
                var flag = false
                for(var i =0;i<this.itemsContract.length;i++){
                    if (this.itemsContract[i] == id){
                        flag = true
                    }
                }
                if (flag == false && this.itemsContract.length < 8){
                    this.itemsContract.push(id)
                    this.getPrice()
                } 
            },
            deleteItem(data){
                var index = this.itemsContract.indexOf(data)
                if (index !== -1) {
                    this.itemsContract.splice(index, 1);
                    this.getPrice()
                }
            },
            selectItem(data){
                var index = this.itemsContract.indexOf(data)
                if (index !== -1) return true
                return false
            },
            async getPrice(){
                this.price = 0
                for(var i =0;i<this.itemsContract.length;i++){
                    this.price+=this.inventory[this.itemsContract[i]]['price']
                } 
                return this.price
            },
            subscribe(){
                var items = []
                var info = {}
                for(var i =0;i<this.itemsContract.length;i++){
                    items.push(this.inventory[this.itemsContract[i]]['id'])
                }
                info['token'] = localStorage.getItem('token')
                info['items'] = items
                let formData = new FormData();
                formData.append('data', JSON.stringify(info));
                if(localStorage.getItem('token') != null){
                    fetch(`http://192.168.1.68:8000/api/v1/contract`,{
                        method: "POST",
                        body: formData,
                    }).then(res=>res.json()).then(data=>{
                            data = JSON.parse(data)
                            // this.inventory = JSON.parse(data['inventory'])
                            this.itemsContract = []
                            this.resualt = JSON.parse(data['win'])
                            let interval = setInterval(()=>{
                                this.resualt = null
                                clearInterval(interval)
                            }, 2000)
                    })
                }
            },
            test(){
                fetch('http://192.168.1.68:8000/api/v1/contract').then(res=>res.json()).then(data=>{
                    console.log(data);
                })
            }
        }
    }
</script>
<style scoped>
    .resualt{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .window_res{
        width: 30%;
        color: white;
        background-color: rgba(0, 0, 0, 0.808);
    }
    .resualt img{
        width: 100%;
        height: 50%;
        object-fit: contain;
    }
    .title{
        text-align: center;
        font-size: 24px;
    }
    .contract{
        margin-top: 15px;
        width: 80%;
        margin: auto;
        position: relative;
    }
    .items_for_contract{
        width: 100%;
        min-height: 100px;
        height: auto;
        margin: 1%;
        background-color: rgba(0, 0, 0, 0.315);
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
    }
    .balance{
        width: 100%;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.315);
        margin: 1%;
    }
    .inventory{
        width: 100%;
        height: 500px;
        margin: 1%;
        background-color: rgba(0, 0, 0, 0.315);
        overflow: hidden;
    }
    .name_block{
        width: 98%;
        height: 8%;
        padding: 1%;
        background-color: black;
        color: white;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .name_block h3{
        margin: 0;
    }
    .list{
        width: 100%;
        height: 90%;
        overflow: scroll;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-content: flex-start;
    }
    .list::-webkit-scrollbar {
        width: 0;
    }
    .cell_item{
        width: 150px;
        height: 150px;
        border: 1px solid black;
        margin: 1%;
        cursor: pointer;
        position: relative;
    }
    .item_img{
        width: 100%;
        height: 60%;
        object-fit: contain;
    }
    .item_price{
        margin: 0;
        font-size: 10px;
    }
    .item_name{
        margin: 0;
        font-size: 14px;
    }
    .select{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.336);
    }

    @media only screen and (max-width : 480px) {
        .contract{
            margin: 0;
            width: 98%;
            padding-bottom: 2%;
        }
        .cell_item{
            width: 29%;
        }
    }
</style>