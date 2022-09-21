import MainNavigation from "./Navigation/MainNavigation";

import { configureStore } from "./Redux/Store/store";
import { Provider } from "react-redux";

import UpdateStatus from "./Helpers/UpdateStatus";

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <MainNavigation />
      <UpdateStatus />
    </Provider>
  );
}
