import axios from 'axios'
import { GRAPH_MODULE } from '@/api/_prefix'

export const getMathematicianTree = (payload: { mid: number; depth: number }) => {
  const { mid, depth } = payload
  return axios.get(`${GRAPH_MODULE}/getTree?id=${mid}&depth=${depth}`).then((res) => {
    return res.data
  })
}
