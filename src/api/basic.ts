import axios from 'axios';
import { BASIC_MODULE } from '@/api/_prefix';
import qs from 'qs';

export const getMathematicianList = (payload: { page: number; size: number }) => {
  const { page, size } = payload;
  return axios.get(`${BASIC_MODULE}/getlist?page=${page}&size=${size}`).then((res) => {
    return res.data;
  });
};

export const getMathematician = (payload: { mid: number }) => {
  const { mid } = payload;
  return axios.get(`${BASIC_MODULE}/get?id=${mid}`).then((res) => {
    return res.data;
  });
};

export const getCountryCount = () => {
  return axios.get(`${BASIC_MODULE}/getCountryCount`).then((res) => {
    return res.data;
  });
};

export const getInstitutionCount = () => {
  return axios.get(`${BASIC_MODULE}/getInstitutionCount`).then((res) => {
    return res.data;
  });
};

export const getClassificationCount = () => {
  return axios.get(`${BASIC_MODULE}/getClassificationCount`).then((res) => {
    return res.data;
  });
};

export const getAllCountry = () => {
  return axios.get(`${BASIC_MODULE}/getAllCountry`).then((res) => {
    return res.data;
  });
};

export const getAllClassification = () => {
  return axios.get(`${BASIC_MODULE}/getAllClassification`).then((res) => {
    return res.data;
  });
};

export const getRanking = (payload: {
  countries: string[];
  classifications: string[];
  start: number;
  end: number;
  limit: number;
}) => {
  const { countries, classifications, start, end, limit } = payload;
  return axios
    .get(`${BASIC_MODULE}/getRanking`, {
      params: {
        countries: countries,
        classifications: classifications,
        start: start,
        end: end,
        limit: limit
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
    .then((res) => {
      return res.data;
    });
};
