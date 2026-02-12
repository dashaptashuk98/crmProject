<template>
  <div class="simple-chat">
    <div class="messages">
      <div v-for="(msg, i) in messages" :key="i" class="message">
        {{ msg }}
      </div>
    </div>

    <div class="input-area">
      <input v-model="inputText" @keyup.enter="send" placeholder="Type message..." class="input" />
      <button @click="send" class="send-btn">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const messages = ref<string[]>([])
const inputText = ref('')
let ws: WebSocket | null = null

const send = () => {
  if (!inputText.value.trim()) return

  const text = inputText.value
  messages.value.push(`You: ${text}`)

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(text)
  }

  inputText.value = ''
}

onMounted(() => {
  ws = new WebSocket('wss://ws.ifelse.io')

  ws.onopen = () => {
    messages.value.push('Connected to server')
  }

  ws.onmessage = (e: MessageEvent) => {
    messages.value.push(`Echo: ${e.data}`)
  }

  ws.onerror = (err: Event) => {
    messages.value.push('Connection error')
    console.error('WebSocket error:', err)
  }
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
})
</script>

<style scoped>
.simple-chat {
  width: 100%;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
  box-sizing: border-box;
}

.messages {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  background: white;
  display: flex;
  flex-direction: column;
}

.messages::after {
  content: '';
  flex: 1;
  min-height: 0;
}

.message {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  flex-shrink: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}

.message:last-child {
  border-bottom: none;
}

.input-area {
  display: flex;
  gap: 8px;
}

.input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  min-width: 0;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-dark);
}

.send-btn {
  padding: 10px 20px;
  background: var(--color-primary-dark);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.send-btn:hover {
  background: var(--color-primary);
}

.send-btn:active {
  background: var(--color-primary);
}

@media (max-width: 1024px) {
  .messages {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .simple-chat {
    max-width: 100%;
    padding: 12px;
    margin: 15px auto;
  }

  .messages {
    height: 250px;
    padding: 10px;
  }

  .message {
    font-size: 13px;
    padding: 6px 0;
  }

  .input {
    padding: 8px 10px;
    font-size: 13px;
  }

  .send-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
