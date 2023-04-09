import axios from 'axios';
import { YEAR_MODULE } from '@/api/_prefix';

export const getYearCountryCount = (payload: { start: number; end: number }) => {
  const { start, end } = payload;
  return axios.get(`${YEAR_MODULE}/getCountryCount?start=${start}&end=${end}`).then((res) => {
    return res.data;
  });
};

export const getYearClassificationCount = (payload: { start: number; end: number }) => {
  const { start, end } = payload;
  return axios
    .get(`${YEAR_MODULE}/getClassificationCount?start=${start}&end=${end}`)
    .then((res) => {
      return res.data;
    });
};
