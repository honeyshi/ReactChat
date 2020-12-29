import { DateTime } from "luxon";

export const formatLastChatActivityDate = (date: string) => {
  if (date === "None") return "";

  let formattedChatDate = "";
  // If last message in chat date is equal with today's date -> chat date should be hh:mm
  if (
    DateTime.local().toLocaleString() ===
    DateTime.fromHTTP(date).toLocaleString()
  )
    formattedChatDate = DateTime.fromHTTP(date).toLocaleString(
      DateTime.TIME_24_SIMPLE
    );
  else {
    // If last message in chat was sent in this year -> chat date should be dd:mm (like Nov 25)
    if (
      DateTime.local().toFormat("yyyy") ===
      DateTime.fromHTTP(date).toFormat("yyyy")
    )
      formattedChatDate = DateTime.fromHTTP(date).toFormat("MMM d");
    // If last message in chat was sent in another year -> chat date should be dd:mm:yyyy (like 25.11.2013)
    else
      formattedChatDate = DateTime.fromHTTP(date).toLocaleString(
        DateTime.DATE_SHORT
      );
  }
  return formattedChatDate;
};

export const formatMessageDate = (date: string) => {
  if (date === "None") return "";

  let formattedMessageDate = "";
  // If message date is equal with today's date -> date should be hh:mm
  if (
    DateTime.local().toLocaleString() ===
    DateTime.fromHTTP(date).toLocaleString()
  )
    formattedMessageDate = DateTime.fromHTTP(date).toLocaleString(
      DateTime.TIME_24_SIMPLE
    );
  else {
    // If message date is in this year -> message date should be dd:mm hh:mm (like Nov 25 10:15)
    if (
      DateTime.local().toFormat("yyyy") ===
      DateTime.fromHTTP(date).toFormat("yyyy")
    )
      formattedMessageDate = DateTime.fromHTTP(date).toFormat("MMM d T");
    // If message date is in another year -> message date should be dd:mm:yyyy hh:mm (like 25.12.2013 10:15)
    else
      formattedMessageDate = DateTime.fromHTTP(date).toLocaleString(
        DateTime.DATETIME_SHORT
      );
  }
  return formattedMessageDate;
};
