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
import { cilPen, cilPencil, cilTrash } from "@coreui/icons";

export default function VehicleManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchVehicles, setSearchVehicles] = useState("");
  const [vehicles] = useState([
    {
      id: 1,
      plate: "GT-2345",
      model: "Sprinter",
      capacity: 14,
      driver: "Kwesi Mensah",
      status: "active",
    },
    {
      id: 2,
      plate: "GT-2346",
      model: "Hiace",
      capacity: 16,
      driver: "Ama Boateng",
      status: "active",
    },
    {
      id: 3,
      plate: "GT-2347",
      model: "Sprinter",
      capacity: 14,
      driver: "Isaac Owusu",
      status: "maintenance",
    },
  ]);
  const filteredVehicles = vehicles.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(searchVehicles.toLowerCase())
  );

  const totalItems = vehicles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredVehicles.slice(startIndex, endIndex);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Vehicle Management</h2>
        <button className="btn-primary">Register New Vehicle</button>
      </div>

      <CFormInput
        className="search-input"
        type="search"
        size="sm"
        placeholder="search vehicles..."
        value={searchVehicles}
        onChange={(e) => {
          setSearchVehicles(e.target.value);
          setCurrentPage(1);
        }}
      />
      <CTable striped hover className="data-table">
        <CTableHead color="danger">
          <CTableRow>
            <CTableHeaderCell scope="col">Plate Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Model</CTableHeaderCell>
            <CTableHeaderCell scope="col">Capacity</CTableHeaderCell>
            <CTableHeaderCell scope="col">Driver</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentItems.map((vehicle) => (
            <CTableRow key={vehicle.id}>
              <CTableHeaderCell>{vehicle.plate}</CTableHeaderCell>
              <CTableHeaderCell>{vehicle.model}</CTableHeaderCell>
              <CTableHeaderCell>{vehicle.capacity} seats</CTableHeaderCell>
              <CTableHeaderCell>{vehicle.driver}</CTableHeaderCell>
              <CTableHeaderCell>
                <CBadge
                  color={
                    vehicle.status === "maintenance" ? "primary" : "success"
                  }
                  className={`badge badge-${vehicle.status}`}
                >
                  {vehicle.status.charAt(0).toUpperCase() +
                    vehicle.status.slice(1)}
                </CBadge>
              </CTableHeaderCell>
              <CTableHeaderCell style={{ gap: "1em" }}>
                <span
                  style={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "center",
                  }}
                >
                  <button type="button" className="action-btn">
                    <CIcon style={{ color: "red" }} icon={cilTrash} />
                  </button>
                  <button type="button" className="action-btn">
                    <CIcon style={{ color: "blue" }} icon={cilPencil} />
                  </button>
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
  );
}
