# Project Notes

## DNS Configuration

- **Backend**:

  - Domain: `api.sarahcodes.xyz`
  - DNS: `A` record pointing to `24.144.104.232`

- **Frontend**:
  - Domain: `sarahcodes.xyz`
  - DNS: `A` record pointing to the IP address or `CNAME` record pointing to the FQDN provided by DigitalOcean App Platform

## Next Steps

1. **Internal Domain Testing**:

   - Iyyaz will configure an internal domain pointing to `192.168.0.29` - (**This test has been completed**)

2. **TLS Certificate with Caddyserver**: (**This option is no longer required**)
   - Caddyserver will be set up to issue TLS certificates.
   - **Note**: Caddyserver requires a valid domain name to issue a TLS certificate.

## Additional Systems for Reference

1. [Symfony API Platform](https://api-platform.com)
2. [Kong API Gateway by Kong Inc](https://konghq.com)

## AOB (Any Other Business)

- Consultant's GitHub account: `CobraSphere-IB`

## Key Observations

1. **Docker Image Rebuild**:  
   Docker images must be rebuilt whenever Python code changes, as hot-reloading is not enabled in production mode (`docker-compose.prod.yml`). This is expected behavior in production environments.

## Suggested Improvements

### 1. Finalize Endpoint Strategy

#### Suggested Route Setup

|                  Route | DNS Target                | Served by Component | Comment                                                                                                                       |
| ---------------------: | ------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
|       `sarahcodes.xyz` | `{React Deployment Host}` | React Frontend      |                                                                                                                               |
|   `api.sarahcodes.xyz` | `24.144.104.232`          | Django Backend      |                                                                                                                               |
| `admin.sarahcodes.xyz` | `24.144.104.232`          | Django Backend      | Use NGINX to map `admin.sarahcodes.xyz` to `http://web:8000/admin`. This may require updates in `urls.py` to handle the route |

### 2. Rework Docker Compose Configuration

- **Base Configuration**:  
  Use `docker-compose.yml` as the base configuration common across all environments.
  
- **Development Override**:  
  Use `docker-compose.override.yml` for development mode overrides (automatic without the `-f` switch).
  
- **Production Configuration**:  
  Use `docker-compose.prod.yml` for production-specific changes. Ensure production deployments do not require rebuilding Docker images unnecessarily. Instead, leverage a CI/CD pipeline that builds and pushes Docker images automatically when commits are merged to the `main` (or `master`) branch.

### 3. Rework `Makefile` (if applicable)

- Ensure the `Makefile` reflects the changes in Docker Compose configurations.

### 4. Improve Environment Variable Management

- **Allowlist Variables**:  
  Rework `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CORS_ORIGINS_WHITELIST`, `CSRF_TRUSTED_ORIGINS`, and `CSRF_ALLOWED_ORIGINS` so that they can be configured through environment variables.

### 5. Enable TLS Termination on All Routes

- Ensure TLS is terminated at all endpoints (frontend, backend, and admin).

### 6. Maintain `.env.example`

- Provide an `.env.example` in the project root or component subfolders as needed.  
- Ensure sensitive secrets (such as `.env.prod`) are not committed to the repository.
  
- **Security Best Practice**:  
  - Remove sensitive secrets from Git history or regenerate them.  
  - Use `.gitignore` to ensure future sensitive secrets are not committed.
