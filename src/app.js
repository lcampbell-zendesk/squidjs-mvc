import schema from './schema';
import seed from './seed';
import domvm from 'domvm';
import TodoApp from './views/todoapp';

const el = domvm.defineElement;

async function main() {
  // LOVEFIELD
  const db = await schema().connect();
  const item = db.getSchema().table("Item");
  const todo = db.select().from(item);

  // DOMVM
  const vm = domvm.createView({render: TodoApp}, []).mount(document.getElementById("app"));

  throw "foo";

  // BOTH
  async function updateDomvm(changes) {
    const results = await todo.exec();
    vm.update(results, false);
    console.log(results);
  }

  db.observe(todo, updateDomvm);

  seed(db);
}

main();
