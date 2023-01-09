<template>
    <div class="list_functions">
        <div class="block_menu">
            <h1 class="title_menu">Кейс</h1>
            <div class="sub_list">
                <ul class="list_btn">
                    <li class="btn_menu" v-on:click="open('case', 'list')">Список кейсов</li>
                    <li class="btn_menu" v-on:click="open('case', 'create')">Создание кейса</li>
                </ul>
            </div>
        </div>
        <div class="block_menu">
            <h1 class="title_menu">Предметы</h1>
            <div class="sub_list">
                <ul class="list_btn">
                    <li class="btn_menu" v-on:click="open('items', 'list')">Список предметов</li>
                    <li class="btn_menu" v-on:click="open('items', 'create')">Добавить предмет</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            open(cat, fun){
                location.replace(`/admin/${cat}/${fun}`)
            }
        }
    }
</script>
<style scoped>
    .list_functions{
        width: 100%;
    }
    .btn_menu{
        cursor: pointer;
    }
    .btn_menu a{
        color: white;
        text-decoration: none;
    }
    .list_btn{
        text-decoration: none;
        padding: 0;
        margin: 0;
    }
</style>