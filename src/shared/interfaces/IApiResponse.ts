import { Movie } from "@/shared/interfaces/IMovie";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { Pagination } from "./IPagination";
import { Episode } from "./IEpisode";

export interface ApiResponse {
    status: boolean | string;
    items: Movie[];
    movie: MovieDetail;
    data: Items;
    episodes: Episode[];
}

export interface Items {
    titlePage: string;
    items: MovieDetail[];
    params: Pagination;
}