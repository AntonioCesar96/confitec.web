export abstract class HttpBaseService {
  
  prepareParameters(filter: any): string {
    let params = '?';

    if (filter) {
      const paramsList = Object.keys(filter)
      .map((param) => this.parametersArrays(param.toString(), filter[param]))
      .join('&');

      params = params + paramsList;
    }

    return params;
  }

  parametersArrays(name: string, field: any): string {
    let textArray = '';
    let character = '';
    if (Array.isArray(field)) {
      field.forEach(value => {
        textArray += character + name  + '=' + value;
        character = '&';
      });
      return textArray;
    }
    return name  + '=' + encodeURIComponent(field);
  }
}
