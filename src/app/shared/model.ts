export interface Article { 
    id: number, 
    ref: string, 
    name: string,
    price: number,
    quantity: number,
    articleTypeId: number,
    articleTypeName?: string 
}

export interface ArticleFilter {  
    ref?: string, 
    name?: string,
    price?: number,
    quantity?: number,
    articleTypeId?: number
}

export interface ArticlesFilter { filter: ArticleFilter, page: number, pageSize: number }

export interface ArticlesFilterResult { items: Article[], count: number }
