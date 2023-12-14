export default function DashboardHeader({ setInProgress }) {

  return (
    <div className="dashboard-header ">
      <h1>Dashboard</h1>
      <div className="tabs">
        <button className="dashboard-tab col " type="button" onClick={() => setInProgress(true)}>In Progress Goals</button>
        <button className="dashboard-tab col " type="button" onClick={() => setInProgress(false)}>Completed Goals</button>
      </div>
    </div>
  );
}
