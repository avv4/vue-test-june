<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <language-switcher class="header__switcher" v-slot="{ links }">
          <router-link class="header__link" :to="link.url" v-for="link in links" :key="link.langIndex">
            {{ link.langName }}
          </router-link>
        </language-switcher>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    padding: 20px 0 10px;
    display: flex;
    justify-content: flex-end;

    &__content {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__switcher {
      display: flex;
    }

    &__link {
      & + & {
        margin-left: 10px;
      }
    }
  }
</style>