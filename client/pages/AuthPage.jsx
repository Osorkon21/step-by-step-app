import { useState, useEffect } from "react"
import Auth from "../components/Auth"
import join from '../image/pic8.png'
import freeMember from '../image/pic9.png'

export default function AuthPage() {


  return (
    <div className="auth-content">
      <div className="auth">
        <Auth usage="signup" />
      </div>
      <div className="auth">
        <Auth usage="login" />
      </div>
      {/* <img src={join} className="join" alt="join" />
      <img src={freeMember} className="freeMember" alt="freeMember" /> */}
    </div>
  )
}
