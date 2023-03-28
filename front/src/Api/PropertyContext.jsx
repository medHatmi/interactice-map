import axios from 'axios'
import React, { createContext, useEffect, useState} from 'react'


export const context_Property=createContext()

export function PropertyContext(props) {

    const [properties, setProperties] = useState([])


       useEffect(() => {
        const fetchData = async () => {
           const {data} = await axios.get('http://localhost:8800/property/all',{header: {
            "Content-Type": "application/json",
          }})
           setProperties(data);
        }
      
        fetchData();
      }, []);


 




  
    return (
        <div>
            

            <context_Property.Provider value={{
                properties
            }}>
                {
                    props.children
                }
            </context_Property.Provider>
        </div>
    )
}
