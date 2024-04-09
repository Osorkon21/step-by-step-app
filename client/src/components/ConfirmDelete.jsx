export default function ConfirmDelete({ target, idToDel, deleteFunc }) {
  return (
    <div className="confirmDelete flex flex-col items-center bg-middle p-4 rounded-lg border-2 border-purple poppins">
      <p>Delete this {target}?</p>

      <button className="hover:bg-purple hover:text-white p-1 mt-2 bg-middleblur border-2 border-purple" id="confirm-del-btn" type="submit" onClick={(e) => deleteFunc(idToDel)}>Confirm</button>
    </div>
  );
}
