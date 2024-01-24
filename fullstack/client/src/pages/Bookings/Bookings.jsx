import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
import "../Properties/Properties.css"
import UserDetailContext from "../../Context/UserDetailsContext";
export default function Bookings() {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");

  const {userDetails:{bookings}}=useContext(UserDetailContext)

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
  if(!bookings){
    return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div>
          <span className="flexColCenter paddings innerWidth properties-container" > Esta página é dedicada à organização do usuário, ainda é necessário entrar em contato com a corretora para marcar a visita</span>
        </div>
        </div>
        </div>

        )
  }
  else{
    return (
      <div className="wrapper">
        <div className="flexColCenter paddings innerWidth properties-container">
          <SearchBar filter={filter} setFilter={setFilter} />
          <div>
            <span className="flexColCenter paddings innerWidth properties-container" > Esta página é dedicada à organização do usuário, ainda é necessário entrar em contato com a corretora para marcar a visita</span>
          </div>
          <div className="paddings flexCenter properties">
            
            {
              //deixei um ? que primeiro verifica se os dados existem, caso contrario ele da erro direto
              // nem carrega nada
              // data?.map((card,i)=>(<PropertyCard card={card} key={i}/>))
              data?.filter((property)=>bookings.map((booking)=>booking.id).includes(property.id))
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
 
}
