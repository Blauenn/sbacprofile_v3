import Root from "./Root";

import { AccountContextProvider } from "./context/Account.context";

const App = () => {
  return (
    <AccountContextProvider>
      <Root />
    </AccountContextProvider>
  );
};

export default App;
