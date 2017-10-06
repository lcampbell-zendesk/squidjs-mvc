import domvm from 'domvm';
import { createTask, setNewTaskName, removeTask, toggleCompletion,
         clearCompleted, toggleAll, startEditing } from '../controller';

const el = domvm.defineElement;

export default function TodoApp(vm, { newTask, all, active, completed }) {
  return (
    el("section.todoapp",
       [Header(newTask),
        all.length == 0 ? [] :
        [Main(all, active.length > 0),
         Footer(active.length, completed.length > 0)]]));}

function Header({ name }) {
  return (
    el("header.header", [
      el("h1", ["todos"]),
      el("form",
         {onsubmit: createTask},
         [el("input.new-todo",
              {placeholder: "What needs to be done?",
               autofocus:   true,
               value:       name,
               onkeyup:     setNewTaskName})])]));}

function Main(tasks, anyActive) {
  console.log(anyActive);
  return (
    el("section.main",
       [el("input#toggle-all.toggle-all",
           {type: "checkbox",
            checked: !anyActive,
            onclick: toggleAll(anyActive)}),
        el("label",
           {for: "toggle-all"},
           ["Mark all as complete"]),
        el("ul.todo-list",
           tasks.map(Todo))]));}

function Todo({id, complete, name, editing, edit}) {
  console.log("kittens");
  return (
    el("li",
       {class: complete ? "completed" : null +
        editing ? "editing" : null},
       [el("div.view",
           [el("input.toggle",
               {type:    "checkbox",
                checked: complete,
                onchange: toggleCompletion(id)}),
            el("label",
               {ondblclick: startEditing(id)},
               name),
            el("button.destroy",
               {onclick: removeTask(id)})]),
        el("input.edit",
           {value: edit})]));}

function pluralise(count, noun) {
  return noun + (count !== 1 ? 's' : '');
}

function Footer(activeCount, anyCompleted) {
  return (
    el("footer.footer",
       [el("span.todo-count",
           [el("strong", activeCount),
            " ", pluralise(activeCount, "item"), " left"]),
        el("ul.filters",
           [el("li",
               [el("a.selected",
                   {href: "#/"},
                   "All")]),
            el("li",
               [el("a",
                   {href: "#/active"},
                   "Active")]),
            el("li",
               [el("a",
                   {href: "#/completed"},
                   "Completed")])]),
        !anyCompleted ? null :
        el("button.clear-completed",
           {onclick: clearCompleted},
           "Clear Completed")]));}
