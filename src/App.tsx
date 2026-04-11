import { OnboardingForm } from "./components/OnboardingForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContractPage from "./pages/contractPages";
import EditPage from "./pages/editPages";

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
        <Route path="/contract/:id/edit" element={<EditPage />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;


