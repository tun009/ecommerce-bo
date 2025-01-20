<script setup lang="ts">
import { icCalc, icUser, icOfficeBag, icShop } from "@/assets"
import { handleDownloadFile } from "@/common"
import {MenuManualModalItem, HeaderModal, MenuManualNote} from "@/components"

defineProps(["onClose"])

const manuals = [
    {
        title: '사용자 매뉴얼',
        content: "<span class='wf-body_03-mid wf-orange'>고객사 임직원이 </span><span class='wf-body_03-reg wf-normal'>메가존플레이를 이용하는 방법이</span></br><span class='wf-body_03-reg wf-normal'>안내되어 있습니다.</span>",
        icon: icUser,
        file: '/documents/manual.pdf',
        nameFile: '사용자_매뉴얼.pdf'
    },
    {
        title: 'CO 매뉴얼',
        content: '<span class="wf-body_03-mid wf-orange">고객사 총무팀에서 </span><span class="wf-body_03-reg wf-normal"> 메가존플레이를 통해</span> <br /> <span class="wf-body_03-reg wf-normal "> 임직원 등록, 포인트 배정, 정산 등의 업무를 처리하실 수</span> <br /><span class="wf-body_03-reg wf-normal "> 있는 방법이 안내되어 있습니다.</span>',
        icon: icCalc,
        file: '/documents/manual.pdf',
        nameFile: 'CO_매뉴얼.pdf'
    },
    {
        title: 'PO 매뉴얼',
        content: '<span class="wf-body_03-mid wf-orange">판매사에서 </span> <span class="wf-body_03-reg wf-normal">메가존플레이에 상품을 등록하고</span> <br /> <span class="wf-body_03-reg wf-normal">주문 및 클레임 관리, 정산 받는 등의 </span> <br /><span class="wf-body_03-reg wf-normal ">커머스 업무를 처리할 수 있는 방법이 안내되어 있습니다.</span>',
        icon: icOfficeBag,
        file: '/documents/manual.pdf',
        nameFile: 'PO_매뉴얼.pdf'
    },
    {
        title: 'BO 매뉴얼',
        content: '<span class="wf-body_03-mid wf-orange ">자사 임직원을 위한 </span><br /><span class="wf-body_03-reg wf-normal">메가존플레이</span><span class="wf-body_03-reg wf-normal ">업무 매뉴얼입니다.</span>',
        icon: icShop,
        file: '/documents/manual.pdf',
        nameFile: 'BO_매뉴얼.pdf'
        
    },
]

const notes = [
    "메가존플레이 시스템별 매뉴얼을 제공해 드립니다.",
    "가급적 판매사 또는 고객사에서 메가존플레이를 처음 이용하기 전에 전달하여 이용에 불편이 없으시도록 안내해 주세요."
]

</script>

<template>
    <div class="wf-manager-info">
        <HeaderModal @close-modal="onClose" title="메가존플레이 매뉴얼 안내"  />
        <div class="wf-manager-info-body wf-space-y-20">
            <MenuManualNote :list="notes" />
            <div class="wf_grid wf-modal-manual-list wf_grid-cols-2">
                <MenuManualModalItem  v-for="(manual, index) in manuals" :key="index" :title="manual.title" :icon="manual.icon" @on-download="handleDownloadFile(manual.file, manual.nameFile)" :content="manual.content" />
            </div>
        </div>
    </div>
</template>
