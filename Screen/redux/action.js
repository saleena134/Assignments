export const CHATING = 'CHATING';

export const getchat = chating => dispatch => {
  dispatch({
    type: CHATING,
    payload: chating,
  });
};
