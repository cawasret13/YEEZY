<template>
    <div>
        <h3 class="title">Список кейсов</h3>
        <table>
            <tr>
                <th>Название</th>
                <th>Иконка</th>
                <th>Цена</th>
                <th>Кол-во предметов</th>
                <th>Статус</th>
            </tr>
            <tr v-for="cas in list" class="cl_case" v-on:click="open_case(cas.id_case)">
                <td>{{ cas.name }}</td>
                <td><img :src="cas.img" alt="" class="img_case"></td>
                <td>{{ cas.price }}</td>
                <td>{{ cas.items }}</td>
                <td>{{ cas.status }}</td>
            </tr>
        </table>

    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],
            }
        },
        methods:{
            load_list(){
                fetch('http://192.168.1.68:8000/api/v1/admin/case/list').then(res=>res.json()).then(data=>{
                    this.list = JSON.parse(data)
                })
            }   
            ,
            open_case(id){
                location.replace(`/admin/case/list?id_case=${id}`)
            }
        },
        created(){
            this.load_list()
        },
        
    }
</script>