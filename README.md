# Project Archived

If you've ended up here you're probably looking for a good way to do rpc for node. This project was created as a POC before the now-popular [tRPC](https://github.com/trpc/trpc) came into existence and now I would recommend using it instead!.

https://github.com/trpc/trpc

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
