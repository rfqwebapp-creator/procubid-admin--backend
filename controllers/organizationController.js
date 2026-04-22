const db = require("../config/db");

exports.getOrganizationDetails = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      o.id AS organization_id,
      o.company_name,
      o.email AS organization_email,
      o.role_type,
      o.sector,
      o.region,
      o.status,

      cp.id AS company_profile_id,
      cp.legal_name,
      cp.address,
      cp.country,
      cp.phone,
      cp.email,
      cp.type,
      cp.size,
      cp.industry,
      cp.reg_number,
      cp.vat,
      cp.inc_date,
      cp.procurement_count,
      cp.about,
      cp.linkedin,
      cp.twitter,
      cp.facebook,
      cp.instagram,
      cp.youtube,
      cp.nda_required,
      cp.vendor_form_required,
      cp.logo,
      cp.cover_image,
      cp.user_id
    FROM organizations o
    LEFT JOIN company_profile cp 
      WHERE email = o.email
    WHERE o.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("GET ORGANIZATION DETAILS ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch organization details",
      });
    }

        console.log("Requested organization id:", id);
    console.log("Organization details result:", result);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    return res.json({
      success: true,
      data: result[0],
    });
  });
};