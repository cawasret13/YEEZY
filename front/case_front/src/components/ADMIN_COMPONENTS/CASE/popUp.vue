<template>
    <div class="bg_pop" v-if="close == true">
        <div class="popWindow">
            <div class="loading" v-if="loading == true">
                <progress :value="progress[0]" max="100"></progress>
                <h3 style="text-align: center;width: 100%;">{{ progress[1] }}/{{ progress[2] }}</h3>
            </div>
            <h1 class="name_block">
                Тестирование
                <button v-if="flag_result == true && result.length!=0" v-on:click="()=>{
                    flag_result = false
                    }">Назад</button>
                <button v-if="flag_result == false && result.length!=0" v-on:click="()=>{
                    flag_result=true
                }">Обратно</button>
            </h1>
            <div class="content_test" v-if="result.length==0 || flag_result == false">
                <input type="text" placeholder="Кол-во спинов" v-model="spins">
                <h4>Использовать правила</h4>
                <input type="checkbox" v-model="applayRules">
                <input type="text" placeholder="Коэффициент компенсации" v-model="coef_compensation" v-if="!applayRules">
                <input type="text" placeholder="Коэффициент прибыли" v-model="coef_profit" v-if="!applayRules">
                <div v-if="applayRules">
                    <h3>Правила</h3>
                    <div>
                        <div v-for="rule, index in rules">
                            {{ index + 1 }}.
                            <input type="text" placeholder="Прибыль" v-model="rules[index]['money']">
                            <input type="text" placeholder="Процент" v-model="rules[index]['coef']">
                            <input type="text" placeholder="Корректировка" v-model="rules[index]['coef_compensation']">
                            <button v-on:click="deleteRules(rule)">-</button>
                        </div>
                    </div>
                    <button v-on:click="addRules">Добавить</button>
                </div>
                
                <button v-on:click="testing()">Начать</button>
                <div class="history">
                    <h3>История</h3>
                    <div class="title_block">
                        <h4 class="title_history">Проверка</h4>
                        <h4 class="title_history">Кол-во спинов</h4>
                        <h4 class="title_history">Коэффициент компенсации</h4>
                        <h4 class="title_history">Коэффициент прибыли</h4>
                    </div>
                    <div class="cell_history"  v-for="data, index in history" v-on:click="open(index)">
                        <div class="characters">
                            <h4>{{ index + 1 }}</h4>
                            <h4>{{ data.spins }}</h4>
                            <h4>{{ data.coef_com }}</h4>
                            <h4>{{ data.coef_prof }}</h4>
                        </div>
                        <div class="information">
                            <h4 class="inf_h4">Прибыль: {{ data.money }} ₽</h4>
                            <h4 class="inf_h4">Убытки: {{ data.loss }} ₽</h4>
                            <h4 class="inf_h4">Чистая: {{ data.profit }} ₽</h4>
                            <h4 class="inf_h4">_{{ data.frequency }}_</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="result" v-else-if="flag_result!=false">
                <Line id="grath" :data="data_" :options="options" />
                <div>
                    <div class="char">
                        <h4 class="name_char">Кол-во спинов: </h4>
                        <h4 class="data_char">{{ result.spins }} шт.</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Средний коэффициент: </h4>
                        <h4 class="data_char">{{ Math.round(result.coef * 100) }}%</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Коэффициент компенсации: </h4>
                        <h4 class="data_char">{{ result.coef_com }} ₽</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Коэффициент прибыли: </h4>
                        <h4 class="data_char">{{ result.coef_prof }} %</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Прибыль: </h4>
                        <h4 class="data_char">{{ result.money }} ₽</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Убыток: </h4>
                        <h4 class="data_char">{{ result.loss }} ₽</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Чистая прибыль: </h4>
                        <h4 class="data_char">{{ result.profit }} ₽</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Кейс окупился: </h4>
                        <h4 class="data_char">{{ result.frequency }}</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Правила bool: </h4>
                        <h4 class="data_char">{{ result.applay_Rules }} раз</h4>
                    </div>
                    <div class="char">
                        <h4 class="name_char">Правила: </h4>
                        <h4 class="data_char">{{ result.rules }} раз</h4>
                    </div>
                    <button v-on:click="saveSetting(result.applay_Rules, result.coef_prof, result.coef_com, result.rules)">Применить настройки</button>
                    <h3>Предметы</h3>
                    <table>
                        <tr>
                            <td>Название</td>
                            <td>Цена</td>
                            <td>Кол-во</td>
                            <td>Коеф</td>
                            <td>Коеф_item</td>
                        </tr>
                        <tr v-for="item in JSON.parse(result.items)">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }} ₽</td>
                            <td>{{ item.count }} шт.</td>
                            <td>{{ item.sub }} </td>
                            <td>{{ item.coef }} </td>
                        </tr>
                    </table>
                    <!-- <div class="list_items">
                       <div class="cell_item" v-for="item in JSON.parse(result.items)">
                            <h3>{{ item.name }}</h3><br>
                            <h3>{{ item.price }}</h3><br>
                            <h3>{{ item.count }}</h3><br>
                            <hr>
                       </div>
                    </div> -->
                </div>
            </div>
        </div>
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
    Legend
    } from 'chart.js'
    import { Line } from 'vue-chartjs'

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    )
    export default{
        props:{
            close:false,
        },
        data(){
            return{
                socket: null,

                spins: null,
                coef_compensation: null,
                coef_profit: null,

                progress: [],
                loading: false,
                result:[],
                flag_result: false,

                history:[],
                rules:[],
                applayRules:false,

                data_: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Прибыль',
                            backgroundColor: '#2ecc71',
                            color:'#000',
                            data: []
                        },
                        {
                            label: 'Убытки',
                            backgroundColor: '#e74c3c',
                            color:'#000',
                            data: []
                        },
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
            }
        },
        created(){
            let _this = this
            _this.socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/case/testing`);
            _this.socket.onmessage = function(e){
                var ddata = JSON.parse(e.data)
                ddata = JSON.parse(ddata)
                if(ddata['action'] == 'progress'){
                    _this.progress[0] = ddata['value']
                    _this.progress[1] = ddata['load']
                    _this.progress[2] = ddata['allLoad']
                }
                if(ddata['action'] == 'result'){
                    _this.history.push(ddata)
                    _this.loading = false
                    _this.flag_result = true
                    _this.result = JSON.parse(ddata['data'])
                    let grath = JSON.parse(ddata['grath'])
                    _this.data_.labels = JSON.parse(grath['labels'])
                    _this.data_.datasets[0].data = JSON.parse(grath['money'])
                    _this.data_.datasets[1].data = JSON.parse(grath['loss'])
                }
            }
        },
        methods:{
            testing(){
                this.loading = true
                let _t = this
                _t.socket.send(
                    JSON.stringify({
                        pk: [this.spins, this.coef_compensation, this.coef_profit, this.$route.query.id_case, this.applayRules, this.rules],
                        action: "testing_case",
                        request_id: new Date().getTime(),
                    })
                );
            },
            open(index){
                this.flag_result = true
                this.result = JSON.parse(this.history[index]['data'])
                let grath = JSON.parse(this.history[index]['grath'])
                this.data_.labels = JSON.parse(grath['labels'])
                this.data_.datasets[0].data = JSON.parse(grath['money'])
                this.data_.datasets[1].data = JSON.parse(grath['loss'])
            },
            addRules(){
                this.rules.push({'money':null, 'coef':null, 'coef_compensation':null})
            },
            deleteRules(data){
                console.log(this.rules);
                let index = this.rules.indexOf(data);
                if (index !== -1) {
                    this.rules.splice(index, 1);
                }
                console.log('new ',this.rules);
            },
            saveSetting(applay_Rules, coef, coef_compensation, rules){
                let _t = this
                    _t.socket.send(
                        JSON.stringify({
                            pk: [this.$route.query.id_case, applay_Rules, coef, coef_compensation, rules],
                            action: "applaySettings",
                            request_id: new Date().getTime(),
                        })
                    );
            }
        },
        components:{
            Line,
        }
    }
</script>
<style>
    .char{
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: 1px solid;
    }


    .list_items{
        width: 100%;
    }
    .title_block{
        width: 98%;
        border: 1px solid orange;
        margin-bottom: 10px;
        padding: 1%;
        display: flex;
        display: inline-flex;
        justify-content: space-between;
    }
    .title_history{
        font-size: 13px;
        width: 25%;
        text-align: center;
    }
    .characters{
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        height: 50%;
        align-items: center;
    }
    .information{
        border-top: 1px solid orange;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        height: 50%;
        align-items: center;
    }
    .inf_h4{
        width: 33%;
        text-align: center;
        font-size: 11px;
    }
    .history{
        width: 80%;
        margin: auto;
        margin-top: 5%;
        font-size: 12px;
    }
    .cell_history{
        width: 98%;
        border: 1px solid orange;
        margin-bottom: 10px;
        padding: 1%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 50px;
        cursor: pointer;
    }
    .cell_history h4{
        text-align: center;
        width: 25%;
        margin: 0;
    }
    .grath{
        width: 100%;
        height: 200px;
    }
    .result{
        overflow: scroll;
        width: 98%;
        height: 90%;
        padding: 1%;
    }
    .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 22;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .popWindow{
        min-width: 50%;
        max-width: 80%;
        min-height: 500px;
        height: 80%;
        background-color: white;
        color: black;
        z-index: 21;
        position: relative;
        overflow: hidden;
    }
    .popWindow::-webkit-scrollbar {
        width: 0;
        padding: 0;
    }
    .result::-webkit-scrollbar {
        width: 0;
        padding: 0;
    }
    .bg_pop{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color:#000000c7;
        top: 0;
        left: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .name_block{
        padding: 1%;
        margin: 0;
        width: 98%;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid;
        height: 5%;
    }
    .content_test{
        width: 98%;
        height: 100%;
        padding: 1%;
    }
</style>