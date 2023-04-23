import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSelectStore = defineStore('select', () => {
  const yearRange = reactive({
    start: '1950',
    end: '2000'
  });
  const country = ref<string>('UnitedStates');

  const countryList = ref<string[]>([]);

  const classificationList = ref<string[]>(['Computer science']);

  function changeYearRange(start: string, end: string) {
    yearRange.start = start;
    yearRange.end = end;
  }

  function changeCountry(newCountry: string) {
    country.value = newCountry;
  }

  function saveCountryList(countries: string[]) {
    countryList.value = countries;
  }

  function saveClassificationList(classifications: string[]) {
    classificationList.value = classifications;
  }

  return {
    yearRange,
    country,
    countryList,
    classificationList,
    changeYearRange,
    changeCountry,
    saveCountryList,
    saveClassificationList
  };
});
