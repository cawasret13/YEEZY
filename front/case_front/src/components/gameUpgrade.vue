<style>
    @import url('@/assets/style/upgrade/style.css');
</style>
<template>
    <div class="center_play">
        <!-- ------------- -->
        <div class="play">
            <div class="cell right_cell none_display">
                <div class="item_to">
                    <img src="@/assets/gun.svg" alt="" class="icon_none_item" v-if="from_id == null">
                    <img :src="inventory[from_id].img" alt="" class="icon_item" v-else>
                </div>
            </div>
            <div class="cell_play">
                <div class="resualt_upgrade" v-if="status == true">
                    <firework v-if="status == true" />
                    <img class="img_win" :src="win_item.img" alt="">
                    <h3 class="name_win">{{ win_item.name }}</h3>
                    <h4 class="price_win">{{ win_item.price }}</h4>
                </div>
                <div v-if="status == false" class="war">
                    <h3 class="err">Увы...</h3>
                </div>
                <div class="playUpgrade">
                    <div class="pie-chart" id="banner"></div>
                    <img class="backPlay" src="../assets/middleBiz1.svg" alt="">
                    <img id="cur" class="frontPlay" src="../assets/backBiz1.svg" alt="">
                    <svg style="z-index: 1;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 258.29 258.29">
                        <defs>
                            <filter id="filter" x="26.23" y="25.62" width="206" height="207" filterUnits="userSpaceOnUse">
                                <feOffset input="SourceAlpha"/>
                                <feGaussianBlur stdDeviation="7" result="blur"/>
                                <feFlood/><feComposite operator="in" in2="blur"/>
                                <feComposite in="SourceGraphic"/>
                            </filter>
                        </defs>
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_7" data-name="Слой 7">
                                <circle class="cls-1" cx="129.15" cy="129.15" r="129.15"/>
                                <g id="frontBiz1">
                                    <circle class="cls-2" cx="129.15" cy="129.15" r="81.79"></circle>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div v-bind:class="(from_item!=0&&to_item!=0)?'active':'diacrive'" ></div>
                    <div class="proc_div">
                        <h1 class="proc">{{ coefPlay }}%</h1>
                        <h1 class="proc">{{ (from_item!=0&&to_item!=0)?coefPlay+'%':'' }}</h1>
                    </div>
                </div>
                <button class="btn_play" v-on:click="spin()" v-if="!start">Крутить</button>
            </div>
            <div class="cell left_cell none_display">
                <div class="item_to">
                    <img src="@/assets/gun.svg" alt="" class="icon_none_item" v-if="to_id==null">
                    <img :src="items[to_id].img" alt="" class="icon_item" v-else>
                </div>
            </div>
        </div>
        <!-- ------------- -->
        <div class="play mobile_data_items">
            <div class="cell_list">
                <div class="filter">
                    
                </div>
                <div class="list_items" v-if="inventory.length != 0">
                    <div v-for="item, index in inventory" class="pl_item">
                        <img class="bg_item" src="@/assets/back_item.svg" alt="">
                        <img class="pl_item_img" :src="item.img" alt="">
                        <h2 class="name_item">{{ ((item.name).split('|')[0].length > 20)?(item.name).split('|')[0].slice(0, 16)+'...':(item.name).split('|')[0] }}</h2>
                        <h2 class="name_item description">{{ ((item.name).split('|')[1].length > 20)?(item.name).split('|')[1].slice(0, 16)+'...':(item.name).split('|')[1] }}</h2>
                        <span class="lvl"></span>
                        <span class="price"><h3 class="price_text">{{ item.price }}</h3></span>
                        <div class="select" v-on:click="addItem(item.price, 0, index)" >
                            <button class="btn_select"><img src="../assets/add.png" alt=""></button>
                        </div>
                        <div class="select_a" v-bind:class="index == from_id?'active':'diacrive'"></div>
                    </div>
                </div>
                <div v-else class="war">
                    <h1 class="err">У вас нет предметов</h1>
                </div>
            </div>
            <div class="cell_list">
                <div class="filter">
                    <input type="text" placeholder="от" v-model="search_min" v-on:change="search()">
                    <input type="text" placeholder="до" v-model="search_max" v-on:change="search()">
                    <input type="text" placeholder="название" v-model="search_name" v-on:change="search()">
                </div>
                <div class="list_items" v-if="items.length != 0">
                    <div v-for="item, index in items" class="pl_item">
                        <img class="bg_item" src="@/assets/back_item.svg" alt="">
                        <img class="pl_item_img" :src="item.img" alt="">
                        <span class="price"><h3 class="price_text">{{ item.price }}</h3></span>
                        <h2 class="name_item">{{ ((item.name).split('|')[0].length > 20)?(item.name).split('|')[0].slice(0, 16)+'...':(item.name).split('|')[0] }}</h2>
                        <h2 class="name_item description">{{ ((item.name).split('|')[1].length > 20)?(item.name).split('|')[1].slice(0, 16)+'...':(item.name).split('|')[1] }}</h2>
                        <span class="lvl"></span>
                        <div class="select" v-on:click="addItem(item.price, 1, index)" >
                            <button class="btn_select"><img src="../assets/add.png" alt=""></button>
                        </div>
                        <div class="select_a" v-bind:class="index == to_id?'active':'diacrive'"></div>
                    </div>
                </div>
                <div v-else class="war">
                    <h1 class="err">Предметы с такими параметрами не найдены</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firework from '@/components/fire.vue'
    export default{
        methods:{
            showBar(start, cursor, status, win_item, inventory){
                this.start = true
                this.status = null
                const cur = document.getElementById('cur')
                const banner = document.getElementById('banner')
                cur.style.transition = '5s ease'
                banner.style.transform = 'rotate(' + ( start ) + 'deg)';
                cur.style.transform = 'rotate(' + ( cursor ) + 'deg)';
                cur.addEventListener("transitionend", ()=>{

                    cur.style.transition = 'none'
                    cur.classList.add('no-animation');
                    cur.style.transform = 'rotate(' + 0 + 'deg)';
                    cur.offsetHeight;
                    cur.classList.remove('no-animation');
                    
                    this.start=false
                    this.from_id = null
                    this.to_id = null
                    this.from_item = 0
                    this.to_item = 0
                    this.status = status
                    this.win_item = win_item
                    this.inventory = inventory
                }, false);
            },
            addItem(price, state, id){
                if(state == 0){
                    this.from_item = price
                    this.from_id = id
                }else{
                    this.to_item = price
                    this.to_id = id
                }
                if(Math.floor(parseFloat((this.from_item/this.to_item)*100) * 10) / 10 > 75){
                    this.coefPlay = 75
                }else{
                    this.coefPlay = Math.floor(parseFloat((this.from_item/this.to_item)*100) * 10) / 10;
                }
                this.win_item = {}
                this.status = null
                const banner = document.getElementById('banner')
                banner.style.setProperty('--value', this.coefPlay + '%');
            },

            WS_INVENTORY(){
                let _t = this
                _t.socket.onopen = function () {
                    _t.socket.send(
                        JSON.stringify({
                            pk: localStorage.getItem('token'),
                            action: "user_items",
                            request_id: new Date().getTime(),
                        })
                    );
                }
            },
            search(){
                let _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: {
                            "max":this.search_max,
                            "min":this.search_min,
                            "name":this.search_name
                        },
                        action: "get_items",
                        request_id: new Date().getTime(),
                    })
                );
            },
            spin(){
                let _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: {
                            "token":localStorage.getItem('token'),
                            "item_from":_t.inventory[_t.from_id]['id'],
                            "item_to":_t.items[_t.to_id]['id']
                        },
                        action: "spin",
                        request_id: new Date().getTime(),
                    })
                );
            }

        },
        data(){
                return{
                    socket:null,

                    coefPlay:0,
                    start:false,
                    from_item:0,
                    to_item:0,
                    to_id:null,
                    from_id:null,
                    inventory:[],
                    items:[],
                    status:null,

                    win_item:{},

                    search_max:null,
                    search_min:null,
                    search_name:null,
                }
        },
        created(){
            const _t = this
            this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/upgrade/`)
            this.socket.onmessage = function (e) {
                var data = JSON.parse(e.data)
                data = JSON.parse(data)
                console.log(data['action']);
                if(data['action'] == 'user_items'){
                    _t.inventory = JSON.parse(data['inventory'])
                }
                if(data['action'] == 'get_items'){
                    _t.items = JSON.parse(data['items'])
                }
                if(data['action'] == 'spin'){
                    _t.showBar(data['start'], data['cursor'], data['status'], (data['res_item']), (JSON.parse(data['inventory'])))
                }
            }
            this.WS_INVENTORY()
        },
        components:{
            firework,
        }
    }
</script>