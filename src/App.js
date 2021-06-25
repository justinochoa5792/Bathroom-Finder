import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [bathroom, setBathroom] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&offset=0&ada=true&unisex=false&query=${search}`
    );
    console.log(response.data);
    setBathroom(response.data);
  };

  const getBathrooms = () => {
    return bathroom.map((toilet) => {
      return (
        <ul>
          <li>{toilet.name}</li>
          <li>{toilet.state},</li>
          <li>{toilet.city}</li>
          <li>{toilet.directions}</li>
        </ul>
      );
    });
  };

  return (
    <div className="App">
      <h1>Bathroom Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter City To Find Bathroom"
          onChange={handleChange}
        />
      </form>
      {getBathrooms()}
    </div>
  );
}

export default App;
