import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true
    },
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage/test-report',
      include: [
        'components/**/*.{ts,js,vue}',
        'composables/**/*.{ts,js}',
        'utils/**/*.{ts,js}',
        'pages/**/*.vue'
      ],
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/.nuxt/**',
        '**/tests/**',
        '**/mock/**'
      ],
      thresholds: {
        lines: 61,
        functions: 71,
        branches: 80,
        statements: 61
      }
    },
    globals: true,
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom'
      }
    }
  }
})
