const db = require("../config/db");

exports.getAdminTenders = async (req, res) => {
  try {
    const sql = `
      SELECT
        r.id,
        CONCAT(
          UPPER(COALESCE(r.requisition_type, 'RFX')),
          '-',
          LPAD(r.id, 3, '0')
        ) AS rfx_no,
        r.heading AS tender_name,
        COALESCE(
          NULLIF(rc.companyName, ''),
          NULLIF(TRIM(CONCAT(COALESCE(rc.firstName, ''), ' ', COALESCE(rc.lastName, ''))), ''),
          'N/A'
        ) AS buyer,
        COALESCE(r.classification, 'N/A') AS classification
      FROM rfqs r
      LEFT JOIN RegCustomers rc
        ON r.user_id = rc.id
      ORDER BY r.id DESC
    `;

    const [rows] = await db.query(sql);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("GET ADMIN TENDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tenders",
      error: error.message,
    });
  }
};