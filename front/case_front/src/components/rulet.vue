<template>
    <h1 class="name_case">Кейс «{{ title }}»</h1>
    <div class="rul">
        <div class="item nodisplay" id="div_item"></div>
        <transition name="bounce">
            <div class="wind_res" v-if="res">
                <div class="result"> 
                    <div class="img_resualt">
                        <img :src="list[39].img" alt="">
                        <firework v-if="res_case" />
                    </div>
                    <h2>{{ list[39].name }}</h2>
                    <h2>{{ list[39].price }}</h2>
                    <div class="btn_ctrl">
                        <div class="btn_cell" v-if="getUserInfo['money'] >= price">
                            <button v-on:click="play(0)">Открыть за {{ price }}₽</button>
                            <button v-on:click="play(1)">Быстро</button>
                        </div>
                        <div class="btn_ctrl" v-else>
                            <h3 class="warrning">Вам не хватает денег, пополните баланс</h3>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div v-bind:class="active_case?'on':'off'">
            <audio id="sound"><source src="../assets/slider.mp3" type="audio/mp3"></audio>
            <audio id="sound_res"><source src="../assets/gambling.mp3" type="audio/mp3"></audio>
                <div class="roulette_window">
                    <img src="../assets/backSpin.svg" alt="" class="cur" id="cur">
                    <img src="../assets/frontSpin.svg" alt="" class="cur" id="cur_middle">
                    <img src="../assets/shadow.svg" alt="" class="cur" id="cur">
                    <div class="roulette" id="roulette">
                        <div v-for="item , i in list" class="item">
                            <div class="info">
                                <div class="icon">
                                    <img :src="item.img" alt="" class="img_skin">
                                </div>
                                <div class="name">
                                    <p>{{ item.name }}</p>
                                    <!-- <p>{{ item.price }}</p> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="case" v-bind:class="!active_case?'on':'off'">
                <img :src="img" alt="">
            </div>
            <div class="btn_ctrl">
                <div class="btn_cell" v-if="getUserInfo['money'] >= price ">
                    <button v-on:click="play(0)" v-if="!res">Открыть за {{ price }}₽</button>
                    <button v-on:click="play(1)" v-if="!res">Быстро</button>
                </div>
                <div class="btn_ctrl" v-else>
                    <h3 class="warrning">Вам не хватает денег, пополните баланс</h3>
                </div>
            </div>
    </div>
    
</template>

