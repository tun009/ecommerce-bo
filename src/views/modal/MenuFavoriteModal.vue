<script setup lang="ts">
import { defaultColor } from '@/common'
import { ICStar, IconDropDown, WelfareSwitch, HeaderModal } from '@/components'
import { useModalFavorite, useToggleFavorite } from '@/composables'
import { listRouteForwardPath } from '@/router/private'

interface MenuFavoriteModalProps {
  favorites: string[]
  setFavorites: (list: string[]) => void
  onClose: () => void
}

const props = defineProps<MenuFavoriteModalProps>()

const { isExpanderAll, handleToggle, refParent, handleCloseModal, handleExpanderAll } = useModalFavorite()
const { handleToggleFavorite, hasFavorite } = useToggleFavorite(props.favorites, props.setFavorites)
</script>

<template>
  <div class="wf-modal-full-menu">
    <HeaderModal
      title="전체 메뉴"
      @close-modal="
        handleCloseModal(() => {
          onClose()
        })
      "
    >
      <div class="wf-menu-function wf-space-x-6">
        <span class="wf-body_04-reg">메뉴펼침기능</span>
        <WelfareSwitch @update:model-value="handleExpanderAll" v-model:model-value="isExpanderAll" />
      </div>
    </HeaderModal>
    <div class="wf-modal-full-menu_body">
      <div ref="refParent" id="wf-navigation-preview" class="wf-frame1000002229">
        <div class="wf-favorite-control-navigation">
          <span class="wf-body_01-semi">대시보드</span>
        </div>
        <div v-for="(favorite, index) in listRouteForwardPath" :key="index" class="wf-frame1000002229-item">
          <div @click="handleToggle(index)" class="wf-frame1000002553">
            <span class="wf-body_01-semi">{{ favorite.name }}</span>
            <div class="wf-favorite-icon-dropdown">
              <IconDropDown :width="20" :height="20" :color="defaultColor._333" />
            </div>
          </div>
          <div class="wf-expander">
            <div class="wf-expander-content wf-space-y-26">
              <div class="wf-frame1000002229-item_body wf-space-x-50">
                <div v-for="(_favorite, _index) in favorite.children" :key="_index" class="wf-f29-item_body-item wf-space-y-10">
                  <div
                    class="wf-f29-item_body-item-header"
                    :class="!_favorite?.children?.length ? 'wf_flex wf_items-center wf_justify-between wf-width-full' : ''"
                  >
                    <p v-if="_favorite.children?.length" class="wf-body_02-semi wf_text-n-33">{{ _favorite.name }}</p>
                    <router-link
                      @click="
                        handleCloseModal(
                          () => {
                            onClose()
                          },
                          { name: _favorite.name, path: _favorite.path, nameComponent: _favorite.nameComponent }
                        )
                      "
                      :to="_favorite.path"
                      v-else
                      class="wf-body_02-semi wf_text-n-33"
                      >{{ _favorite.name }}</router-link
                    >
                    <button type="button" v-if="!_favorite.children?.length" @click="handleToggleFavorite(_favorite.id)">
                      <ICStar :width="18" :height="18" :color="hasFavorite(_favorite.id) ? defaultColor._ffc907 : defaultColor._ccc" />
                    </button>
                  </div>
                  <div class="wf-div-border-center"></div>

                  <div v-if="_favorite?.children" class="wf-f29-3d-menu wf-space-y-4">
                    <div v-for="(__favorite, __index) in _favorite.children" :key="__index" class="wf-f29-3d-menu-item">
                      <div class="wf-frame1000002532">
                        <span class="wf_flex wf_justify-center wf_items-center wf-dot wf-body_03-mid">&#x2022;</span>
                        <router-link
                          @click="
                            handleCloseModal(
                              () => {
                                onClose()
                              },
                              { name: __favorite.name, path: __favorite.path, nameComponent: __favorite.nameComponent }
                            )
                          "
                          :to="__favorite.path"
                          class="wf-body_03-mid wf-text wf_text-n-52"
                          >{{ __favorite.name }}</router-link
                        >
                      </div>
                      <button type="button" @click="handleToggleFavorite(__favorite.id)">
                        <ICStar :width="18" :height="18" :color="hasFavorite(__favorite.id) ? defaultColor._ffc907 : defaultColor._ccc" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
