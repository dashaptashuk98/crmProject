<template>
  <div>
    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '440px' }"
      :closable="true"
      :showHeader="false"
    >
      <div class="auth-modal">
        <h2 class="auth-modal__title">Login</h2>

        <form class="auth-modal__form" @submit.prevent="handleLoginSubmit">
          <div class="auth-modal__field">
            <label for="login-username" class="auth-modal__label">Username</label>
            <InputText
              id="login-username"
              v-model="loginData.username"
              placeholder="Enter your username"
              class="auth-modal__input"
              required
            />
          </div>
          <div class="auth-modal__field">
            <label for="login-password" class="auth-modal__label">Password</label>
            <InputText
              id="login-password"
              v-model="loginData.password"
              type="password"
              placeholder="Enter your password"
              class="auth-modal__input"
              required
            />
          </div>

          <Button
            type="submit"
            :loading="loading"
            class="auth-modal__submit"
            :style="{
              background: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              fontFamily: 'Karla',
            }"
          >
            Login to Account
          </Button>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

interface Emits {
  (event: 'login', data: { username: string; password: string }): void
}

const emit = defineEmits<Emits>()

const visible = ref(true)
const loading = ref(false)
const loginData = ref({
  username: '',
  password: '',
})

const handleLoginSubmit = async () => {
  if (!loginData.value.username || !loginData.value.password) {
    return
  }

  loading.value = true

  emit('login', {
    username: loginData.value.username,
    password: loginData.value.password,
  })

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.auth-modal {
  background: var(--color-background);
  border-radius: var(--border-radius-extra);
  padding: 32px;
}

.auth-modal__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  color: #2d2d2d;
  margin: 0 0 24px 0;
  text-align: center;
  font-weight: 500;
}

.auth-modal__form {
  margin-bottom: 24px;
}

.auth-modal__field {
  margin-bottom: 20px;
}

.auth-modal__label {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-light);
  margin-bottom: 6px;
}

.auth-modal__input {
  width: 100%;
}

.auth-modal__submit {
  width: 100%;
  display: block;
}
</style>
