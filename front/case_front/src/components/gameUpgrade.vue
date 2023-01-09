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
                {{ status }}
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
                <button class="btn_play" v-on:click="play()" v-if="!start">Крутить</button>
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

                </div>
                <div class="list_items">
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
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            play(){
                let formData = new FormData();
                formData.append('token', localStorage.getItem('token'));
                formData.append('proc', this.coefPlay);

                formData.append('from', this.inventory[this.from_id]['id']);
                formData.append('to', this.items[this.to_id]['id']);
                fetch('http://192.168.1.68:8000/api/v1/upgrade',{
                    method: "POST",
                    body: formData
                }).then(data=>data.json()).then(save=>{
                    save = JSON.parse(save)
                    this.status = save['status']
                    this.showBar(save['pi'], JSON.parse(save['items']))
                });
            },
            showBar(status, data){
                this.start = true
                const cur = document.getElementById('cur')
                cur.style.transform = 'rotate(' + ( status ) + 'deg)';
                cur.addEventListener("transitionend", ()=>{
                    cur.style.transform = 'rotate(' + 0 + 'deg)';
                    this.start=false
                    this.from_id = null
                    this.to_id = null
                    this.from_item = 0
                    this.to_item = 0
                    this.inventory = data
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
                if(Math.floor(parseFloat((this.from_item/this.to_item)*100) * 10) / 10 > 70){
                    this.coefPlay = 75
                }else{
                    this.coefPlay = Math.floor(parseFloat((this.from_item/this.to_item)*100) * 10) / 10;
                }
                const banner = document.getElementById('banner')
                banner.style.setProperty('--value', this.coefPlay + '%');
            }
        },
        data(){
                return{
                    coefPlay:0,
                    start:false,
                    from_item:0,
                    to_item:0,
                    to_id:null,
                    from_id:null,
                    inventory:[],
                    items:[],
                    status:'',
                }
        },
        created(){
            fetch('http://192.168.1.68:8000/api/v1/upgrade?token='+localStorage.getItem('token')).then(res=>res.json()).then(data=>{
                data = JSON.parse(data)
                this.inventory = JSON.parse(data['inventory'])
                this.items = JSON.parse(data['items'])

            })
        },
    }
</script>