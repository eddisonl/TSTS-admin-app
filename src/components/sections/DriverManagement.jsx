import React, { useState } from "react";
import {
  CTable,
  CFormInput,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CBadge,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilFolderOpen, cilPencil, cilTask } from "@coreui/icons";

export default function DriverManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchDVManagement, setDVManagement] = useState("");
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
  const filteredDVMang = drivers.filter((d) =>
    Object.values(d)
      .join(" ")
      .toLowerCase()
      .includes(searchDVManagement.toLowerCase())
  );

  const totalItems = drivers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredDVMang.slice(startIndex, endIndex);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Driver Management</h2>
        <button className="btn-primary">Register Driver</button>
      </div>

      <CFormInput
        className="search-input"
        type="search"
        size="sm"
        placeholder="search violations..."
        value={searchDVManagement}
        onChange={(e) => {
          setDVManagement(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="table-container">
        <CTable striped hover className="data-table">
          <CTableHead color="danger">
            <CTableRow>
              <CTableHeaderCell>Driver Name</CTableHeaderCell>
              <CTableHeaderCell>License Number</CTableHeaderCell>
              <CTableHeaderCell>Rating</CTableHeaderCell>
              <CTableHeaderCell>Trips Completed</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell style={{ textAlign: "center" }}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((driver) => (
              <CTableRow key={driver.id}>
                <CTableHeaderCell className="font-semibold">
                  {driver.name}
                </CTableHeaderCell>
                <CTableHeaderCell>{driver.license}</CTableHeaderCell>
                <CTableHeaderCell>
                  <span className="stars">
                    {"⭐".repeat(Math.floor(driver.rating))}
                  </span>
                  {driver.rating}
                </CTableHeaderCell>
                <CTableHeaderCell>{driver.trips}</CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge
                    color={driver.status === "pending" ? "danger" : "success"}
                    className={`badge badge-${driver.status}`}
                  >
                    {driver.status.charAt(0).toUpperCase() +
                      driver.status.slice(1)}
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
                    <CIcon style={{ color: "blue" }} icon={cilFolderOpen} />
                    <CIcon style={{ color: "green" }} icon={cilTask} />
                  </span>
                </CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px" }}>
            {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems}
          </span>
          <CPagination size="sm">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
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
