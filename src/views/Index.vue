<template>
    <div class="index">
        <img alt="Vue logo" src="@/assets/images/logo.png"/>
        <h2>{{ stateVariable }}</h2>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapState, mapActions} from "vuex";

export default defineComponent({
    name: "Index",
    mounted() {
        setTimeout(() => {
            this.$store.commit("index/setProperty", {
                key: "stateVariable",
                value: "Changed state of registered module with global mixin mutation",
            });
        }, 1500);
    },
    computed: {
        ...mapState({
            stateVariable: (state: any) => state.index.stateVariable,
        }),
    },
    methods: {
        ...mapActions({})
    }
});
</script>
<style lang="scss" scoped>
.index {
    text-align: center;
}
</style>
