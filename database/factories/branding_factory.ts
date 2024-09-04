import factory from '@adonisjs/lucid/factories'

import Branding from '#models/branding'

import { TenantFactory } from './tenant_factory.js'

export const BrandingFactory = factory
  .define(Branding, async ({ faker }) => {
    return {
      tenantId: 1,
      primaryColor: faker.color.hsl().toString(),
      secondaryColor: faker.color.hsl().toString(),
      logo: faker.image.urlLoremFlickr({ category: 'abstract' }),
      tagline: faker.lorem.sentence(),
    }
  })
  .relation('tenant', () => TenantFactory)
  .build()
