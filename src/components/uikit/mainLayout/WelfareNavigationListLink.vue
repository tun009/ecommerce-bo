<script setup lang="ts">
import { listRouteForwardPath } from '@/router/private'
import { useMenuNavigation } from '@/composables'
import { IconMenuNavigation, WelfareNavigationListItem } from '@/components'

export interface MenuFavoriteModalProps {
  favorites?: string[]
  setFavorites: (list: string[]) => void
}

const props = defineProps<MenuFavoriteModalProps>()

const { handleToggle, refParent, colorIcon } = useMenuNavigation()
</script>

<template>
  <ul ref="refParent" id="wf-body-navigation-list" class="wf-body-navigation-list">
    <li class="wf_flex wf_items-center">
      <div class="wf-body-navigation-root wf_width-full wf_flex wf_items-center">
        <div class="wf-body-navigation-item-icon wf_flex wf_items-center wf_justify-center">
          <IconMenuNavigation :color="colorIcon" />
        </div>
        <span class="ml-20 wf-body-navigation-link--text">대시보드</span> <span></span>
      </div>
    </li>
    <li :key="index" v-for="(item, index) in listRouteForwardPath" class="wf-body-navigation-item">
      <WelfareNavigationListItem
        :favorites="props.favorites ?? []"
        :setFavorites="props.setFavorites"
        @toggle-expander="handleToggle"
        :data="item"
        :index="index"
      />
    </li>
  </ul>
</template>
