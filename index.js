var input = document.querySelector("input[type = 'text']");
var ul = document.querySelector("ul");
let todo = [];
const tList = [];
var cc;

input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13) {
    var li = document.createElement("li");
    var spanElement = document.createElement("span");
    var icon = document.createElement("i");

    var newTodo = this.value;
    var newtask = { name: newTodo, complete: false };
    tList.push(newtask);
    input.value = "";
    icon.classList.add("fas", "fa-circle");
    spanElement.append(icon);
    ul.appendChild(li).append(spanElement, newTodo);
    listRefresh(tList);
  }
});

const getTodo = showComplete => {
  if (showComplete == undefined) {
    todo = tList;
  } else {
    todo = tList.filter(({ complete }) => complete === showComplete);
  }

  listRefresh(todo);
};

const createTodo = ({ name, complete }, index) => {
  return `<li class=${complete ? "completed" : "todo"}>
    <label for="check-checkbox"><i onclick="checkboxtoggle(this,${index})" class='${
    complete ? "far fa-check-circle" : "fas fa-circle"
  }'></i></label>
    <input  id="check-checkbox" class="hide" type="checkbox"/>
    <label>${name}</label>
    <button class="remove fa fa-trash" onclick="removeListTasks(${index})"></button></li>`;
};

const listRefresh = tList => {
  const todosHtml = [];
  for (i = 0; i < tList.length; i++) {
    todosHtml.push(createTodo(tList[i], i));
  }
  document.getElementById("ilist").innerHTML = todosHtml.join("");
  taskLeft(tList);
};

const taskLeft = tList => {
  var count = 0;
  for (i = 0; i < tList.length; i++) {
    if (!tList[i].complete) {
      count++;
    }
  }
  document.getElementById("iremaining").innerText = count + " item(s) left";
};

function checkboxtoggle(element, index) {
  if (element.classList == "fas fa-circle") {
    element.classList = "far fa-check-circle";
  } else {
    element.classList = "fas fa-circle";
  }
  toggleList(tList, index);
  listRefresh(tList);
}

function toggleList(tList, i) {
  tList[i].complete = tlist[i].complete ? false : true;
}

function removeListTasks(index) {
  tList.splice(index, 1);
  listRefresh(tList);
}

// function clearCompleted() {
//   for (cc of tList) {
//     var activetList = tList.filter(({ complete }) => complete === true);

//     var display = tList.filter(function(el) {
//       return activetList.indexOf(el) < 0;
//     });
//     tList.splice(0, tList.length);
//     for (i = 0; i < display.length; i++) {
//       tList[i] = display[i];
//     }

//     listRefresh(tList);
//   }
// }
