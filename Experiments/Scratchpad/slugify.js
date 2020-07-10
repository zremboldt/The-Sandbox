function slugify(sentence, lowercase) {
  const slug = sentence.replace(/\s/g, '-');

  if (lowercase) return slug.toLowerCase();
  return slug;
}

console.log(slugify('The Zac page', true));
console.log(slugify('The Zac page'));