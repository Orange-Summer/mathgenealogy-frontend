import axios from 'axios';
import qs from 'qs';
import { COUNTRY_MODULE } from '@/api/_prefix';

export const getSingleCountryClassification = (payload: {
  country: string;
  start: number;
  end: number;
}) => {
  const { country, start, end } = payload;
  return axios
    .get(`${COUNTRY_MODULE}/getSingleCountryClassification`, {
      params: {
        country: country,
        start: start,
        end: end
      }
    })
    .then((res) => {
      return res.data;
    });
};

export const getSingleCountryCountLine = (payload: {
  country: string;
  start: number;
  end: number;
}) => {
  const { country, start, end } = payload;
  return axios
    .get(`${COUNTRY_MODULE}/getSingleCountryCountLine`, {
      params: {
        country: country,
        start: start,
        end: end
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
    .then((res) => {
      return res.data;
    });
};

export const getCountryCountLine = (payload: {
  countries: string[];
  start: number;
  end: number;
}) => {
  const { countries, start, end } = payload;
  return axios
    .get(`${COUNTRY_MODULE}/getCountryCountLine`, {
      params: {
        countries: countries,
        start: start,
        end: end
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
    .then((res) => {
      return res.data;
    });
};

export const getSingleCountryClassificationWithYear = (payload: {
  country: string;
  start: number;
  end: number;
}) => {
  const { country, start, end } = payload;
  return axios
    .get(
      `${COUNTRY_MODULE}/getSingleCountryClassificationWithYear?country=${country}&start=${start}&end=${end}`
    )
    .then((res) => {
      return res.data;
    });
};

export const getKnowledgeFlowOut = (payload: { country: string; start: number; end: number }) => {
  const { country, start, end } = payload;
  return axios
    .get(`${COUNTRY_MODULE}/getKnowledgeFlowOut?country=${country}&start=${start}&end=${end}`)
    .then((res) => {
      return res.data;
    });
};

export const getKnowledgeFlowIn = (payload: { country: string; start: number; end: number }) => {
  const { country, start, end } = payload;
  return axios
      .get(`${COUNTRY_MODULE}/getKnowledgeFlowIn?country=${country}&start=${start}&end=${end}`)
      .then((res) => {
        return res.data;
      });
};
