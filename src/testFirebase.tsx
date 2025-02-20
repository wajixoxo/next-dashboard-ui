import React, { useEffect } from "react";
import app from "./firebaseConfig";

const TestFirebase: React.FC = () => {
  useEffect(() => {
    console.log("Firebase App Initialized:", app);
  }, []);

  return <div>Firebase Connection Test</div>;
};

export default TestFirebase;
