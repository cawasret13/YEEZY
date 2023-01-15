<template>
    <Header />
    <div class="content">
        <div class="title_cases">
                <h2>ОБЫЧНЫЕ КЕЙСЫ</h2>
        </div>
        <div class="list_case">
            <div id="test" class="case" v-for="_case in list" v-on:click="open_case(_case.id_case)">
                    <h1 class="name_case">{{ _case['name'] }}</h1>
                    <img :src="_case['img']" alt="">
                    <h1 class="price_case">{{ _case['price'] }}₽</h1>
            </div>
        </div>
    </div>

</template>
<script>
    import { mapGetters } from 'vuex';
    import Header from '../components/Header.vue'
    export default{
        data(){
            return{
                socket:null,
                list: [],
            }
        },
        computed: mapGetters(['getToken']),
        created(){
            let _this = this
            _this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/`);
            _this.socket.onmessage = function(e){
                var ddata = JSON.parse(e.data)
                _this.list = JSON.parse(ddata)
            }
        },
        methods:{
            open_case(id){
                location.replace('/case/'+id)
            }
        },
        components:{
            Header,
        }
    }
</script>
<style scoped>
    *, *:before, *:after {
        box-sizing: border-box;
    }
    .title_cases{
        width: 100%;        
        text-align: center;
        color: rgb(253, 106, 61);
        font-size: 12px;
    }
    .list_case{
        width: 100%;
        height: auto;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .case{
        width: 230px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 1%;
        padding: 0.5%;
        cursor: pointer;
        position: relative;
        transition: 1s ease;
        color: rgba(0, 0, 0, 0.356);
    }
    
    .case:before{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-top: solid 2px;
        border-bottom: solid 2px;
        transition: 1s;
        transform: scaleX(0);
    }
    .case:after{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-left: solid 2px;
        border-right: solid 2px;
        transition: 1s;
        transform: scaleY(0);
    }
    .case:hover:before,
    .case:hover:after
    {
        transform: scale(1);
    }
    .case:hover{
        background-color: rgba(0, 0, 0, 0.267);
    }
    .case img{
        width: 90%;
        height: 90%;
        object-fit: contain;
    }
    .name_case{
        margin-bottom: 0;
        margin-top: 0;
        width: 100%;
        text-align: start;
        font-size: 20px;
        color: #d1d1d1;
    }
    .price_case{
        margin-bottom: 0;
        margin-top: 0;
        height: 25px;
        text-align: start;
        font-size: 16px;
        color: orange;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 5%;
        padding: 1%;
        min-width: 80px;
        border: 2px solid orange;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        width: 80%;
        margin: auto;
    }
    .case a{
        width: 100%;
        height: 100%;
        color: black;
        text-decoration: none;
    }
    @media only screen and (max-width : 480px) {
        .case{
            width: 45%;
            height: 250px;
        }
        .content{
            margin: 0;
            width: 100%;
        }
        .list_case{
            justify-content: space-around;
        }
    }
</style>