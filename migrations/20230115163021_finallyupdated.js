/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* prettier-ignore */

exports.up = async db => {
  
    await db.schema.createTable('subjects', table => {
      table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
      table.uuid('mentorid').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('name', 120).notNullable().defaultTo("Motivational Speaker");
      table.string('description', 1024);
      table.boolean('isexpert').notNullable().defaultTo(false);
      table.integer('price').notNullable().defaultTo(10);
      table.integer('numlesson').notNullable().defaultTo(10);
    });
  };

exports.down = async db => {
  await db.schema.dropTableIfExists('subjects');
};
