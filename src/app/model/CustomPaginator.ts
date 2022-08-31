import {MatPaginatorIntl} from '@angular/material/paginator';

export function CustomPaginator(): any {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'تعداد در هر صفحه';

  return customPaginatorIntl;
}
