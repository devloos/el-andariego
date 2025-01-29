<script setup>
import MediaKit from '@/components/MediaKit.vue';

const images = [
  {
    url: '/home/gallery/gallery-1689560307316.jpg',
    width: 800,
    height: 800,
    alt: '',
  },
  {
    url: '/home/gallery/gallery-1689472440682.jpg',
    width: 800,
    height: 800,
    alt: '',
  },
  {
    url: '/home/gallery/gallery-1689472440680.jpg',
    width: 800,
    height: 800,
    alt: '',
  },
  {
    url: '/home/gallery/gallery-1689472440681.jpg',
    width: 800,
    height: 800,
    alt: '',
  },

  {
    url: '/home/gallery/gallery-1689472440679.jpg',
    width: 800,
    height: 800,
    alt: '',
  },
  {
    url: '/home/gallery/gallery-1689920206721.jpg',
    width: 800,
    height: 800,
    alt: '',
  },
];

defineProps({
  lo: {
    type: String,
    default: 'bruh',
  },
});
</script>

<template>
  <div>
    <!-- TODO: Change bullet pagination style -->
    <swiper-container
      :slides-per-view="1"
      :pagination="{
        enabled: true,
        clickable: true,
      }"
      :mousewheel="{
        enabled: true,
        forceToAxis: true,
      }"
      space-between="25"
      speed="800"
    >
      <swiper-slide v-for="(image, idx) in images" :key="idx">
        <MediaKit
          class="rounded"
          :src="image.url"
          :width="image.width"
          :height="image.height"
          :alt="image.alt"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>
