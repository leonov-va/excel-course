import { TABLE_RESIZE } from './types.js';

//  Action Creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}