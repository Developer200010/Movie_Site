// useContext(wearhouse)
// provider
// consumer
import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext(); //context wearhouse
export const api= "https://www.omdbapi.com/?apikey=7f844fe3&s";
const AppProvider =({children})=>{
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie]= useState([]);
  const [isError, setIsError]=useState({show:"false", msg:""})
  const [query, setQuery] =useState('titanic');
  const getMovie=async(url)=>{
    try {
      // setIsLoading(true)
      const res= await fetch(url);
      const data =await res.json();
      if(data.Response === "True"){
        setIsLoading(false)
        setIsError({
          show:false,
          msg:""
        })
        setMovie(data.Search)
      }else{
          setIsError({
            show:true,
            msg:data.Error,
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  //debounce
  useEffect(()=>{
    var timerOut=setTimeout(()=>{
      getMovie(`${api}&s=${query}`);

    },500)
    return ()=> clearTimeout(timerOut)
  })

return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>
  {children}
</AppContext.Provider>
}

//global custom hook

const useGlobalContext=()=>{
return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}