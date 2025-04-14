import { Movie } from "@/shared/interfaces/IMovie";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";

export interface ApiResponse {
    status: boolean | string;
    items: Movie[];
    movie: MovieDetail;
    data: Items;
}

interface Items {
    items: MovieDetail[];
}