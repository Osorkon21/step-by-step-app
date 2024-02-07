import targetImage from '../../image/pic1.png'
import AiImage from '../../image/pic2.png'
import HealthyImage from '../../image/pic3.png'
import MembershipImage from '../../image/pic4.png'

import ForgotPassword from '../components/ForgotPassword'
import ChangePassword from '../components/ChangePassword'

// C:\Users\kurtw\bootcamp\homework\group-project-3\step-by-step-app\client\image\pic4.png
export default function HomePage() {

  return (

    <>

      <ForgotPassword />

      <ChangePassword />


      <div className='body'>
        <div className='home flex flex-col items-center justify center'>
          <div className='about'>
            <h1>Step-By-Step</h1>
            <p className='slogan'><strong> Your Dreams & Aspirations Start Here!</strong></p>
          </div>
          <div className=''>
            <div className='image-container' >
              <img src={targetImage} className="targetImage" alt="targetImage" />
            </div>
            <div className="benefits flex flex-col justify-center gap-12">
              <h2>How <strong>Step-By-Step</strong> Can Help You</h2>
              <section className="AI items-center flex flex-col" >
                <h3 className='w-full'>AI Assistance</h3>
                <img src={AiImage} className="home-img" alt="AiImage" />
                <p>
                  With the assistance AI, you don't have to know the steps to achieve your goals.
                </p>
              </section>
              <section className=" items-center flex flex-col">
                <h3 className='w-full'>Importance of Achieving Goals</h3>
                <img src={HealthyImage} className="home-img" alt="HealthyImage" />
                <p>
                  We believed that achieving your goals is vital to human-being overall health. Achieving your
                  goals can have major impact on one's mental, emotional and physical state so we have come
                  with a solution that we believed will provide significant support to those that are in need of assistance in achieving their goals.
                </p>
              </section>
              <section className="items-center flex flex-col ">
                <h3 className='w-full'>Membership</h3>
                <img src={MembershipImage} className="home-img" alt="MembershipImage" />
                <p>
                  We are a non-profit organization therefore signing up for membership is totally free. We truly have a strong desire to assist people who are in need to achieve their goals.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
