export interface Link {
    label: string;
    url: string;
    descripcion?: string;
    external?: boolean;
    target?: '_self'|'_blank';
}
