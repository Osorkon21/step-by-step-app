export default function Dashboard() {

  function onButtonClick(e) {
    window.location.href = "/completedgoals";
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>In Progress User goals go here?</p>
      <button onClick={onButtonClick}>See Completed Goals</button>
    </>
  )
}
