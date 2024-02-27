import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";

export default function Profile() {
  const appCtx = useAppCtx();

  const [userData, setUserData] = useState("");

  function handleSubmit() {

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

          <button className="update-goal-btn hover:scale-95 " type="submit">Save Changes</button>
        </form>
      )}
    </div>
  )
}
