import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
import Filtros from "../../components/Filtros/Filtros";
import { Select } from "@mantine/core";
export default function Properties() {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [preco, setPreco] = useState("");

  const cidades = [
    ...new Set(data?.map((cidade) => cidade.city.toLowerCase())),
  ];
  const tipos = [...new Set(data?.map((tipo) => tipo?.type?.toLowerCase()))];

  const valores = [...new Set(data?.map((val) => val?.faixa?.toLowerCase()))];
  let aux = new Array(valores.length).fill("");

  function mapeiaValores(valores, aux) {
    valores.forEach((element) => {
      if (element == "<150k") aux[0] = "<150k";
      // <150k, 250k-500k, 500k-1m, 1m-2.5m, >2.5m
      else if (element == "150k-250k") {
        aux[1] = "150k-250k";
      } else if (element == "250k-500k") {
        aux[2] = "250k-500k";
      } else if (element == "500k-1m") {
        aux[3] = "500k-1m";
      } else if (element == "1m-2.5m") {
        aux[4] = "1m-2.5m";
      } else if (element == ">2.5m") {
        aux[5] = ">2.5m";
      } 
    });
    return aux
  }
  const faixas = mapeiaValores(valores, aux);



  console.log(cidades);
  console.log(tipos);

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
        {/* <SearchBar filter={filter} setFilter={setFilter} /> */}
        {/* <Filtros filtra={filtra} setFiltra={setFiltra}/> */}
        <div className="flexStart paddings innerWidht properties-container">
          <Select
            label="Cidade"
            name="cidade"
            placeholder="Todas"
            searchable
            data={cidades}
            clearable
            searchValue={city}
            onSearchChange={setCity}
            radius={"xl"}
            defaultValue={"Todas"}
            nothingFound="No options"
          />
          <Select
            label="Tipo"
            placeholder="Todos"
            name="tipo"
            searchable
            data={tipos}
            clearable
            onSearchChange={setType}
            radius={"xl"}
            defaultValue={"Todas"}
            searchValue={type}
            nothingFound="No options"
          />
          <Select
            label="Faixa de Preço"
            name="preco"
            placeholder="Todas"
            searchable
            data={faixas}
            clearable
            searchValue={preco}
            onSearchChange={setPreco}
            radius={"xl"}
            defaultValue={"Todos"}
            nothingFound="No options"
          />
        </div>
        <div className="paddings flexCenter properties">
          {
            //deixei um ? que primeiro verifica se os dados existem, caso contrario ele da erro direto
            // nem carrega nada
            // data?.map((card,i)=>(<PropertyCard card={card} key={i}/>))
            data
              ?.filter(
                (property) =>
                  property.city.toLowerCase().includes(city.toLowerCase()) &&
                  property.type.toLowerCase().includes(type.toLowerCase()) &&
                  property.faixa.toLowerCase().includes(preco.toLowerCase()) 

              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
          {console.log(data)}
        </div>

        {/* aqui vai as opcoes de seleção */}
      </div>
    </div>
  );
}
