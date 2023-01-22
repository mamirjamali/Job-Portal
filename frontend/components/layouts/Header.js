import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Header = () => { 
  
  const { loading, user, logout } = useContext(AuthContext)
  const [show, setShow] = useState('block')
  
  const displayHandler = (show) => {
    if (show === 'block') {
      setShow('none')
      
    } else {
      
      setShow('block')
    }

  }

  const logoutHandler = () => {
    logout()
  }

  return ( 
      <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <img width="30" height="30" src="/images/logo.png" alt="home"/>
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">  Portal</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {
            user ?
            (<div className="dropdown ml-3" onClick={displayHandler} >
                <a
                  className="btn dropdown-toggle mr-4"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>Hi { user.first_name}</span> {" "}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton" display={show}>

                  <Link href="/employeer/jobs" legacyBehavior >
                    <a className="dropdown-item">My Jobs</a>
                  </Link>

                  <Link href="/me/applied" legacyBehavior>
                    <a className="dropdown-item">Applied Jobs</a>
                  </Link>

                  <Link href="/me" legacyBehavior>
                    <a className="dropdown-item">Profile</a>
                  </Link>

                  <Link href="/upload/resume" legacyBehavior>
                    <a className="dropdown-item">Upload Resume</a>
                  </Link>

                  <Link href="/" legacyBehavior>
                    <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
                  </Link>
                

                </div>
            </div>
            ) : ( 
              !loading && 
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
    );
}
 
export default Header;