export const updateTab = (tabName) => async (dispatch) => {
  dispatch({
    type: "UPDATE_TAB",
    payload: {
      tab: tabName,
    },
  });
};
