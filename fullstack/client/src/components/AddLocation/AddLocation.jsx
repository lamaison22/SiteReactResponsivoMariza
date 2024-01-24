import React from 'react'
import {useForm} from "@mantine/form"
import { validateString } from '../../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from '../../hooks/useCountries'
import Map from '../Map/Map.jsx'
function AddLocation({propertyDetails,setPropertyDetails,nextStep}) {
    const {getAll} =useCountries()
    const form=useForm({
        initialValues:{
            country:propertyDetails?.country,
            city:propertyDetails?.city,
            address:propertyDetails?.address
        },
        validate:{
            country:(value)=>validateString(value),
            city:(value)=>validateString(value),
            address:(value)=>validateString(value)
        }
    })

    const {country,city,address}=form.values
    const handleSubmit=()=>{
        const {hasErrors}=form.validate()
        if(!hasErrors){
            setPropertyDetails((prev)=>({...prev,city,address,country}))
            nextStep()
        }
    }

  return (
    <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
        {/* left side */}
        <div className="flexCenter" style={{justifyContent:"space-between", gap:"3rem",marginTop:"3rem"}}>
            <div className="flexColStart">
                <Select w={"100%"} withAsterisk label="País"clearable searchable data={getAll()} {...form.getInputProps("country",{type:"input"})}/>
                <TextInput 
                    w={"100%"} 
                    withAsterisk 
                    label="Cidade" 
                    {...form.getInputProps("city",{type:"input"})}
                />
                <TextInput 
                    w={"100%"} 
                    withAsterisk 
                    label="Endereço" 
                    {...form.getInputProps("address",{type:"input"})}
                />
            </div>

            {/* right side */}
            <div style={{flex:1}}>
                <Map address={{address}} city={city} country={country}/>
            </div>
        </div>

        <Group position="center"mt={"xl"}>

            <Button type='submit'>Proxima etapa</Button>
        </Group>

    </form>
  )
}

export default AddLocation