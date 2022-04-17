import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { THeroesList } from "../../@types";
import "./Search.scss";

export default function Search() {
  const [value, setValue] = useState("");
  const [heroes, setHeroes] = useState([] as THeroesList);
  const [showSearch, setShowSearch] = useState(false);

  const getHeroes = async (value: string) => {
    console.log("value", value);

    if (value) {
      setShowSearch(true);
      const { data } = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&limit=10&apikey=f11f5c8b791a1fb6dc36a2b7663c26ad&hash=984ad03c70022ee8cf0e911583259b2e`
      );
      return setHeroes(data.data.results);
    }
    setShowSearch(false);
    setHeroes([]);
  };
  return (
    <div className="inputWrap">
      <label htmlFor="search">
        <div className="searchImageWrap">
          <img
            src="/images/header/search.png"
            alt="search"
            width={30}
            height={30}
          />
        </div>
      </label>

      <input
        id="search"
        placeholder="Find heroes..."
        value={value}
        onClick={() => setShowSearch(true)}
        onChange={(event) => {
          setValue(event.target.value);
          getHeroes(event.target.value);
        }}
      />

      {showSearch && heroes.length > 0 && (
        <ul
          className={classNames("resultsWrap", {
            resultsWrapActive: value && heroes.length > 0,
          })}
        >
          {heroes.map((item, index) => {
            return (
              <li onClick={() => setShowSearch(false)} key={index}>
                <Link
                  to={`/pages/heroes/${item.name.split(" ").join("-")}`}
                  state={{ id: item.id }}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
