const excel_file = document.getElementById('excel_file');

excel_file.addEventListener('change', (event) => {

      if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
            document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

            excel_file.value = '';

            return false;
      }

      var reader = new FileReader();

      reader.readAsArrayBuffer(event.target.files[0]);

      reader.onload = function (event) {

            var data = new Uint8Array(reader.result);

            var work_book = XLSX.read(data, { type: 'array' });

            var sheet_name = work_book.SheetNames;

            var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });

            if (sheet_data.length > 0) {
                  var table_output = '<table class="listViewTable table-sortable" id="listViewTable">';

                  for (var row = 0; row < sheet_data.length; row++) {

                        table_output += '<tr class="row">';

                        for (var cell = 0; cell < sheet_data[row].length; cell++) {

                              if (row == 0) {

                                    table_output += '<th class="row' + '-cell' + cell + '">' + sheet_data[row][cell] + '</th>';

                              } else {

                                    table_output += '<td class="row' + '-cell' + cell + '">' + sheet_data[row][cell] + '</td>';

                              }

                        }

                        table_output += '</tr>';

                  }

                  table_output += '</table>';

                  document.getElementById('excel_data').innerHTML = table_output;
            }

            excel_file.value = '';

      }

});



// Second way

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title>Excel to HTML Table | Javacodepoint</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.min.js"></script>    
  </head>
  <body>
    <h1>Upload an excel file to display in HTML Table</h1>
    <!-- Input element to upload an excel file -->
    <input type="file" id="file_upload" />
    <button onclick="upload()">Upload</button>  
    <br>
    <br>
    <!-- table to display the excel data -->
    <table id="display_excel_data" border="1"></table>
    <script>
     
      // Method to upload a valid excel file
      function upload() {
        var files = document.getElementById('file_upload').files;
        if(files.length==0){
          alert("Please choose any file...");
          return;
        }
        var filename = files[0].name;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension == '.XLS' || extension == '.XLSX') {
            //Here calling another method to read excel file into json
            excelFileToJSON(files[0]);
        }else{
            alert("Please select a valid excel file.");
        }
      }
       
      //Method to read excel file and convert it into JSON 
      function excelFileToJSON(file){
          try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
 
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type : 'binary'
                });
                var result = {};
                var firstSheetName = workbook.SheetNames[0];
                //reading only first sheet data
                var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
                //displaying the json result into HTML table
                displayJsonToHtmlTable(jsonData);
                }
            }catch(e){
                console.error(e);
            }
      }
       
      //Method to display the data in HTML Table
      function displayJsonToHtmlTable(jsonData){
        var table=document.getElementById("display_excel_data");
        if(jsonData.length>0){
            var htmlData='<tr><th>Student Name</th><th>Address</th><th>Email ID</th><th>Age</th></tr>';
            for(var i=0;i<jsonData.length;i++){
                var row=jsonData[i];
                htmlData+='<tr><td>'+row["Student Name"]+'</td><td>'+row["Address"]
                      +'</td><td>'+row["Email ID"]+'</td><td>'+row["Age"]+'</td></tr>';
            }
            table.innerHTML=htmlData;
        }else{
            table.innerHTML='There is no data in Excel';
        }
      }
    </script>
  </body>
</html>
