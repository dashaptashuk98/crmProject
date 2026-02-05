<template>
  <Panel class="sidebar-panelLeft">
    <div class="sidebar-icons">
      <img
        class="sidebar-elementLeft"
        src="../assets/images/ca99c14197b2ade5241f70ab7bcb5bc558b84c81.jpg"
        alt=""
        width="40"
        height="40"
      />
      <img
        class="sidebar-el"
        src="../assets/images/login-svgrepo-com.svg"
        alt=""
        width="30"
        height="30"
      />
      <img class="sidebar-el" src="../assets/images/user.svg" alt="" width="30" height="30" />
      <img class="sidebar-el" src="../assets/images/Vector.svg" alt="" width="30" height="30" />
      <img class="sidebar-el" src="../assets/images/question.svg" alt="" width="30" height="30" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
</script>

<style scoped>
.sidebar-panelLeft {
  width: 80px;
  min-height: 100vh;
  border-radius: 10px;
  border-left: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  box-shadow: -1px 3px 4.7px 0px #00000040;
  background: #f5f4f8;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

@media (max-width: 1024px) {
  .sidebar-panelLeft {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .sidebar-panelLeft {
    width: 50px;
    padding: 0.5rem 0;
  }

  .sidebar-elementLeft {
    width: 30px;
    height: 30px;
    margin-bottom: 40px;
  }

  .sidebar-el {
    width: 24px !important;
    height: 24px !important;
  }

  .sidebar-icons {
    gap: 0.5rem;
  }
}

.sidebar-panelLeft :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar-elementLeft {
  border-radius: 50%;
  margin-bottom: 69px;
}

.sidebar-panelLeft :deep(.p-panel-content) {
  padding: 0;
  border: none;
  background: transparent;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
</style>
