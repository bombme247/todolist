import { FilterValuesType } from "../App";

export const filterReducer = (state: FilterValuesType, action: changeFilterACType): FilterValuesType => {
  switch (action.type) {
    case 'CHANGE-FILTER': {
      return action.payload.filter
    }
    default: return state
  }
}

type changeFilterACType = {
  type: 'CHANGE-FILTER'
  payload: {
    filter: FilterValuesType
  }
}

export const changeFilterAC = (filter: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      filter
    }
  } as const
}