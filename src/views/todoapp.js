import domvm from 'domvm';

const el = domvm.defineElement;

export default function TodoApp(vm, { all, active, completed }) {
  console.log(all);
  return (
    el("section.todoapp",
       [Header(),
        Main(all),
        Footer(completed.length > 0)]));}

function Header() {
  return (
    el("header.header", [
      el("h1", ["todos"]),
      el("input.new-todo",
         {placeholder: "What needs to be done?",
          autofocus: true})]));}

function Main(tasks) {
  return (
    el("section.main",
       [el("input#toggle-all.toggle-all",
           {type: "checkbox"}),
        el("label",
           {for: "toggle-all"},
           ["Mark all as complete"]),
        el("ul.todo-list",
           tasks.map((task) => Todo(task)))]));}

function Todo({complete, name, edit}) {
  return (
    el("li",
       {class: complete ? "completed" : ""},
       [el("div.view",
           [el("input.toggle",
               {type:    "checkbox",
                checked: complete}),
            el("label", name),
            el("button.destroy")]),
        el("input.edit",
           {value: edit})]));}

function Footer(anyCompleted) {
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
        !anyCompleted ? null :
        el("button.clear-completed",
           "Clear Completed")]));}
