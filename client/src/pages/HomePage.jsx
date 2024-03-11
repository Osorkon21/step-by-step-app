import AddGoal from './AddGoal'

export default function HomePage() {

  return (
    <>
      <div className='maintext'>
        <h1>Achieve your goals</h1>
        <h2>one step at a time.</h2>
        <h3>Try it out!</h3>
      </div>

      <div className='homegoal'>
        <AddGoal />
      </div>
    </>
  )
}
