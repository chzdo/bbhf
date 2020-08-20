import { useState, useEffect} from 'react';
import Loader from './loader'

export default function Button(props){
  const [loader,setLoader] = useState(false)
  const [disabled , setDisabled] = useState(props.disabled)


    return (
        <Button 
           className = {props.classname}
          disabled = {disabled}
          onC
          >
              {
                  loader? <Loader /> : Login
              }
          </Button>
    )
}