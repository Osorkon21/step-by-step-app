import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";

export default function Profile() {
  const appCtx = useAppCtx();

  const [userData, setUserData] = useState({});
  const [submitError, setSubmitError] = useState("");

  const MONGODB_DUPLICATE_KEY_CODE = 11000;

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const query = await fetch(`/api/users/${appCtx.user._id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const response = await query.json()

      if (response.result === "success!") {
        setSubmitError("");
        appCtx.updateUser();
      }
      else {
        if (response.code === MONGODB_DUPLICATE_KEY_CODE)
          setSubmitError("User by that name already exists!");
        else {
          const errArr = response.message.split(":");
          const formattedMsg = errArr[errArr.length - 1];
          console.log(formattedMsg)
          setSubmitError(formattedMsg);
        }
      }
    } catch (err) {
      console.log(err.message)
      setSubmitError(err.message);
    }
  }

  function handleInput(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (appCtx?.user !== undefined) {
      setUserData(appCtx.user);
    }
  }, [appCtx])

  // firstName
  // lastName
  // userBio
  // pronouns

  // new password
  // retype new password

  // change email
  // retype new email

  return (
    <div className="body mt-16">
      <h1>User Profile</h1>

      {appCtx.user?._id !== undefined && (
        <form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
          <div className="gap-2 flex flex-col">
            <label htmlFor="username">Username</label>
            <input className="" type="text" placeholder="add username" name="username" onChange={handleInput} value={userData.username || ""} />
          </div>

          <div className="text-red-600">
            {submitError}
          </div>
          <button className="update-goal-btn hover:scale-95" type="submit">Save Changes</button>
        </form>
      )}
    </div>
  )
}
