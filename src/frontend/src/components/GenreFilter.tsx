import { Genre } from "@/backend";

interface GenreFilterProps {
  selected: Genre | null;
  onChange: (genre: Genre | null) => void;
}

const GENRE_LABELS: Record<Genre, string> = {
  [Genre.Action]: "Action",
  [Genre.Adventure]: "Adventure",
  [Genre.Comedy]: "Comedy",
  [Genre.Romance]: "Romance",
  [Genre.Fantasy]: "Fantasy",
  [Genre.SciFi]: "Sci-Fi",
  [Genre.Drama]: "Drama",
  [Genre.School]: "School",
  [Genre.Supernatural]: "Supernatural",
};

export function GenreFilter({ selected, onChange }: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" data-ocid="genre.filter">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-smooth border ${
          selected === null
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/40 hover:bg-accent/40"
        }`}
        data-ocid="genre.all.tab"
      >
        All
      </button>
      {Object.values(Genre).map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onChange(selected === genre ? null : genre)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-smooth border ${
            selected === genre
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/40 hover:bg-accent/40"
          }`}
          data-ocid={`genre.${genre.toLowerCase()}.tab`}
        >
          {GENRE_LABELS[genre]}
        </button>
      ))}
    </div>
  );
}
