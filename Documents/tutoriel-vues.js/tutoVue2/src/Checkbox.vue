<template>
  <label>
    <input type="checkbox" v-model="model">
    {{label}}
  </label>
</template>

<script setup>
const model = defineModel()
const props = defineProps({
  label:String,
})
const emits = defineEmits(['check','uncheck'])
const onChange   = (evt) => {
  if(evt.currentTarget.checked) {
    emits('check',evt.currentTarget)
  } else {
    emits('uncheck',evt.currentTarget)
  }
}
</script>