let todo = [];

const list = [];

var input = document.querySelector("input[type = 'text']");
var ul = document.querySelector("ul");

input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13) {
    var li = document.createElement("li");
    var element = document.createElement("span");
    var icon = document.createElement("i");
    var newTodo = this.value;
    var newTask = { name: newTodo, complete: false };
    list.push(newTask);
    input.value = "";
    icon.classList.add("fas", "fa-circle");
    element.append(icon);
    ul.appendChild(li).append(element, newTodo);
  }
});
