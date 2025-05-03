export interface Episode {
    server_name: string;
    server_data: [
        {
            name: string;
            slug: string;
            filename: string;
            link_embed: string;
            link_m3u8: string;
        }
    ]
}

