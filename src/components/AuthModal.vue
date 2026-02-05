<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '440px' }"
    :closable="false"
    :showHeader="false"
    pt:root:class="!border-0 !bg-transparent"
  >
    <!-- Login Form -->
    <div v-if="activeModal === 'login'" class="auth-modal">
      <h2 class="auth-modal__title">Login</h2>
      <form class="auth-modal__form" @submit.prevent="handleLoginSubmit">
        <div class="form__group">
          <label for="login-username" class="form__label">Username</label>
          <InputText
            id="login-username"
            v-model="loginData.username"
            placeholder="Enter your username"
            :class="{ 'p-invalid': loginErrors.username }"
            @input="validateLoginField('username')"
            class="form__input"
            required
          />
          <div v-if="loginErrors.username" class="form__error">{{ loginErrors.username }}</div>
        </div>
        <div class="form__group">
          <label for="login-password" class="form__label">Password</label>
          <InputText
            id="login-password"
            v-model="loginData.password"
            type="password"
            placeholder="Enter your password"
            :class="{ 'p-invalid': loginErrors.password }"
            @input="validateLoginField('password')"
            class="form__input"
            required
          />
          <div v-if="loginErrors.password" class="form__error">{{ loginErrors.password }}</div>
        </div>
        <Button
          type="submit"
          label="Login to Account"
          :disabled="loginLoading"
          class="btn--block"
          :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
        >
          <span v-if="!loginLoading">Login to Account</span>
          <span v-else>Logging in...</span>
        </Button>
      </form>
      <div class="auth-modal__divider"><span>Or</span></div>
      <Button
        label="Create New Account"
        outlined
        class="btn--block"
        @click="switchToRegister"
        :style="{ color: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
      />
    </div>

    <!-- Register Form -->
    <div v-else class="auth-modal">
      <h2 class="auth-modal__title">Registration</h2>
      <form class="auth-modal__form" @submit.prevent="handleRegisterSubmit">
        <div class="form__row">
          <div class="form__group">
            <label for="reg-firstName" class="form__label">First Name *</label>
            <InputText
              id="reg-firstName"
              v-model="registerData.firstName"
              placeholder="Emily"
              class="form__input"
              required
            />
          </div>
          <div class="form__group">
            <label for="reg-lastName" class="form__label">Last Name *</label>
            <InputText
              id="reg-lastName"
              v-model="registerData.lastName"
              placeholder="Johnson"
              class="form__input"
              required
            />
          </div>
        </div>
        <div class="form__group">
          <label for="reg-username" class="form__label">Username *</label>
          <InputText
            id="reg-username"
            v-model="registerData.username"
            placeholder="emilys"
            class="form__input"
            required
          />
        </div>
        <div class="form__group">
          <label for="reg-email" class="form__label">Email</label>
          <InputText
            id="reg-email"
            v-model="registerData.email"
            placeholder="emily@example.com"
            class="form__input"
          />
        </div>
        <div class="form__group">
          <label for="reg-password" class="form__label">Password *</label>
          <InputText
            id="reg-password"
            v-model="registerData.password"
            type="password"
            placeholder="At least 6 characters"
            class="form__input"
            required
          />
        </div>
        <Button
          type="submit"
          label="Create Account"
          :disabled="registerLoading"
          class="btn--block"
          :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
        >
          <span v-if="!registerLoading">Create Account</span>
          <span v-else>Creating account...</span>
        </Button>
      </form>
      <div class="auth-modal__divider"><span>Already have an account?</span></div>
      <Button
        label="Login to Existing Account"
        outlined
        class="btn--block"
        @click="switchToLogin"
        :style="{ color: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const visible = ref(true)
const activeModal = ref<'login' | 'register'>('login')
const loginLoading = ref(false)
const registerLoading = ref(false)

const loginData = ref({
  username: '',
  password: '',
})

const registerData = ref({
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
})

const loginErrors = ref({
  username: '',
  password: '',
})

onMounted(() => {
  visible.value = true
})

const validateLoginField = (field: 'username' | 'password') => {
  const value = loginData.value[field]
  if (field === 'username') {
    if (!value.trim()) {
      loginErrors.value.username = 'Username is required'
    } else {
      loginErrors.value.username = ''
    }
  }
  if (field === 'password') {
    if (!value) {
      loginErrors.value.password = 'Password is required'
    } else if (value.length < 3) {
      loginErrors.value.password = 'Password must be at least 3 characters'
    } else {
      loginErrors.value.password = ''
    }
  }
}

const validateLoginForm = () => {
  let isValid = true
  if (!loginData.value.username.trim()) {
    loginErrors.value.username = 'Username is required'
    isValid = false
  } else {
    loginErrors.value.username = ''
  }
  if (!loginData.value.password) {
    loginErrors.value.password = 'Password is required'
    isValid = false
  } else if (loginData.value.password.length < 3) {
    loginErrors.value.password = 'Password must be at least 3 characters'
    isValid = false
  } else {
    loginErrors.value.password = ''
  }
  return isValid
}

const handleLoginSubmit = () => {
  if (!validateLoginForm()) {
    return
  }
  loginLoading.value = true
  setTimeout(() => {
    loginLoading.value = false
  }, 3000)
}

const handleRegisterSubmit = () => {
  registerLoading.value = true
  setTimeout(() => {
    registerLoading.value = false
  }, 3000)
}

const switchToRegister = () => {
  activeModal.value = 'register'
  loginErrors.value = { username: '', password: '' }
}

const switchToLogin = () => {
  activeModal.value = 'login'
}
</script>

<style scoped>
.auth-modal {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;
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

.auth-modal__divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #666666;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
}

.auth-modal__divider::before,
.auth-modal__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}

.auth-modal__divider span {
  padding: 0 16px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form__group {
  margin-bottom: 20px;
}

.form__label {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  margin-bottom: 6px;
}

.form__input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
}

.form__input--error {
  border-color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.05);
}

.form__error {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
  font-family: 'DM Sans', sans-serif;
}

.btn--block {
  width: 100%;
  display: block;
}

/* Стили для PrimeVue InputText */
:deep(.p-inputtext) {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
}

:deep(.p-inputtext:focus) {
  border-color: #8f6afe;
  box-shadow: 0 0 0 2px rgba(143, 106, 254, 0.2);
}

:deep(.p-inputtext.p-invalid) {
  border-color: #ff6b6b;
}

/* Стили для PrimeVue Button */
:deep(.p-button) {
  font-family: 'Karla', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 8px;
}

:deep(.p-button.p-button-outlined) {
  background: transparent !important;
}

@media (max-width: 1023px) {
  .auth-modal {
    padding: 28px;
  }
  .auth-modal__title {
    font-size: 26px;
  }
}

@media (max-width: 767px) {
  .auth-modal {
    padding: 24px;
  }
  .auth-modal__title {
    font-size: 24px;
  }
  .form__row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
