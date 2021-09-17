import React, { Component } from 'react'
import { Redirect, Route, RouteProps } from 'react-router';

interface PrivateRouteProps extends RouteProps{
    component: React.FC<any>;
}

/*privateroute componenti bir route döndürür
döndürdüğü route içerisinde render metodu ile token alınır
token varsa privateroute gönderilen component ekrana yazdırılır
token yoksa login sayfasına yönlendirir.*/
function PrivateRoute({component:Component, ...theRest}: PrivateRouteProps) { //privateroute'ın alacağı propslar route componentına gönderilir
    return <Route {...theRest} render={(props) =>{
        const token =localStorage.getItem("token");
        if(token){
            return <Component {...props}/>
        }
        return <Redirect to="/login/"/>
    }}/>
}
export default PrivateRoute;