import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import TestTokenInput from "./components/TestTokenInput";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/* Temporary: Remove this once authentication is implemented */}
      <TestTokenInput />
    </BrowserRouter>
  );
}

export default App;
