import {
  CheckboxView,
  HeaderSubTitleTextView,
  InputTextValidationView,
  InputTextView,
  TextBoxView,
  MainTemplateRouteView,
  DataTableView,
  PaginationView,
  RadioView,
  SelectView,
  TabTextView,
  TabFilledView,
  DateTimePickerView,
  DatePickerView,
  MdButtonView,
  BigButtonView,
  ColorButtonView,
  BackButtonView,
  TabOutlineView,
  BodyTextView,
  EditorView,
  SubColorView,
  TabSingleView,
  NeutralColorView,
  CloseIconView,
  TagView,
  SwitchView,
  ContentHeaderView,
} from '@/views'

export const UIKitRoutes = [
  // add route for uikit there
  {
    name: 'select',
    path: 'select',
    component: SelectView,
    meta: { title: 'UIKit - Select' }
  },
  {
    name: 'menu',
    path: 'menu',
    component: MainTemplateRouteView,
    meta: { title: 'UIKit - Select' }
  },
  {
    name: 'pagination',
    path: 'pagination',
    component: PaginationView,
    meta: { title: 'UIKit - Pagination' }
  },
  {
    name: 'data-table',
    path: 'data-table',
    component: DataTableView
  },
  {
    name: 'head-sub-title',
    path: 'head-sub-title',
    component: HeaderSubTitleTextView,
    meta: { title: 'UIKit - Head Subtile' }
  },
  {
    name: 'checkbox',
    path: 'checkbox',
    component: CheckboxView,
    meta: { title: 'UIKit - Checkbox' }
  },
  {
    name: 'mdButton',
    path: 'md-button',
    component: MdButtonView,
    meta: { title: 'UIKit - Md Button' }
  },
  {
    name: 'bigButton',
    path: 'big-button',
    component: BigButtonView,
    meta: { title: 'UIKit - Big Button' }
  },
  {
    name: 'colorButton',
    path: 'color-button',
    component: ColorButtonView,
    meta: { title: 'UIKit - Color Button' }
  },
  {
    name: 'backButton',
    path: 'back-button',
    component: BackButtonView,
    meta: { title: 'UIKit - Back Button' }
  },
  {
    name: 'tabText',
    path: 'tab-text',
    component: TabTextView,
    meta: { title: 'UIKit - Tab Text' }
  },
  {
    name: 'tabOutline',
    path: 'tab-outline',
    component: TabOutlineView,
    meta: { title: 'UIKit - Tab Outline' }
  },
  {
    name: 'tabFilled',
    path: 'tab-filled',
    component: TabFilledView,
    meta: { title: 'UIKit - Tab Filled' }
  },
  {
    name: 'singleTab',
    path: 'single-tab',
    component: TabSingleView,
    meta: { title: 'UIKit - Tab Single' }
  },
  {
    name: 'radio',
    path: 'radio',
    component: RadioView,
    meta: { title: 'UIKit - Radio' }
  },
  {
    name: 'inputbox',
    path: 'inputbox',
    component: InputTextView,
    meta: { title: 'UIKit - Text Input' }
  },
  {
    name: 'validationComponent',
    path: 'validation-component',
    component: InputTextValidationView,
    meta: { title: 'UIKit - Text Input With Validation' }
  },
  {
    name: 'date-time-picker',
    path: 'date-time-picker',
    component: DateTimePickerView,
    meta: { title: 'UIKit - Date Time Picker' }
  },
  {
    name: 'date-picker',
    path: 'date-picker',
    component: DatePickerView,
    meta: { title: 'UIKit - Date Picker' }
  },
  {
    name: 'textbox',
    path: 'textbox',
    component: TextBoxView,
    meta: { title: 'UIKit - Text Box' }
  },
  {
    name: 'body-text',
    path: 'body-text',
    component: BodyTextView,
    meta: { title: 'UIKit - Body Text' }
  },
  {
    name: 'editor',
    path: 'editor',
    component: EditorView,
    meta: { title: 'UIKit - Editor' }
  },
  {
    name: 'sub-color',
    path: 'sub-color',
    component: SubColorView,
    meta: { title: 'UIKit - Sub Color' }
  },
  {
    name: 'neutral',
    path: 'neutral',
    component: NeutralColorView,
    meta: { title: 'UIKit - Neutral Color' }
  },
  {
    name: 'close-icon',
    path: 'close-icon',
    component: CloseIconView,
    meta: { title: 'UIKit - Close Icon' }
  },
  {
    name: 'content-header',
    path: 'content-header',
    component: ContentHeaderView,
    meta: { title: 'UIKit - Content Header' }
  },
  {
    name: 'Tag',
    path: 'tag',
    component: TagView,
    meta: { title: 'UIKit - Tag' }
  },
  {
    name: 'Switch',
    path: 'switch',
    component: SwitchView,
    meta: { title: 'UIKit - Switch' }
  }
]
