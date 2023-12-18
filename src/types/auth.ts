export enum LoginFormFieldName {
  Email = 'email',
}

export enum LoginFormFieldPlaceholder {
  Email = 'E-mail',
}

export interface LoginFormValues {
  [LoginFormFieldName.Email]: string
}
