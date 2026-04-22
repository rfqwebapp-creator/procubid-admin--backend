const db = require("../config/db");

exports.getOrganizationDetails = (req, res) => {
  const { id } = req.params;

  const orgSql = `
    SELECT 
      id AS organization_id,
      company_name,
      email AS organization_email,
      role_type,
      sector,
      region,
      status
    FROM organizations
    WHERE id = ?
    LIMIT 1
  `;

  db.query(orgSql, [id], (orgErr, orgResult) => {
    if (orgErr) {
      console.error("GET ORGANIZATION ERROR:", orgErr);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch organization",
      });
    }

    if (!orgResult || orgResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const org = orgResult[0];

    const profileSql = `
      SELECT
        id AS company_profile_id,
        legal_name,
        address,
        country,
        phone,
        email,
        type,
        size,
        industry,
        reg_number,
        vat,
        inc_date,
        procurement_count,
        about,
        linkedin,
        twitter,
        facebook,
        instagram,
        youtube,
        nda_required,
        vendor_form_required,
        logo,
        cover_image,
        user_id
      FROM company_profile
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
    `;

    db.query(profileSql, [org.organization_email], (profileErr, profileResult) => {
      if (profileErr) {
        console.error("GET COMPANY PROFILE ERROR:", profileErr);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch company profile",
        });
      }

      const profile =
        profileResult && profileResult.length > 0 ? profileResult[0] : {};

      return res.status(200).json({
        success: true,
        data: {
          ...org,
          ...profile,
        },
      });
    });
  });
};