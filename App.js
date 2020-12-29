btnref = document.querySelector("#check");
outputref = document.querySelector("#output");

var output2ref = document.querySelector("#output2");
var output1ref = document.querySelector("#output1");




btnref.addEventListener("click",clickhandler);


function clickhandler() {

     var inputdate = document.getElementById("dateip").value;

     var [year , month , day] = inputdate.toString().split('-');
     console.log(year,month,day);

     var ndate = false;
     if (year === ' ' || month === '' || day === '') {
          alert("Invalid/Empty ");

     }else{
          var palinResult = checkPalinInAllCombinations(year, month , day , ndate);

     }
     if (palinResult == false){
          ndate=true;
          var user_ip_date = new Date(inputdate);
          var next_dt = new Date(user_ip_date);
          var check_n_palin = false;

          output2ref.innerText = "Sorry your birthday is not a Palindrome!\n";

          while(check_n_palin == false){
               next_dt.setDate(next_dt.getDate() + 1);
               console.log(next_dt);
               var n_year = next_dt.getFullYear();
               var n_month = next_dt.getMonth() + 1;
               var n_day = next_dt.getDate();
               console.log("n_year:" + n_year + "n_month:" + n_month + "n_day" + n_day);
               check_n_palin = checkPalinInAllCombinations(n_year, n_month , n_day ,ndate);


          }
          var diff_birthdate_nextdt = calculateDifference(user_ip_date,next_dt);
          output1ref.innerText = " Your Birthdate is " + diff_birthdate_nextdt+ " days away from the next palindrome date. ";
          
     }
}


 function mytimeoutfunction(){
      console.log("Appeared after timeout");
 }


 function checkPalindrome(date,dateReveresed){
      if(date === dateReveresed){
           return true;
      }else return false;
     
      }
 
      function reveresedDate(date){
           date = date.split('');
           date = date.reverse();
           date = date.join('');
           return date;

      }


      function checkPalinInAllCombinations(year,month,day,ndate){
          var datepatterns = [(year.toString() + month.toString() + day.toString()), (year.toString() + day.toString() + month.toString()), (month.toString() + day.toString() + year.toString()), (month.toString() + year.toString() + day.toString()), (day.toString() + month.toString() + year.toString()), (day.toString() + year.toString() + month.toString())]
           console.log("datepatterns: " + datepatterns);

           var nameOfPatterns = ["yyyy-mm-dd" , "yyyy-dd-mm" , "mm-dd-yyyy","mm-yyyy-dd","dd-mm-yyyy","dd-yyyy-mm"];
           var displayPatterns = [(year + "-" + month + "-" + day), (year + "-" + day + "-" + month), (month + "-" + day + "-" + year), (month + "-" + year + "-" + day), (day + "-" + month + "-" + year), (day + "-" + year + "-" + month)];
           var flag = 0;
           for (var i = 0; i < datepatterns.length; i++) {
               var reveresed_date = reveresedDate(datepatterns[i]);
               var display_reveresedDate = reveresedDate(displayPatterns[i]);
               var palindromeResult = checkPalindrome(datepatterns[i], reveresed_date);
               
               if (palindromeResult == true &&flag == 0){
                    if (ndate == false){
                         outputref.innerText = displayPatterns[i] + "=" + display_reveresedDate + "Yay!\n\nUsing the combination:" + nameOfPatterns[i] + " your Birthdate is proclaimed as Palindrome!\nFeel free to share this with your friends!";
                         flag += 1;
                    }else{
                         outputref.innerText = "Using the combination:" + nameOfPatterns[i] + "the next nearest date:" + displayPatterns[i]+"is Palindrome";
                         flag += 1;

                    }
               } else if (palindromeResult == true && flag > 0){
                    var para  = document.createElement("p");
                    if(ndate == false){
                         var data = "Next combination for which your Birthdate is Palindrome: " + nameOfPatterns[i] + "\n" + displayPatterns[i] + "=" + display_reveresedDate;
                    }else{
                         var data = "Next combination for which the nearest is Palindrome:" + nameOfPatterns[i]+"\n" + displayPatterns[i] + "=" + display_reveresedDate;;
                    }
                    para.innerText = data;
                    outputref.appendChild(para);
               }
        
           }
           if (flag == 0){
                return false;

           }else return true;
          }

          function calculateDifference(date1,date2){
               var one_day = 1000*60*60*24; 

             var date1_ms=date1.getTime();
             var date2_ms=date2.getTime();

             var ms_diff = date2_ms-date1_ms;

             var diff_days = Math.round(ms_diff/one_day);
             return diff_days;
 }
 
 