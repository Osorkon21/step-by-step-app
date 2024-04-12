import { useAppCtx } from "../utils/AppProvider";

export default function HelloUser() {
  const appCtx = useAppCtx();

  return (
    <div className="helloUser hello-username pl-8 hidden sm:flex justify-end text-middle pr-12">
      {appCtx.user?.username ? (
        <span>
          Hello <span className="username-style">{appCtx.user.username}</span>
        </span>
      ) : null}
    </div>
  );
}
