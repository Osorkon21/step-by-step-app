import { createContext, useContext, useState, useEffect } from "react"
import { SignupModal } from "../components";

// Create the context itself
const ModalContext = createContext({})

// Create a React hook that will allow other components to use the context 
export const useModalCtx = () => useContext(ModalContext)

export default function ModalProvider(props) {
  return (
    <ModalContext.Provider value={{
      signupModal: <SignupModal
        buttonText={"Sign in to save your goals!"} />
    }}>
      {props.children}
    </ModalContext.Provider >
  )
}
