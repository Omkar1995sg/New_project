
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const roll = data.roll;
  const lat = data.latitude;
  const lng = data.longitude;
  const timestamp = new Date();
  const email = Session.getActiveUser().getEmail();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dateStr = Utilities.formatDate(timestamp, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");

  const formSheet = ss.getSheetByName("form_responses") || ss.insertSheet("form_responses");
  const dateSheet = ss.getSheetByName(dateStr) || ss.insertSheet(dateStr);

  // Check for duplicate Gmail in today's sheet
  const existingEmails = dateSheet.getRange(2, 2, dateSheet.getLastRow() - 1, 1).getValues().flat();
  if (existingEmails.includes(email)) {
    return ContentService.createTextOutput("Duplicate entry for this Gmail");
  }

  const row = [timestamp, email, roll, lat, lng];
  formSheet.appendRow(row);
  dateSheet.appendRow(row);

  return ContentService.createTextOutput("Submitted successfully");
}
