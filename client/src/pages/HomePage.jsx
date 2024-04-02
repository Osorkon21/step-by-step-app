import { AddGoal } from '../components'
import { Dashboard } from "../pages"
import { useAppCtx } from "../utils/AppProvider"

export default function HomePage() {
  const appCtx = useAppCtx();

  return (
    <>
      {appCtx.user?._id ?
        <Dashboard />
        :
        <div className='homePage body text-purple'>
          <div className='mt-40 flex flex-col text-center justify-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl'>Achieve your goals</h1>
            <h2 className='text-3xl md:text-4xl lg:text-5xl'>one step at a time.</h2>
          </div>

          <h3 className='mt-12'>Try it out!</h3>
          <AddGoal className="mt-2" />
        </div>
      }
    </>
  )
}
