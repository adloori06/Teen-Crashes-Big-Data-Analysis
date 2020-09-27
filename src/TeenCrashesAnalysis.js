// Google Apps Script - Show Teen Driver Statistics and fatal crashes by State
// Program shows how to create a merged data tab from two separate Google sheet tabs
// shows data manipulation - Converts input ‘string’ data to numbers with decimals 
// shows math calculations - Calculates minimum/maximum Teen Fatalities from data set
// Oval shows Algorithms, Solid Rectangle shows abstraction, and                    
// Dashed rectangle*  solves complexity by reusing the same function multiple times
// Author: Shashank Adloori

function TeenStatsFunction() {

  //declare variables section
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Min Age by State");  //Obtains Spreadsheet for minimum age requirements

  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Teen Crashes");  //Obtains Spreadsheet for teen crashes

  var ss_new = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Merged");  //Obtains Spreadsheet for merged spreadsheets

  var colindex = columnIndex("State","Min Age by State");  //Getting the states from the  minimum age requirements spreadsheet
  var numRows = ss.getLastRow() -1;  //Obtaining the last row of the states
  var colValues = ss.getRange(3, colindex, numRows, 1).getValues() //Sequentially going through each state, and saves the values
      Logger.log(colValues) //print to debug

  var colindex1 = columnIndex("Minimum Age for Restricted License","Min Age by State");  //Gets the Minimum Age Column from the spreadsheet

  var colindex2 = columnIndex("Total Fatalities","Teen Crashes");  //Gets the number of teen crashes column from the spreadsheet
  
  var colValues1 = ss.getRange(3, colindex1, numRows, 1).getValues()  //Sequentially going through each state, and saves the values
  var colValues2 = ss2.getRange(3, colindex2, numRows, 1).getValues() //Sequentially going through each state, and saves the values

  var maxcrash = getmaxval("Teen Crashes",colindex2);
      Logger.log(maxcrash);

  var mincrash = getminval("Teen Crashes",colindex2);
      Logger.log(mincrash);

   //Set and fill the header row for the merged sheet
   ss_new.getRange(1,1).setValue("STATE");   //Setting header for each column 
   ss_new.getRange(1,2).setValue("MIN AGE IN STRING");
   ss_new.getRange(1,3).setValue("MIN AGE CONV TO NUM");
   ss_new.getRange(1,4).setValue("TEEN FATALITIES");
   ss_new.getRange(1,5).setValue("MAX CRASH VAL");
   ss_new.getRange(1,6).setValue("MIN CRASH VAL");

   //Now print the MAX and MIN number of crashes 
   ss_new.getRange(3,5).setValue(maxcrash);
   ss_new.getRange(3,6).setValue(mincrash);
 
 //Loop to print the values from two google sheets into the merged sheet 
 for (var i=3;i<numRows+2;i++){  
   var val1 = ss.getRange(i, colindex1).getValue();
   var years = ConvertAge(val1);  //removing months converting into decimal
   var statename = ss.getRange(i, colindex).getValue();
   var val2 = ss2.getRange(i, colindex2).getValue();
   // Logger.log(statename)  //print to debug
   
   ss_new.getRange(i,1).setValue(statename);   
   ss_new.getRange(i,2).setValue(val1);
   ss_new.getRange(i,3).setValue(years);
   ss_new.getRange(i,4).setValue(val2);
  }
}

//function to convert Age from String to Decimal format
  function ConvertAge(label){        //Uses min age requirements as parameter 
    var spltext = label.split(' ');  //Splits the String using blank as a separator
    var age = Number(spltext[0]);    //Obtains the years in whole numbers

    if(spltext[2]!= null){            //if there is months then converts into decimal
      var months = Number(spltext[2]/12); //divide months by 12 to get decimal format
      var newage = age + months;  //Adds the years with the months to create a number
      // Logger.log(spltext[2])
      Logger.log(newage)
      return(newage);                    //returns values
    } else {    
      Logger.log(age)
      return(age);
    }
  }


//function to get the column index inside a sheet
function columnIndex(label,sheetName){
 var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
 var lc = ss.getLastColumn();
 var lookupRangeValues = ss.getRange(2, 1, 1, lc).getValues()[0];
 var index = lookupRangeValues.indexOf(label) + 1
 return(index);

}

 //function to get max value from a given column of values
    function getmaxval(sheetName,colindex){
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var numRows = ss.getLastRow() -1;
    var max1 = 0;
    for(var i=3; i<numRows; i++) {      //loop through each row to get the max value
     val2 = ss.getRange(i, colindex).getValue();    //get actual value from the cell
     max1 = Math.max(max1, val2);       //use the MATH function to get the max value
  //   Logger.log(max1);
 }
  return(max1)                                 // return the max value
}

   //function to get min value from a given column of values
   function getminval(sheetName,colindex){
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var numRows = ss.getLastRow() -1;
    var min1 = 1000000;

  for(var i=3; i<numRows; i++) {          loop through each row to get the min value
    val2 = ss.getRange(i, colindex).getValue(); //get the actual value from the cell
    min1 = Math.min(min1, val2);        //use the MATH function to get the min value
    // Logger.log(min1);
  }
  return(min1)                               // return the min value
 }
