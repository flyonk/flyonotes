<template>
  <CSuccessfullRegister v-if="storeAuth.showSuccessRegister" />
  <div class="auth" v-else>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">{{ $t('Login') }}</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">{{ $t('Register') }}</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Enter a email" v-model="credentials.email">
              </div>
            </div>
            <div class="field">
              <label class="label">{{ $t('Password') }}</label>
              <div class="control">
                <input class="input" type="password" placeholder="Enter a password" v-model="credentials.password">
              </div>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-primary">
                  {{ formTitle }}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, reactive } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';
import CSuccessfullRegister from '@/components/CSuccessfullRegister.vue';
import { i18n } from '@/locales/config.js';

const storeAuth = useStoreAuth();
const register = ref(false);
const credentials = reactive({ email: '', password: '' });

const formTitle = computed(() => {
  if (register.value) {
    return i18n.global.t('Register');
  } else {
    return i18n.global.t('Login');
  }
});

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter email and password');
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
    }
  }
}

</script>

<style scoped>
.auth {
  position: relative;
}

.successfull-register {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  text-align: center;
  background-color: white;
  color: white;
  font-size: 28px;

  .text {
    font-size: 16px;
    text-decoration: underline;
    color: #000;
  }
}

.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>