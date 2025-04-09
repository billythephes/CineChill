import { Movie } from "./IMovie";
import { Category } from "./ICategory";

export interface MovieDetail extends Movie {
    content: string;
    type: string;
    chieurap: boolean;
    time: string;
    episode_current: string;
    quality: string;
    lang: string;
    actor: any;
    category: Category[];
    country: any;
}