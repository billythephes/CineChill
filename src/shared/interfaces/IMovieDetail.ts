import { Movie } from "./IMovie";
import { Category } from "./ICategory";
import { Country } from "./ICountry";

export interface MovieDetail extends Movie {
    content: string;
    type: string;
    status: string;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    actor: string[];
    director: string[];
    category: Category[];
    country: Country[];
    tmdb: {
        type: string;
        id: number;
        season: number;
        vote_average: number;
        vote_count: number;
    }
}