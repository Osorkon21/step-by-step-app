import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function Auth({ usage = "signup" }) {

  const appCtx = useAppCtx()

  const [userData, setUserData] = useState({ email: "", password: "" })

  const [submitError, setSubmitError] = useState("");

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    const apiPath = (usage === "signup") ? "/" : "/auth"
    const finalPath = `/api/user${apiPath}`

    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      console.log(response)
      if (response.result === "success") {
        setSubmitError("");
        window.location.href = "/"
      }
      else if (response.result === "error") {
        if (response.payload.includes("duplicate key"))
          // not very secure - it gives out a user's email, but I don't see a way around this right now
          setSubmitError("User already exists!");
        else {
          const errArr = response.payload.split(":");
          const formattedMsg = errArr[errArr.length - 1];
          console.log(formattedMsg)
          setSubmitError(formattedMsg);
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    setUserData({ ...userData, email: appCtx.user.email || "" })
  }, [appCtx])

  useEffect(() => {
    console.log("submitError: " + submitError)
  }, [submitError]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2>{usage === "signup" ? "Signup" : "Login"}</h2>
          <div>
            <div>
              <label className="d-block">Email Address</label>
              <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
            </div>

            <div>
              <label className="d-block">Password</label>
              <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
            </div>
          </div>

          <button className="mt-2">Submit Info</button>
        </div>
      </form>

      <div className="text-danger">
        {submitError}
      </div>
    </div>
  )

}
