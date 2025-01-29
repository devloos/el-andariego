<script setup>
import { computed, onMounted, useTemplateRef } from 'vue';

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

const emit = defineEmits(['intersected']);

const isImage = computed(() => props.mediaType === 'image');
const isVideo = computed(() => props.mediaType === 'video');

const refMediaElement = useTemplateRef('media-element');

let observer = null;

function initObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        emit('intersected');
      }
    },
    {
      threshold: 0.1,
    },
  );

  observer.observe(refMediaElement.value);
}

onMounted(() => {
  if (refMediaElement.value) {
    initObserver();
  }
});
</script>

<template>
  <img
    v-if="isImage"
    ref="media-element"
    :src="src"
    :srcset="srcset"
    :width="width"
    :height="height"
    :loading="loading"
    :alt="alt"
  />
  <video
    v-else-if="isVideo"
    ref="media-element"
    :src="src"
    :preload="preload"
    :alt="alt"
    :controls="controls"
    :muted="muted"
    :autoplay="autoplay"
    :loop="loop"
  />
</template>
