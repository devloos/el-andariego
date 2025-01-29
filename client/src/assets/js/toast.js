import { toast as toastify } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const POSITIONS = toastify.POSITION;
export const THEMES = toastify.THEME;
export const TRANSITIONS = toastify.TRANSITIONS;
export const TYPES = toastify.TYPE;

export function toast(message, options = {}) {
  const toastOptions = {
    position: POSITIONS.TOP_CENTER,
    autoClose: 2000,
    theme: THEMES.LIGHT,
    ...options,
  };

  toastify(message, toastOptions);
}
