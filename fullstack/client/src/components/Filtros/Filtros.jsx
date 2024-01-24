import React, { useState } from 'react'
import { Select } from '@mantine/core';
import useProperties from '../../hooks/useProperties';
function Filtros({filtra, setFiltra}) {
    const [searchCidade, onSearchCidade] = useState('');
    const [searchTipo, onSearchTipo] = useState('');



    const { data, isError, isLoading } = useProperties();

   
    return (    

        <>
      <Select
        label="Cidade"
        placeholder="Todas"
        searchable
        
        clearable
        onSearchChange={onSearchCidade}
        radius={"xl"}
        defaultValue={'Todas'}
        searchValue={searchCidade}
        nothingFound="No options"
        data={['Chapecó', 'São Miguel', 'Outras']}
      />
      
        <Select
        label="Your favorite framework/library"
        placeholder="Pick one"
        searchable
        clearable
        onSearchChange={onSearchTipo}
        radius={"xl"}
        searchValue={searchTipo}

        nothingFound="No options"
        data={['Casa', 'Apartamento', 'Terreno', 'Todos']}
      />
      
      
      </>
     
    );
}

export default Filtros