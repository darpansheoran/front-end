// create a module (myApp); create controller(myController) & register controller with module.
var myApp = angular
  .module("myModule", [])
  .controller("myController", function ($scope, $filter) {
    // data
    $scope.employees = [
      {
        name: "Darpan",
        email: "darpansheoran@gmail.com",
        phone: "9050607050",
        gender: "male",
        age: "22",
        address: "1324 Main St.",
        dob: "1998-09-07",
        degrees: [
          {
            education: "High school",
            institute: "SVPS",
            startDate: new Date("2006-06-15"),
            endDate: new Date("2017-06-12"),
            marks: "89%",
          },
          {
            education: "Bachelor's degree",
            institute: "Chitkara University",
            startDate: new Date("2018-08-13"),
            endDate: new Date("2022-07-20"),
            marks: "9CGPA",
          },
        ],
      },
      {
        name: "Martin",
        email: "martin@patientbond.com",
        phone: 1234567890,
        gender: "male",
        age: 22,
        address: "1234 Main St.",
        dob: "1998-09-07",
      },
      {
        name: "Harry",
        email: "harry@hotmail.com",
        phone: 4576981245,
        gender: "male",
        age: 21,
        address: "1234 Main St.",
        dob: "1999-09-07",
      },
      {
        name: "Pat",
        email: "pat@hotmail.com",
        phone: 5483695124,
        gender: "male",
        age: 20,
        address: "1234 Main St.",
        dob: "2000-09-07",
      },
      {
        name: "Alex",
        email: "alex@hotmail.com",
        phone: 9863245781,
        gender: "male",
        age: 23,
        address: "1234 Main St.",
        dob: "1997-09-09",
      },
      {
        name: "Nora Smith",
        email: "nora@hotmail.com",
        phone: 7892453698,
        gender: "female",
        age: 22,
        address: "1234 Main St.",
        dob: "1998-09-07",
      },
      {
        name: "Joe",
        email: "joe@patientbond.com",
        phone: 6457847890,
        gender: "male",
        age: 32,
        address: "1234 Main St.",
        dob: "1988-09-07",
      },
      {
        name: "Phyllis",
        email: "phyllis@hotmail.com",
        phone: 7457893645,
        gender: "female",
        age: 42,
        address: "1234 Main St.",
        dob: "1978-09-07",
      },
      {
        name: "Chris",
        email: "chris@hotmail.com",
        phone: 5111115124,
        gender: "male",
        age: 28,
      },
      {
        name: "Dwight",
        email: "dwight@hotmail.com",
        phone: 9878457781,
        gender: "male",
        age: 29,
      },
      {
        name: "Emily",
        email: "emily@hotmail.com",
        phone: 7110003698,
        gender: "female",
        age: 20,
      },
      {
        name: "Abdul",
        email: "abdul@patientbond.com",
        phone: 1787877890,
        gender: "male",
        age: 35,
      },
      {
        name: "David",
        email: "dav@hotmail.com",
        phone: 4444481245,
        gender: "male",
        age: 33,
      },
      {
        name: "Monica",
        email: "mon@hotmail.com",
        phone: 7895695124,
        gender: "female",
        age: 27,
      },
      {
        name: "Andy",
        email: "ndy@hotmail.com",
        phone: 4789453698,
        gender: "male",
        age: 31,
      },
    ];

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.searchText = "";
    $scope.selectedEmployee = {};
    $scope.getEmployees = function () {
      return $filter("filter")($scope.employees, $scope.searchText);
    };

    $scope.numberOfPages = function () {
      return Math.ceil($scope.getEmployees().length / $scope.pageSize);
    };
    // goTo page 1 if searching
    $scope.$watch(
      "searchText",
      function (newValue, oldValue) {
        if (oldValue != newValue) {
          $scope.currentPage = 0;
        }
      },
      true
    );
    // keep track of current page for pagination
    $scope.$watch(
      "currentPage",
      function (newValue, oldValue) {
        let temp = document.querySelectorAll(".page-number");
        temp[oldValue].classList.remove("active");
        temp[newValue].classList.add("active");
        if (newValue == 0) {
          document
            .querySelector(".pagination")
            .firstElementChild.classList.add("disabled");
        } else {
          document
            .querySelector(".pagination")
            .firstElementChild.classList.remove("disabled");
        }
        if (newValue >= $scope.numberOfPages() - 1) {
          document
            .querySelector(".pagination")
            .lastElementChild.classList.add("disabled");
        } else {
          document
            .querySelector(".pagination")
            .lastElementChild.classList.remove("disabled");
        }
      },
      true
    );
    $scope.goToPage = function (page) {
      $scope.currentPage = page;
    };
    $scope.setEmployee = function (employee) {
      $scope.selectedEmployee = employee;
    };

    // reset form when it is opened
    $scope.resetForm = function () {
      var form = document.querySelector(".needs-validation");
      // reset form
      form.reset();
      // reset form-styles
      form.classList.remove("was-validated");
      // qualifications
      $scope.degrees = [];
      // selected employee
      $scope.selectedEmployee = {};
      // calculated age
      $scope.age = new Date();
    };

    // calculate age
    $scope.age = new Date();
    $scope.calcAge = function () {
      var Bday = +new Date($scope.age);
      var usrAge = ~~((Date.now() - Bday) / 31557600000);
      if (usrAge == 0) usrAge = 1;
      return usrAge;
    };

    // add qualifications
    $scope.degrees = [];
    $scope.addRow = function () {
      let edu = document.getElementById("education").value;
      let inst = document.getElementById("institute").value;
      let strt = document.getElementById("startDate").value;
      let end = document.getElementById("endDate").value;
      let marks = document.getElementById("marks").value;
      // error
      if (edu == "" || inst == "" || strt == "" || end == "" || marks == "") {
        document.getElementById("error").style.display = "block";
        setTimeout(function () {
          document.getElementById("error").style.display = "none";
        }, 2000);
      }
      // add degree
      else {
        $scope.degrees.unshift({
          education: edu,
          institute: inst,
          startDate: new Date(strt),
          endDate: new Date(end),
          marks: marks,
        });
        document.getElementById("education").value = "";
        document.getElementById("institute").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
        document.getElementById("marks").value = "";
      }
    };
    $scope.delRow = function (index) {
      $scope.degrees.splice(index, 1);
    };

    // set min date
    $scope.startDate = new Date();
    $scope.dateChanged = function () {
      let today = $scope.startDate;
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      document.getElementById("endDate").setAttribute("min", today);
      document.getElementById("endDate").value = "";
    };
    // if user wants to edit date after adding a degree
    $scope.dateChangeDegree = function (index) {
      let today = $scope.degrees[index].startDate;
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      document.getElementById(`endDate-${index}`).setAttribute("min", today);
      document.getElementById(`endDate-${index}`).value = "";
    };

    // edit user
    $scope.editUser = function (user) {
      var form = document.querySelector(".needs-validation");
      // reset form-styles
      form.classList.remove("was-validated");
      if (user.dob) {
        $scope.age = new Date(user.dob);
      } else {
        $scope.age = new Date();
      }
      if (user.degrees) {
        $scope.degrees = user.degrees;
      }
    };
    // delete user
    $scope.deleteUser = function (user) {
      $scope.employees.forEach((item, index) => {
        if (item.phone == user.phone) {
          $scope.employees.splice(index, 1);
        }
      });
      document.querySelector(".alert-danger").style.display = "block";
      setTimeout(function () {
        document.querySelector(".alert-danger").style.display = "none";
      }, 3000);
      if ($scope.currentPage == $scope.numberOfPages()) {
        $scope.currentPage--;
      }
    };

    // format date
    $scope.getDate = function (date) {
      let today = date;
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      return today;
    };

    // form-validation
    (function () {
      "use strict";
      // Fetch the form we want to apply custom Bootstrap validation styles to
      var form = document.querySelector(".needs-validation");
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            // edit employee in employees
            if ($scope.selectedEmployee.name) {
              $scope.employees.forEach((item, index) => {
                if (item.phone == $scope.selectedEmployee.phone) {
                  $scope.employees[index] = {
                    name: document.getElementById("userName").value,
                    email: document.getElementById("userEmail").value,
                    phone: document.getElementById("userPhone").value,
                    gender: document.getElementById("userGender").value,
                    age: document.getElementById("userAge").textContent,
                    address: document.getElementById("userAddress").value,
                    dob: document.getElementById("dob").value,
                  };
                  // add degree to employee
                  if ($scope.degrees.length >= 1) {
                    $scope.employees[index].degrees = [];
                    $scope.degrees.forEach((element) => {
                      $scope.employees[index].degrees.unshift(element);
                    });
                  }
                }
              });
            }
            // add new employee
            else {
              $scope.employees.unshift({
                name: document.getElementById("userName").value,
                email: document.getElementById("userEmail").value,
                phone: document.getElementById("userPhone").value,
                gender: document.getElementById("userGender").value,
                age: document.getElementById("userAge").textContent,
                address: document.getElementById("userAddress").value,
                dob: document.getElementById("dob").value,
              });
              // add degree to employee
              if ($scope.degrees.length >= 1) {
                $scope.employees[0].degrees = [];
                $scope.degrees.forEach((element) => {
                  $scope.employees[0].degrees.unshift(element);
                });
              }
            }

            // close modal & Show success message
            // update message
            if ($scope.selectedEmployee.name) {
              document.querySelector(".alert-info").style.display = "block";
              setTimeout(function () {
                document.querySelector(".alert-info").style.display = "none";
              }, 3000);
            }
            // new user added message
            else {
              document.querySelector(".alert-primary").style.display = "block";
              setTimeout(function () {
                document.querySelector(".alert-primary").style.display = "none";
              }, 3000);
            }
            document.querySelector(".form-modal-close").click();

            return;
          }
          form.classList.add("was-validated");
        },
        false
      );
      // date selector set max date
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      $scope.today = today;
      document.getElementById("dob").setAttribute("max", today);
      document.getElementById("startDate").setAttribute("max", today);
    })();
  });
myApp.filter("startFrom", function () {
  return function (input, start) {
    start = +start;
    return input.slice(start);
  };
});
myApp.filter("range", function () {
  // RETURNS ARRAY FOR RANGE IN NG-REPEAT
  return function (input, total) {
    total = parseInt(total);
    for (var i = 2; i <= total; i++) {
      input.push(i);
    }
    return input;
  };
});
myApp.filter("capitalize", function () {
  return function (input) {
    return angular.isString(input) && input.length > 0
      ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()
      : input;
  };
});
