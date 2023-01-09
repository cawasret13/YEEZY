<template>
    <div>
        <hea />
        <rul :title="info_case.name" :img="info_case.img" :price="info_case.price" />
        <div class="list_item">
            <div v-for="item in info_case.items" class="item_case">
                <span class="lvl"></span>
                <img class="bg_item" src="@/assets/back_item.svg" alt="">
                <img class="item_icon" :src="item.img" alt="">
                <div class="globla_name">
                    <h3 class="name_item">{{ (item.name).split('|')[0] }}</h3>
                    <h3 class="description_item">{{ (item.name).split('|')[1] }}</h3>
                </div>
                <h3 class="price_item">{{ item.price }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
    import hea from '../components/Header.vue'
    import rul from '../components/rulet.vue'
    export default{
        components:{
            hea,
            rul
        },
        data(){
            return{
                socket:null,
                info_case:[],
            }
        },
        created(){
            let _t = this
            this.socket = new WebSocket('ws://192.168.1.68:8000/ws/case/')
            this.socket.onmessage = function (e) {
                var data = JSON.parse(e.data)
                _t.info_case = JSON.parse(data)
                document.title = JSON.parse(data)['name']
                _t.info_case.items = JSON.parse(_t.info_case.items)
            }
        },
        mounted(){
            let _t = this
            _t.socket.onopen = function () {
                _t.socket.send(
                    JSON.stringify({
                        pk: _t.$route.params.id,
                        action: "join_case",
                        request_id: new Date().getTime(),
                    })
                );
            }
        }
    }
</script>
<style scoped>
    .lvl{
        background: rgb(226, 31, 31);
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
    }
    .bg_item{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    .item_icon{
        width: 100%;
        height: 60%;
        object-fit: contain;
        filter: drop-shadow(0px 0px px rgba(138, 132, 132, 0.178));
    }
    .item_case{
        width: 150px;
        height: 200px;
        border: 1px solid black;
        margin: 1%;
        padding: 1%;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-content: space-around;
        flex-direction: column;
    }
    .item_case h3{
        margin: 0;
    }
    .list_item{
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .globla_name{
        height: 25%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .name_item{
        font-size: 15px;
        color: #d1d1d1;
    }
    .description_item{
        font-size: 13px;
        color: #d1d1d1;
    }
    .price_item{
        height: 25px;
        text-align: start;
        font-size: 16px;
        color: orange;
        position: absolute;
        top: 0;
        right: 0;
        margin: 1%;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media only screen and (max-width : 480px) {
        .list_item{
            justify-content: space-around;
        }
    }
</style>