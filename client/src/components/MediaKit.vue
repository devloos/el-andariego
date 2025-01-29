<script setup>
import { computed, ref } from 'vue';
import ImageKit from 'imagekit-javascript';
import SmartMedia from './smart/SmartMedia.vue';

const imageKitSDK = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/andariego',
});

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  srcset: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  preload: {
    type: String,
    default: 'metadata',
  },
  mediaType: {
    type: String,
    default: 'image',
  },
  controls: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  useObserver: {
    type: Boolean,
    default: true,
  },
});

const STANDARD_SCREEN_WIDTHS = [1920, 1366, 1280, 1024, 768, 601, 414, 390, 375, 360];

const useLowQualityPlaceHolder = ref(true);

const imageKitSrc = computed(() => {
  return imageKitSDK.url({
    path: props.src,
  });
});

const imageKitSrcset = computed(() => {
  const widths = [
    props.width,
    ...STANDARD_SCREEN_WIDTHS.filter((width) => width < props.width),
  ];

  const srcsetArray = [];

  widths.forEach((width) => {
    const url = imageKitSDK.url({
      path: props.src,
      transformation: [
        {
          width,
          ...(useLowQualityPlaceHolder.value && { quality: 30 }),
          ...(useLowQualityPlaceHolder.value && { blur: 6 }),
        },
      ],
    });

    srcsetArray.push(`${url} ${width}w`);
  });

  return srcsetArray.join(', ');
});
</script>

<template>
  <SmartMedia
    :src="imageKitSrc"
    :srcset="imageKitSrcset"
    :width="width"
    :height="height"
    :alt="alt"
    :loading="loading"
    :preload="preload"
    :media-type="mediaType"
    :controls="controls"
    :muted="muted"
    :autoplay="autoplay"
    :loop="loop"
    :use-observer="useObserver"
    @intersected="useLowQualityPlaceHolder = false"
  />
</template>
