import { OnboardingForm } from "./components/OnboardingForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContractPage from "./pages/contractPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <OnboardingForm />
            </>
          }
        />
        <Route path="/contract/:id" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
