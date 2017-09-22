import domvm from 'domvm';

const el = domvm.defineElement;

export default function TodoApp(vm, data) {
  return (
    el("section.todoapp",
       [Header(),
        Main(),
        Footer()]));}

function Header() {
  return (
    el("header.header", [
      el("h1", ["todos"]),
      el("input.new-todo",
         {placeholder: "What needs to be done?",
          autofocus: true})]));}

function Main() {
  return (
    el("section.main",
       [el("input#toggle-all.toggle-all",
           {type: "checkbox"}),
        el("label",
           {for: "toggle-all"},
           ["Mark all as complete"]),
        el("ul.todo-list",
           [Todo({completed: true,
                  name: "Taste Javascript",
                  edit: "Create a TodoMVC template"}),
            Todo({completed: false,
                  name: "Buy a unicorn",
                  edit: "Rule the web" })])]));}

function Todo({completed, name, edit}) {
  return (
    el("li",
       {class: completed ? "completed" : ""},
       [el("div.view",
           [el("input.toggle",
               {type:    "checkbox",
                checked: completed}),
            el("label", name),
            el("button.destroy")]),
        el("input.edit",
           {value: edit})]));}

function Footer() {
  return (
    el("footer.footer",
       [el("span.todo-count",
           [el("strong", "0"),
            " item left"]),
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
        el("button.clear-completed",
           "Clear Completed")]));}
