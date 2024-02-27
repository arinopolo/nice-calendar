/* eslint-disable react/prop-types */
import EditInput from "./EditInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPenToSquare,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./TasksList.css";

const TasksList = ({
  tasks,
  handleDeleteClick,
  handleCompletedTask,
  enterInEditingMode,
  updatedDescription,
  setUpdatedDescription,
  updateTask,
}) => {
  return (
    <>
      {tasks && tasks.length > 0 && (
        <ul>
          {tasks.map((task, index) => {
            return (
              <React.Fragment key={index}>
                {task.editing === true ? (
                  <EditInput
                    task={task}
                    updatedDescription={updatedDescription}
                    setUpdatedDescription={setUpdatedDescription}
                    updateTask={updateTask}
                  />
                ) : (
                  <li key={index} className={task.completed ? "completed" : ""}>
                    {" "}
                    <div>
                      <div
                        className="flex-and-gap cursor"
                        onClick={() => {
                          handleCompletedTask(task);
                        }}
                      >
                        <FontAwesomeIcon
                          className={" cursor icon"}
                          icon={faCircleDot}
                        />

                        {task.description}
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className="cursor "
                        icon={faPenToSquare}
                        onClick={() => {
                          enterInEditingMode(task);
                        }}
                      />

                      <FontAwesomeIcon
                        className="cursor "
                        icon={faXmark}
                        onClick={() => {
                          handleDeleteClick(task);
                        }}
                      />
                    </div>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default TasksList;
