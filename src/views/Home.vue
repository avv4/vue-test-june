<template>
  <div class="home">
    <div class="container">
      <div class="home__header">
        <div class="home__headerCol">
          <HomeSorting v-if="loading"/>
        </div>
        <div class="home__headerCol">
          <HomeViewFormat v-if="loading"/>
        </div>
      </div>
      <HomeTable v-if="loading" />
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"

import HomeSorting from "@/components/HomeSorting";
import HomeViewFormat from "@/components/HomeViewFormat";
import HomeTable from "@/components/HomeTable";

export default {
  name: 'Home',
  components: {
    HomeSorting, HomeViewFormat, HomeTable
  },
  
  data() {
    return {
      loading: false
    }
  },

  async mounted() {
    await this.$store.dispatch('fetchPeoples')
    this.loading = true
  }
}
</script>

<style lang="scss" scoped>
  .home {
    &__header {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
    }

    &__headerCol {
      & + & {
        margin-left: 20px;

        @media screen and (max-width: $sm) {
          margin-left: 0
        }
      }
    }

    &__headerCol:first-child {
      width: 60%;

      @media screen and (max-width: $sm) {
        width: 100%;
        margin-bottom: 20px;
      }
    }

    &__headerCol:last-child {
      width: calc(40% - 20px);

      @media screen and (max-width: $sm) {
        width: 100%;
      }
    }
  }
</style>
