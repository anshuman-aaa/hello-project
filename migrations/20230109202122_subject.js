exports.up = async db => {
  await db.schema.createTable('subjects', table => {
    table
      .uuid('id')
      .notNullable()
      .primary();
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('name', 50).notNullable();
    table.string('expertise', 1000);
    table.timestamps(true, true);
  });

  await db.schema.createTable('packages', table => {
    table
      .uuid('id')
      .notNullable()
      .primary();
    table
      .uuid('subject_id')
      .notNullable()
      .references('id')
      .inTable('subjects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('lessons').notNullable();
    table.integer('price').notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(db.fn.now());
  });
};

exports.down = async db => {
  await db.schema.dropTableIfExists('packages');
  await db.schema.dropTableIfExists('subjects');
};
