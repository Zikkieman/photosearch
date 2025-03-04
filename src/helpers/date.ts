const TomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const formattedDate = tomorrow.toLocaleDateString("en-US", options);
  return formattedDate.replace(/\d{1,2},/, "").trim();
};

export default TomorrowDate;
