import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSelectStore = defineStore('select', () => {
  const yearRange = reactive({
    start: '1950',
    end: '2000'
  });
  const country = ref('UnitedStates');

  const countryList = ref<Array<string | undefined>>([]);

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

  return { yearRange, country, countryList, changeYearRange, changeCountry, saveCountryList };
});
