<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Flyonote$$</div>

        <a role="button" class="navbar-burger" :class="{ 'is-active': showMobileNav }"
          @click.prevent="showMobileNav = !showMobileNav" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample" ref="navbarBurgerRef">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMobileNav }" ref="navBarMenuRef">
        <div class="navbar-start">
          <button v-if="storeAuth.user.id" @click="logout" class="button is-small is-info mt-3 ml-3 mb-3">{{
            $t('logout') }}</button>
          <div v-if="storeAuth.user.id" class="user-email">{{ storeAuth.user.email }}</div>
        </div>

        <div class="navbar-end">
          <RouterLink class="navbar-item" active-class="is-active" to="/notes" @click="showMobileNav = false">
            {{ $t('notes') }}
          </RouterLink>
          <RouterLink class="navbar-item" active-class="is-active" to="/stats" @click="showMobileNav = false">{{
            $t('stats') }}
          </RouterLink>
          <div class="change-locale select is-info">
            <select v-model="$i18n.locale" style="height: 100%;">
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();

const navBarMenuRef = ref(null);
const navbarBurgerRef = ref(null);
const showMobileNav = ref(false);

const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
};

onClickOutside(navBarMenuRef, (e) => {
  showMobileNav.value = false;
}, {
  ignore: [navbarBurgerRef]
});
</script>

<style scoped>
.user-email {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-left: 15px;
  color: white;
  font-size: 14px;
}

.navbar-end {
  align-items: center;
}

@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>