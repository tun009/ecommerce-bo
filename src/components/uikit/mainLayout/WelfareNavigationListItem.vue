<script setup>
import { IconDropDown, WelfareNavigationItemLink } from '@/components'
import { defaultColor } from '@/common'
import { useWelfareNavigationListItem } from '@/composables'

const props = defineProps(['data', 'index', 'favorites', 'setFavorites'])
const emit = defineEmits(['toggle-expander'])
const { handleHover, handleLeave, handleToggle, colorIcon, refParent, renderClassNavigationItem } = useWelfareNavigationListItem(props)
</script>

<template>
  <button
    @click="emit('toggle-expander', props.index)"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
    class="wf-body-navigation-parent-link wf_flex wf_flex-between"
    :class="renderClassNavigationItem(index)"
  >
    <div class="wf_flex wf_flex-1 wf_items-center">
      <div class="wf-body-navigation-item-icon wf_flex wf_items-center wf_justify-center">
        <component :is="data.image" :iconColor="colorIcon" />
      </div>
      <span class="wf-body-navigation-link--text ml-20">{{ data.name }}</span>
    </div>
    <span class="wf-body-navigation-item-link-icon">
      <IconDropDown :iconColor="defaultColor._333" />
    </span>
  </button>
  <div v-if="data.children && data.children.length > 0" class="wf-expander">
    <ul class="wf-body-navigation-child-list wf-expander-content" ref="refParent">
      <li class="wf-body-navigation-child-item" v-for="(_item, _index) in data.children" :key="_index">
        <WelfareNavigationItemLink
          :setFavorites="props.setFavorites"
          :favorites="props.favorites"
          @toggle-expander="handleToggle(_index)"
          :data="_item"
          :indexLv1="index"
          :indexLv2="_index"
        />
      </li>
    </ul>
  </div>
</template>
