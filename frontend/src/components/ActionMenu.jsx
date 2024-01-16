const ActionMenu = ({ id, name = [], action = [] }) => {
  return (
    <ul className="absolute text-sm hidden" id={`menu-${id}`}>
      {name.map((val, idx) => (
        <li
          className="border-1 bg-gray-400 w-full px-4 py-1"
          onClick={action[idx]}
        >
          {val}
        </li>
      ))}
    </ul>
  );
};

export default ActionMenu;
