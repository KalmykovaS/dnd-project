import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStateStore = defineStore('state', () => {
    const characterName = useStorage('characterName', '');
    const characterHistory = useStorage('characterHistory', '');
    const externalFeatures = useStorage('externalFeatures', '');
    const features = useStorage('features', '');

    const raceState = useStorage('raceState', '');
    const classState = useStorage('classState', '');
    const worldviewState = useStorage('worldviewState', '');

    const classStateId = useStorage('classStateId', '');

    const clearStorage = () => {
        characterName.value = '';
        characterHistory.value = '';
        externalFeatures.value = '';
        features.value = '';
        raceState.value = '';
        classState.value = '';
        worldviewState.value = '';
        classStateId.value = null;
    };

    return {
        characterName,
        characterHistory,
        externalFeatures,
        features,
        raceState,
        classState,
        worldviewState,
        classStateId,
        clearStorage
    }
})