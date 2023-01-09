<template>
    <div>
        <Header />
        <h1>Инвентарь</h1>
        <div class="list_inv">
            <div v-for="item in inventory" class="inv_card">
                <div class="global_name">
                    <img :src="item.img" alt="">
                    <h1 class="inv_name">{{ item.name }}</h1>
                    <h2 class="inv_price">{{ item.price }}</h2>
                </div>
                <div class="func_btn">
                    <button class="btn_" v-on:click="saleItem(item.id)">Продать</button>
                    <!-- <button class="btn_" v-on:click="exportItem(item.id)">Вывести</button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../components/Header.vue'
    export default{
        components:{
            Header,
        },
        data(){
            return{
                socket:null,
                inventory:[],
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
            saleItem(id_item){
                var _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: [(localStorage.getItem('token')), id_item],
                        action: "saleItem",
                        request_id: new Date().getTime(),
                    })
                );
            },
            exportItem(id_item){
                var _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: [(localStorage.getItem('token')), id_item],
                        action: "exportItem",
                        request_id: new Date().getTime(),
                    })
                );
            }
        }
    }

</script>

<style scoped>
    @import url('../assets/style/inventory/main.css');
</style>