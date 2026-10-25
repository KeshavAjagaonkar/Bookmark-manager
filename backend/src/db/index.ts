import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial, timestamp,integer,primaryKey} from "drizzle-orm/pg-core";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



export const users=pgTable("users",{
  id:serial("id").primaryKey(),
  name:text("name").notNull(),
  email:text("email").notNull().unique(),
});


export const bookmarks=pgTable("bookmarks",{
  id:serial("id").primaryKey(),
  
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),


  title:text("title").notNull(),
  url:text("url").notNull(),
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at").defaultNow().notNull(),
  
});


export const tags=pgTable("tags",{
  id:serial("id").primaryKey(),
  name:text("name").notNull(),
});


export const bookmarks_tags=pgTable("bookmark_tags",{
  bookmarkId:integer("bookmark_id").notNull().references(()=>bookmarks.id),
  tagId:integer("tag_id").notNull().references(()=>tags.id),
  },
  (table) => [
    primaryKey({
      columns: [table.bookmarkId, table.tagId],
    }),
  ],

)


export const db=drizzle({
  client:pool
});


