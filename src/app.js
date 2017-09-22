import schema from './schema';
import seed from './seed';
import domvm from 'domvm';
import TodoApp from './views/todoapp';

const el = domvm.defineElement;

async function main() {
  // LOVEFIELD
  const db = await schema().connect();
  const item = db.getSchema().table("Item");
  const allQuery = db.select().from(item);
  const activeQuery = db.select().from(item).where(item.complete.eq(false));
  const completedQuery = db.select().from(item).where(item.complete.eq(true));

  // DOMVM
  const empty = {all: [], active: [], completed: []};
  const vm = domvm.createView({render: TodoApp}, empty).mount(document.getElementById("app"));

  // BOTH
  async function updateDomvm(changes) {
    const all = allQuery.exec();
    const active = activeQuery.exec();
    const completed = completedQuery.exec();

    const results = {
      all:       await all,
      active:    await active,
      completed: await completed
    };

    vm.update(results, false);
  }

  db.observe(allQuery, updateDomvm);

  seed(db);
}

main();
