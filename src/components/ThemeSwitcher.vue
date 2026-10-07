<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { useColorMode } from "@vueuse/core";

import { Button } from "@/components/ui/button";

const mode = useColorMode({
  storageKey: "THEME",
});

const handleClick = () => {
  if (mode.value === "dark") mode.value = "light";
  else mode.value = "dark";
};
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    @click="handleClick"
  >
    <Sun v-if="mode === 'light'" />
    <Moon v-else />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
