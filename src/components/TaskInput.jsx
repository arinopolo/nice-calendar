/* eslint-disable react/prop-types */
import "./TaskInput.css";

const TaskInput = ({ addTask, description, setDescription }) => {
  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form onSubmit={(e) => addTask(e, description)}>
      <input
        className="input-text"
        type="text"
        placeholder="What do we have for today?"
        value={description}
        onChange={handleOnChange}
      />
      <button className="container" type="submit">
        <div className="circle">
          <span>+</span>
        </div>
      </button>
    </form>
  );
};

export default TaskInput;
