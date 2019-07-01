// This script is used to pull the subject line (ONLY) from Gmail messages into sheets. 
// This is handy if you want to count of the amount of emails a set label/filter/search results receives or to gather data from the filter.

// Prerequisites
// 1. You will need to apply a label to the emails within Gmail. You can do this manually or apply a filter. Gmail Advanced search https://support.google.com/mail/answer/7190
// 2. You will need to create a spreadsheet using Google Sheets

// Set the items you are going to use within the script
var SHEET_ID = "PUT THE ID HERE"; // The ID of the sheet - You can get this from the URL
var SHEET_NAME = "PUT THE SHEET NAME HERE"; // The name of the sheet you wish the data to go into
var LABEL = "PUT THE LABEL NAME/FILTER/SEARCH HERE" // The Gmail label you wish to use 

// Generic Funtion 1 - To get the emails from Gmail based on the criteria set
function GetEmails_(q){
  var Emails = [];
  var Threads = GmailApp.search(q);
  for(var i in Threads){
    var Messages = Threads[i].getMessages();
    for(var j in Messages){
      Emails.push([Messages[j].getSubject().replace(/<.*?>/g, '\n').replace(/^\s*\n/gm, '').replace(/^\s*/gm, '').replace(/\s*\n/gm, '\n')]);
    }
  }
  return Emails;
}

// Generic Function 2 - To add the subject lines into sheets
function AddData_(sheet, EmailResults){
  sheet.getRange(sheet.geLastRow() + 1, 1, EmailResults.length, EmailResults[0].length).setValues(EmailResults); // You can set the range manually by changing "getRange" which follow the format getRange(ROW,COLUMNS,NUMROWS,NUMCOL)
  // More details are here https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow-column-numrows-numcolumns
}

// Primiary Function - Uses the generic functions above to get the emails subjects & add them to a specified sheet.  
function EmailSubjectToSheets(){
  var EmailResults = GetEmails_(LABEL);
  if(EmailResults) {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if(!sheet) sheet = ss.insertSheet(SHEET_NAME);
    AddData_(sheet, EmailResults);
  }
}