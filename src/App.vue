<script setup>
import { useCheckFirstLoadFavorite, useLoadingProvide, useModalProvide, usePageTitle, useSilentRefreshToken } from '@/composables'
import { LoadingComponent, ModalGlobalContainer } from './components'
useCheckFirstLoadFavorite()
usePageTitle()
const { loading, size } = useLoadingProvide()
const props = useModalProvide()
useSilentRefreshToken()
</script>

<template>
  <router-view></router-view>
  <LoadingComponent :loading="loading" :size="size" />
  <ModalGlobalContainer v-bind="props" />
</template>
