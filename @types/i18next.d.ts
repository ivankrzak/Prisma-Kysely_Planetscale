/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import type admin from '../public/locales/en/admin.json'
import type common from '../public/locales/en/common.json'
import type error from '../public/locales/en/error.json'
import type hello from '../public/locales/en/hello.json'
import type member from '../public/locales/en/member.json'
import 'i18next'

interface I18nNamespaces {
  admin: typeof admin
  common: typeof common
  error: typeof error
  hello: typeof hello
  member: typeof member
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
