import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Error from './Error';

const Formulario = ({setMonedaApp,setCriptoApp}) => {
    
    const config = {

        title: 'Elige tu moneda',
        titleCripto: 'Elige tu Cripto Moneda',
        dolarUS: 'Dólar Americano',
        pesoMEX: 'Peso Mexicano',
        libras: 'Libra Inglesa',
        euro: 'Euro',
        url:'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD',
        boton: 'Calcular tipo de cambio',
        cotizarCripto: '--Selecciona tu Criptomoneda--',
        cotizarMoneda: '--Selecciona tu Moneda--',
    }
    const [tipoCambioMoneda,setTipoCambioMoneda] = useState([]);
    const [monedaCotizar,setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error,setError] = useState(false);


    useEffect (()=>{
        
        const criptoAPI = async()=>{
            

           const respuesta = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');

            //console.log(respuesta.data.Data);
            //se coloca la respuesta de la API en el State
            setTipoCambioMoneda(respuesta.data.Data);
            

        }
        criptoAPI(); 

    },[]);
    const handleSubmit = e =>{
        
        e.preventDefault();
        
        if(monedaCotizar === "" || criptoCotizar === "" || monedaCotizar === config.cotizarMoneda || 
            
            criptoCotizar === config.cotizarCripto ){
            
            setError(true);
            return;
        }
        setError(false);
       //pasar los datos al componente principal 
        setMonedaApp(monedaCotizar);
        setCriptoApp(criptoCotizar);

    };
    
    return ( 
    
        <form onSubmit={handleSubmit}>
            
            <div className="row" >
                <label>{config.title}*</label>
                <select className="u-full-width" onChange = {e=>setMonedaCotizar(e.target.value)}>
                    <option>--Selecciona tu Moneda--</option>
                    <option value="USD">{config.dolarUS}</option>
                    <option value="MXN">{config.pesoMEX}</option>
                    <option value ="GBP">{config.libras}</option>
                    <option value = "EUR">{config.euro}</option>
                </select>
            </div>
            <div className="row">
                <label>{config.titleCripto}*</label>
                <select className="u-full-width" onChange = {e=>setCriptoCotizar(e.target.value) }>
                <option>--Selecciona tu Criptomoneda--</option>
                    {tipoCambioMoneda.map(data =>(
                        <option
                            key={data.CoinInfo.Id}
                            value ={data.CoinInfo.Name}
                        >{data.CoinInfo.FullName}</option>

                    ))}
                </select>
            </div>
            {!error  ? null : <Error></Error>}
            <input type="submit" className="button-primary u-full-width" value={config.boton}></input>
        </form>
    
    );
}
 
export default Formulario;