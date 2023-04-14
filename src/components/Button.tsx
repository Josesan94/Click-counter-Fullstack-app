import React from 'react'
import { Button } from '@chakra-ui/react'


type Props = {

}

const DefaultButton:React.FC<Props> = (props) => {


  return (
    <div>
    <Button >
      Boton numero : Contador
    </Button>
    </div>
  )
}

export default DefaultButton;