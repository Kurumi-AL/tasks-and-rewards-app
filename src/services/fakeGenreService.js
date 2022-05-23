export const genres = [
  { id: "5b21ca3eeb7f6fbccd471818", name: "Beauty" },
  { id: "5b21ca3eeb7f6fbccd471814", name: "Food" },
  { id: "5b21ca3eeb7f6fbccd471820", name: "Date" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
