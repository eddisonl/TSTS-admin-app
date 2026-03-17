import React, { useState } from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
  CPagination,
  CPaginationItem,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormSwitch,
  CFormTextarea
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cibReadme, cilPen, cilPencil, cilTrash } from "@coreui/icons";
import { toast } from "react-toastify";

const InitialData = {
  vehicleName : "",
  violationType:"",
  driverName : "",
  status : false,
  reportText: "",
  dateReported : "",
  vehicleModels : "",
  plateNumber : ""
}

export default function ComplianceTracking() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchViolation, setSearchViolation] = useState("");
  const [formData, setFormData] = useState(InitialData)
  const [openModal, setOpenModal] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  console.log("formData :", formData)
  const [violations, setViolations] = useState([
    {
      id: 1,
      vehicleName: "Toyota Sprinter",
      driverName: "Kwesi Mensah",
      violationType: "Speeding",
      dateReported: "2024-01-12",
      status: "resolved",
      vehicleModels:"Sedan",
      plateNumber: "GA-2368-15",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 2,
      vehicleName: "Toyota Yaris",
      driverName: "Ama Boateng",
      violationType: "Overloading",
      dateReported: "2024-01-10",
      status: "pending",
      vehicleModels:"Sedan",
      plateNumber: "GS-1234-16",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 3,
      vehicleName: "MAN-Lions's Coach",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"Coach / Intercity",
      plateNumber: "GT-1357-13",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 4,
      vehicleName: "Mercedes-Benz - Tourismo",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "pending",
      vehicleModels:"Coach / Intercity",
        plateNumber: "GW-3698-24",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 5,
      vehicleName: "KIA Carnival",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"Minivan / People Carrier",
        plateNumber: "GE-222-25",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 6,
      vehicleName: "Volvo",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"City Bus",
        plateNumber: "GW-1858-22",
      reportText: "This was a tragic accident caused by over speeding the limit of 70km/ph"
    },
    {
      id: 7,
      vehicleName: "Daewoo Matiz",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"Sedan",
        plateNumber: "UW-6658-17",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 8,
      vehicleName: "YUTONG",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"City Bus",
        plateNumber: "EA-1127-18",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
    {
      id: 9,
      vehicleName: "Wrightbus-streetDeck",
      driverName: "Isaac Owusu",
      violationType: "Missing Documents",
      dateReported: "2024-01-08",
      status: "resolved",
      vehicleModels:"Double-Decker",
        plateNumber: "GN-8753-15",
      reportText: "This was a tragic accident caused by over speeding the limit of 50km/ph"
    },
  ]);

  const [vehicleModel] = useState([
    {id: 1, label:"Sprinter / Mini Bus", seats:19},
    {id: 2, label:"City Bus", seats:33, standing:25},
    {id: 3, label:"Coach / Intercity", seats:33},
    {id: 4, label:"Double-Decker", seats:49},
    {id: 5, label:"Sedan / Taxis", seats:5},
    {id: 6, label:"Minivan / People Carrier", seats:8},
  ])

  const [violationTypes] = useState([
    {id: 1, label:"Missing Documents"},
    {id: 2, label:"Overloading"},
    {id: 3, label:"Speed Limit(Breach)"},
    {id: 4, label:"OverTaking"},
    {id: 5, label:"Intoxication"},
  ])

  const filteredViolations = violations.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(searchViolation.toLowerCase())
  );

  const handleOpenModal = (e)=> {
    const value = e.target.value
    setSelectedValue(value)
    setOpenModal(true)
  }
  const closeModal = () => {
    setOpenModal(false)
    setFormData(InitialData)
    setIsEdit(false)
  }
  const handleDelete = (id) => {
    const updatedVehicles = violations.filter((v) => v.id !== id)
    setViolations(updatedVehicles) 
    if((currentPage - 1) * itemsPerPage >= updatedVehicles.length){
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    toast.success("Deleted Successfully")
  }

    const handleSubmit = async () => {
     
    
      try {
        setLoading(true);
    
        const formattedVehicle = {
          ...formData,
          vehicleModels:
            vehicleModel.find(vm => vm.id === Number(formData.vehicleModels))?.label ||
            formData.vehicleModels,

            violationType : violationTypes.find(vt => vt.id === Number(formData.violationType))?.label || formData.violationType, 
          status: formData.status ? "resolved" : "pending",
        };
    
        if (isEdit && selectedItem) {
          // ✅ UPDATE
          const updatedVehicles = violations.map((v) =>
            v.id === selectedItem.id
              ? { ...v, ...formattedVehicle }
              : v
          );
    
          setViolations(updatedVehicles);
          setFormData(InitialData);
          setIsEdit(false);
          setSelectedItem(null);
          setOpenModal(false);
          toast.success("Updated Successfully!");
        }
    
    
      } catch (error) {
        console.error(error);
        toast.warning("Failed to update, try again!");
      } finally {
        setLoading(false);
      }
    };
  const handleEdit = (item) => {
    
    setFormData({...item,
      vehicleModels:
      vehicleModel.find(vm => vm.label === item.vehicleModels)?.id || "",

    violationType:
      violationTypes.find(vt => vt.label === item.violationType)?.id || "",
      status: item.status === "resolved",
    })
    
    setSelectedItem(item)
    setIsEdit(true)
    setOpenModal(true)
    setIsEdit(true)
  }
  const totalItems = filteredViolations.length;
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
          { loading ? (
            <CTableDataCell>Loading... </CTableDataCell>
           ): currentItems.length === 0 ? (
            <CTableDataCell style={{color:'gray'}}>No Data Found</CTableDataCell>
            ) : ( 
            currentItems.map((violation) => (
              <CTableRow key={violation.id} onDoubleClick={() => handleEdit(violation)}>
                <CTableDataCell>
                  {violation.vehicleName || formData.vehicleName}
                </CTableDataCell>
                <CTableDataCell>{violation.driverName || formData.driverName}</CTableDataCell>
                <CTableDataCell>{violation.violationType || formData.violationType}</CTableDataCell>
                <CTableDataCell>{violation.dateReported || formData.dateReported}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    color={
                      violation.status === "pending" ? "danger" : "success"
                    }
                    className={`badge badge-${violation.status || formData.status}`}
                  >
                    {violation.status.charAt(0).toUpperCase() +
                      violation.status.slice(1)}
                  </CBadge>
                  {/* <CBadge
                    color={vehicle.status === "maintenance" ? "primary" : "success"}
                    className={`badge badge-${vehicle.status || formData.status}`}
                  >
                    {vehicle.status.charAt(0).toUpperCase() +
                      vehicle.status.slice(1)}
                  </CBadge> */}
                </CTableDataCell>
                <CTableDataCell>
                  <span
                    style={{
                      display: "flex",
                      gap: "1em",
                      justifyContent: "center",
                    }}
                  >
                    <CIcon
                      style={{ color: "red" }}
                      icon={cilTrash}
                      className="action-btn" onClick={() => handleDelete(violation.id)}
                    />
                    <CIcon
                      className="action-btn"
                      style={{ color: "blue" }}
                      icon={cibReadme}
                      onClick={() => handleEdit(violation)}
                    />
                  </span>
                </CTableDataCell>
              </CTableRow>
            )))}
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
      {openModal &&(
      <ComplianceModal formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} violationTypes={violationTypes} vehicleModel={vehicleModel} closeModal={closeModal} handleSubmit={handleSubmit} handleEdit={handleEdit} isEdit={isEdit}/>
      )}
    </div>
  );
}


