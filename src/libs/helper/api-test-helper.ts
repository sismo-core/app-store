export function MockedRequest(data: any): any {
  return {
    json: (): any => {
      return data;
    },
  };
}
