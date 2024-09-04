import factory from '@adonisjs/lucid/factories'

import Tenant from '#models/tenant'

import { BrandingFactory } from './branding_factory.js'

let tenantCounter = 0

export const TenantFactory = factory
  .define(Tenant, async ({ faker }) => {
    tenantCounter++

    return {
      name: faker.company.name(),
      title: faker.company.buzzPhrase(),
      subdomain: tenantCounter === 1 ? 'localhost' : faker.internet.domainName(), // Set 'localhost' for the first tenant
      companyWebsite: faker.internet.url(),
      feedbackEmail: faker.internet.email().toLowerCase(),
    }
  })
  .relation('branding', () => BrandingFactory)
  .build()
