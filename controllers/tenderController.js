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
      COALESCE(NULLIF(r.selected_industry, ''), 'N/A') AS classification,
COALESCE(r.status, 'DRAFT') AS status,
COALESCE(r.is_blocked, 0) AS is_blocked
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

exports.deleteTender = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM rfqs WHERE id = ?";

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("DELETE TENDER ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete RFQ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "RFQ deleted successfully",
    });
  });
};

exports.suspendTender = (req, res) => {
  const { id } = req.params;
  const { is_blocked } = req.body;

  const sql = "UPDATE rfqs SET is_blocked = ? WHERE id = ?";

  db.query(sql, [is_blocked, id], (error) => {
    if (error) {
      console.error("BLOCK RFQ ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update RFQ block status",
      });
    }

    return res.status(200).json({
      success: true,
      message: "RFQ block status updated successfully",
    });
  });
};