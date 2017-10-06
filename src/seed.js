export default async function seed(db) {
  const item = db.getSchema().table("Item");

  const newTasks = [{id: 1, name: "Taste Javascript", edit: "", complete: true,  editing: false, new: false},
                    {id: 2, name: "Buy a unicorn",    edit: "", complete: false, editing: false, new: false},
                    {id: 3, name: "",                 edit: "", complete: false, editing: false, new: true}];

  const tasks = await db.select().from(item).where(item.new.eq(true)).exec();
  const rows = tasks.length > 0 ? [] : newTasks.map((r) => item.createRow(r));
  return db.insertOrReplace().into(item).values(rows).exec();
}
