const initialState = {
  counters: {
    1: 0,
    2: 0,
    3: 0,
  },
  vault: {
    isOpen: false,
  },
};

const incrementType = "INCREMENT";
export const incrementCounter = ({ counterId }) => ({
  type: incrementType,
  counterId,
});

export const countReducer = function (state = initialState, action) {
  switch (action.type) {
    case incrementType:
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.counterId]: state.counters[action.counterId] + 1,
        },
      };
    default:
      return state;
  }
};

export const selectCount = (state) => ({ counterId }) =>
  state.counters[counterId];
