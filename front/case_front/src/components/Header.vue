<template>
    <div class="money" v-bind:class="active_money?'on_money':'off_money'">
        <div class="money_btn_off" v-on:click="active_money=false"></div>
        <div class="money_window">

        </div>
    </div>
    <div class="header">
        <div class="main">
            <div class="logo">
                    <a class="a_icon" href="/">
                        <img class="img_logo" src="../assets/icon1.svg" alt="">
                        <!-- <h1 style="text-decoration: none;color: orange;text-decoration: line-through;">YEEZY</h1> -->
                    </a>
            </div>
            <div class="nav">
                    <ul class="ls_nav" v-if="getToken != null">
                        <li class="but_nav" v-on:click="redirect('upgrade')">Апгрейд</li>
                        <li class="but_nav" v-on:click="redirect('contract')">Контракт</li>
                        <!-- <li class="but_nav">Избранное</li> -->
                        <li class="but_nav" v-on:click="redirect('inventory')">Инвентарь</li>
                    </ul>
            </div>
            <div class="user" v-if="getToken != null">
                <div class="us_img">
                    <img class="icon_user" :src="getUserInfo.img" alt="">
                </div>
                <div class="us_info">
                    <p>{{ getUserInfo.name }}</p>
                    <p v-on:click="active_money=true" style="cursor: pointer;">{{ getUserInfo.money }} ₽</p>
                </div>
            </div>
            <div class="user" v-else>
                <form action="https://steamcommunity.com/openid/login" method="post">
                    <input type="hidden" name="openid.identity"
                        value="http://specs.openid.net/auth/2.0/identifier_select" />
                    <input type="hidden" name="openid.claimed_id"
                        value="http://specs.openid.net/auth/2.0/identifier_select" />
                    <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
                    <input type="hidden" name="openid.mode" value="checkid_setup" />
                    <input type="hidden" name="openid.realm" value="http:\\192.168.1.68:5173" />
                    <input type="hidden" name="openid.return_to" value="http:\\192.168.1.68:5173\auth" />
                    <Button type="submit" class="auth_btn"><img src="../assets/STEAM.png" alt=""></Button>
                </form>
            </div>
            <div class="mobile_menu" v-on:click="()=>{active_menu=!active_menu}">
                <img src="@/assets/menu.png" alt="">
            </div>
       </div>
    </div>
    <div class="mobile_ls" v-if="active_menu">
        <div class="user mobile_user" v-if="getToken != null">
            <div class="us_img">
                <img class="icon_user" :src="getUserInfo.img" alt="">
            </div>
            <div class="us_info">
                <p>{{ getUserInfo.name }}</p>
                <p>{{ getUserInfo.money }} ₽</p>
            </div>
        </div>
        <div class="user mobile_user" v-else>
            <form action="https://steamcommunity.com/openid/login" method="post">
                <input type="hidden" name="openid.identity"
                    value="http://specs.openid.net/auth/2.0/identifier_select" />
                <input type="hidden" name="openid.claimed_id"
                    value="http://specs.openid.net/auth/2.0/identifier_select" />
                <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
                <input type="hidden" name="openid.mode" value="checkid_setup" />
                <input type="hidden" name="openid.realm" value="http:\\192.168.1.68:5173" />
                <input type="hidden" name="openid.return_to" value="http:\\192.168.1.68:5173\auth" />
                <Button type="submit" class="auth_btn"><img src="../assets/STEAM.png" alt=""></Button>
            </form>
        </div>
        <ul class="ls_nav">
            <li class="but_nav" v-on:click="redirect('upgrade')">Апгрейд</li>
            <li class="but_nav" v-on:click="redirect('contract')">Контракт</li>
            <!-- <li class="but_nav">Избранное</li> -->
            <li class="but_nav" v-on:click="redirect('inventory')">Инвентарь</li>
        </ul>
    </div>
    <div class="history" v-if="active_history">
            <div v-for="item in 15" class="cell_his">
                <img src="@/assets/pngwing.com1.png" alt="">
            </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default{
        data(){
            return{
                socket:null,
                history:[],
                active_menu:false,

                active_history:false,
                active_money:false,
            }
        },
        computed: mapGetters(['getToken', 'getUserInfo']),
        mounted(){
            var _t = this
            this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/`);
            this.socket.onmessage = function(e){
                var ddata = JSON.parse(e.data)
                if (ddata['action'] == 'money'){
                    _t.log()
                }
                // _t.history = JSON.parse(ddata)
            }
            this.log()
        },
       methods:{
        ...mapMutations(['setIngoUser']),
        async log(ctx){
            let formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            if(localStorage.getItem('token') != null){
                fetch(`http://${window.location.hostname}:8000/api/v1/auth`,{
                    method: "POST",
                    body: formData,
                }).then(res=>res.json()).then(data=>{
                        this.setIngoUser(JSON.parse(data))
                })
            }
        },
        redirect(src){
            location.replace(`/${src}`)
        }
       }
    }
</script>

<style scoped>
    @import url('../assets/style/header/style.css')
</style>