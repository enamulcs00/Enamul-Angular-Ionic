import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any, searchTerm:any): any {
    if(value===0){
      return value;
    }
    return value.filter((search)=>search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
    
  }

}
