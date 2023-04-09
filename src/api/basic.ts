import axios from 'axios';
import { BASIC_MODULE } from '@/api/_prefix';

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
