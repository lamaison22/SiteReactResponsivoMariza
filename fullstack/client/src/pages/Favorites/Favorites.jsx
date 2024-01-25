import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
import "../Properties/Properties.css"
import UserDetailContext from "../../Context/UserDetailsContext";
export default function Favorites() {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");

  const {userDetails:{favorites}}=useContext(UserDetailContext)
  if (isError) {
    return (
      <div className="wrapper">
        <span>Erro enquanto obtinha dados</span>
      </div>
    );
  }
  if (isLoading) {
    <div className="wrapper flexCenter" style={{ height: "60vh" }}>
      <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        aria-label="puff-loading"
      />
    </div>;
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {
            //deixei um ? que primeiro verifica se os dados existem, caso contrario ele da erro direto
            // nem carrega nada
            // data?.map((card,i)=>(<PropertyCard card={card} key={i}/>))
            data?.filter((property)=>favorites.includes(property.id))
              .filter((property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase())||
                property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
}