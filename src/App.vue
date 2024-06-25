<script setup lang="ts">
import { ThreeEngine } from "./components/ThreeEngine";
import { ref, onMounted } from "vue";

const threeTargetRef = ref(null);

onMounted(() => {
  const TE = new ThreeEngine(threeTargetRef.value);
});
</script>

<template>
  <div class="three-canvas" ref="threeTargetRef"></div>
</template>

<style scoped>
.three-canvas {
  width: 100%;
  height: 100%;
}
</style>
