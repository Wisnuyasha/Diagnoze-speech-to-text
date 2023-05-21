import Homepage from "./pages/Homepage";
import MedicineDetails from "./pages/MedicineDetails";
import Hospitals from "./pages/Hospitals";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/hospitals"} element={<Hospitals />} />
            <Route
            exact
            path="/details/:id"
            element={<MedicineDetails />} 
          />
          </Routes>
        </Router>
      </div>
    </>
  );
}
