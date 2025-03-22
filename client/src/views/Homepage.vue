<script setup>
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import StyledDivider from '@/components/StyledDivider.vue';
import LocaleSelector from '@/components/LocaleSelector.vue';
import Menu from '@/views/Menu.vue';
import Contact from './Contact.vue';
import SmartSvg from '@/components/smart/SmartSvg.vue';
import { LOCATIONS } from '@/assets/constants/locations';
import MediaKit from '@/components/MediaKit.vue';

useHead({
  title: 'El Andariego',
  meta: [
    {
      name: 'description',
      content: 'Authentic Mexican Food Truck',
    },
  ],
});

const { t } = useI18n({ useScope: 'global' });

const locationId = ref('truck-1');
const location = ref(LOCATIONS[0]);

watch(locationId, () => {
  location.value = LOCATIONS.find((el) => el.id === locationId.value);
});
</script>

<template>
  <div>
    <div
      class="flex h-[250px] w-full items-stretch justify-center overflow-hidden md:mx-auto md:h-[400px] md:max-w-5xl"
    >
      <MediaKit
        src="/misc/demo.mp4"
        class="w-full object-cover object-center"
        :width="576"
        :height="1024"
        loading="eager"
        media-type="video"
        alt="hero"
        muted
        autoplay
        loop
      />
    </div>

    <div class="relative">
      <MediaKit
        src="/misc/andriego.jpg"
        class="logo-position rounded-xl border border-accent shadow-xl"
        :width="100"
        :height="100"
        loading="eager"
        alt="logo"
      />

      <div class="mx-auto max-w-2xl pt-[70px]">
        <div class="pb-5 text-center">
          <h2 class="pb-1 text-2xl font-bold uppercase tracking-wide">El Andariego</h2>
          <p>Mexican, Food Truck</p>
        </div>

        <div class="flex justify-center pb-5">
          <select v-model="locationId" class="select select-bordered w-full max-w-xs">
            <option v-for="spot in LOCATIONS" :key="spot.id" :value="spot.id">
              {{ spot.name }}
            </option>
          </select>
        </div>

        <!-- Dynamic -->
        <div class="flex justify-center gap-3 pb-5 text-center">
          <div class="rating rating-half">
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-1 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-2 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-1 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-2 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-1 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-2 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-1 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-2 mask-star-2 bg-primary"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-1 mask-star-2 bg-primary"
              checked="checked"
              disabled
            />
            <input
              type="radio"
              name="rating-10"
              class="mask mask-half-2 mask-star-2 bg-primary"
              disabled
            />
          </div>

          <a :href="location.googleProfile" class="underline">{{
            t('ratings', { numberOfRatings: 21 })
          }}</a>
        </div>

        <p v-if="location.address" class="pb-5 text-center">{{ location.address }}</p>

        <div class="flex justify-center gap-1 pb-5">
          <span class="text-primary-400">{{ t('open_today') }}</span>
          <span>{{ location.hours }}</span>
        </div>

        <a
          :href="`tel:${location.phoneNumber}`"
          class="flex items-center justify-center gap-2 pb-5"
        >
          <SmartSvg src="info" class="h-5 w-5" />
          <p>{{ location.phoneNumber }}</p>
        </a>

        <LocaleSelector class="pb-5 text-sm" />

        <div class="mx-4 rounded-lg bg-primary-100 px-8 py-4 text-center">
          <p class="pb-2 font-bold">{{ t('promotional.hook') }}</p>
          <p class="pb-4">{{ t('promotional.body') }}</p>
          <a
            href="https://order.elandariegotruck.com/?cc=first-online-15"
            class="btn btn-primary btn-sm"
          >
            {{ t('home.order_now') }}
          </a>
        </div>

        <Menu class="container mt-5" />

        <div id="contact">
          <StyledDivider :name="t('dividers.contact')" />
          <Contact class="container" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-position {
  position: absolute;
  top: -50px;
  left: calc(50vw - 50px);
}
</style>
