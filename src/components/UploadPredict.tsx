// uploadpredict.tsx (or UploadPage.tsx)
"use client";
import { useState } from "react";
import Image from "next/image";
import Papa from "papaparse"; // Install papaparse for CSV parsing

interface Student {
  studentId: string;
  name: string;
  PredictedScore?: number; // PredictedScore might not be available until the prediction is completed
}

interface UploadPredictProps {
  onDataUpdate: (data: { studentId: string; PredictedScore: number }[]) => void;
}

const UploadPredict: React.FC<UploadPredictProps> = ({ onDataUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const BASE_URL = "https://b8ac-34-48-145-226.ngrok-free.app";

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const validExtensions = [".csv", ".xlsx"];
      const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();

      if (!validExtensions.includes(`.${fileExtension}`)) {
        setError("Please upload a .csv or .xlsx file.");
        setFile(null);
        setFileName("");
      } else {
        setError(null);
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
      }
    }
  };

  // Handle file submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "predicted_scores.csv";
        link.click();
        setPredictionResult("Prediction successful! Download the result.");

        // Parse CSV and update resultsData
        const text = await response.text();
        Papa.parse(text, {
          complete: (result) => {
            const parsedData = result.data;
            updateResultsData(parsedData);
          },
          header: true,
        });
      } else {
        setPredictionResult("Error during prediction.");
      }
    } catch (error: any) {
      setPredictionResult("");
    } finally {
      setLoading(false);
    }
  };

  // Function to update the resultsData with PredictedScore based on studentID match
  const updateResultsData = (fileData: any[]) => {
    // Extract only the necessary data: studentId and PredictedScore
    const predictions = fileData.map((student: any) => ({
      studentId: student.studentId,
      PredictedScore: student.PredictedScore ?? 0, // Default to 0 if PredictedScore is null or undefined
    }));

    // Pass the extracted data to the parent
    onDataUpdate(predictions);
  };

  return (
    <div className="flex gap-4 justify-between flex-wrap">
      <div
        className="w-full bg-lamaPurple text-white p-2 rounded-lg flex justify-between items-center
        cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <label className="text-sm text-white flex items-center gap-2" htmlFor="fileUpload">
          <Image src="/upload.png" alt="Upload Icon" width={28} height={28} />
          <span>Upload CSV or Excel File to Predict Grades</span>
        </label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Display selected file name */}
      {fileName && (
        <div className="mt-2 text-gray-600">
          <p className="font-medium">Selected file:</p>
          <p>{fileName}</p>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {/* Submit button */}
      {file && (
        <button
          onClick={handleSubmit}
          className="bg-lamaPurple text-white text-sm px-4 py-2 rounded-lg mt-9 shadow-sm hover:shadow-md transition-shadow duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      )}

      {/* Prediction result */}
      {predictionResult && (
        <p className="text-sm text-gray-700 mt-4">{predictionResult}</p>
      )}
    </div>
  );
};

export default UploadPredict;
