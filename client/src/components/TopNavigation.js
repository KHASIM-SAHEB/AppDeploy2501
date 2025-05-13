import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {
    let navigate = useNavigate();

    let storeObj = useSelector((store)=>{
       return store.loggedInUser;
    });
    useEffect(()=>{

        console.log("inside top navigation use effect");
        console.log(storeObj);

        if (storeObj && storeObj.email){

        }else{
           navigate("/");
        }

    },[])

  return (
    <div>
      <nav>
        <Link to="/dashbord">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/">Signout</Link>
      </nav>
    </div>
  )
}

export default TopNavigation
