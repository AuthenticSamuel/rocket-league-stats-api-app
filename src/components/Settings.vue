<script setup lang="ts">
import { Info, Settings2 } from "@lucide/vue";
import { useForm } from "@tanstack/vue-form";
import { ref, watch } from "vue";
import z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useSettings } from "@/composables/useSettings";

import { isInvalid } from "@/lib/form";

const isOpen = ref<boolean>(false);

watch(isOpen, (isOpen) => {
  if (isOpen) return;
  form.reset({
    host: host.value,
    port: port.value,
  });
});

const { host, port } = useSettings();

const formSchema = z.object({
  host: z.string().min(1),
  port: z.number(),
});

const form = useForm({
  defaultValues: {
    host: host.value,
    port: port.value,
  } satisfies z.infer<typeof formSchema>,
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    host.value = value.host;
    port.value = value.port;
    isOpen.value = false;
  },
});

const handleCancelClick = () => {
  isOpen.value = false;
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline">
        <Settings2 />
        Configure
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Configuration</DialogTitle>
        <DialogDescription>
          Settings to connect to your Rocket League client.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="form.handleSubmit">
        <FieldGroup>
          <form.Field
            name="host"
            #default="{ field }"
          >
            <Field :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Host</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="localhost"
                autocomplete="off"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
              <FieldError
                v-if="isInvalid(field)"
                :errors="field.state.meta.errors"
              />
            </Field>
          </form.Field>
          <form.Field
            name="port"
            #default="{ field }"
          >
            <Field :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">WebPort</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="49124"
                autocomplete="off"
                @blur="field.handleBlur"
                @input="field.handleChange(parseInt($event.target.value, 10))"
              />
              <FieldError
                v-if="isInvalid(field)"
                :errors="field.state.meta.errors"
              />
            </Field>
          </form.Field>
        </FieldGroup>
      </form>
      <Alert>
        <Info />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Make sure you have enabled the
          <a
            href="https://www.rocketleague.com/developer/stats-api"
            target="_blank"
            >Rocket League Stats API</a
          >
          first otherwise you won't be able to connect. You can find
          instructions
          <a
            href="https://www.rocketleague.com/developer/stats-api#configuration"
            target="_blank"
            >here</a
          >.
        </AlertDescription>
      </Alert>
      <DialogFooter>
        <Button
          @click="handleCancelClick"
          variant="outline"
        >
          Cancel
        </Button>
        <Button @click="form.handleSubmit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
