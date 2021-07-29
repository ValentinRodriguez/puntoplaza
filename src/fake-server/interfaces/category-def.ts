export interface CategoryDef {
    descripcion: string;
    slug: string;
    image?: string;
    items?: number;
    children?: CategoryDef[];
}
