<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useSettings } from "@/composables/useSettings";
import { AlertCircle } from "@lucide/vue";

const { host, port } = useSettings();
</script>

<template>
  <Alert variant="destructive">
    <AlertCircle />
    <AlertTitle>An error occurred</AlertTitle>
    <AlertDescription>
      Could not connect to your Rocket League client. Here's some quick
      troubleshooting steps:
      <ul class="list-inside list-disc">
        <li>
          <span> Is the game open? </span>
        </li>
        <li>
          <span>
            Have you enabled the Stats API? A tutorial can be found
            <a
              href="https://www.rocketleague.com/developer/stats-api#configuration"
              target="_blank"
              >here</a
            >.
          </span>
        </li>
        <li>
          <span>
            Have you configured the host and port correctly? This page will
            listen to {{ host }} on port {{ port }}.
          </span>
        </li>
        <li>
          <span>
            Have you allowed your browser to access your local network? It is
            needed to listen to your Rocket League client's websocket.
          </span>
        </li>
      </ul>
    </AlertDescription>
  </Alert>
</template>
