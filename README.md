# Dumb Node RPC

Experiment to generate boilerplate for typescript-typed http rpc calls between node microservices.

Install with `npm i -S @danielemeryau/dumb-node-rpc`

## Sample configuration

`SampleService.specification.json`

```json
{
  "name": "WidgetService",
  "sourceFolder": "./samples/input",
  "destinationFolder": "./samples/output",
  "services": [
    {
      "name": "GetWidgets"
    },
    {
      "name": "FindWidget"
    }
  ]
}
```

`WidgetService.types.ts`

```ts
export interface Widget {
  name: string;
}

export interface GetWidgetsRequest {}
export interface GetWidgetsResponse {
  results: Widget[];
}
export interface FindWidgetRequest {}
export interface FindWidgetResponse {
  result: Widget;
}
```
