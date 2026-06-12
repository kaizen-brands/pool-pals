import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:4321';
const vercelBypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

let useVercelBypass = false;
if (vercelBypassSecret) {
  try {
    const { hostname, protocol } = new URL(baseURL);
    useVercelBypass =
      protocol === 'https:' && (hostname === 'vercel.app' || hostname.endsWith('.vercel.app'));
  } catch {
    useVercelBypass = false;
  }
}

const vercelBypassHeaders: Record<string, string> | undefined = useVercelBypass && vercelBypassSecret
  ? {
      'x-vercel-protection-bypass': vercelBypassSecret,
      'x-vercel-set-bypass-cookie': 'true',
    }
  : undefined;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    ...(vercelBypassHeaders
      ? {
          extraHTTPHeaders: vercelBypassHeaders,
        }
      : {}),
  },
  projects: [
    {
      name: 'chromium-public',
      testMatch: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'pnpm dev --host 127.0.0.1',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
      },
});
