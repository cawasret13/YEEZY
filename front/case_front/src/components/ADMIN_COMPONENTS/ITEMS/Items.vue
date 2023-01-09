<template>
    <div style="position: relative;">
        <transition name="bounce">
            <List v-if="func == 'list' && query == null" />
            <AddItem v-else-if="func == 'create' && query == null" />
        </transition>
    </div>
</template>
<script>
    import List from '../ITEMS/list.vue'
    import AddItem from '../ITEMS/add.vue'
    export default{
        props:{
            func: '',
            query: '',
        },
        components:{
            List,
            AddItem,
        }
    }
</script>