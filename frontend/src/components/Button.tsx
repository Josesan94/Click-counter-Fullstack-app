import React from 'react'
import { Button } from '@chakra-ui/react'


type Props = {
  name:string
  clickcount: number,
  onClickCount: () => void;

}

const DefaultButton:React.FC<Props> = (props) => {
  const {name, clickcount, onClickCount} = props;


  return (
    <div>
    <Button onClick={onClickCount} >
      {name} : {clickcount === 0 ? 0 : clickcount}
    </Button>
    </div>
  )
}

export default DefaultButton;