<template>
    <div>
        <h3 class="title">Список Предметов</h3>
        <table>
            <tr>
                <th>Название</th>
                <th>Иконка</th>
                <th>Сменить иконку</th>
                <th>Цена</th>
            </tr>
            <tr v-for="cas, index in list" class="cl_case">
                <td v-on:click="open_src(cas.id)">{{ cas.name }}</td>
                <td><img :src="cas.img" alt="" class="img_case"></td>
                <td><input type="file"  ref="file" v-on:change="LoadImg(cas.id, index)"></td>
                <td>{{ cas.price }}</td>
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
                fetch('http://192.168.1.68:8000/api/v1/admin/items/list').then(res=>res.json()).then(data=>{
                    this.list = JSON.parse(data)
                })
            },
            open_src(src){
                window.open('https://market.csgo.com/item/'+src.replace('_','-'))
            },   
            LoadImg(id, file){
                let formData = new FormData();
                formData.append('file', this.$refs.file[file].files[0]);
                formData.append('id', id);
                fetch('http://192.168.1.68:8000/api/v1/admin/items/list',{
                    method: "POST",
                    body: formData
                }).then(data=>data.json()).then(save=>{
                    location.replace('/admin/items/list')
                });
            }
        },
        created(){
            this.load_list()
        },
        
    }
</script>