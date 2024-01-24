import { useAppCtx } from "../utils/AppProvider"

export default function HelloUser() {
  const appCtx = useAppCtx();

  return (
    <div className="hello-username">
      {appCtx.user?.username && "Hello " + appCtx.user.username + "!"}
    </div>
  )
}