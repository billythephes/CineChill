export async function GET() {
    const minYear = 2000;
    const currentYear = new Date().getFullYear();

    // Create an array containing the years from 2000 to currentYear
    const years = Array.from({ length: currentYear - minYear + 1 }, (_, index) => ({
        _id: `${1 + index}`, 
        name: `${2000 + index}`,     
        slug: `${2000 + index}` 
    }));

    return new Response(JSON.stringify(years), {
        headers: { 'Content-Type': 'application/json' },
    });
}