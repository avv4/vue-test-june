<template>
  <div class="home-view-format">
    <h4 class="home-view-format__title">{{ $t("view.title") }}</h4>
    <div class="home-view-format__switcher">
      <button
        class="home-view-format__button"
        :class="{ 'home-view-format__button--active': $route.query.format == 'table' }"
        @click="switchFormat('table', $event)"
      >
        {{ $t("view.table") }}
      </button>
      <button
        class="home-view-format__button"
        :class="{ 'home-view-format__button--active': $route.query.format == 'preview' }"
        @click="switchFormat('preview', $event)"
      >
        {{ $t("view.preview") }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      switchFormat(format, e) {
        let vButton = document.getElementsByClassName("home-view-format__button")
        for (const b of vButton) {
          if (b.classList.contains("home-view-format__button--active")) {
            b.classList.remove("home-view-format__button--active")
          }
        }
        e.target.classList.add("home-view-format__button--active")

        const query = Object.assign({}, this.$route.query)
        if (query.format != format) {
          query.format = format
          this.$router.push({ query })
        }

        this.$store.commit("switchFormat", format)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home-view-format {
    &__title {
      margin-bottom: 15px;
    }

    &__switcher {
      display: flex;
    }

    &__button {
      background-color: #eaedee;
      padding: 10px 20px;
      margin: 2px;
      flex-grow: 1;
      transition: 0.2s;

      &--active {
        background-color: #12c8f7;
        color: white;
      }

      &:hover {
        background-color: #12c8f7;
        color: white;
      }
    }
  }
</style>
