import { TabPanelProps } from 'primevue/tabpanel'
import { TabViewChangeEvent, TabViewClickEvent, TabViewProps } from 'primevue/tabview'
export interface CloseTabPayload {
  tabIndex: number
  isTabDisabled?: boolean
}
export interface WelfareTabProps extends TabViewProps {
  wfTabPanelProps: TabPanelProps[]
}

export interface WelfareTabEmits {
  (e: 'tab-change', event: TabViewChangeEvent): void
  (e: 'tab-click', event: TabViewClickEvent): void
}

export interface WelfareSingeTabEmits extends WelfareTabEmits {
  (e: 'tab-close', closeTabPayload: CloseTabPayload): void
}

export interface WelfareTabUnderlineProps extends WelfareTabProps {
  activeSmall?: boolean
}

export interface WelfareTabSlots {
  'wf-tab-text-content': (params: {tabIndex: number}) => void
}
