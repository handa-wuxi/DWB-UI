export interface TableConfig {
  maxHeight?: number | string;
  minHeight?: number | string;
  paginateSinglePage?: boolean;
  remote?: boolean; // 表格是否自动分页数据，在异步的状况下你可能需要把它设为 true
  striped?: boolean; // 是否显示表格条纹
}
