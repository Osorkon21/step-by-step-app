// import { useAppCtx } from "../utils/AppProvider"

// export default function HelloUser() {
//   const appCtx = useAppCtx();

//   return (
//     <div className="hello-username p-4">
//       {appCtx.user?.username && "Hello " + appCtx.user.username + "!"}
//     </div>
//   )
// }

import { useAppCtx } from "../utils/AppProvider";

export default function HelloUser() {
  const appCtx = useAppCtx();

  return (
    <div className="hello-username p-4">
      {appCtx.user?.username ? (
        <span>
          Hello <span className="username-style">{appCtx.user.username}</span>
        </span>
      ) : null}
    </div>
  );
}
