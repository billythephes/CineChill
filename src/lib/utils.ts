const he = require('he');

export const escapeHtmlAndEncodeSpaces = (query: string) => {
    let escapedQuery = he.escape(query);
    escapedQuery = escapedQuery.replace(/ /g, '%20');
    return escapedQuery;
}