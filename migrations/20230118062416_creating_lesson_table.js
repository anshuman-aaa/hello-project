exports.up = async db => {
  await db.schema.createTable('lessons', table => {
    table.uuid('id').notNullable();
    table.uuid('user_id').notNullable();
    table.string('subject').notNullable();
    table.string('expertise').notNullable();
    table.decimal('price').notNullable();
    table.integer('num_of_lessons').notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(db.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(db.fn.now());
  });
};

exports.down = async db => {
  await db.schema.dropTableIfExists('lessons');
};
