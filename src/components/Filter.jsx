/* eslint-disable react/prop-types */
import "../components/Filter.css";

const Filter = ({ filterDate, getDateOffset, getMonthOffset, isSelected }) => {
  const dateOffsets = [-2, -1, 0, 1, 2, 3];
  return (
    <ul className="dates">
      {dateOffsets.map((offset) => (
        <li
          key={offset}
          onClick={() => filterDate(getDateOffset(offset))}
          className={
            isSelected &&
            isSelected.getDate() === getDateOffset(offset).getDate()
              ? "selected"
              : ""
          }
        >
          <span className="date-number">{getDateOffset(offset).getDate()}</span>
          <span>{getMonthOffset(getDateOffset(offset))}</span>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
