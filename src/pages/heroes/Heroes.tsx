import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { THeroList } from "../../@types";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Heroes.scss";

export default function Heroes() {
  const location = useLocation();
  const { id } = location.state as { id: number };
  const [hero, setHero] = useState({} as THeroList);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${id}?apikey=f11f5c8b791a1fb6dc36a2b7663c26ad&hash=984ad03c70022ee8cf0e911583259b2e`
      );

      setHero(data.data.results[0]);
    };

    getData();
  }, [id]);

  return (
    <>
      {hero && Object.keys(hero).length > 0 && (
        <div className="fullHeight">
          <Header />
          <div className="container">
            <div className="heroWrap">
              <img
                alt={`There displayed: ${hero.name}`}
                src={`${hero.thumbnail.path}.jpg`}
                width={300}
                height={300}
              />
              <div className="descriptionHeroWrap">
                <h2>{hero.name}</h2>
                <p>
                  {hero.description
                    ? hero.description
                    : "Description not found"}
                </p>
                <h3>Where you can found this Hero:</h3>
                <ul className="comicsWrap">
                  {hero.comics.items[0]
                    ? hero.comics.items.map((item, index) => {
                        return <li>{item.name}</li>;
                      })
                    : "Comics not Found"}
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
