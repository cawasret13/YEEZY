<template>
    <div style="position: relative;">
        <transition name="bounce">
            <List v-if="func == 'list' && query == null" />
            <Create v-else-if="func == 'create' && query == null" />
            <Settings v-else />
        </transition>
    </div>
</template>
<script>
    import List from '../ADMIN_COMPONENTS/CASE/list.vue'
    import Settings from '../ADMIN_COMPONENTS/CASE/setting.vue'
    import Create from '../ADMIN_COMPONENTS/CASE/create.vue'

    export default{
        props:{
            func: '',
            query: '',
        },
        components:{
            List,
            Settings,
            Create
        }
    }
</script>
<style scoped>
.bounce-enter-active {
    animation: bounce-in .5s;
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