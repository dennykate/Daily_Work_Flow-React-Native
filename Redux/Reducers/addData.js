const addData = (state = "", action) => {
  switch (action.type) {
    case "ADD":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export { addData };
