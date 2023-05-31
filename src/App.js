import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SignatureUI from "./Components/Al/Al";
import PredictionUI from "./Components/Prediction/Upload";

function App() {
  const [signedUp, setSignedUp] = React.useState(false);

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<div></div>} /> */}
        <Route path="/" element={<PredictionUI />} />
      </Routes>
    </div>
  );
}

export default App;
