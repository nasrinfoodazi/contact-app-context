import { v4 } from "uuid";
const initialState = {
  contents: [],
};
function reducer(state, action) {
  console.log("state, action", state, action);
  switch (action.type) {
    case "addItem": {
      const newContact = { ...action.data, id: v4() };
      return {
        contents: [...state.contacts, newContact],
      };
    }
    case "removeItem": {
      return {
        contents: state.list,
      };
    }
  }
  throw Error("Unknown action");
}
export { initialState, reducer };
