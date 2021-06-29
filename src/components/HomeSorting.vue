<template>
  <div class="home-sorting">
    <h4 class="home-sorting__title">{{ $t("sorting.title") }}</h4>
    <div class="home-sorting__top">
      <button class="home-sorting__topItem" :class="{ 'home-sorting__topItem--active': $route.query.sortBy == 'id' }" @click="sortBy('id')">
        {{ $t("sorting.id") }}
      </button>
      <button class="home-sorting__topItem" :class="{ 'home-sorting__topItem--active': $route.query.sortBy == 'name' }" @click="sortBy('name')">
        {{ $t("sorting.name") }}
      </button>
      <button class="home-sorting__topItem" :class="{ 'home-sorting__topItem--active': $route.query.sortBy == 'age' }" @click="sortBy('age')">
        {{ $t("sorting.age") }}
      </button>
    </div>
    <div class="home-sorting__bottom">
      <button
        class="home-sorting__bottomItem"
        :class="{ 'home-sorting__bottomItem--active': $route.query.sortOrder == 'ascending' }"
        @click="sortOrder('ascending')"
      >
        {{ $t("sorting.ascending") }}
      </button>
      <button
        class="home-sorting__bottomItem"
        :class="{ 'home-sorting__bottomItem--active': $route.query.sortOrder == 'descending' }"
        @click="sortOrder('descending')"
      >
        {{ $t("sorting.descending") }}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    data() {
      return {
        sortName: "",
        order: "",
      }
    },

    computed: {
      ...mapState(["peoples"]),
      locale() {
        return this.$i18n.locale
      },
    },

    watch: {
      locale(newLocale, oldLocale) {
        this.sortingWithProps(this.sortName)
      },
    },

    async mounted() {
      const query = Object.assign({}, this.$route.query)
      if (!query.sortBy) {
        query.sortBy = "id"
        query.sortOrder = "ascending"
        query.format = "table"
        this.$router.push({ query })
      } else {
        this.sortBy(query.sortBy)
        this.sortOrder(query.sortOrder)
        this.$store.commit("switchFormat", query.format)
      }
    },

    methods: {
      sortBy(key) {
        const query = Object.assign({}, this.$route.query)
        if (query.sortBy != key) {
          query.sortBy = key
          this.$router.push({ query })
        }

        this.sortName = key
        this.sortingWithProps(this.sortName)
      },

      sortOrder(key) {
        const query = Object.assign({}, this.$route.query)
        if (query.sortOrder != key) {
          query.sortOrder = key
          this.$router.push({ query })
        }

        this.order = key
        this.sortingWithProps(this.sortName)
      },

      sortingWithProps(key) {
        let newPeoples = this.peoples.sort((a, b) => {
          if (key == "name") {
            if (a[key][this.$i18n.locale] > b[key][this.$i18n.locale]) {
              return this.order == "ascending" ? 1 : -1
            }
            if (a[key][this.$i18n.locale] < b[key][this.$i18n.locale]) {
              return this.order == "ascending" ? -1 : 1
            }
            return 0
          }
          return this.order == "ascending" ? a[key] - b[key] : b[key] - a[key]
        })

        this.$store.commit("setPeoples", newPeoples)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home-sorting {
    &__title {
      margin-bottom: 15px;
    }

    &__top,
    &__bottom {
      width: 100%;
      display: flex;
    }

    &__topItem,
    &__bottomItem {
      background-color: #eaedee;
      padding: 10px 20px;
      margin: 2px;
      flex-grow: 1;
      transition: 0.2s;

      &--active {
        background-color: #4b4f50;
        color: white;
      }

      &:hover {
        background-color: #4b4f50;
        color: white;
      }
    }
  }
</style>
