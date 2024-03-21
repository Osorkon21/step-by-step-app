import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

export default function Profile() {
  const appCtx = useAppCtx();

  const [userData, setUserData] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");

  const MONGODB_DUPLICATE_KEY_CODE = 11000;
  const pronouns = [
    "He/Him",
    "She/Her",
    "They/Them",
    "Xe/Xer",
    "Other",
    "Prefer not to say"
  ];

  async function handleSubmit(e) {
    e.preventDefault()

    setSubmitError("");

    if (newEmail || confirmEmail)
      if (newEmail !== confirmEmail)
        return;

    if (newPwd || confirmPwd)
      if (newPwd !== confirmPwd)
        return;

    if (userData.password && userData.password.length < 8) {
      setSubmitError("New password must be at least 8 characters long!");
      return;
    }

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
        appCtx.updateUser();
        setNewEmail("");
        setConfirmEmail("");
        setNewPwd("");
        setConfirmPwd("");

        alert("Changes successfully saved!")
        // "undo" option, "x" box, have a box pop up and then disappear on its own


      }
      else {
        if (response.code === MONGODB_DUPLICATE_KEY_CODE)
          setSubmitError("Username or email already in use! Use a different value.");
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

  function handleSelect(e) {
    setUserData({ ...userData, pronouns: e });
  }

  useEffect(() => {
    if (appCtx?.user !== undefined) {
      setUserData(appCtx.user);
    }
  }, [appCtx]);

  useEffect(() => {
    setEmailError("")

    if (newEmail || confirmEmail) {
      if (newEmail !== confirmEmail) {
        setEmailError("New emails do not match!")
        setUserData({ ...userData, email: appCtx.user.email })
      }
      else {
        setUserData({ ...userData, email: newEmail })
      }
    }
    else {
      setUserData({ ...userData, email: appCtx.user.email })
    }
  }, [newEmail, confirmEmail]);

  useEffect(() => {
    setPwdError("")

    if (newPwd || confirmPwd) {
      if (newPwd !== confirmPwd) {
        setPwdError("New passwords do not match!")
        delete userData.password;
        setUserData(userData)
      }
      else {
        setUserData({ ...userData, password: newPwd })
      }
    }
    else {
      delete userData.password;
      setUserData(userData);
    }
  }, [newPwd, confirmPwd]);

  return (
    <div className="body mt-24 text-purple text-center">
      <h1 className="text-5xl md:text-6xl my-8">User Profile</h1>

      {appCtx.user?._id !== undefined && (
        <form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
          <div className="gap-2 flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="What's your new username?" name="username" onChange={handleInput} value={userData.username || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="What's your first name?" name="firstName" onChange={handleInput} value={userData.firstName || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="What's your last name?" name="lastName" onChange={handleInput} value={userData.lastName || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="userBio">Bio</label>
            <textarea type="text" placeholder="What's your story?" name="userBio" rows={4} onChange={handleInput} value={userData.userBio || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="pronouns">Pronouns</label>

            <Select className="" placeholder={userData.pronouns || "Choose Pronouns"} aria-label="pronoun select dropdown" onSelectionChange={handleSelect}>
              <Button className="p-2 border-2 border-purple hover:scale-95">
                <SelectValue />
                <span aria-hidden="true">▼</span>
              </Button>
              <Popover className="bg-middle p-4 rounded-lg hover:bg-purple focus:outline-none">
                <ListBox className="">
                  {pronouns.map((pronoun) => (
                    <ListBoxItem className="hover:bg-purple rounded-md p-1" key={pronoun} id={pronoun}>{pronoun}</ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
            </Select>
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="email">Current Email</label>
            <input type="email" name="email" disabled value={appCtx.user.email || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="newEmail">New Email</label>
            <input type="email" placeholder="What is your new email?" name="newEmail" onChange={(e) => setNewEmail(e.target.value)} value={newEmail || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="confirmEmail">Confirm New Email</label>
            <input type="email" placeholder="Confirm new email" name="confirmEmail" onChange={(e) => setConfirmEmail(e.target.value)} value={confirmEmail || ""} />
          </div>

          <div className="text-red-600">
            {emailError}
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" placeholder="What is your new password?" name="newPassword" onChange={(e) => setNewPwd(e.target.value)} value={newPwd || ""} />
          </div>

          <div className="gap-2 flex flex-col">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" name="confirmPassword" onChange={(e) => setConfirmPwd(e.target.value)} value={confirmPwd || ""} />
          </div>

          <div className="text-red-600">
            {pwdError}
          </div>

          <button className="update-goal-btn hover:scale-95" type="submit">Save Changes</button>

          <div classname="changesSaved"></div>

          <div className="text-red-600">
            {submitError}
          </div>
        </form>
      )}
    </div>
  )
}
