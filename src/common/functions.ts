export const formatLastChatActivityDate = (date: string) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (date === "None") return "";

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayStr = mm + "/" + dd + "/" + yyyy;

  const messageDate = new Date(date);
  const messageDay = String(messageDate.getDate()).padStart(2, "0");
  const messageMonth = String(messageDate.getMonth() + 1).padStart(2, "0");
  const messageYear = messageDate.getFullYear();
  const messageDateStr = messageMonth + "/" + messageDay + "/" + messageYear;

  let formattedChatDate = "";
  // If last message in chat date is equal with today's date -> chat date should be hh:mm
  if (todayStr === messageDateStr)
    formattedChatDate =
      String(messageDate.getHours()).padStart(2, "0") +
      ":" +
      String(messageDate.getMinutes()).padStart(2, "0");
  else {
    // If last message in chat was sent in this year -> chat date should be dd:mm (like Nov 25)
    if (yyyy === messageYear)
      formattedChatDate = monthNames[messageDate.getMonth()] + " " + messageDay;
    // If last message in chat was sent in another year -> chat date should be dd:mm:yyyy (like 25 Nov 2013)
    else
      formattedChatDate = messageDay + "." + messageMonth + "." + messageYear;
  }
  return formattedChatDate;
};

export const checkUserSawChat = (messageDate: string, userSawDate: string) => {
  const messageDateObj = new Date(messageDate);
  const userSawDateObj = new Date(userSawDate);

  if (messageDateObj.getTime() === userSawDateObj.getTime()) return false;
  if (messageDateObj < userSawDateObj) return false;
  if (messageDateObj > userSawDateObj) return true;
  return false;
};

export const getUserIsOnline = (lastActivityDate: string) => {
  const timeDifferenceMinutes = Math.floor(
    Math.abs(new Date().getTime() - new Date(lastActivityDate).getTime()) /
      60000
  );
  const activityLimit = 2000;
  if (timeDifferenceMinutes <= activityLimit) return true;
  else return false;
};
