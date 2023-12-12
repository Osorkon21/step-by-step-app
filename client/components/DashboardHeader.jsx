export default function DashboardHeader({ setInProgress }) {

  return (
    <>
      <div>
        <button type="button" onClick={() => setInProgress(true)}>In Progress Goals</button>
        <button type="button" onClick={() => setInProgress(false)}>Completed Goals</button>
      </div>
    </>
  );
}
