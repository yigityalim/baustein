# Security Policy

## Supported Versions

Currently, we support security updates for the latest version only:

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| < 0.2   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** (preferred)
   - Go to the Security tab
   - Click "Report a vulnerability"
   - Fill in the details

2. **Email** (alternative)
   - Send details to the project maintainer
   - Include "SECURITY" in the subject line

### What to Include

When reporting a vulnerability, please include:

- Type of vulnerability
- Step-by-step reproduction steps
- Affected versions
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity

### Disclosure Policy

- We will acknowledge your report within 48 hours
- We will keep you informed about the progress
- We will credit you in the fix (unless you prefer to remain anonymous)
- We will disclose the vulnerability after a fix is released

## Security Best Practices

### For Users

- Never commit `.env.local` files
- Rotate Supabase keys if accidentally exposed
- Use Row Level Security (RLS) policies in Supabase
- Keep dependencies up to date

### For Contributors

- Don't hardcode secrets in code
- Use environment variables for sensitive data
- Sanitize user input
- Follow secure coding practices
- Run `pnpm audit` regularly

## Known Security Considerations

### Supabase Keys

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose (it's public by design)
- RLS policies protect data even with exposed anon key
- Never expose service_role key in client-side code

### Authentication

- We use Supabase anonymous authentication
- Each user has their own isolated data via RLS
- No password storage or management needed

Thank you for helping keep Baustein secure! 🔒
