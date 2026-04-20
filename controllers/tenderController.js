const db = require("../config/db");

exports.getAdminTenders = (req, res) => {
  const sql = `
    SELECT
      r.id,
      CONCAT(
        UPPER(
          CASE 
            WHEN r.requisition_type IS NULL OR r.requisition_type = '' 
            THEN 'RFX'
            ELSE r.requisition_type
          END
        ),
        '-',
        LPAD(r.id, 3, '0')
      ) AS rfx_no,
      r.heading AS tender_name,
      COALESCE(
        NULLIF(rc.companyName, ''),
        NULLIF(TRIM(CONCAT(COALESCE(rc.firstName, ''), ' ', COALESCE(rc.lastName, ''))), ''),
        'Unknown Buyer'
      ) AS buyer,
      COALESCE(NULLIF(r.classification, ''), 'N/A') AS classification
    FROM rfqs r
    LEFT JOIN RegCustomers rc
      ON r.user_id = rc.id
    ORDER BY r.id DESC
  `;

  db.query(sql, (error, rows) => {
    if (error) {
      console.error("GET ADMIN TENDERS ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching tenders",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  });
};