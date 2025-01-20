import { DataTableProps, DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { WelfareSelectProps } from './WelfareSelectProps'
import { DATA_TABLE_DEFAULT_DATA_KEY, DATA_TABLE_NUMBER_ITEMS_PAGE_50, DATA_TABLE_NUMBER_OF_PAGE, DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import { DataTablePaginationResponseModel } from '../services'
export interface WelfareDataTableProps extends DataTableProps {
  selectProps?: WelfareSelectProps
  noDataLabel?: string
  isSelectInvisible?: boolean
  hiddenPagination?: boolean
}

export interface DataTableParamsModel extends WelfareDataTableProps {
  onPageChange: (params: PageState) => void
}

export interface WelfareDataTableEmits {
  (e: 'row-click', event: DataTableRowClickEvent): void
  (e: 'page-change', params: PageState): void
  (e: 'drop-down-change', params: any): void
}

export interface WelfareDataTableWithCheckboxEmits extends WelfareDataTableEmits {
  (e: 'select-all-change', checked: boolean): void
  (e: 'row-checked-change', item: any): void
}

export interface WelfareDataTableWithCheckboxProps extends WelfareDataTableProps {
  clearSelectedAllOnPageChange?: boolean
  showSelection?: boolean
}

export interface DataTableWithCheckboxParamsModel extends DataTableParamsModel {
  onSelectAllChange: (data: any) => void
  onRowCheckedChange: (item: any) => void
}

export interface WelfareDataTableSlots {
  loading: {}
  title: {}
  buttons: {}
  columns: {}
}

export interface WelfareDataTableExpose {
  scrollToTop: () => void
}

export interface WelfareDataTableWithCheckBoxExpose extends WelfareDataTableExpose {
  scrollToTop: () => void
  clearCheckAll?: () => void
}

export interface DataTableContainerProps extends WelfareDataTableProps {
  columnConfigs: DataTableContainerConfigModel[]
  showSelection? : boolean
  isSelectAll? :boolean
}

export interface DataTableContainerEmits extends WelfareDataTableEmits {}
export interface DataTableContainerSlots extends WelfareDataTableSlots {
  [key: string]: {}
}

export interface DataTableContainerConfigModel {
  header: string
  field: string
  class?: string
}

export const defaultDataTablePropsConfig = {
  selectProps: () => ({
    options: DEFAULT_TABLE_SELECT_OPTIONS
  }),
  pageLinkSize: DATA_TABLE_NUMBER_OF_PAGE,
  rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50,
  dataKey: DATA_TABLE_DEFAULT_DATA_KEY,
  noDataLabel: '리스트가 없습니다',
  isSelectInvisible: false,
  hiddenPagination: false
}

export type DataTableRequestModel<T> = (page: number, numberOfItems: number) => Promise<DataTablePaginationResponseModel<T>>
