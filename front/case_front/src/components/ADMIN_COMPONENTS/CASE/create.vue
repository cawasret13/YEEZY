<template>
    <div>
        <h3 class="title">Создание кейса</h3>
        <div>
            <div class="createCase">
                <div class="cell_cr">
                    <h1 class="name_cr">Иконка</h1>
                    <input type="file" ref="file">
                </div>
                <div class="cell_cr">
                    <h1 class="name_cr">Название</h1>
                    <input type="text" v-model="name">
                </div>
                <div class="cell_cr">
                    <h1 class="name_cr">Цена</h1>
                    <input type="text" v-model="price">
                </div>
                <button v-on:click="LoadFile()">Создать</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        props:{
            func: '',
            query: '',
        },
        data(){
            return{
                icon:'',
                name:'',
                price:0,
            }
        },
        components:{
        },
        methods:{
            LoadFile(){
                var file = this.$refs.file.files[0]
                let formData = new FormData();
                formData.append('file', file);
                formData.append('name', this.name);
                formData.append('price', this.price);
                fetch('http://192.168.1.68:8000/api/v1/admin/case/update',{
                    method: "POST",
                    body: formData
                }).then(data=>data.json()).then(save=>{
                    location.replace('/admin/case/list?id_case='+save)
                });
            }
        }
    }
</script>