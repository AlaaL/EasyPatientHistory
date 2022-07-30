<template>
  <div class="layout-footer">
    <img alt="Logo" :src="footerImage()" height="20" class="mr-2">
    by
    <span class="font-medium ml-2">Fadi_20216 - Mhdali_22653 - Ahmad_27113</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppFooter',
  computed: {
    darkTheme () {
      return this.$appState.darkTheme
    }
  },
  methods: {
    footerImage () {
      return this.$appState.darkTheme ? '/images/logo-white.svg' : '/images/logo-dark.svg'
    }
  }
}
</script>

<style scoped>

</style>
