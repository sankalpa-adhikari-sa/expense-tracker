/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PrivateImport } from './routes/_private'
import { Route as IndexImport } from './routes/index'
import { Route as PrivateDashboardImport } from './routes/_private/dashboard'
import { Route as PrivateTransactionmethodImport } from './routes/_private/_transaction_method'
import { Route as PrivateSettingsImport } from './routes/_private/_settings'
import { Route as PrivateIncomeImport } from './routes/_private/_income'
import { Route as PrivateExpenseImport } from './routes/_private/_expense'
import { Route as PrivateContactsImport } from './routes/_private/_contacts'
import { Route as PrivateCategoryImport } from './routes/_private/_category'
import { Route as authenticationAuthenticationImport } from './routes/(authentication)/authentication'
import { Route as PrivateEventsIndexImport } from './routes/_private/events/index'
import { Route as PrivateBudgetingIndexImport } from './routes/_private/budgeting/index'
import { Route as PrivateEventsEventsIdImport } from './routes/_private/events/$eventsId'
import { Route as PrivateTransactionmethodTransactionmethodImport } from './routes/_private/_transaction_method/transaction_method'
import { Route as PrivateSettingsSettingsImport } from './routes/_private/_settings/settings'
import { Route as PrivateIncomeIncomeImport } from './routes/_private/_income/income'
import { Route as PrivateExpenseExpenseImport } from './routes/_private/_expense/expense'
import { Route as PrivateContactsContactsImport } from './routes/_private/_contacts/contacts'
import { Route as PrivateCategoryCategoryImport } from './routes/_private/_category/category'
import { Route as PrivateEventsEventsIdDashboardImport } from './routes/_private/events/$eventsId.dashboard'
import { Route as PrivateEventsEventsIdBudgetingImport } from './routes/_private/events/$eventsId.budgeting'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const PrivateRoute = PrivateImport.update({
  id: '/_private',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PrivateDashboardRoute = PrivateDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateTransactionmethodRoute = PrivateTransactionmethodImport.update({
  id: '/_transaction_method',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateSettingsRoute = PrivateSettingsImport.update({
  id: '/_settings',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateIncomeRoute = PrivateIncomeImport.update({
  id: '/_income',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateExpenseRoute = PrivateExpenseImport.update({
  id: '/_expense',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateContactsRoute = PrivateContactsImport.update({
  id: '/_contacts',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateCategoryRoute = PrivateCategoryImport.update({
  id: '/_category',
  getParentRoute: () => PrivateRoute,
} as any)

const authenticationAuthenticationRoute =
  authenticationAuthenticationImport.update({
    path: '/authentication',
    getParentRoute: () => rootRoute,
  } as any)

const PrivateEventsIndexRoute = PrivateEventsIndexImport.update({
  path: '/events/',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateBudgetingIndexRoute = PrivateBudgetingIndexImport.update({
  path: '/budgeting/',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateEventsEventsIdRoute = PrivateEventsEventsIdImport.update({
  path: '/events/$eventsId',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateTransactionmethodTransactionmethodRoute =
  PrivateTransactionmethodTransactionmethodImport.update({
    path: '/transaction_method',
    getParentRoute: () => PrivateTransactionmethodRoute,
  } as any)

const PrivateSettingsSettingsRoute = PrivateSettingsSettingsImport.update({
  path: '/settings',
  getParentRoute: () => PrivateSettingsRoute,
} as any)

const PrivateIncomeIncomeRoute = PrivateIncomeIncomeImport.update({
  path: '/income',
  getParentRoute: () => PrivateIncomeRoute,
} as any)

const PrivateExpenseExpenseRoute = PrivateExpenseExpenseImport.update({
  path: '/expense',
  getParentRoute: () => PrivateExpenseRoute,
} as any)

const PrivateContactsContactsRoute = PrivateContactsContactsImport.update({
  path: '/contacts',
  getParentRoute: () => PrivateContactsRoute,
} as any)

const PrivateCategoryCategoryRoute = PrivateCategoryCategoryImport.update({
  path: '/category',
  getParentRoute: () => PrivateCategoryRoute,
} as any)

const PrivateEventsEventsIdDashboardRoute =
  PrivateEventsEventsIdDashboardImport.update({
    path: '/dashboard',
    getParentRoute: () => PrivateEventsEventsIdRoute,
  } as any)

const PrivateEventsEventsIdBudgetingRoute =
  PrivateEventsEventsIdBudgetingImport.update({
    path: '/budgeting',
    getParentRoute: () => PrivateEventsEventsIdRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_private': {
      preLoaderRoute: typeof PrivateImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/(authentication)/authentication': {
      preLoaderRoute: typeof authenticationAuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_private/_category': {
      preLoaderRoute: typeof PrivateCategoryImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_contacts': {
      preLoaderRoute: typeof PrivateContactsImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_expense': {
      preLoaderRoute: typeof PrivateExpenseImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_income': {
      preLoaderRoute: typeof PrivateIncomeImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_settings': {
      preLoaderRoute: typeof PrivateSettingsImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_transaction_method': {
      preLoaderRoute: typeof PrivateTransactionmethodImport
      parentRoute: typeof PrivateImport
    }
    '/_private/dashboard': {
      preLoaderRoute: typeof PrivateDashboardImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_category/category': {
      preLoaderRoute: typeof PrivateCategoryCategoryImport
      parentRoute: typeof PrivateCategoryImport
    }
    '/_private/_contacts/contacts': {
      preLoaderRoute: typeof PrivateContactsContactsImport
      parentRoute: typeof PrivateContactsImport
    }
    '/_private/_expense/expense': {
      preLoaderRoute: typeof PrivateExpenseExpenseImport
      parentRoute: typeof PrivateExpenseImport
    }
    '/_private/_income/income': {
      preLoaderRoute: typeof PrivateIncomeIncomeImport
      parentRoute: typeof PrivateIncomeImport
    }
    '/_private/_settings/settings': {
      preLoaderRoute: typeof PrivateSettingsSettingsImport
      parentRoute: typeof PrivateSettingsImport
    }
    '/_private/_transaction_method/transaction_method': {
      preLoaderRoute: typeof PrivateTransactionmethodTransactionmethodImport
      parentRoute: typeof PrivateTransactionmethodImport
    }
    '/_private/events/$eventsId': {
      preLoaderRoute: typeof PrivateEventsEventsIdImport
      parentRoute: typeof PrivateImport
    }
    '/_private/budgeting/': {
      preLoaderRoute: typeof PrivateBudgetingIndexImport
      parentRoute: typeof PrivateImport
    }
    '/_private/events/': {
      preLoaderRoute: typeof PrivateEventsIndexImport
      parentRoute: typeof PrivateImport
    }
    '/_private/events/$eventsId/budgeting': {
      preLoaderRoute: typeof PrivateEventsEventsIdBudgetingImport
      parentRoute: typeof PrivateEventsEventsIdImport
    }
    '/_private/events/$eventsId/dashboard': {
      preLoaderRoute: typeof PrivateEventsEventsIdDashboardImport
      parentRoute: typeof PrivateEventsEventsIdImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PrivateRoute.addChildren([
    PrivateCategoryRoute.addChildren([PrivateCategoryCategoryRoute]),
    PrivateContactsRoute.addChildren([PrivateContactsContactsRoute]),
    PrivateExpenseRoute.addChildren([PrivateExpenseExpenseRoute]),
    PrivateIncomeRoute.addChildren([PrivateIncomeIncomeRoute]),
    PrivateSettingsRoute.addChildren([PrivateSettingsSettingsRoute]),
    PrivateTransactionmethodRoute.addChildren([
      PrivateTransactionmethodTransactionmethodRoute,
    ]),
    PrivateDashboardRoute,
    PrivateEventsEventsIdRoute.addChildren([
      PrivateEventsEventsIdBudgetingRoute,
      PrivateEventsEventsIdDashboardRoute,
    ]),
    PrivateBudgetingIndexRoute,
    PrivateEventsIndexRoute,
  ]),
  AboutLazyRoute,
  authenticationAuthenticationRoute,
])

/* prettier-ignore-end */
