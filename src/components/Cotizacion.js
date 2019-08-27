import React from 'react';

const Cotizacion = ({cotizacion}) => {
    if(Object.keys(cotizacion).length === 0) return null;
    return (
        <div className = "resultado"> 
            <h2 >{cotizacion.MARKET}</h2> 
            <p className = "precio" >El precio del dia es: <span>{cotizacion.PRICE}</span></p>
            <p> Precio mas alto del dia: <span>{cotizacion.HIGHDAY}</span></p>
            <p> Precio mas bajo del dia: <span>{cotizacion.LOWDAY}</span></p>
            <p> Variacion ultimas 24 hrs: <span>{cotizacion.CHANGEPCT24HOUR}%</span></p>
            <p> Ultima actualizacion: <span>{cotizacion.LASTUPDATE}</span></p>
        </div>
    );
}
 
export default Cotizacion;