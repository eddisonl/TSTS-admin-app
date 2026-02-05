import React, { useState } from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CBadge,
  CPagination,
  CPaginationItem,
  CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cibReadme, cilPen, cilPencil, cilTrash } from "@coreui/icons";

export default function ComplianceTracking() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchViolation, setSearchViolation] = useState("");

  const [violations] = useState([
    {
      id: 1,
      vehicle: "GT-2345",
      driver: "Kwesi Mensah",
      violation: "Speeding",
      date: "2024-01-12",
      status: "resolved",
    },
    {
      id: 2,
      vehicle: "GT-2346",
      driver: "Ama Boateng",
      violation: "Overloading",
      date: "2024-01-10",
      status: "pending",
    },
    {
      id: 3,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 4,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 5,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 6,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 7,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 8,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 9,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 10,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 11,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
    {
      id: 12,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
  ]);

  const filteredViolations = violations.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(searchViolation.toLowerCase())
  );

  const totalItems = violations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredViolations.slice(startIndex, endIndex);

  return (
    <div className="section">
      <h2 className="section-title">Compliance Tracking</h2>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
        className="compliance-stats"
      >
        <div className="compliance-card">
          <p className="text-sm text-400">Total Violations</p>
          <p className="text-3xl font-bold">47</p>
        </div>
        <div className="compliance-card">
          <p className="text-sm text-400">Pending Issues</p>
          <p className="text-3xl font-bold text-orange-500">12</p>
        </div>
        <div className="compliance-card">
          <p className="text-sm text-400">Resolved</p>
          <p className="text-3xl font-bold text-green-500">35</p>
        </div>
      </div>

      <CFormInput
        className="search-input"
        type="search"
        size="sm"
        placeholder="search violations..."
        value={searchViolation}
        onChange={(e) => {
          setSearchViolation(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="table-container">
        {/* <span style={{height:"18em", overflowY:"scroll", display:'flex', flexDirection:'column'}}> */}
        <CTable striped hover className="data-table">
          <CTableHead color="danger">
            <CTableRow>
              <CTableHeaderCell>Vehicle</CTableHeaderCell>
              <CTableHeaderCell>Driver</CTableHeaderCell>
              <CTableHeaderCell>Violation Type</CTableHeaderCell>
              <CTableHeaderCell>Date Reported</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell style={{ textAlign: "center" }}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((violation) => (
              <CTableRow key={violation.id}>
                <CTableHeaderCell className="font-semibold">
                  {violation.vehicle}
                </CTableHeaderCell>
                <CTableHeaderCell>{violation.driver}</CTableHeaderCell>
                <CTableHeaderCell>{violation.violation}</CTableHeaderCell>
                <CTableHeaderCell>{violation.date}</CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge
                    color={
                      violation.status === "pending" ? "danger" : "success"
                    }
                    className={`badge badge-${violation.status}`}
                  >
                    {violation.status.charAt(0).toUpperCase() +
                      violation.status.slice(1)}
                  </CBadge>
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <span
                    style={{
                      display: "flex",
                      gap: "1em",
                      justifyContent: "center",
                    }}
                  >
                    <CIcon
                      className="action-btn"
                      style={{ color: "red" }}
                      icon={cilTrash}
                    />
                    <CIcon
                      className="action-btn"
                      style={{ color: "blue" }}
                      icon={cibReadme}
                    />
                  </span>
                </CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        {/* </span> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ fontSize: "11px" }}>
            {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems}
          </span>
          <CPagination size="sm">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &laquo;
            </CPaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <CPaginationItem
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </CPaginationItem>
              );
            })}

            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &raquo;
            </CPaginationItem>
          </CPagination>
        </div>
      </div>
    </div>
  );
}
