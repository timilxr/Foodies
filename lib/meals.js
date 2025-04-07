import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

const db = sql('meals.db', { verbose: console.log });

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
  }

  export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;
    const filePath = `public/images/${filename}`;
    const stream = fs.createWriteStream(filePath);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            throw new Error('Error saving image!')
        } else {
            console.log('File written successfully');
        }
    });
    stream.end();
    meal.image = `/images/${filename}`;

    db.prepare(`
        INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
        VALUES (
        @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
         )
    `).run(
        meal
    );
}