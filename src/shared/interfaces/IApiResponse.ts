import { Movie } from "@/shared/interfaces/IMovie";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { Pagination } from "./IPagination";

export interface ApiResponse {
    status: boolean | string;
    items: Movie[];
    movie: MovieDetail;
    data: Items;
}

export interface Items {
    titlePage: string;
    items: MovieDetail[];
    params: Pagination;
}