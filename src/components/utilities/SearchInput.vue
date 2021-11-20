<template>
    <input type="text" :value="modelValue" @input="updateValue"/>
</template>

<script>
export default {
    name: 'Search', 
    props: {
        modelValue: { type: String }
    }, 
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style>
</style>