<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'
import { Link, router, usePage } from '@inertiajs/vue3'

import { computed, watch } from 'vue'

import {
  BriefcaseBusiness,
  CircleUser,
  Handshake,
  LayoutDashboard,
  Menu,
  Newspaper,
  Package2,
  PocketKnife,
  Search,
  Settings,
  User,
} from 'lucide-vue-next'

import { toast } from '~/components/base/toast/use-toast'

const page = usePage<SharedProps>()

const user = computed(() => page.props.user)

const tenant = computed(() => page.props.tenant)

const notification = computed(() => page.props.notification)

watch(notification, (newValue) => {
  if (!newValue) return
  toast({ ...notification.value })
})

function logout() {
  router.post('logout')
}

const navLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Batches', href: '/batches', icon: Newspaper },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseBusiness },
  { name: 'Candidates', href: '/candidates', icon: User },
  { name: 'Skills', href: '/skills', icon: PocketKnife },
  { name: 'Agents', href: '/agents', icon: Handshake },
  { name: 'Settings', href: '/settings', icon: Settings },
]

function isActiveLink(linkHref: string) {
  const currentUrl = page.url
  return currentUrl === linkHref || (linkHref !== '/' && currentUrl.startsWith(linkHref))
}
</script>

<template>
  <Toaster />
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <!-- Sidebar -->
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="sticky top-0 flex h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span>{{ tenant.title }}</span>
          </a>
        </div>
        <div class="flex-1">
          <nav class="grid items-start space-y-1 px-2 py-2 text-sm font-medium lg:px-4">
            <Link
              v-for="link in navLinks"
              :key="link.name"
              :href="link.href"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              :class="
                isActiveLink(link.href)
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground hover:text-primary'
              "
            >
              <component :is="link.icon" class="h-4 w-4" />
              {{ link.name }}
            </Link>
          </nav>
        </div>
        <div class="mt-auto p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full"> Upgrade </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <!-- Top Navigation -->
      <header
        class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 backdrop-blur supports-[backdrop-filter]:bg-muted/40 lg:h-[60px] lg:px-6"
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby="nav-links" side="left" class="flex flex-col">
            <SheetHeader>
              <Link href="#" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </Link>
            </SheetHeader>
            <nav class="grid gap-2 text-lg font-medium">
              <Link
                v-for="link in navLinks"
                :key="link.name"
                :href="link.href"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                :class="
                  isActiveLink(link.href)
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-muted-foreground hover:text-foreground'
                "
              >
                <component :is="link.icon" class="h-5 w-5" />
                {{ link.name }}
              </Link>
            </nav>
            <SheetFooter class="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SheetClose as-child>
                    <Button size="sm" class="w-full"> Upgrade </Button>
                  </SheetClose>
                </CardContent>
              </Card>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Avatar v-if="user.image" id="user-avatar" class="cursor-pointer">
              <AvatarImage :src="user.image" :alt="user.firstName + ' ' + user.lastName" />
              <AvatarFallback>{{ user.firstName[0] + user.lastName[0] }}</AvatarFallback>
            </Avatar>
            <Button v-else id="user-avatar" variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <!-- Note: Page Content -->
      <slot />
    </div>
  </div>
</template>
