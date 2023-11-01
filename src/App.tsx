import ErrorBoundary from "./ErrorBoundary.component";
import Root from "./Root";

import { AccountContextProvider } from "./context/Account.context";

const App = () => {
  return (
    <AccountContextProvider>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </AccountContextProvider>
  );
};

export default App;
