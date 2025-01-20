<script setup>
import {MenuManualNote, HeaderModal, MenuPlayInformationItem} from "@/components"
import {MockDataMenuInformationPlayer} from "@/assets/mockData"
const emits = defineEmits(['on-close'])

const notes = [
    "메가존플레이 업무별 담당자를 안내해 드립니다.",
    "알맞은 담당자에게 문의해 주시면 더욱 빠르고 정확한 대응이 가능합니다."
]
</script>

<template>
    <div class="wf-manager-info">
        <HeaderModal
            title="메가존플레이 담당자 안내"
            @close-modal="emits('on-close')"
        />
        <div class="wf-manager-contact-body wf-manager-info-body wf-space-y-20">
            <MenuManualNote :list="notes" />
            <div class="wf_grid wf-modal-info-list wf_grid-cols-2">
                <MenuPlayInformationItem v-for="(item, index) in MockDataMenuInformationPlayer" :key="index" :title="item.title" :data="item.data" />
            </div>
        </div>
    </div>
</template>

