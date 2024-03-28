import AddGoal from '../components/AddGoal'

export default function HomePage() {

  return (
    <div className='body text-purple'>
      <div className='mt-40 flex flex-col text-center justify-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl poppins'>Achieve your goals</h1>
        <h2 className='text-3xl md:text-4xl lg:text-5xl poppins'>one step at a time.</h2>
      </div>


      <h3 className='mt-12 poppins'>Try it out!</h3>
      <AddGoal className="mt-2" />
    </div>
  )
}
