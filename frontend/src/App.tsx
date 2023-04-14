import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, ChakraProvider } from '@chakra-ui/react'
import {
  Flex,
  List,
  ListItem,
} from '@chakra-ui/react'
import DefaultButton from './components/Button';

type Button = {
  id:number;
  name:string;
  clickcount:number
}

function App() {
  const [buttons, setButtons] = useState<Button[]>([])

  useEffect(() => {
    const getButtons = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/buttons`);

        setButtons(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    getButtons()
  }, []);


  const handleClickButton = (button:Button) => {
    // Llamada al endpoint PUT para incrementar el contador de clics
    axios.put(`http://localhost:3000/buttons/${button.id}`,
      {clickcount : button.clickcount + 1}
    ).then(response => {
      setButtons(buttons => {
        const index = buttons.findIndex(button => button.id === button.id)
        const updatedButton = {...button, clickcount: button.clickcount + 1}
        const newButtons = [...buttons]
        newButtons.splice(index, 1, updatedButton)
        return newButtons;
      })
    }).catch(e => console.log(e))

  }

  const handleAddButton = () => {
    //llamada al endpoint para crear un nuevo boton

    axios.post<any>('http://localhost:3000/buttons', { 
      name: `Button ${buttons.length + 1}`, 
      clickcount: 0
    })
    .then(response => {
      setButtons(prevButtons => [...prevButtons, response.data.button])
    }
    )
    
    .catch(e => console.log(e))
  }

  const handleDeleteButton = (button:Button) => {
    //llamada al endpoint para borrar un  boton
    axios.delete(`http://localhost:3000/buttons/${button.id}`)
    .then( response => setButtons(buttons => buttons.filter(b => b.id !== button.id)))
    .catch(e => console.log(e))
  }



  return (
    <ChakraProvider>
      <Flex  margin={40} alignItems={'center'} justifyContent='center' flexDirection={'column'}>
        <Button onClick={handleAddButton}>Agregar boton</Button>
        <List>
          {buttons.map(button => (
            <ListItem key={button.id}>
              <DefaultButton clickcount={button.clickcount} name={button.name} onClickCount={() => handleClickButton(button)} />
              <Button onClick={()=> handleDeleteButton(button)}>Borrar</Button>
            </ListItem>
          ))}
        </List>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
