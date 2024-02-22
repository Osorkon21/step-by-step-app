export default function ConfirmDelete({ target, idToDel, deleteFunc }) {
  return (
    <div className="flex flex-col items-center bg-middle p-4 rounded-lg border-2 border-purple">
      <p>Delete this {target}?</p>

      <button className="hover:bg-purple" type="submit" onClick={(e) => deleteFunc(idToDel)}>Confirm</button>
    </div>
  );
}
