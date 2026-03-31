import { OnboardingForm } from "./components/OnboardingForm";
import { ParticlesBackground } from "./components/ParticlesBackground";
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
              <ParticlesBackground />
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
