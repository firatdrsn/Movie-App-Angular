export interface Movie {
    id?: string;
    title: string;
    description: string;
    image: string;
    category: number;
    isPopular: boolean;
    datePublished: Date | number;
}