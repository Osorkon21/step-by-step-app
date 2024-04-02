import AddGoal from "../components/AddGoal";

export default function Newgoal() {
  return (
    <div className='newGoal body mt-24 text-purple'>
      <h1 className="text-5xl md:text-6xl my-8">New Goal</h1>
      <AddGoal className="mt-1" />
    </div>
  )
}
