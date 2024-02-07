export default function ConfirmDelete({ target, idToDel, deleteFunc }) {
  return (
    <div className="grid items-center">
      <p>Delete this {target}?</p>

      <button type="submit" onClick={(e) => deleteFunc(idToDel)}>Confirm</button>
    </div>
  );
}
