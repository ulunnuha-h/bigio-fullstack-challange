const toggleActionMenu = (id) => {
  const menu = document.getElementById(`menu-${id}`);
  menu.style.display = menu.style.display == "block" ? "none" : "block";
};

export default toggleActionMenu;
