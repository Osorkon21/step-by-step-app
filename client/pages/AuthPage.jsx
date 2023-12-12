import { useState, useEffect } from "react"
import Auth from "../components/Auth"
import join from '../image/pic8.png'
import freeMember from '../image/pic9.png'
// import '../css/AuthPage.css'

export default function AuthPage(){


  return (
    <>
      <div className="d-flex gap-5">
        <div>
          <Auth usage="signup" />
        </div>
        <div>
          <Auth usage="login" />
        </div>
      </div>
      <img src={join} className="join" alt="join" />
      <img src={freeMember} className="freeMember" alt="freeMember" />
    </>
  )
}