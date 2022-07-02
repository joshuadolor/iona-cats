<template>
    <b-row v-if="cats.length > 0">
        <b-col cols="12" md="3" sm="6" :key="cat.id" v-for="cat of cats">
            <CatCard :cat="cat"></CatCard>
        </b-col>
    </b-row>
    <b-row v-else>
        <b-col class="pb-3"> No cats available </b-col>
    </b-row>
</template>

<script lang="ts">
import { ICat } from "@/models/cat";

import CatCard from "./Card.vue";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        cats: [],
    },
    components: {
        CatCard,
    },
    computed: {},
})
export default class CatList extends Vue {
    cats!: Array<ICat>;
}
</script>

<style></style>
