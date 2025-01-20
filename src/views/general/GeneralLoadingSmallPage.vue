<!-- BO_Y0201_010101 -->
<script setup>
import { AuthLoginPage } from '@/views'
import { useLoading } from '@/composables'
import { onMounted, onUnmounted } from 'vue'

const { setLoading, setSize } = useLoading()
onMounted(() => {
  setLoading(true)
  setSize('small')
})
onUnmounted(() => {
  setLoading(false)
})
</script>

<template>
  <AuthLoginPage />
</template>
