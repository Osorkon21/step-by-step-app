import targetImage from '../image/pic1.png'
import AiImage from '../image/pic2.png'
import HealthyImage from '../image/pic3.png'
import MembershipImage from '../image/pic4.png'

export default function HomePage() {

  return (
    <div className='body homepage'>
      <div className='about'>
        <h1>Step-By-Step</h1>
        <p className='slogan'><strong> Your Dreams & Aspirations Start Here!</strong></p>

      </div>
      <div className='header-dreams'> 
        <div className='image-container' >
          <img src={targetImage} className="targetImage" alt="targetImage" />
        </div>
        <div className="benefits">
          <h2>How <strong>Step-By-Step</strong> Can Help You</h2>
          <section className="AI" >
            <h3>AI Assistance</h3>
            <img src={AiImage} className="AiImage" alt="AiImage" />
            <p>
              With the assistance AI, you don't have to know the steps to achieve your goals.
            </p>
          </section>
          <section className="goals">
            <h3>Importance of Achieving Goals</h3>
            <img src={HealthyImage} className="HealthyImage" alt="HealthyImage" />
            <p>
              We believed that achieving your goals is vital to human-being overall health. Achieving your
              goals can have major impact on one's mental, emotional and physical state so we have come
              with a solution that we believed will provide significant support to those that are in need of assistance in achieving their goals.
            </p>
          </section>
          <section className="membership">
            <h3>Membership</h3>
            <img src={MembershipImage} className="MembershipImage" alt="MembershipImage" />
            <p>
              We are a non-profit organization therefore signing up for membership is totally free. We truly have a strong desire to assist people who are in need to achieve their goals.
            </p>
          </section>
        </div>
      </div>
      
    </div>
  )
}
