<template>
    <div class="Cat">
        <b-container>
            <span v-if="!hasLoaded">Loading...</span>
            <b-card v-else class="mb-4 pa-0" no-body>
                <template #header>
                    <b-button @click="goToCatBrowser" variant="primary"
                        >Back</b-button
                    >
                </template>
                <b-card-img alt="tst" :src="cat.url" />

                <b-container class="my-4">
                    <h4>{{ breed.name }}</h4>
                    <h5>Origin: {{ breed.origin }}</h5>
                    <h6>{{ breed.temperament }}</h6>
                    <p v-html="breed.description"></p>
                </b-container>
            </b-card>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CatService } from "../services/cat";
import { ICat } from "@/models/cat";

@Options({
    computed: {
        catId(): string {
            return this.$route.params.id;
        },
        hasLoaded(): boolean {
            return !!this.breed?.id;
        },
    },
    async mounted() {
        try {
            this.cat = await CatService.getById(this.catId);
        } catch (e) {
            this.$router.replace({ name: "cat-browser" });
        }
    },
})
export default class BreedDetails extends Vue {
    cat = {} as ICat;

    goToCatBrowser() {
        this.$router.push({
            name: "cat-browser",
            query: {
                breed: this.breed?.id,
            },
        });
    }

    get breed() {
        return this.cat.breed;
    }
}
</script>

<style scoped>
.Cat {
    padding: 20px 0;
}
</style>
