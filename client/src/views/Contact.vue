<script setup>
import { ref } from 'vue';
import { smartFetch } from '@/assets/js/smart-fetch';
import { toast } from '@/assets/js/toast';
import { useI18n } from 'vue-i18n';
import SmartInput from '@/components/smart/SmartInput.vue';
import { inject } from 'vue';
import MediaKit from '@/components/MediaKit.vue';

const { t } = useI18n({ useScope: 'global' });
const form = ref(null);
const startOverlay = inject('startOverlay');
const stopOverlay = inject('stopOverlay');

const name = ref('');
const email = ref('');
const phone = ref('');
const description = ref('');
const interestedIn = ref('');

async function submitForm() {
  try {
    startOverlay();
    const response = await smartFetch({
      url: `${import.meta.env.VITE_AWS_ORIGIN}/andariego-send-email`,
      headers: {
        'Access-Control-Allow-Origin': window.origin,
      },
      method: 'POST',
      data: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        description: description.value,
        interestedIn: interestedIn.value,
      },
    });

    if (response.success === true) {
      toast('You will be contacted shortly thank you.', {
        type: 'success',
      });
    }
  } catch {
    toast('Failed to send information try again.', {
      type: 'error',
    });
  } finally {
    form.value.reset();
    stopOverlay();
  }
}
</script>

<template>
  <div>
    <div class="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 px-2">
      <MediaKit
        src="/contact/card.jpg"
        class="h-full w-full"
        alt="Contact Card"
        :width="1900"
        :height="1080"
      />
      <form ref="form" class="w-full px-2" @submit.prevent="submitForm">
        <div class="mb-2 grid grid-cols-2 gap-2">
          <SmartInput v-model="name" :label="t('form.name')" type="text" />
          <SmartInput v-model="email" :label="t('form.email')" type="email" />
        </div>

        <div class="mb-2 grid grid-cols-2 gap-2">
          <SmartInput v-model="phone" :label="t('form.phone_number')" type="tel" />

          <div class="form-control">
            <label class="label">
              <span class="label-text">
                {{ t('form.interested_in') }}
              </span>
            </label>
            <select v-model="interestedIn" class="select select-bordered w-full" required>
              <option disabled value="">{{ t('form.select.selection') }}</option>
              <option>{{ t('form.select.order') }}</option>
              <option>Catering</option>
              <option>{{ t('form.select.job') }}</option>
              <option>{{ t('form.select.other') }}</option>
            </select>
          </div>
        </div>

        <div class="form-control flex flex-col pb-5">
          <label class="label">
            <span class="label-text">
              {{ t('form.message') }}
            </span>
          </label>
          <textarea
            v-model="description"
            class="textarea textarea-bordered w-full"
            type="text"
            :placeholder="t('form.descriptive_message')"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          {{ t('form.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>
