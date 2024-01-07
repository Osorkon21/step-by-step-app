import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function Auth({ usage = "signup" }) {

  const appCtx = useAppCtx()

  const [userData, setUserData] = useState({ email: "", username: "", password: "" })

  const [submitError, setSubmitError] = useState("");

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    const apiPath = (usage === "signup") ? "/" : "/auth"
    const finalPath = `/api/users${apiPath}`
    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      if (response.result === "success") {
        setSubmitError("");
        window.location.href = "/dashboard"
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
    setUserData({ ...userData, email: appCtx.user?.email || "", username: appCtx.user?.username || "" });
  }, [appCtx])

  useEffect(() => {
  }, [submitError]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2>{usage === "signup" ? "Signup" : "Login"}</h2>
          <div>
            {usage === "signup" ? (
              <>
                <div>
                  <input type="text" name="email" placeholder="email" value={userData.email} onChange={handleInputChange} />
                </div>

                <div>
                  <input type="text" name="username" placeholder="username" value={userData.username} onChange={handleInputChange} />
                </div>
              </>
            )
              :
              <>
                <div>
                  <input type="text" name="username" placeholder="email or username" value={userData.username} onChange={handleInputChange} />
                </div>
              </>
            }

            <div>
              <input type="password" name="password" placeholder="password" value={userData.password} onChange={handleInputChange} />
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