function ComplianceModal({formData, setFormData, vehicleModel, closeModal, handleSubmit, handleOpenModal,violationTypes, isEdit, handleEdit}){
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      // if model changes, auto-set capacity
      if (field === 'vehicleModels' ) {
            return {
          ...prev,
          vehicleModels: value,
        }
      }
      if (field === 'violationType' ) {
        return {
          ...prev,
          violationType: value,
        }
      }
  
      return {
        ...prev,
        [field]: value,
      }
    })
  }
  
  return(
    <>
    <CModal visible={true} onClose={closeModal} size="lg" onClick={handleOpenModal}>
      <CModalHeader  style={{padding:'0.5em', background:"#ff6b35", color:"#f1f1f1"}}>
        {isEdit ? "Update Vehicle" : "Register New Vehicle" }
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md={6}>
            <CFormLabel className="labelStyle">Driver Name</CFormLabel>
            <CFormInput size="sm" type="text"   value={formData.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
              placeholder="Driver Name"/>
          </CCol>
          <CCol md={4}>
            <CFormLabel className="labelStyle">Vehicle Name</CFormLabel>
            <CFormInput size="sm" type="text" value={formData.vehicleName} onChange={(e) => handleInputChange('vehicleName', e.target.value)} placeholder="Vehicle Number"/>
          </CCol>
          <CCol md={2}>
            <CFormLabel className="labelStyle ">Plate Number</CFormLabel>
            <CFormInput size="sm" type="text" value={formData.plateNumber} onChange={(e) => handleInputChange('plateNumber', e.target.value)} placeholder="Plate Number"/>
          </CCol>
          <CCol md={6}>
            <CFormLabel className="labelStyle mt-2">Model</CFormLabel>
            <CFormSelect
              size="sm"
              value={formData.vehicleModels || ''}
              onChange={(e) => {
                handleInputChange('vehicleModels', e.target.value)
              }}
            >
              <option value="">Select vehicle model</option>
              {vehicleModel.map((vm) => (
                <option key={vm.id} value={vm.id}>
                  {vm.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={6}>
            <CFormLabel className="labelStyle mt-2">Violation Type</CFormLabel>
            <CFormSelect
              size="sm"
              value={formData.violationType || ''}
              onChange={(e) => {
                handleInputChange('violationType', e.target.value)
              }}
            >
              <option value="">Select Violation Type</option>
              {violationTypes.map((vt) => (
                <option key={vt.id} value={vt.id}>
                  {vt.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={6}>
            <CFormLabel className="labelStyle mt-2">Date Reported</CFormLabel>
            <CFormInput type="date" size="sm" value={formData.dateReported} onChange={(e) => handleInputChange('dateReported', e.target.value)} />
          </CCol>
          <CCol md={6}>
            <CFormLabel className="mt-2">Status</CFormLabel>
            <CFormSwitch
            checked={formData.status}
            label={formData.status ? "resolved" : "pending"}
              value={formData.status || ''}
              onChange={(e) => handleInputChange('status', e.target.checked)}
            />
          </CCol>
          
          <CCol md={12}>
            <CFormLabel className="labelStyle mt-2">Incedence report</CFormLabel>
            <CFormTextarea size="sm" type="text" value={formData.reportText} onChange={(e) => handleInputChange('reportText', e.target.value)}/>
          </CCol>

        </CRow>

      </CModalBody>
      <CModalFooter style={{padding:'3px'}}>
        {/* <CButton type="button" style={{color:'#f1f1f1', padding:'7px'}} color="danger" onClick={closeModal}>
          Close 
        </CButton> */}
        <CButton type="button" style={{color:'#f1f1f1', padding:"7px", fontSize:"11px"}} color="warning" onClick={() => setFormData(InitialData)}>
          Reset
        </CButton>
        <CButton onClick={handleSubmit} style={{padding:'7px', fontSize:"11px"}} color={isEdit ? "info" : "primary"} >
          {isEdit ? "Update" : "Submit" }
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}