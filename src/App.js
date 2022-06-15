import React from "react";
import { useState, useEffect } from "react";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions frosm actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      /* here we map over the element and display each item as a card  */
      <>
        <div className="search">
          <label>
            {" "}
            Search
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
          </label>
        </div>
        {input ? (
          <div className="wrapper">
            <ul className="card-grid">
              {items
                .filter((item) =>
                  item.name.toLowerCase().startsWith(input.toLowerCase())
                )
                .map((item) => (
                  <li>
                    <article className="card" key={item.callingCodes}>
                      <div className="card-image">
                        <img src={item.flag} alt={item.name} />
                      </div>
                      <div className="card-content">
                        <h2 className="card-name">{item.name}</h2>
                        <ol className="card-list">
                          <li>
                            population: <span>{item.population}</span>
                          </li>
                          <li>
                            Region: <span>{item.region}</span>
                          </li>
                          <li>
                            Capital: <span>{item.capital}</span>
                          </li>
                        </ol>
                      </div>
                    </article>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="wrapper">
            <ul className="card-grid">
              {items.map((item) => (
                <li>
                  <article className="card" key={item.callingCodes}>
                    <div className="card-image">
                      <img src={item.flag} alt={item.name} />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name">{item.name}</h2>
                      <ol className="card-list">
                        <li>
                          population: <span>{item.population}</span>
                        </li>
                        <li>
                          Region: <span>{item.region}</span>
                        </li>
                        <li>
                          Capital: <span>{item.capital}</span>
                        </li>
                      </ol>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default App;
