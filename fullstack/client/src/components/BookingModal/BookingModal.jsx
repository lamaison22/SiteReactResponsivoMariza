import { Modal, Button} from '@mantine/core'
import { DatePicker } from '@mantine/dates';
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query';
import UserDetailContext from '../../Context/UserDetailsContext.js';
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const BookingModal=({opened,setOpened,email,propertyId})=>{
    const [value,setValue ]=useState(null)
    const {userDetails:{token},setUserDetails}=useContext(UserDetailContext)
    
    const handleBookingSuccess=()=>{
      toast.success("Voce marcou sua visita! ", {
        position:"bottom-right"
      })
      setUserDetails((prev)=>({
        ...prev,
        bookings:[
          ...prev.bookings,
          {
            id:propertyId, date:dayjs(value).format("DD/MM/YYYY")
          }
        ]
      }))
    }

    const {mutate,isLoading}=useMutation({
        mutationFn:()=>bookVisit(value,propertyId,email,token),
        onSuccess:()=> handleBookingSuccess(),
        onError :({response})=>toast.error(response.data.message),
        onSettled:()=>setOpened(false)
    })
  return (
    <Modal opened={opened} onClose={()=>setOpened(false)} title="Selecione a data da visita" centered>
       
       <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
        <Button disabled={!value || isLoading } onClick={()=>mutate()}  >
            Confirmar
        </Button>
       </div>
    </Modal>
  )
}

export default BookingModal