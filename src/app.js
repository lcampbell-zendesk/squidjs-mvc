import { db, initDb } from './schema';
import seed from './seed';
import domvm from 'domvm';
import TodoApp from './views/todoapp';
import { op, Order } from 'lovefield';

async function main() {
  // LOVEFIELD
  await initDb();

  const item           = db.getSchema().table("Item");
  const notNew         = item.new.eq(false);

  const newTaskQuery   = db.select().from(item).where(item.new.eq(true));
  const allQuery       = db.select().from(item).where(notNew).orderBy(item.id, Order.ASC);
  const activeQuery    = db.select().from(item).where(op.and(notNew, item.complete.eq(false)));
  const completedQuery = db.select().from(item).where(op.and(notNew, item.complete.eq(true)));

  // DOMVM
  const empty = {newTask: {}, all: [], active: [], completed: []};
  const vm = domvm.createView({render: TodoApp}, empty).mount(document.getElementById("app"));

  // BOTH
  async function updateDomvm(changes) {
    const newTask   = newTaskQuery.exec();
    const all       = allQuery.exec();
    const active    = activeQuery.exec();
    const completed = completedQuery.exec();

    const results = {
      newTask:   (await newTask)[0],
      all:       await all,
      active:    await active,
      completed: await completed
    };

    console.log(results);

    vm.update(results, false);
  }

  db.observe(allQuery, updateDomvm);

  seed(db);
}

main();
