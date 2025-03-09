import React from "react";
import ReviewList from "./components/ReviewList";

const App: React.FC = () => {
  return (
    <div>
      <h1>読書SNS「dokusyo」</h1>
      <ReviewList />
    </div>
  );
};

export default App;
