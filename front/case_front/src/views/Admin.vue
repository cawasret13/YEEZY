<template>
    <div style="width: 100%;height: 100%;">
        <div class="flex_admin">
            <div class="fast_menu">
                <FastPanel />
            </div>
            <div class="content_admin">
                <Header />
                <Case v-if="category=='case'" :func="function" :query="id_case" />
                <Items v-if="category=='items'" :func="function" :query="id_case" />
            </div>
        </div>
    </div>
</template>
<script>
    import headerAdmin from '../components/ADMIN_COMPONENTS/HeaderAdmin.vue'
    import FastPanel from '../components/ADMIN_COMPONENTS/panelFast.vue'
    import Header from '../components/Header.vue'
    import Items from '../components/ADMIN_COMPONENTS/ITEMS/Items.vue'

    import Case from '../components/ADMIN_COMPONENTS/Case.vue'
    export default{
        components:{
            headerAdmin,
            Header,
            FastPanel,
            Case,
            Items,
        },
        data(){
            return{
                category: this.$route.params.category,
                function: this.$route.params.function,
                id_case: this.$route.query.id_case,
            }
        },
        created(){
            // let formData = new FormData();
            // formData.append('token', localStorage.getItem('token'));
            // fetch(`http://${window.location.hostname}:8000/api/v1/auth/status`,{
            //     method: "POST",
            //     body: formData,
            // }).then(res=>res.json()).then(data=>{
            //     console.log(data);
            //     if (data == false){
            //         location.replace('/')
            //     }
            // })
        }
    }
</script>
<style>
    @import url('../assets/style/admin/main.css');
</style>