import targetImage from '../image/pic1.png'
import AiImage from '../image/pic2.png'
import HealthyImage from '../image/pic3.png'
import MembershipImage from '../image/pic4.png'

export default function HomePage() {

  async function seedDatabase() {
    const seedData = [
      {
        name: "Social",
        goals: []
      },
      {
        name: "Travel",
        goals: []
      },
      {
        name: "Entertainment",
        goals: []
      },
      {
        name: "Skill",
        goals: []
      },
      {
        name: "Misc.",
        goals: []
      }
    ]

    for (var i = 0; i < seedData.length; i++) {
      try {
        await fetch('/api/categories', {
          method: 'POST',
          body: JSON.stringify(seedData[i]),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      catch (err) {
        console.log(err.message)
      }

    }
  }

  return (
    <>
      <h1 className='about app'>About This App</h1>
      <div>Want to accomplish things but don't know how to begin? Start here! Generate goals and with a little help from AI.
        <div className="benefits">
          <section className="AI" >
            <h3>AI Assistance</h3>
            <p>
              With the assistance of an all-knowing AI you don't have to plan out anything to determine
              the steps to achieve your goals.
            </p>
          </section>
          <section className="goals">
            <h3>Importance of Achieving Goals</h3>
            <p>
              We believed that achieving your goals is vital to human-being overall health. Achieving your
              goals can have major impact on one's mental, emotional and physical state so we have come
              with a solution that we believed will provide significant support to those that are in need of assistance in achieving their goals.
            </p>
          </section>
          <section className="membership">
            <h3>Membership</h3>
            <p>
              We are a non-profit organization therefore signing up for membership is totally free. We truly have a strong desire to assist people who are in need to achieve their goals.
            </p>
          </section>
        </div>
        <div className="benefits images">
          <img src={AiImage} className="AiImage" alt="AiImage" />
          <img src={HealthyImage} className="HealthyImage" alt="HealthyImage" />
          <img src={MembershipImage} className="MembershipImage" alt="MembershipImage" />
        </div>
      </div>
      <img src={targetImage} className="targetImage" alt="targetImage" />
      <h2 className='video'>Walkthrough .gif/video goes here</h2>
      <button type="button" onClick={seedDatabase}>Run Category Seed</button>
    </>
  )
}
