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
    return bathroom.map((toilet, index) => {
      return (
        <div key={index} className="container">
          <div className="name">
            {toilet.name}
            <div>
              <i class="fas fa-toilet fa-2x"></i>
            </div>
          </div>
          <div className="directions">{toilet.directions}</div>
          <div className="location">
            {toilet.state},{toilet.city}
            <div className="access">
              <i className="fa fa-wheelchair fa-2x"></i>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Bathroom Finder</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </header>
      {getBathrooms()}
    </div>
  );
}

export default App;
