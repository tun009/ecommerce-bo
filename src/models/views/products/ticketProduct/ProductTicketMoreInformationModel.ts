export interface ProductTicketMoreInformationModel {
  image?: string
  description: string
  video?: string
  type: boolean
  mobileDescription?: string
  productStatus?: string
}

export const productInitValueProductTicketMoreInformationModel: ProductTicketMoreInformationModel = {
  image: '',
  description: '',
  mobileDescription: '',
  video: '',
  type: true
}
