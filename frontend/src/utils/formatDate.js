const formateDate = (input) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(input);
  return (
    date.getDay() + " " + months[date.getMonth()] + " " + date.getFullYear()
  );
};

export default formateDate;
