var input = document.querySelector("input[type = 'text']");
var ul = document.querySelector("ul");
let todo = [];
const tList = [];
var cc;

input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13 && input.value.length > 0) {
    var li = document.createElement("li");
    var spanElement = document.createElement("span");
    var icon = document.createElement("i");

    var newTodo = this.value;
    var newtask = { name: newTodo, complete: false };
    tList.push(newtask);
    input.value = "";
    icon.classList.add("far", "fa-circle");
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
  return `<li class=${complete ? "completed" : "userlist"}>
   <label class="checkboxLabel" for="check-checkbox"><i onclick="checkboxtoggle(this,${index})" class='${
    complete ? "far fa-check-circle" : "far fa-circle"
  }'></i></label>
    <input  id="check-checkbox" class="hide" type="checkbox"/>
    <label class="textLabel">${name}</label>
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

const taskLeft = List => {
  var count1 = 0,
    count2 = 0,
    count = 0;
  for (i = 0; i < List.length; i++) {
    if (!List[i].complete) {
      count1++;
    } else {
      count2++;
    }
  }
  if (count1 > 0) count = count1;
  else count = tList.length - count2;
  document.getElementById("iremaining").innerText = count + " item(s) left";
};

function checkboxtoggle(element, index) {
  var elem = document.getElementsByClassName("textLabel");
  if (element.classList == "far fa-circle") {
    elem[index].style.textDecoration = "line-through";
    elem[index].parentNode.className = "completed";
    element.classList = "far fa-check-circle";
  } else {
    elem[index].style.textDecoration = "none";
    elem[index].parentNode.className = "userList";
    element.classList = "far fa-circle";
  }
  toggleList(index);
  taskLeft(tList);
}

function toggleList(i) {
  console.log(tList[i]);
  tList[i].complete = tList[i].complete ? false : true;
  console.log(tList[i]);
}

function removeListTasks(index) {
  tList.splice(index, 1);
  listRefresh(tList);
}

function clearCompleted() {
  for (cc of tList) {
    var activetList = tList.filter(({ complete }) => complete === true);

    var display = tList.filter(function(el) {
      return activetList.indexOf(el) < 0;
    });
    tList.splice(0, tList.length);
    for (i = 0; i < display.length; i++) {
      tList[i] = display[i];
    }

    listRefresh(tList);
  }
}
