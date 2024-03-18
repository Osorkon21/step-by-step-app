import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function Auth({ usage = "signup", close, setGoalStepsSubmitError = null }) {

  const appCtx = useAppCtx()

  const [userData, setUserData] = useState({ email: "", username: "", uservalue: "", password: "" })

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
        close();
        appCtx.updateUser();

        if (setGoalStepsSubmitError !== null)
          setGoalStepsSubmitError("");
      }
      else if (response.result === "error") {
        if (response.payload.includes("duplicate key"))
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
          <div className="gap-2 flex flex-col ">
            {usage === "signup" ? (
              <>
                <div>
                  <input className="w-full shadow-custom focus:bg-white focus:outline-none hover:bg-white bg-gray-100 " type="text" name="email" placeholder="email" value={userData.email} onChange={handleInputChange} />
                </div>

                <div>
                  <input className="w-full shadow-custom focus:bg-white focus:outline-none hover:bg-white bg-gray-100 " type="text" name="username" placeholder="username" value={userData.username} onChange={handleInputChange} />
                </div>
              </>
            )
              :
              <>
                <div>
                  <input className="w-full shadow-custom focus:bg-white focus:outline-none hover:bg-white bg-gray-100 " type="text" name="uservalue" placeholder="email or username" value={userData.uservalue} onChange={handleInputChange} />
                </div>
              </>
            }

            <div>
              <input className="w-full  shadow-custom focus:bg-white focus:outline-none hover:bg-white bg-gray-100 " type="password" name="password" placeholder="password" value={userData.password} onChange={handleInputChange} />
            </div>
          </div>

          <button className="mt-4 bg-middleblur w-full p-1 shadow">Submit Info</button>
        </div>
      </form>

      <div className="text-red-600">
        {submitError}
      </div>
    </div>
  )

}
