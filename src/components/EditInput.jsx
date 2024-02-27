/* eslint-disable react/prop-types */
import "./EditInput.css";

const EditInput = ({
  task,
  updatedDescription,
  setUpdatedDescription,
  updateTask,
}) => {
  const handleOnChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  return (
    <form onSubmit={(e) => updateTask(e, task)} className="edit-form">
      <input
        type="text"
        value={updatedDescription}
        className="edit-input-text"
        onChange={handleOnChange}
      />

      <input type="submit" value="Save me" className="edit-input-btn" />
    </form>
  );
};

export default EditInput;
