<template>
    <div>
           <div class="header"></div>
            <transition enter-active-class="animated fadeIn">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created() {
       var token = this.$route.query.access_token;
       if (token) {
           localStorage.setItem('token',token)
       }
    },
    methods: {
       
        transitionEvent() {

        }
    }
}
</script>

<style lang="scss" scoped>
   .header{
       width: 100%;
       height: 30px;
       background: burlywood;
   }

</style>