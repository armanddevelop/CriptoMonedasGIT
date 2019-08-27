import React,{useState,useEffect} from 'react';
import cryptomenda from './cryptomonedas.png'; 
import Formulario from './components/Formulario';
import axios from 'axios';
import Spiner from './components/Spiner';
import Cotizacion from './components/Cotizacion';

function App() {
  const config={
    titleForm: 'Cotiza Cripto monedas al instante',
    
  }
  const [monedaApp,setMonedaApp] = useState('');
  const [criptoApp, setCriptoApp] = useState('');
  const [cotizacion,setCotizacion] = useState({}); 
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    
    const cotizarCriptoMoneda = async () =>{

      if(monedaApp !== "" && criptoApp !== "" ){
        
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoApp}&tsyms=${monedaApp}`;

        const respuesta = await axios.get(url);
        // para acceder a propiedades del objeto dinamicas
        console.log(respuesta.data.DISPLAY[criptoApp][monedaApp]);
        // mostrar spiner
        setLoading(true);

        setTimeout (()=>{

          // ocultar spiner
          setLoading(false);
          setCotizacion(respuesta.data.DISPLAY[criptoApp][monedaApp]);
        },3000);
      }
    }
    
    cotizarCriptoMoneda();
    
  },[monedaApp,criptoApp]);
  
  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={cryptomenda} alt="Cryptomoneda" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>{config.titleForm}</h1>
          <Formulario setMonedaApp = {setMonedaApp} setCriptoApp ={setCriptoApp} ></Formulario>
          {!loading  ? null : <Spiner></Spiner>}
          <Cotizacion cotizacion = {cotizacion}></Cotizacion>
        </div>
      </div>
    </div>
  );
}

export default App;
