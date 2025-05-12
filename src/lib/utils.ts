import { MovieDetail } from "@/shared/interfaces/IMovieDetail";

const he = require('he');

export const escapeHtmlAndEncodeSpaces = (query: string) => {
    let escapedQuery = he.escape(query);
    escapedQuery = escapedQuery.replace(/ /g, '%20');
    return escapedQuery;
}

export const getRandomElements = (array: MovieDetail[], count: number) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }

        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, array.length));
    };