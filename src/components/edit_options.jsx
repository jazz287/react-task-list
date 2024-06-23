function EditOptions({ task, onCancel, onSave }) {
  return (
    <div>
      <button onClick={onCancel}>Cancel</button>
      &emsp;
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default EditOptions;
