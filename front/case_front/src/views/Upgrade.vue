<template>
    <Header />
    <div>
        <!-- <h1>Апргрейд</h1> -->
        <Play />
    </div>
</template>
<script>
    import Header from '../components/Header.vue'
    import Play from '../components/gameUpgrade.vue'
    export default{
        components:{
            Header,
            Play
        },
        methods:{

        },
        data(){
            return{
                inv:[],
                items:[],
            }
        }
    }
</script>
