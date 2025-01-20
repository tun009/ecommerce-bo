<script setup lang="ts">
import { ICStar, IconDropDown } from '@/components'
import { defaultColor } from '@/common'
import { useToggleFavorite } from '@/composables'
const props = defineProps(['data', 'favorites', 'setFavorites', 'indexLv1', 'indexLv2'])
const emit = defineEmits(['toggle-expander'])

const { handleToggleFavorite, hasFavorite, handlePushTab } = useToggleFavorite(props.favorites, props.setFavorites)
</script>

<template>
  <div class="wf-body-navigation-child-link wf_items-center wf_flex wf_justify-between">
    <button @click="emit('toggle-expander')" v-if="data.children && data.children.length" class="wf_flex wf_justify-between wf_width-full">
      <span class="wf-body-navigation-link--text">{{ data.name }}</span>
      <span class="wf-body-navigation-item-link-icon">
        <IconDropDown :iconColor="defaultColor._333" />
      </span>
    </button>
    <div v-else class="wf_flex wf_width-full wf_items-center wf_justify-between">
      <router-link @click="handlePushTab(data)" class="wf-body-navigation-link--text wf_flex-1" :to="data.path">
        {{ data.name }}
      </router-link>
      <button @click="handleToggleFavorite(data.id)" class="wf-body-navigation-item-link-icon">
        <ICStar :width="18" :height="18" :color="hasFavorite(data.id) ? defaultColor._ffc907 : defaultColor._ccc" />
      </button>
    </div>
  </div>
  <div v-if="data.children && data.children.length > 0" class="wf-expander">
    <ul class="wf-body-navigation-level-2 wf-expander-content wf-space-y-4">
      <li v-for="(__item, __index) in data.children" :key="__index" class="wf-body-navigation-level-2-item">
        <div class="wf-body-navigation-level-2-link wf_flex wf_justify-between">
          <div class="wf_flex wf_items-center">
            <span class="wf-body-navigation-level-2-link-dot wf_flex wf_justify-center">•</span>
            <router-link @click="handlePushTab(__item)" class="wf-body-navigation-link--text wf_flex-1" :to="__item.path">
              {{ __item.name }}
            </router-link>
          </div>
          <button @click="handleToggleFavorite(__item.id)" class="wf-body-navigation-item-link-icon">
            <ICStar :width="18" :height="18" :color="hasFavorite(__item.id) ? defaultColor._ffc907 : defaultColor._ccc" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
