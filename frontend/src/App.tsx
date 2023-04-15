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
  const [isNewButton, setIsNewButton] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  console.log(isLoading)

  useEffect(() => {
    setIsLoading(true)
    console.log("llamo de nuevo")
    axios.get<Button[]>('http://localhost:3000/buttons')
    .then(response =>{
      setButtons(response.data)
      setIsLoading(false)
    } )
    .catch(e => console.log(e));
    
  }, [isNewButton]);


  const handleClickButton = (button:Button) => {

    axios.put(`http://localhost:3000/buttons/${button.id}`,
      {clickcount : button.clickcount + 1}
    ).then(response => {
      setButtons(buttons => {
        const index = buttons.findIndex(b => b.id === button.id);
        const updatedButton = {...button, clickcount: button.clickcount + 1};
        const newButtons = [...buttons];
        newButtons.splice(index, 1, updatedButton);
        return newButtons;
      });
    }).catch(e => console.log(e));
  };

  const handleAddButton = () => {

    axios.post<any>('http://localhost:3000/buttons', { 
      name: `Button ${buttons.length + 1}`, 
      clickcount: 0,
    })
    .then(response => {
      const newButton = response.data.button;
      setButtons(prevButtons => [...prevButtons, newButton]);
      setIsNewButton(true)
    }
    )
    .catch(e => console.log(e))
    setIsNewButton(false)
  }

  const handleDeleteButton = (button:Button) => {

    axios.delete(`http://localhost:3000/buttons/${button.id}`)
    .then( response => setButtons(buttons => buttons.filter(b => b.id !== button.id)))
    .catch(e => console.log(e))
  }



  return (
    <ChakraProvider>
      <Flex  margin={40} alignItems={'center'} justifyContent='center' flexDirection={'column'}>
        <Button onClick={handleAddButton}>Agregar boton</Button>
        {isLoading ? "Loading buttons... " : " "}
        <List margin={10} display={'flex'} flexDirection={'column'} gap={5}>
          {buttons.map((button, index) => (
            <ListItem key={index} display={'flex'} flexDirection={'row'} gap={2} justifyContent={'center'} alignItems={'center'}>
              <DefaultButton clickcount={button.clickcount} name={button.name} onClickCount={() => handleClickButton(button)} />
              <Button border={'none'} color={'red'} background={'white'}  onClick={()=> handleDeleteButton(button)}>X</Button>
            </ListItem>
          ))}
        </List>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
