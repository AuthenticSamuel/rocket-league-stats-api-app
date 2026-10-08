<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useSettings } from "@/composables/useSettings";

const { host, port } = useSettings();
</script>

<template>
  <Alert variant="destructive">
    <AlertTitle>An error occurred</AlertTitle>
    <AlertDescription>
      <p>Could not connect to your Rocket League client.</p>
      <ul class="list-inside list-disc">
        <li>Is the game open ?</li>
        <li>
          Have you enabled the Stats API ? Tutorial
          <a
            href="https://www.rocketleague.com/developer/stats-api#configuration"
            target="_blank"
            >here</a
          >.
        </li>
        <li>
          Have you configured the host and port correctly ? This page is
          listening to {{ host }} on port {{ port }}.
        </li>
        <li>
          Have you allowed your browser to access your local network ? Needed to
          listen to your Rocket League client's websocket.
        </li>
      </ul>
    </AlertDescription>
  </Alert>
</template>
