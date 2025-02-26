import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStateStore = defineStore('state', () => {
    const cart = useStorage('cart', {});

    return {
        cart,
    }
})