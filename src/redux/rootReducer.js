import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES
} from "./types";

// Pure Function
export function rootReducer(state, action) {
  let field;

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state, [field]: value(state, field, action)
      }; // id, value
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
          [field]: value(state, field, action)
      };
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    default:
      return state;
  }
  return state;
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}