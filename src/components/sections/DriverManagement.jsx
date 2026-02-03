import React, { useState } from "react";
import { CTable, CTableHead, CTableBody, CTableRow,CTableHeaderCell, CBadge, CPagination, CPaginationItem} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPencil, cilTrash } from "@coreui/icons";

export default function DriverManagement() {
  const [drivers] = useState([
    {
      id: 1,
      name: "Kwesi Mensah",
      license: "DR-12345",
      rating: 4.8,
      trips: 1250,
      status: "verified",
    },
    {
      id: 2,
      name: "Ama Boateng",
      license: "DR-12346",
      rating: 4.9,
      trips: 980,
      status: "verified",
    },
    {
      id: 3,
      name: "Isaac Owusu",
      license: "DR-12347",
      rating: 4.5,
      trips: 567,
      status: "pending",
    },
    {
      id: 4,
      name: "Isaac Sampson",
      license: "DR-12347",
      rating: 4.5,
      trips: 567,
      status: "pending",
    },
  ]);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Driver Management</h2>
        <button className="btn-primary">Register Driver</button>
      </div>

      <div className="table-container">
        <CTable striped hover className="data-table">
          <CTableHead color="danger">
            <CTableRow>
              <CTableHeaderCell>Driver Name</CTableHeaderCell>
              <CTableHeaderCell>License Number</CTableHeaderCell>
              <CTableHeaderCell>Rating</CTableHeaderCell>
              <CTableHeaderCell>Trips Completed</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {drivers.map((driver) => (
              <CTableRow key={driver.id}>
                <CTableHeaderCell className="font-semibold">{driver.name}</CTableHeaderCell>
                <CTableHeaderCell>{driver.license}</CTableHeaderCell>
                <CTableHeaderCell>
                  <span className="stars">
                    {"⭐".repeat(Math.floor(driver.rating))}
                  </span>
                  {driver.rating}
                </CTableHeaderCell>
                <CTableHeaderCell>{driver.trips}</CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge color={driver.status === "pending" ? "danger" : "success"} className={`badge badge-${driver.status}`}>
                    {driver.status.charAt(0).toUpperCase() +
                      driver.status.slice(1)}
                  </CBadge>
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Verify</button>
                </CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <span style={{fontSize:'11px'}}>
          {} of {}
        </span>
                <CPagination size="sm" aria-label="Page navigation example">
              <CPaginationItem aria-label="Previous" disabled>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              <CPaginationItem active>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
      </div>
      </div>
    </div>
  );
}
