import axios from 'axios';
import { GRAPH_MODULE } from '@/api/_prefix';

export const getTree = (payload: { mid: number; depth: number }) => {
  const { mid, depth } = payload;
  return axios.get(`${GRAPH_MODULE}/getTree?id=${mid}&depth=${depth}`).then((res) => {
    return res.data;
  });
};

export const getStudentTree = (payload: { mid: number; depth: number }) => {
  const { mid, depth } = payload;
  return axios.get(`${GRAPH_MODULE}/getStudentTree?id=${mid}&depth=${depth}`).then((res) => {
    return res.data;
  });
};

export const getAdvisorTree = (payload: { mid: number; depth: number }) => {
  const { mid, depth } = payload;
  return axios.get(`${GRAPH_MODULE}/getAdvisorTree?id=${mid}&depth=${depth}`).then((res) => {
    return res.data;
  });
};
