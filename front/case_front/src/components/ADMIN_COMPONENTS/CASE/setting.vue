<template>
    <PopUp :close="close" v-on:keyup.esc = 'close = false' />
    <transition name="bounce">
        <div v-if="createPanel" class="addItem">
            <div class="main_add">
                <div class="bar_items">
                    <img v-on:click="createPanel = false" src="../../../assets/free-icon-left-arrow-271218.png" alt="">
                    <h1 class="title_items">Предметы</h1>
                </div>
                <div class="ls_items" v-for="item in info.data">
                    <div class="item_div"  v-if="!getBlock(item)">
                        <img :src="item.img" alt="">
                        <h3 class="item_name">{{ item.name }}</h3>
                        <h3 class="item_price">{{ item.price }}</h3>
                        <button v-on:click="addItem(item.id_item)">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <div class="bar_name">
        <img v-on:click="exit()" src="../../../assets/free-icon-left-arrow-271218.png" alt="">
        <h1 class="title">Настройка кейса</h1>
    </div>
    <div class="content">
            <div class="info_case_div">
                <div class="icon_case">
                    <img :src="info.img" alt="" class="icon_case_img">
                </div>
                <div class="info_case">
                    <div class="ls">
                        <div class="pole">
                            <h2 class="name_fun">
                                Название
                            </h2>
                            <input class="inp_fun" type="text" v-model="info.name">
                        </div>
                        <div class="pole">
                            <h2 class="name_fun">
                                Цена
                            </h2>
                            <input class="inp_fun" type="text" v-model="info.price">
                        </div>
                        <div class="pole">
                            <h2 class="name_fun">
                                Показать старую цену?
                            </h2>
                            <input class="inp_fun" type="checkbox" v-model="showoldprice">
                            <input v-if="showoldprice" class="inp_fun" type="text" v-model="info.price">
                        </div>
                        <div class="pole">
                            <h2 class="name_fun">
                                Статус
                            </h2>
                            <select class="inp_fun" name="" id="" v-model="info.status">
                                <option value="0">Опубликован</option>
                                <option value="1">Ожидание</option>
                                <option value="2">В Архив</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="info_case_div" v-if="onGrath">
                <Line id="grath" :data="data" :options="options" />
            </div>
            <div class="info_case_div" v-if="onGrath">
                <Bar
                    id="my-chart-id"
                    :options="options"
                    :data="chartData"
                />
            </div>
            
            <div class="info_case_item_div">
                <div class="bar_items">
                    <h1 class="title_items">Предметы</h1>
                    <img v-on:click="createPanel = true" src="../../../assets/free-icon-plus-1828819.png" alt="">
                </div>
                <div style="width: 100%;">
                    <table>
                        <tr>
                            <th>Название</th>
                            <th>Иконка</th>
                            <th>Цена</th>
                            <th>Шанс</th>
                            <th>Уст. шанс</th>
                            <th>Событие</th>
                        </tr>
                        <tr v-for="cas, index in info.items" :key="cas" class="cl_case">
                            <td v-for="inf in cas">{{ inf.name }}</td>
                            <td v-for="inf in cas"><img :src="inf.img" alt="" class="img_case"></td>
                            <td v-for="inf in cas">{{ inf.price }}</td>
                            <td v-for="inf in cas">{{ inf.coef * 100 }}%</td>
                            <td v-for="inf in cas"><input type="text" v-model="inf.coef"></td>
                            <td v-for="inf in cas"><button v-on:click="deleteItem(index)">Убрать</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="saveBar" v-on:click="save()">
            <button v-on:click="close=!close">Тестирование кейса</button>
            <button>Сохранить</button>
        </div>
</template>

<script>
    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
    } from 'chart.js'
    import { Line, Bar } from 'vue-chartjs'

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    )


    import PopUp from '@/components/ADMIN_COMPONENTS/CASE/popUp.vue'
    export default{
        data(){
            return{
                socket: null,

                info:[],

                showoldprice:false,
                createPanel:false,
                block:[],

                close:false,
                onGrath:false,

                data: {
                    labels: [1,2,3],
                    datasets: [
                        {
                            label: 'Прибыль',
                            backgroundColor: '#2ecc71',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            data: [1, 2, 1]
                        },
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                chartData: {
                    labels: [],
                    datasets: [ { 
                        label: 'По дням',
                        backgroundColor: '#2ecc71',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: [] 
                    } ]
                },
            }
        },
        components:{
            PopUp,
            Line,
            Bar
        },
        methods:{
            exit(){
                location.replace('/admin/case/list')
            },
            addItem(id){
                var item = {}
                for(var i = 0;i<this.info.data.length;i++){
                    if(this.info.data[i].id_item == id){
                        var data = this.info.data[i]
                        item[id] = {
                            'name': data.name,
                            'price': data.price,
                            'img':data.img,
                            'coef': 0,
                            'id':id,
                        }
                        this.block.push(id)
                    }
                }
                this.info.items.push(item)
            },
            getBlock(id){
                return this.block.includes(id['id_item'])
            },
            deleteItem(id){
                this.info.items.splice(id, 1)
                this.block.splice(id, 1)
                console.log(this.info.items)
            },
            save(){
                this.info.data = null
                let formData = new FormData();
                formData.append('data', JSON.stringify(this.info));
                fetch(`http://192.168.1.68:8000/api/v1/admin/case/update`,{
                        method: "OPTIONS",
                        body: formData,
                    }).then(res=>res.json()).then(data=>{
                    // ctx.state.info = JSON.parse(data)[0]
                    console.log(data)
                    // ctx.state.info_settings = JSON.parse(data)[0]
                    })
            },
            getCase(){
                let _t = this
                _t.socket.onopen = function () {
                    _t.socket.send(
                        JSON.stringify({
                            pk: _t.$route.query.id_case,
                            action: "join_admin_case",
                            request_id: new Date().getTime(),
                        })
                    );
                }
            },
            grath(grath){
                this.data.labels = JSON.parse(grath['labels'])
                this.data.datasets[0].data = JSON.parse(grath['data'])
                this.chartData.labels = JSON.parse(grath['days'])
                this.chartData.datasets[0].data = JSON.parse(grath['volue_day'])
                this.onGrath = true
            }
        },
        
        created(){
            let _this = this
            _this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/admin/case`);
            _this.socket.onmessage = function(e){
                var ddata = JSON.parse(e.data)
                ddata = JSON.parse(ddata)
                if(ddata['action'] == 'result'){
                    var data = JSON.parse(ddata['data'])
                    _this.info = data
                    _this.info.items = JSON.parse(_this.info.items)
                    _this.info.data = JSON.parse(_this.info.data)
                    var items = _this.info.items
                    for(var k in items){
                        for(var item in items[k]){
                            _this.block.push(items[k][item]['id'])
                        }
                    }

                    var grath = JSON.parse(ddata['grath'])
                    _this.grath(grath)
                }
            }
            this.getCase()
        }
    }

</script>

<style scoped>
    .info_case_div{
        background-color: white;
        margin-top: 5px;
    }
    .bar_name{
        width: 100%;
        position: relative;
    }
    .bar_name img{
        width: 20px;
        height: 20px;
        -o-object-fit: contain;
        object-fit: contain;
        position: absolute;
        top: 0;
        left: 14px;
        padding: 0.5%;
        background: #ddd;
        border-radius: 7px;
        cursor: pointer;
    }
    .bounce-enter-active {
    animation: bounce-in .1s;
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
</style>