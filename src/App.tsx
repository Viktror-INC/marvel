import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { THeroesList } from "./@types";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [heroesList, setHeroesList] = useState([] as THeroesList);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPosts, setCurrentPosts] = useState(0);

  const getData = useCallback(
    async (modified?: string, offset = currentPosts, type?: string) => {
      if (modified) {
        setCurrentCategory(modified);
      }
      const { data } = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?orderBy=${modified}&limit=10&offset=${offset}&apikey=f11f5c8b791a1fb6dc36a2b7663c26ad&hash=984ad03c70022ee8cf0e911583259b2e`
      );
      if (type === "updateHeroes") {
        return setHeroesList([...heroesList, ...data.data.results]);
      }
      setHeroesList(data.data.results);
    },
    [currentPosts, heroesList]
  );

  function setPosts() {
    const type = "updateHeroes";
    const posts = currentPosts + 10;
    getData(currentCategory, posts, type);
    setCurrentPosts(posts);
  }

  useEffect(() => {
    if (heroesList.length < 10) {
      getData("-modified");
    }
  }, [getData, heroesList.length]);

  return (
    <div className="fullHeight">
      <Header />
      <div className="container">
        <main className="main">
          <h2>Latest releases</h2>
          <div className="filterWrap">
            <span>Filter by:</span>
            <ul className="filterList">
              <li
                className={classNames("listItem", {
                  activeFilter: currentCategory === "name",
                })}
                onClick={() => getData("name")}
              >
                Name(A-Z)
              </li>
              <li
                className={classNames("listItem", {
                  activeFilter: currentCategory === "-name",
                })}
                onClick={() => getData("-name")}
              >
                Name(Z-A)
              </li>
              <li
                className={classNames("listItem", {
                  activeFilter: currentCategory === "-modified",
                })}
                onClick={() => getData("-modified")}
              >
                Last modified(New to Old)
              </li>
              <li
                className={classNames("listItem", {
                  activeFilter: currentCategory === "modified",
                })}
                onClick={() => getData("modified")}
              >
                Last modified(Old to New)
              </li>
            </ul>
          </div>
          <ul className="heroesListWrap">
            {heroesList.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`/pages/heroes/${item.name.split(" ").join("-")}`}
                    state={{ id: item.id }}
                  >
                    <img
                      className="listImage"
                      src={`${item.thumbnail.path}.jpg`}
                      alt={`there displayed: ${item.name}`}
                      width={232}
                      height={396}
                    />
                    <div className="mainTextWrap">
                      <h3 className="heroesName">{item.name}</h3>
                      <span className="heroesDescription">
                        {item.description
                          ? `${item.description.slice(0, 80)}...`
                          : `No description`}
                      </span>
                      <button className="heroesButton">See details</button>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="loadMoreButton" onClick={() => setPosts()}>
            Load More Heroes
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
