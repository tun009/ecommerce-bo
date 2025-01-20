import { ProductHeaderTableOptionModel, ProductWarningModel } from '@/models/views/products'

export interface ProductDataTableModel {
  name: string
  url: string
}

export type ProductTicketFileType = 'video' | 'img'

export interface ProductRepresentativeProps {
  label: string
  notifications: ProductWarningModel[]
  dataTable: ProductDataTableModel[]
  typeFile?: ProductTicketFileType
  headers: ProductHeaderTableOptionModel[]
}
