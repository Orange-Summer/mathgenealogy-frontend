import axios from 'axios'
import { BASIC_MODULE } from '@/api/_prefix'

export const getMathematicianList = (payload: { page: number; size: number }) => {
  const { page, size } = payload
  return axios.get(`${BASIC_MODULE}/getlist?page=${page}&size=${size}`).then((res) => {
    return res.data
  })
}
