import Homepage from "./pages/Homepage";
import MedicineDetails from "./pages/MedicineDetails";
import Hospitals from "./pages/Hospitals";
import Pharmacy from "./pages/Pharmacy";
import Bookmarks from "./pages/Bookmarks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/hospitals"} element={<Hospitals />} />
            <Route path={"/pharmacy"} element={<Pharmacy />} />
            <Route path={"/bookmarks"} element={<Bookmarks />} />
            <Route exact path="/details/:id" element={<MedicineDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
