<template>
  <div class="home-table-wrapper">
    <div id="home-table" class="home-table" :class="tableFormat">
      <div class="home-search">
        <label for="search">{{ $t("table.search") }}</label>
        <input class="home-search__input" type="text" id="search" v-model="searchText" @keyup="startSearch" />
      </div>
      <transition-group tag="div" class="home-table__transition" name="fade-default">
        <div class="item-wrapper" :class="{ 'item-wrapper--video': p.video }" v-for="p in peoplesInPage" :key="p.id">
          <div class="item">
            <div class="item__mainInfo">
              <img :src="require(`@/assets/img/${p.image}.svg`)" alt="svg" class="item__avatar" />
              <h5 class="item__name">{{ p.name[$i18n.locale] }}</h5>
            </div>
            <p class="item__age">{{ p.age }} {{ declOfNum(p.age) }}</p>
            <p class="item__phone">{{ p.phone }}</p>
            <p v-if="$store.state.format === 'preview'" class="item__desc">{{ p.phrase[$i18n.locale] }}</p>
          </div>
          <div class="item-wrapper__videoWrapper" v-if="p.video && $store.state.format === 'preview'">
            <video controls class="item-wrapper__video" @click="videoClick">
              <source :src="require(`@/assets/video/${p.video}.mp4`)" type="video/mp4" />
            </video>
          </div>
        </div>
      </transition-group>
      <div v-if="!peoples.length" class="items-empty">
        <p>{{ $t("table.sorry") }}</p>
      </div>
    </div>
    <paginate
      :pageCount="Math.ceil(+(peoples.length / itemsOnPage))"
      :prevText="'Prev'"
      :nextText="'Next'"
      :containerClass="'pagination'"
      :clickHandler="setPage"
    >
    </paginate>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate';
  
  export default {
    data() {
      return {
        currentPage: 1,
        itemsOnPage: 15,
        searchText: "",
      }
    },

    computed: {
      peoples() {
        let currPeoples = this.$store.state.peoples
        let filteredPeoples = currPeoples.filter((p) => {
          if (p.name[this.$i18n.locale].toLowerCase().includes(this.$store.state.searchText.toLowerCase())) {
            return p
          }
        })
        setTimeout(() => {
          document.getElementsByClassName("pagination")[0].children[1].children[0].click()
        }, 0)
        return filteredPeoples
      },
      peoplesInPage() {
        return this.peoples.slice((this.currentPage - 1) * this.itemsOnPage, this.itemsOnPage * this.currentPage)
      },
      tableFormat() {
        return this.$store.state.format == "table" ? "home-table--default" : "home-table--preview"
      },
    },

    mounted() {
      document.addEventListener("scroll", this.playPause)

      let items = document.getElementsByClassName("item-wrapper");
      for (const i of items) {
        i.classList.add("item-wrapper--dnone")
      }

      for (let i = 0; i < items.length; i++) {
        setTimeout(()=>{
          items[i].classList.remove("item-wrapper--dnone")
        }, i*30 );
      }
    },

    methods: {
      setPage(page) {
        this.currentPage = page

        document.getElementById("home-table").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      },

      declOfNum(n) {
        if (this.$i18n.locale != "ru") {
          return "years"
        }
        const textForms = ["год", "года", "лет"]
        n = Math.abs(n) % 100
        var n1 = n % 10
        if (n > 10 && n < 20) {
          return textForms[2]
        }
        if (n1 > 1 && n1 < 5) {
          return textForms[1]
        }
        if (n1 == 1) {
          return textForms[0]
        }
        return textForms[2]
      },

      startSearch() {
        this.$store.commit("setSearchText", this.searchText)
      },

      playPause() {
        let allVideos = document.getElementsByTagName("video")
        for (const v of allVideos) {
          if (v.getBoundingClientRect().y <= window.innerWidth / 2 && v.getBoundingClientRect().y > 0) {
            v.play()
          } else {
            v.pause()
          }
        }
      },

      videoClick() {
        document.removeEventListener("scroll", this.playPause)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home-table {
    padding: 30px 0 20px;

    &__transition {
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .home-search {
      width: 100%;
      margin-bottom: 20px;

      &__input {
        margin-left: 10px;
      }
    }

    .item-wrapper {
      margin: 10px 0;
      padding: 10px 15px;
      box-shadow: 0 2px 20px #eee;
      transition: .3s;
      width: 100%;
      box-sizing: border-box;

      &--dnone {
        display: none;
      }
    }

    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;

      @media screen and (max-width: $md) {
        flex-wrap: wrap;
      }

      &__avatar {
        height: 40px;
        border-radius: 50%;
      }

      &__name {
        margin-left: 5px;
      }

      &__mainInfo {
        display: flex;
        align-items: center;
        flex-grow: 1;
        flex-basis: 400px;

        @media screen and (max-width: $md) {
          flex-basis: auto;
          width: 100%;
        }
      }

      &__age {
        flex-grow: 1;

        @media screen and (max-width: $md) {
          font-size: 14px;
          color: #767676;
        }
      }
    }

    &--preview {
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      justify-content: space-between;

      .item-wrapper {
        flex-basis: calc(50% - 10px);
        padding: 0;
        display: flex;
        align-items: stretch;

        @media screen and (max-width: $md) {
          flex-basis: 100%;
          flex-direction: column;
        }

        &--video {
          flex-basis: 100%;
        }

        &__videoWrapper {
          max-width: calc(50% - 10px);
          background: #111;
          display: flex;
          align-items: center;

          @media screen and (max-width: $md) {
            max-width: 100%;
          }
        }

        &__video {
          max-width: 100%;
        }
      }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 15px;

        &__name {
          margin-left: 10px;
          font-size: 16px;
        }

        &__age {
          margin: 15px 0;
          color: #aaa;
        }

        &__desc {
          margin-top: 20px;
        }

        &__mainInfo {
          flex-basis: auto;
        }
      }
    }
  }
</style>
