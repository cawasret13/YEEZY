<template>
    <div>
        {{ listAdd }}
        <h3 class="title">Добавить предмет</h3>
        <table>
            <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Функция</th>
            </tr>
            <tr v-for="cas in list" class="cl_case">
                <td v-on:click="open_src(cas.id)">{{ cas.name }}</td>
                <td v-on:click="open_src(cas.id)">{{ cas.price }}</td>
                <td><button v-on:click="addList(cas)">Добавить</button></td>
            </tr>
        </table>
        <div class="saveBar">
            <button  v-on:click="save()">Сохранить</button>
        </div>
    </div>
</template>
<script>
    export default{
        created(){
            fetch('http://192.168.1.68:8000/api/v1/admin/items/create').then(data=>data.json()).then(res=>{
                this.list = JSON.parse(res)
            })
        },
        data(){
            return{
                list:[],
                listAdd:[]
            }
        },
        methods:{
            open_src(src){
                window.open('https://market.csgo.com/item/'+src.replace('_','-'))
            },
            addList(data){
                this.listAdd.push({
                    'name':data['name'],
                    'price':data['price'],
                    'id':data['id'],
                    'hash':data['hash'],
                })
            },
            save(){
                let formData = new FormData();
                formData.append('data', JSON.stringify(this.listAdd));
                fetch('http://192.168.1.68:8000/api/v1/admin/items/create',{
                    method: "POST",
                    body: formData
                }).then(data=>data.json()).then(save=>{
                    location.replace('/admin/items/list')
                });
            }
        }
    }
</script>