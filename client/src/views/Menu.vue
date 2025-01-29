<script setup>
import { computed, inject, ref } from 'vue';
import { prettyContent } from '@/assets/js/utility';
import { smartFetch } from '@/assets/js/smart-fetch';
import { toast } from '@/assets/js/toast';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import SmartSvg from '@/components/smart/SmartSvg.vue';

const search = ref('');
const categories = ref([]);
const startOverlay = inject('startOverlay');
const stopOverlay = inject('stopOverlay');
const selectedCategory = ref(null);

const { locale, t } = useI18n({ useScope: 'global' });

onMounted(async () => {
  try {
    startOverlay();
    const response = await smartFetch({
      url: `${import.meta.env.VITE_AWS_ORIGIN}/andariego-get-categories`,
      headers: {
        'Access-Control-Allow-Origin': window.origin,
      },
      notifyOnFailure: true,
    });

    categories.value = response.data;
    selectedCategory.value = categories.value[0];
  } catch {
    toast('Failed to fetch items.', { type: 'error' });
  } finally {
    stopOverlay();
  }
});

const searchItems = computed(() => {
  if (!search.value) {
    return [];
  }

  const items = [];

  categories.value.forEach((category) => {
    category.items.forEach((item) => {
      const normalizedEsName = item.name.es.toLowerCase();
      const normalizedEnName = item.name.en.toLowerCase();
      const normalizedSearch = search.value.toLowerCase();

      if (normalizedEsName.includes(normalizedSearch)) {
        items.push(item);
      } else if (normalizedEnName.includes(normalizedSearch)) {
        items.push(item);
      }
    });
  });

  return items;
});
</script>

<template>
  <div v-if="categories.length > 0" class="px-1">
    <div class="px-1 pb-3">
      <label class="input input-bordered flex items-center gap-2">
        <SmartSvg src="search" class="h-5 w-5 opacity-80" />
        <input v-model="search" type="text" class="grow" :placeholder="t('search')" />
        <SmartSvg
          v-if="search"
          src="x"
          class="h-4 w-4 opacity-70 hover:cursor-pointer"
          @click="search = ''"
        />
      </label>
    </div>

    <div v-if="search" class="grid items-stretch gap-6 px-2 pt-2">
      <div v-for="(item, index) in searchItems" :key="item._id" class="relative">
        <div
          class="text-sm"
          :class="{
            'mb-3': index + 1 < searchItems.length,
          }"
        >
          <div class="flex justify-between">
            <p class="mb-1 font-semibold uppercase tracking-wide">
              {{ item.name[locale] }}
            </p>
            <p>${{ item.base_price.toFixed(2) }}</p>
          </div>
          <p class="flex flex-wrap font-sans font-semibold italic tracking-wide">
            {{ prettyContent(item.content[locale], locale) }}
          </p>
        </div>
        <hr
          v-if="index + 1 < searchItems.length"
          class="absolute bottom-0 left-0 right-0 border-gray-400"
        />
      </div>

      <div v-if="searchItems.length === 0" class="text-center">
        <h3 class="pb-3 text-lg font-bold">{{ t('no_items') }}</h3>
        <p>{{ t('couldnt_find') }}</p>
        <button class="btn btn-link text-black" type="button" @click="search = ''">
          {{ t('something_else') }}
        </button>
      </div>
    </div>

    <div v-else class="join join-vertical w-full">
      <div
        v-for="category in categories"
        :key="category._id"
        class="collapse join-item collapse-arrow border border-base-300"
      >
        <input type="radio" name="categories" />
        <div class="collapse-title text-xl font-medium uppercase tracking-wide">
          {{ category.name }}
        </div>
        <div class="collapse-content">
          <div v-if="category.items.length > 0" class="grid items-stretch gap-6">
            <div v-for="(item, index) in category.items" :key="item._id" class="relative">
              <div
                class="text-sm"
                :class="{
                  'mb-3': index + 1 < category.items.length,
                }"
              >
                <div class="flex justify-between">
                  <p class="mb-1 font-semibold uppercase tracking-wide">
                    {{ item.name[locale] }}
                  </p>
                  <p>${{ item.base_price.toFixed(2) }}</p>
                </div>
                <p class="flex flex-wrap font-sans font-semibold italic tracking-wide">
                  {{ prettyContent(item.content[locale], locale) }}
                </p>
              </div>
              <hr
                v-if="index + 1 < category.items.length"
                class="absolute bottom-0 left-0 right-0 border-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
