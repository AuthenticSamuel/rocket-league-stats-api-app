<script setup lang="ts">
import { PartyPopper } from "@lucide/vue";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
</script>

<template>
  <Alert>
    <PartyPopper />
    <AlertTitle>Welcome to this Rocket League session tracker!</AlertTitle>
    <AlertDescription>
      <p>
        This simple webapp was made to show off how to use the
        <a
          href="https://code.spirkop.com/samuel/rocket-league-stats-api-client"
          target="_blank"
        >
          Rocket League Stats API client</a
        >
        I've created.
      </p>
      <p>
        Basically, it connect to your Rocket League client via the
        <a
          href="https://www.rocketleague.com/developer/stats-api"
          target="_blank"
          >Stats API</a
        >
        websocket and displays match information live. The goal is to have this
        webapp on a second monitor or on another device to get insights that are
        not readily available in-game and have easy access to the Tracker
        Network profile pages for players that you meet in-game (sometimes
        players have unrendered characters in their usernames, making it hard if
        not impossible to access their profiles).
      </p>
      <p>
        If you know you have everything setup, all you should need to do is
        click on "Connect" while your game is running to get started. Otherwise,
        click on "Configure" and you'll find the instructions there. By default,
        you won't need to modify the "Host" or "WebPort" variables, but you can
        if you changed them during the Stats API setup.
      </p>
      <p>
        This is a session tracker, and a session is basically as long as you
        want it to be. To start a new session, just refresh the page. The Stats
        API does not provide a simple way to say who you are, so for win/loss
        streak tracking, please click on "Track" next to your username when in a
        match if that interests you. Your user will then be stored in your
        browser for future sessions.
      </p>
      <p>
        This project is 100% human-made and
        <a
          href="https://code.spirkop.com/samuel/rocket-league-stats-api-app"
          target="_blank"
          >open-source</a
        >. No AI or LLMs were used during any phase of development. None of your
        data leaves this webapp, everything is handled locally in your browser.
      </p>
      <p>
        Hopefully you'll like what is provided here, and let me know via a
        <a
          href="https://github.com/AuthenticSamuel/rocket-league-stats-api-app/issues/new"
          target="_blank"
          >GitHub issue</a
        >
        if you spot a bug or would like to have something added.
      </p>
      <p>Thank you for coming by!</p>
    </AlertDescription>
  </Alert>
</template>