<script>
    import firework from '@/components/fire.vue'
    import { mapGetters } from 'vuex'
    export default{
        props:{
            title: '',
            img: '',
            price: 0,
        },
        computed:{
            ...mapGetters(['getUserInfo'])
        },
        mounted(){
           let _this = this
           _this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/case/`)
           _this.socket.onmessage = function(e){
                var data = JSON.parse(e.data)
                _this.list = JSON.parse(data)['items']
                _this.rulry(JSON.parse(data)['mode'])
                _this.res_case = JSON.parse(data)['result']
            }
        },
        data(){
            return{
                select:40,
                size:66,
                res: false,
                active_case: false,
                start:0,
                end:0,
                slider:'../asset/slider.mp3',

                list:[],
                res_case:null,
                permission:false,
                socket:null,
            }
        },
        methods:{
            play(st){
                let _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: [_t.$route.params.id, localStorage.getItem('token'), st],
                        action: "open_case",
                        request_id: new Date().getTime(),
                    })
                )
            },
            rulry(mode){
                if(this.list['err'] != '1') {
                    var song = document.getElementById('sound');
                    var song_res = document.getElementById('sound_res');
                    song.pause()
                    song_res.pause()
                    song_res.currentTime = 0
                    song.currentTime = 1
                    song.play();
                    this.active_case = true
                    this.res = false
                    let canvas = document.getElementById('roulette')
                    canvas.style.transition = 'none'
                    canvas.classList.add('no-animation');
                    canvas.style.left = 0 + 'px'
                    canvas.offsetHeight;
                    canvas.classList.remove('no-animation');
                    // let cur = document.getElementById('cur')
                    // cur.style.display = 'block'
                    let width = document.querySelector('#div_item').offsetWidth
                    let y = window.innerWidth;
                    canvas.style.left = y/2
                    let speed = 0
                    if(mode == 0){
                        speed = 10;
                        canvas.style.transition = '5s cubic-bezier(.04,.53,.42,1)'
                    }else{
                        canvas.style.transition = '.3s cubic-bezier(.04,.53,.42,1)'
                        speed = 100
                    }
                    let w = (((this.select-1) * width) + width/2) - Math.floor(y/2)
                    let step = 0
                    const cur_middle = document.getElementById('cur_middle')
                    var ss = 0
                    let rul = setInterval(()=>{
                        if(ss == 100){
                            y = window.innerWidth;
                            w = (((this.select-1) * width) + width/2) - Math.floor(y/2)
                            ss = 0
                        }
                        ss++;
                        if(step < w){
                            step += speed
                            canvas.style.left = -step + 'px'
                        }
                        cur_middle.style.transform = `rotate(${360}deg)`
                    }, 0)
                    canvas.addEventListener("transitionend", ()=>{
                        song.pause();
                        if(this.res == false) song_res.play();
                        this.res=true
                        // cur.style.display = 'none'
                        clearInterval(rul)
                    }, false);
                }
            }
        },
        components:{
            firework,
        }
    }
</script>
<style>
    #cur_middle{
        transition: 5s ease;
    }

    .warrning{
        color: orange;
        font-size: 12px;
        padding: 1%;
        border-radius: 13px;
        background: #0000001f;
    }
    .img_resualt{
        width: 100%;
        height: 60%;
        position: relative;
    }
    .rul{
        position: relative;
        width: 100%;
    }
    .wind_res{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 4;
    }
    .name_case{
        text-align: center;
        color: #d1d1d1;
        font-size: 24px;
    }
    .btn_ctrl{
        margin: auto;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn_cell{
        width: 30%;
        margin-top: 2%;
        margin-bottom: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn_ctrl button{
        height: 40px;
        min-width: 120px;
        border: 2px solid orange;
        width: auto;
        background: none;
        cursor: pointer;
        margin: 1%;
        color: orange;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .case{
        margin-top: 5%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .result{
        height: 90%;
        width: 30%;
        padding: 1%;
        border-radius: 13px;
        background-color: #1f2126fa;
        z-index: 3;
        box-shadow: 0 0 17px 2px #ffffff0d
    }
    .result img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 3;
    }
    .result h2{
        margin: 0;
    }
    .case img{
        height: 250px;
    }
    .roulette_window{
        width: 100%;
        height: 220px;
        overflow: hidden;
        position: relative;
        margin-top: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .roulette{
        width: 100%;
        display: inline-flex;
        position: relative;
        /* transition: 5s cubic-bezier(.06,.93,.59,.78); */
        transition: 5s cubic-bezier(.04,.53,.42,1);
        align-items: center;
    }
    .item{
        height: 200px;
        min-width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }
     .cur{
        height: 100%;
        position: absolute;
        z-index: 1;
    }
    .img_skin{
        width: 90%;
        object-fit: contain;
        transition: 1s ease;
    }
    .info{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .on{
        display: flex;
    }
    .off{
        display: none;
    }
    .nodisplay{
        position: absolute;
        top: -1000px;
    }

    .icon{
        width: 100%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .name{
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bounce-enter-active {
    animation: bounce-in .5s;
    }
    .bounce-leave-active {
    animation: bounce-in .1s reverse;
    }
    @keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
    }

    @media screen and (max-width: 480px) {
        .item{
            min-width: 150px;
            height: 150px;
        }
        .roulette{
            height: 100%;
        }
        .result{
            width: 90%;
            height: 96%;
            font-size: 12px;
        }
        .case img{
            width: 250px;
            height: auto;
        }
        .rul{
            margin-bottom: 5%;
        }
        .img_resualt{
            height: 50%;
        }
        .btn_cell{
            height: 20%;
        }
    }
</style>
