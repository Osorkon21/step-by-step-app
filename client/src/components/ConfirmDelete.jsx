export default function ConfirmDelete({ target, idToDel, deleteFunc }) {
  return (
    <div className="flex flex-col items-center bg-middle p-4 rounded-lg border-2 border-purple poppins">
      <p>Delete this {target}?</p>

      <button className="hover:bg-purple hover:scale-95 p-1 bg-middleblur border-2 border-purple" id="confirm-del-btn" type="submit" onClick={(e) => deleteFunc(idToDel)}>Confirm</button>
    </div>
  );
}
