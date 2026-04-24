exports.getTenderById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      r.*,
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
      COALESCE(
        NULLIF(rc.companyName, ''),
        NULLIF(TRIM(CONCAT(COALESCE(rc.firstName, ''), ' ', COALESCE(rc.lastName, ''))), ''),
        'Unknown Buyer'
      ) AS buyer
    FROM rfqs r
    LEFT JOIN RegCustomers rc
      ON r.user_id = rc.id
    WHERE r.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (error, rows) => {
    if (error) {
      console.error("GET TENDER BY ID ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching tender details",
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tender not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  });
};