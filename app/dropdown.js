/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
/* https://www.w3schools.com/howto/howto_js_filter_dropdown.asp */
function FilterCategory() {
    document.getElementById("dropdownCategory").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("inputCategory");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownCategory");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function FilterYear() {
    document.getElementById("dropdownYear").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("inputYear");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownYear");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function Sort() {
    document.getElementById("dropdownSort").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("inputSort");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownSort");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
   