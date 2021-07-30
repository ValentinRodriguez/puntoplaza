import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ShopService } from 'src/app/shared/api/shop.service';
import { CategoryWithDepth } from 'src/app/shared/components/search/search.component';
import { DropcartType } from '../../modules/header/components/dropcart/dropcart.component';

interface RouterData {
    headerLayout?: 'classic'|'compact';
    dropcartType?: DropcartType;
}

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
    headerLayout: 'classic'|'compact' = 'classic';
    dropcartType: DropcartType = 'dropdown';
    categories: CategoryWithDepth[] = [];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private shop: ShopService,
                public route: ActivatedRoute
    ) {
        this.route.data.subscribe((data: RouterData) => {
            this.headerLayout = data.headerLayout || 'classic';
            this.dropcartType = data.dropcartType || 'dropdown';
        });
    }

    ngOnInit() {
        this.shop.getCategories(null, 1).pipe(
            takeUntil(this.destroy$),
        ).subscribe((categories: any) => {                
            this.categories = categories.data;
            this.shop.categoria.emit(this.categories);
        });
    }
}
