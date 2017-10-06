import { db } from './schema';

// data: {"id": 2, "name": "Buy a unicorn", "complete": false}
export async function createTask(event) {
  event.preventDefault();
  const item = db.getSchema().table("Item");

  const tx = db.createTransaction();
  await tx.begin([item]);

  const newItem = await tx.attach(db
                                  .select()
                                  .from(item)
                                  .where(item.new.eq(true)));
  const trimmedName = newItem[0].name.trim();

  if(trimmedName != "") {
    await tx.attach(db
                    .update(item)
                    .set(item.new, false)
                    .set(item.name, trimmedName)
                    .where(item.new.eq(true)));

    const row = item.createRow({name: "",
                                complete: false,
                                new: true});
    await tx.attach(db
                    .insertOrReplace()
                    .into(item)
                    .values([row]));
  }

  return tx.commit();
}

export function setNewTaskName(event) {
  event.preventDefault();
  const name = event.target.value;
  const item = db.getSchema().table("Item");
  return db
    .update(item)
    .set(item.name, name)
    .where(item.new.eq(true))
    .exec();
}
