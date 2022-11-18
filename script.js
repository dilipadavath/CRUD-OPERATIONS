var crudApp = new (function () {
  // Default rows
  this.colOneData = [
    {
      checkbox:
        '<input type="checkbox" name="checkbox" id="checkbox" onclick="crudApp.checkBoxFun(this)"> <br> <img src="download.png" width="20px" height="20px" id="img_id" onclick="crudApp.imageFun(this)">',
    },
  ];
  this.studentList = [
    {
      ID: this.colOneData[0].checkbox,
      Student: "Student 1",
      Advisor: "Teacher 1",
      Award: "Approved",
      Semester: "Fall",
      Type: "TA",
      Budget: 12345,
      Percentage: "100%",
    },
    {
      ID: this.colOneData[0].checkbox,
      Student: "Student 2",
      Advisor: "Teacher 2",
      Award: "Approved",
      Semester: "Fall",
      Type: "TA",
      Budget: 23456,
      Percentage: "100%",
    },
    {
      ID: this.colOneData[0].checkbox,
      Student: "Student 3",
      Advisor: "Teacher 3",
      Award: "Approved",
      Semester: "Fall",
      Type: "TA",
      Budget: 34567,
      Percentage: "100%",
    },
  ];
  // Table header
  this.heading = [
    "Student",
    "Advisor",
    "Award",
    "Semester",
    "Type",
    "Budget",
    "Percentage",
  ];
  this.list = [];
  this.createTable = function () {
    // Extract value for table header.
    for (var i = 0; i < this.studentList.length; i++) {
      for (var key in this.studentList[i]) {
        if (this.list.indexOf(key) === -1) {
          this.list.push(key);
        }
      }
    }
    // CREATE A TABLE.
    var table = document.createElement("table");
    table.setAttribute("id", "studentList");
    var tr = table.insertRow(-1);
    for (var h = 0; h < this.list.length; h++) {
      var th = document.createElement("th");
      th.innerHTML = this.list[h].replace("_", " ");
      tr.appendChild(th);
    }
    // Add rows using JSON data.
    for (var i = 0; i < this.studentList.length; i++) {
      tr = table.insertRow(-1); // Create a new row.
      for (var j = 0; j < this.list.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.studentList[i][this.list[j]];
      }
      this.td = document.createElement("td");

      // *** SAVE.
      tr.appendChild(this.td);
      var btSave = document.createElement("input");
      btSave.setAttribute("type", "button");
      btSave.setAttribute("value", "Save");
      btSave.setAttribute("id", "Save" + i);
      btSave.setAttribute("style", "display:none;");
      btSave.setAttribute("onclick", "crudApp.Save(this)");
      this.td.appendChild(btSave);
    }
    tr = table.insertRow(-1); // CREATE THE LAST ROW.
    tr.setAttribute("id", "form");
    // Create New Student button
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btNew = document.createElement("input");
    btNew.setAttribute("type", "button"); // SET ATTRIBUTES.
    btNew.setAttribute("value", "Add new student");
    btNew.setAttribute("id", "New" + i);
    btNew.setAttribute("class", "create");
    btNew.setAttribute("style", "background-color:#000;");
    btNew.setAttribute("onclick", "crudApp.CreateNew(this)");
    this.td.appendChild(btNew);
    //Submit Selected Awards Button
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btNew = document.createElement("input");
    btNew.setAttribute("type", "button"); // SET ATTRIBUTES.
    btNew.setAttribute("value", "Submit Selected Awards");
    btNew.setAttribute("id", "New" + i);
    btNew.setAttribute("class", "create");
    btNew.setAttribute("style", "background-color:#207DD1;");
    btNew.setAttribute("onclick", "crudApp.CreateNew(this)");
    this.td.appendChild(btNew);
    var div = document.getElementById("crud_container");
    div.innerHTML = "";
    div.appendChild(table); // ADD THE TABLE TO THE WEB PAGE.
  };
  // ****** OPERATIONS.
  // Checkbox
  this.checkBoxFun = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("studentList").rows[activeRow];
    this.td = document.createElement("td");
    //======code ot check if the checkbox ix checked =========//
    if (oButton.checked) {
      tab.style.background = "yellow";
      tab.appendChild(this.td);

      // *** UPDATE.
      tab.appendChild(this.td);
      var btUpdate = document.createElement("input");
      btUpdate.setAttribute("type", "button");
      btUpdate.setAttribute("value", "Update");
      btUpdate.setAttribute("id", "Edit");
      btUpdate.setAttribute("style", "background-color:#44CCEB;");
      btUpdate.setAttribute("onclick", "crudApp.Update(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(btUpdate);
      // *** DELETE.
      this.td = document.createElement("td");
      tab.appendChild(this.td);
      var btDelete = document.createElement("input");
      btDelete.setAttribute("type", "button");
      btDelete.setAttribute("value", "Delete");
      btDelete.setAttribute("style", "background-color:#ED5650;");
      btDelete.setAttribute("onclick", "crudApp.Delete(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(btDelete);
    } else {
      tab.removeChild(tab.lastChild);
      tab.removeChild(tab.lastChild);
      tab.style.background = "white";
    }
  };
  // EDIT DATA.
  this.Update = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("studentList").rows[activeRow];
    // SHOW
    for (i = 1; i < 8; i++) {
      var td = tab.getElementsByTagName("td")[i];
      var ele = document.createElement("input"); // TEXTBOX.
      ele.setAttribute("type", "text");
      ele.setAttribute("style", "width: 80px;");
      ele.setAttribute("value", td.innerText);
      td.innerText = "";
      td.appendChild(ele);
    }
    var btSave = document.getElementById("Save" + (activeRow - 1));
    btSave.setAttribute(
      "style",
      "display:block; margin-left:30px; float:left; background-color:#2DBF64;"
    );
    // HIDE THIS BUTTON.
    oButton.setAttribute("style", "display:none;");
  };
  // DELETE DATA.
  this.Delete = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    this.studentList.splice(activeRow - 1, 1);
    this.createTable();
  };
  // SAVE DATA.
  this.Save = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("studentList").rows[activeRow];
    // UPDATE studentList ARRAY WITH VALUES.
    for (i = 1; i < this.list.length; i++) {
      var td = tab.getElementsByTagName("td")[i];
      {
        this.studentList[activeRow - 1][this.list[i]] = td.childNodes[0].value;
      }
    }
    this.createTable();
  };
  // update
  this.Update = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("studentList").rows[activeRow];
    // SHOW
    for (i = 1; i < 8; i++) {
      var td = tab.getElementsByTagName("td")[i];
      var ele = document.createElement("input"); // TEXTBOX.
      ele.setAttribute("type", "text");
      ele.setAttribute("value", td.innerText);
      td.innerText = "";
      td.appendChild(ele);
    }
    var btSave = document.getElementById("Save" + (activeRow - 1));
    btSave.setAttribute(
      "style",
      "display:block; margin-left:30px; float:left; background-color:#2DBF64;"
    );
    // HIDE THIS BUTTON.
    oButton.setAttribute("style", "display:none;");
  };
  // ImageFun
  this.imageFun = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("studentList").rows[activeRow];
    // Create a row.
    var table = document.getElementById("studentList");
    var newTR = table.insertRow(activeRow);
    var newTD = document.createElement("td");
    newTR.appendChild(newTD);
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "list");
    newTD.appendChild(newDiv);
    newDiv.innerHTML =
      "<ul><li>Advisor:</li><li>Award Details</li><li>Summer 1-2014(TA)</li><li>Budget Number:</li><li>Tuition Number:</li><li>Comments</li><li class='last'>Award Status:</li></ul>";
    oButton.setAttribute();
  };
  var x = 3;
  function increment(n) {
    n++;
    return n;
  }
  x = increment(x);
  // CREATE NEW.
  this.CreateNew = function () {
    var obj = {};
    (obj[this.list[0]] =
      '<input type="checkbox" name="checkbox" id="checkbox" onclick="crudApp.checkBoxFun(this)"> <br> <img src="download.png" width="20px" height="20px" id="img_id" onclick="crudApp.imageFun(this)">'),
      (obj[this.list[1]] = "Student " + x);
    obj[this.list[2]] = "Teacher " + x;
    obj[this.list[3]] = "Approved";
    obj[this.list[4]] = "Fall";
    obj[this.list[5]] = "TA";
    obj[this.list[6]] = "3456" + x;
    obj[this.list[7]] = "100%";

    this.studentList.push(obj);
    this.createTable();
  };
  // ****** OPERATIONS END.
})();
crudApp.createTable();
