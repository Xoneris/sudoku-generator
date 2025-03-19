"use client"; // Required for Client Component

import { useState } from "react";

import sudokuJson from "../json/sudoku.json"

export default function Home() {
  const [sudoku, setSudoku] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [loading, setLoading] = useState(false);

  const generateSudoku = async () => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
    });
    console.log(response)
    const text = await response.text();

    console.log(text)

    const jsonObject = JSON.parse(text);
    let sudokuString = jsonObject.sudoku;

    // Step 2: Remove unwanted characters using regex
    sudokuString = sudokuString.replace(/```json|\n|```/g, "").trim();

    // Step 3: Parse the cleaned string into valid JSON
    const sudokuArray = JSON.parse(sudokuString);

    console.log(sudokuArray)

    if (sudokuArray.sudoku) {
        setSudoku(sudokuArray.sudoku);
        setLoading(false);  
    } else if (sudokuArray.puzzle) {
        setSudoku(sudokuArray.puzzle);
        setLoading(false);
    } else {
        console.error("No JSON found in response");
        setLoading(false);
    }
    
  };

  function determinColor(number:number) {
    switch (number) {
      case 1:
        return "bg-[#894e58]"
      case 2:
        return "bg-[#b0ceac]"
      case 3:
        return "bg-[#e28074]"
      case 4:
        return "bg-[#909992]"
      case 5:
        return "bg-[#d7b36a]"
      case 6:
        return "bg-[#5d9789]"
      case 7:
        return "bg-[#005c8a]"
      case 8:
        return "bg-[#eae7dd]"
      case 9:
        return "bg-[#e5b5ab]"
      default:
        return ""
    }
  }

  return (
    <>
      <button className="border rounded-lg p-2 bg-white" onClick={generateSudoku} disabled={loading}>
        {loading ? "Generating..." : "Generate Sudoku"}
      </button>

      <div className="flex gap-2">
        {
          sudokuJson.map((sudoku) => (
            <button
              className="w-8 border rounded-lg p-2 bg-white"
              onClick={() => setSudoku(sudoku.puzzle)}
              key={sudoku.id}
            >
              {sudoku.id}
            </button>
          ))
        }
      </div>

      <div className="flex flex-wrap max-w-[360px] bg-white">
        {
          sudoku.map((row) => row.map((number,index) => (
            <div className="w-10 h-10 flex justify-center items-center border" key={index}>
              <div className={`rounded-full w-6 h-6 transition-all ${determinColor(number)}`}></div>
            </div>
          )))
        }
      </div>
    </>
  );
}
