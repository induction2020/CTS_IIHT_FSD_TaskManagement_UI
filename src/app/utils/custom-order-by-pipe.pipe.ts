import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class CustomOrderByPipePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   alert('value: '+JSON.stringify(value));
  //   return null;
  // }

  transform(array: Array<string>, args: string): Array<string> {
    if (array !=null && array !== undefined) {
        array.sort((a: any, b: any) => {
            if ( a[args] < b[args] ){
                return -1;
            } else if ( a[args] > b[args] ) {
                return 1;
            } else {
                return 0;   
            }
        });
    }
    return array;
}

}
