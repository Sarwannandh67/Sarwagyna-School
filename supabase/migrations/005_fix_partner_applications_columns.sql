-- Migrate any existing data from org_name into company_name, then drop org_name
UPDATE partner_applications SET company_name = org_name WHERE company_name IS NULL;
ALTER TABLE partner_applications DROP COLUMN IF EXISTS org_name;
