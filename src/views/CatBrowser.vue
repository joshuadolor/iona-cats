<template>
    <div class="Home">
        <b-container>
            <h1>Cat Browser</h1>
            <b-row>
                <b-col cols="12" md="3" sm="6">
                    <b-form-group label="Breed" label-for="breed">
                        <b-form-select
                            v-model="selectedBreed"
                            :options="breeds"
                            id="breed"
                            value-field="id"
                            text-field="name"
                            @change="selectBreed"
                        >
                            <template #first>
                                <b-form-select-option
                                    >Select breed</b-form-select-option
                                >
                            </template>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <CatList :cats="cats" />
            <b-row v-if="!hideLoadMore">
                <b-col cols="12" md="3" sm="6">
                    <b-button
                        @click="loadMore"
                        :disabled="disableLoadMore"
                        variant="success"
                    >
                        {{ isFetching ? "Loading cats..." : "Load more" }}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CatList from "@/components/cat/List.vue";
import { BreedService } from "@/services/breed";
import { CatService, FetchParameters } from "@/services/cat";
import { IBreed } from "@/models/breed";
import { ICat } from "@/models/cat";

@Options({
    components: {
        CatList,
    },
    watch: {
        selectedBreed(breed) {
            this.cats = [];
            this.lastPageReached = false;

            if (!breed) {
                return;
            }

            this.$router.push({
                query: {
                    breed,
                },
            });

            this.page = 1;
            this.fetchCats();
        },
    },
    async mounted() {
        this.breeds = await BreedService.fetch();
        if (this.$route.query.breed) {
            const breed = this.$route.query.breed;
            if (this.breeds.find((br: IBreed) => br.id === breed)) {
                this.selectedBreed = breed || "";
            }
        }
    },
})
export default class CatBrowser extends Vue {
    breeds: Array<IBreed> = [];
    cats: Array<ICat> = [];
    selectedBreed = "";
    isFetching = false;
    page = 1;
    limit = 10;
    lastPageReached = false;

    async fetchCats() {
        this.isFetching = true;
        const data = await CatService.fetch(this.fetchParameters);

        if (data.length > 0) {
            this.lastPageReached = !!this.cats.find((cat: ICat) => {
                return cat.id === data[0].id;
            });
        }

        if (!this.lastPageReached) {
            this.cats = [...this.cats, ...data];
        }

        this.isFetching = false;
    }

    loadMore() {
        this.page++;
        this.fetchCats();
    }

    get fetchParameters(): FetchParameters {
        return {
            page: this.page,
            limit: this.limit,
            breed_id: this.selectedBreed,
        };
    }

    get disableLoadMore(): boolean {
        return this.selectedBreed === "";
    }

    get hideLoadMore(): boolean {
        const isLessThanLimit = this.cats.length % this.limit !== 0;
        return (
            (this.lastPageReached || isLessThanLimit) && !this.disableLoadMore
        );
    }
}
</script>

<style scoped>
.Home {
    padding: 20px 0;
}
</style>
