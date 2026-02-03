import React, { useState } from "react";
import { CTable, CTableHead, CTableBody, CTableRow,CTableHeaderCell, CBadge, CPagination, CPaginationItem} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilPencil, cilTrash } from "@coreui/icons";

export default function VehicleManagement() {
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

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Vehicle Management</h2>
        <button className="btn-primary">Register New Vehicle</button>
      </div>

        <CTable striped hover className="data-table" >
          <CTableHead color="danger">
            <CTableRow>
              <CTableHeaderCell scope="col">Plate Number</CTableHeaderCell >
              <CTableHeaderCell scope="col">Model</CTableHeaderCell >
              <CTableHeaderCell scope="col">Capacity</CTableHeaderCell >
              <CTableHeaderCell scope="col" >Driver</CTableHeaderCell >
              <CTableHeaderCell scope="col">Status</CTableHeaderCell >
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {vehicles.map((vehicle) => (
              <CTableRow key={vehicle.id}>
                <CTableHeaderCell >{vehicle.plate}</CTableHeaderCell>
                <CTableHeaderCell >{vehicle.model}</CTableHeaderCell >
                <CTableHeaderCell >{vehicle.capacity} seats</CTableHeaderCell >
                <CTableHeaderCell >{vehicle.driver}</CTableHeaderCell >
                <CTableHeaderCell >
                  <CBadge color={ vehicle.status === "maintenance" ? "primary" : "success"} className={`badge badge-${vehicle.status}`}>
                    {vehicle.status.charAt(0).toUpperCase() +
                      vehicle.status.slice(1)}
                  </CBadge>
                </CTableHeaderCell >
                <CTableHeaderCell style={{display:'flex', justifyContent:'space-between'}} >
                  <button type="button" className="action-btn"><CIcon style={{color:"red"}} icon={cilTrash}/></button>
                  <button type="button" className="action-btn"><CIcon style={{color:"blue"}} icon={cilPencil}/></button>
                </CTableHeaderCell >
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
  );
}
