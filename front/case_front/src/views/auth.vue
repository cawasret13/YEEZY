<template>
    <div>
        
    </div>
</template>
<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default{
        created(){
            const searchString = new URLSearchParams(window.location.search);

            const clickid = searchString.get('openid.identity');
            this.setToken(clickid.split('/')[5])
            this.log()
        },
        methods:{
           ...mapMutations(['setToken', 'setIngoUser']),
           async log(ctx){
            let formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            if(localStorage.getItem('token') != null){
                fetch(`http://192.168.1.68:8000/api/v1/auth`,{
                    method: "POST",
                    body: formData,
                }).then(res=>res.json()).then(data=>{
                        console.log(data)
                        this.setIngoUser(JSON.parse(data))
                        location.replace('/')
                })
            }
        },
        }
    }
</script>