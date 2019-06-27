// Google Apps Script to email a single sheet as PDF
// Primary Function SendReportPDF = Generate and send PDF from a single Google sheet. Build the email body, recipiant list & subject.
// Secondary = Add the Primary function to the Google Sheets Menu. 

//----------------------------------------------------------------------------------------\\

// Secondary
// Add a menu option in the Google Sheets GUID called "Reports" with a submenu item called "Send Status"
// When you click on "Send Status" it will run the Primary function SendReportPDF
function onOpen(e) {
    var submenu = [{ name: "Fix Report", functionName: "SendReportPDF" }];
    var submenu = [{ name: "Send Status", functionName: "SendReportPDF" }];
    SpreadsheetApp.getActiveSpreadsheet().addMenu('Reports', submenu);
}

//----------------------------------------------------------------------------------------\\
// Primary
// Generating a PDF attachment of the report sheet to be sent within a Gmail message.
// Defining the recipients, subject based on the contents of the Google Spreadsheet
// Defining the body of the message from a HTML file

function SendReportPDF() {    
    // Defining the source spreadsheet
    var SourceSpreadsheet = SpreadsheetApp.getActive();

    // Get recipients details from a cell within the speadsheet
    var recipients = SourceSpreadsheet.getRange("Recipiants!A1").getValues();

    // Defining todays date in ISO format
    var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");
    // Defining the report name from a cell witin the speadsheet
    var title = SourceSpreadsheet.getRange("Report!A1").getValues();
    // Constructing the Subject Line of the email
    var subject = title + " " + date;


    // Getting the body of the email you wish to send from another file called 'Message.html' You can create this within the script editor. 
    var htmlOutput = HtmlService.createHtmlOutputFromFile('Message'); // Message is the name of the HTML file
    var message = htmlOutput.getContent()

    // Getting info from the report to be used in the message body - OPTIONAL
    var MessageBody1 = SourceSpreadsheet.getRange("Report!B1").getValues(); //Gets the info from the report
    message = message.replace("%MessageBody1", MessageBody1); // Replaces '%MessageBody1' with the information form the report. 

    //To generate the PDF we first need to hide all the tabs we don't want to be included within the PDF.
    // Getting all of the sheets within the SourceSheet
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

    // Hiding the sheets we don't want within the PDF report. Our report is within the first position which is [0]
    sheets[1].hideSheet();
    sheets[2].hideSheet();
    sheets[3].hideSheet();
    sheets[4].hideSheet();

    // Generating the PDF
    var pdf = DriveApp.getFileById(SourceSpreadsheet.getId()).getAs('application/pdf').getBytes();
    var attach = { fileName: subject, content: pdf, mimeType: 'application/pdf' };

    // Unhiding the sheets so the spreadsheet can be used like normal
    sheets[1].showSheet();
    sheets[2].showSheet();
    sheets[3].showSheet();
    sheets[4].showSheet();

    // Seding the report email
    GmailApp.sendEmail(recipients, subject, message, { attachments: [attach] });

}