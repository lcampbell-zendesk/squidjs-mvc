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
                                edit: "",
                                complete: false,
                                editing: false,
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

export function removeTask(id) {
  return async function(event) {
    event.preventDefault();

    const item = db.getSchema().table("Item");
    await db.delete().from(item).where(item.id.eq(id)).exec();
  };
}

export function toggleCompletion(id) {
  return async function(event) {
    const item = db.getSchema().table("Item");
    const tx = db.createTransaction();
    await tx.begin([item]);

    const togglingItems = await tx.attach(db
                                         .select()
                                         .from(item)
                                         .where(item.id.eq(id)));

    await tx.attach(db
                    .update(item)
                    .set(item.complete, !togglingItems[0].complete)
                    .where(item.id.eq(id)));

    return tx.commit();
  };
}

export function toggleAll(to) {
  return async function(_event) {
    const item = db.getSchema().table("Item");
    await db.update(item).set(item.complete, to).where(item.new.eq(false)).exec();
  };
}

export async function clearCompleted(event) {
  const item = db.getSchema().table("Item");
  await db.delete().from(item).where(item.complete.eq(true)).exec();
}

export function startEditing(id) {
  return async function(event) {
    const item = db.getSchema().table("Item");

    const tx = db.createTransaction();
    await tx.begin([item]);

    const editingItem = await tx.attach(db
                                    .select()
                                    .from(item)
                                    .where(item.id.eq(id)));

    await tx.attach(db
                    .update(item)
                    .set(item.editing, false));

    await tx.attach(db
                    .update(item)
                    .set(item.editing, true)
                    .set(item.edit, editingItem[0].name)
                    .where(item.id.eq(id)));

    await tx.commit();

    // This is super gross
    setTimeout(function() {
      event.target.parentElement.nextElementSibling.focus();
    }, 100);
  };
}

async function cancelEdit(id) {
  const item = db.getSchema().table("Item");

  const tx = db.createTransaction();
  await tx.begin([item]);

  const editingItems = await tx.attach(db
                                      .select()
                                      .from(item)
                                      .where(item.id.eq(id)));

  await tx.attach(db
                  .update(item)
                  .set(item.editing, false)
                  .set(item.edit, editingItems[0].name)
                  .where(item.id.eq(id)));

  return tx.commit();
}

async function completeEdit(id) {
  const item = db.getSchema().table("Item");

  const tx = db.createTransaction();
  await tx.begin([item]);

  const editingItems = await tx.attach(db
                                       .select()
                                       .from(item)
                                       .where(item.id.eq(id)));

  if(editingItems.length == 1) {
    const trimmedEdit = editingItems[0].edit.trim();

    if (trimmedEdit != "") {
      await tx.attach(db
                      .update(item)
                      .set(item.editing, false)
                      .set(item.name, trimmedEdit)
                      .where(item.id.eq(id)));
    } else {
      await tx.attach(db
                      .delete()
                      .from(item)
                      .where(item.id.eq(id)));
    }
  }

  await tx.commit();
}

export function updateEdit(id, event) {
  const edit = event.target.value;
  const item = db.getSchema().table("Item");
  return db
    .update(item)
    .set(item.edit, edit)
    .where(item.id.eq(id))
    .exec();
}

export function editInput(id) {
  return async function(event) {
    switch(event.code) {
    case "Escape":
      cancelEdit(id);
      break;
    case "Enter":
      completeEdit(id);
      break;
    default:
      updateEdit(id, event);
    }
  };
}

export function blurEdit(id) {
  return function(event) {
    completeEdit(id);
  };
}
