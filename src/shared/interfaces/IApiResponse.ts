import { Movie } from "@/shared/interfaces/IMovie";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";

export interface ApiResponse {
    status: boolean;
    items: Movie[];
    movie: MovieDetail;
}