<template>
    <b-card :img-src="cat.url" img-alt="Image" img-top class="mb-4">
        <b-button
            @click="viewDetails"
            class="btn-view-details"
            variant="primary"
            >View details</b-button
        >
    </b-card>
</template>

<script lang="ts">
import { ICat } from "@/models/cat";

import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        cat: {},
    },
})
export default class CatCard extends Vue {
    cat!: ICat;

    viewDetails(): void {
        this.$router.push({
            name: "breed-details",
            params: { id: this.cat.id },
        });
    }
}
</script>

<style scoped>
.btn-view-details {
    width: 100%;
}
</style>
