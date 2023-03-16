export interface Genre {
    id: number
    name: string
}

export interface Movie {
    title: string
    backdrop_path: string
    release_date?: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name:string
    origin_country:string[]
    original_language:string
    original_name:string

}