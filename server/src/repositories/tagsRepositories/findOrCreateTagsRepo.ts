import { PrismaClient } from "../../prisma/generated/prisma";


const findOrCreateTagsRepo = async (tagNames: string[]) => {
  const prisma = new PrismaClient();

  if (!tagNames || tagNames.length === 0) {
    return [];
  }

  const tags = [];
  for (const tagName of tagNames) {
    const normalizedName = tagName.trim().toLowerCase();
    const tagSlug = normalizedName.replace(/\s+/g, '-');

    const tag = await prisma.tags.upsert({
        where: { slug: tagSlug },
        update: {},
        create: {
            name: normalizedName,
            slug: tagSlug,
        },
    });
    tags.push(tag);
  }
  return tags;
}

export { findOrCreateTagsRepo }