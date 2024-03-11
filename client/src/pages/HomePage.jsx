import targetImage from '../../image/pic1.png'
import AiImage from '../../image/pic2.png'
import HealthyImage from '../../image/pic3.png'
import MembershipImage from '../../image/pic4.png'
import AddGoal from './AddGoal'
import ForgotPassword from '../components/ForgotPassword'
import ChangePassword from '../components/ChangePassword'

// C:\Users\kurtw\bootcamp\homework\group-project-3\step-by-step-app\client\image\pic4.png
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
