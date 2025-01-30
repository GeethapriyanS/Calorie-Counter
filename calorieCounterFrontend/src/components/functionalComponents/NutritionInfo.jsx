import { useState } from "react";

export default function NutritionInfo() {
  const [query, setQuery] = useState("3lb carrots and a chicken sandwich");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNutrition = async () => {
    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          headers: {
            "X-Api-Key": "fgNDimI88JGH2COMtmuNoQ==LdcHcWicjxpSiMAV"
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-96">
      <h1 className="text-xl font-bold mb-2">Nutrition Info</h1>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="w-full p-2 border rounded mb-2" 
        placeholder="Enter food items"
      />
      <button 
        onClick={fetchNutrition} 
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Get Nutrition Info
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data && (
        <div className="mt-4 bg-white p-2 rounded">
          {data.items.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-semibold">{item.name}</p>
              <p>Calories: {item.calories}</p>
              <p>Protein: {item.protein_g}g</p>
              <p>Carbs: {item.carbohydrates_total_g}g</p>
              <p>Fats: {item.fat_total_g}g</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
