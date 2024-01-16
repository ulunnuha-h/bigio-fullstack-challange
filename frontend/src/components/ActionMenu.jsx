const ActionMenu = ({ id, name = [], action = [] }) => {
  return (
    <ul className="absolute text-sm hidden border" id={`menu-${id}`}>
      {name.map((val, idx) => (
        <li
          className="border-1 bg-gray-400 w-full px-4 py-1 cursor-pointer border-gray-950 hover:bg-gray-500"
          onClick={action[idx]}
          key={idx}
        >
          {val}
        </li>
      ))}
    </ul>
  );
};

export default ActionMenu;
