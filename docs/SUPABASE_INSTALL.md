**Supabase CLI (Windows) — Quick Install**

1) Run the recommended PowerShell script from the repo (does not require admin):

```powershell
# from repo root
./scripts/install-supabase.ps1
```

2) After the script finishes, open a new PowerShell window and verify:

```powershell
supabase --version
supabase db push
```

If you prefer not to use the script, follow the manual steps in the script file.

If you want me to add a CI workflow to run migrations automatically, say `ci-workflow`.
