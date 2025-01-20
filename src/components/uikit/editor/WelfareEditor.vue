<script setup lang="ts">
import { WelfareEditorProps, WelfareEditorEmits } from '@/models'
import Editor from 'primevue/editor'

withDefaults(defineProps<WelfareEditorProps>(), {
  editorStyle: 'min-height:320px'
})
const emit = defineEmits<WelfareEditorEmits>()

const uploadImage = async (file?: File): Promise<string> => {
  file?.name
  // todo: call api upload image
  // console.log(file?.name)
  return 'upload-image-src'
}

const onChange = async (newValue: string) => {
  let returnValue = newValue
  const base64Datas = newValue.match(/src="data:[\S]*"/g)

  if (base64Datas?.length) {
    for (let _ of base64Datas) {
      const parseData = _.match(/data:(.+);base64[\S]*/)
      const dataFile = parseData?.[0].slice(0, -1)
      const typeFile = parseData?.[1]

      if (dataFile) {
        const file: File = new File([new Blob([dataFile])], `file.${typeFile?.split('/')?.[1]}`, { type: typeFile })
        returnValue = returnValue.replace(`${dataFile}`, await uploadImage(file))
      }
    }
  }
  emit('update:modelValue', `<div class='ql-editor'>${returnValue}<div>`)
}
</script>

<template>
  <div class="wf_editor-wrapper">
    <div v-if="$props.disabled" class="wf_editor-overlay"></div>
    <Editor
      :model-value="$props.modelValue"
      @update:model-value="onChange"
      :editor-style="$props.editorStyle"
      :placeholder="$props.placeholder"
      :readonly="$props.readonly"
    />
  </div>
</template>
