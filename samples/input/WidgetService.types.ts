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
