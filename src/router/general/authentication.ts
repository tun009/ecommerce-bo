import {
  AuthLoginPage,
  AuthEmailVerificationPage,
  AuthLoginInformCompletedPage,
  AuthEmailVerificationSuccessPage,
  AuthEmailVerificationFailPage,
  AuthChangePasswordPage,
  AuthUserInformationPage,
  AuthEditUserInformationPage
} from '@/views'

export const authRoutes = [
  {
    name: 'login',
    path: 'login',
    component: AuthLoginPage,
    meta: {
      title: 'Login'
    }
  },
  {
    name: 'change-password',
    path: 'change-password',
    component: AuthChangePasswordPage,
    meta: {
      title: 'Change Password'
    }
  },
  {
    name: '메가존 플레이 / 인증 완료',
    path: 'email-verification-success',
    component: AuthEmailVerificationSuccessPage,
    meta: {
      title: 'Verification Success'
    }
  },
  {
    name: 'user-information',
    path: 'user-information',
    component: AuthUserInformationPage,
    meta: {
      title: 'User Information'
    }
  },
  {
    name: 'edit-user-information',
    path: 'edit-user-information',
    component: AuthEditUserInformationPage,
    meta: {
      title: 'Edit User Information'
    }
  },
  {
    name: 'email-verification-error',
    path: 'email-verification-error',
    component: AuthEmailVerificationFailPage,
    meta: {
      title: 'Verification Fail'
    }
  },
  {
    name: 'email-verification',
    path: 'email-verification',
    component: AuthEmailVerificationPage,
    meta: {
      title: 'Verification'
    }
  },
  {
    name: 'email-verification-first-login',
    path: 'email-verification-first-login',
    component: AuthLoginInformCompletedPage,
    meta: {
      title: 'Login Completed'
    }
  }
]
