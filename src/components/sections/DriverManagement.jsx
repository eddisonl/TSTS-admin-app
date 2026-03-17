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
  CFormSwitch
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilFolderOpen, cilPencil, cilTask } from "@coreui/icons";
import StarRate from "../layout/starRating";
import { toast } from "react-toastify";

const InitialData = {
  driverName : "",
  status : false,
  tripsCompleted : "",
  rating : "",
  licenseNumber : ""
}

export default function DriverManagement() {
  const [formData, setFormData] = useState(InitialData)
  const [openModal, setOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const itemsPerPage = 10;
  const [searchDVManagement, setDVManagement] = useState("");
  const [drivers, setDrivers] = useState([
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


  const handleSubmit = () => {
        if (!formData.driverName || !formData.licenseNumber || !formData.rating || !formData.tripsCompleted) {
          toast.error("Please fill all fields");
          return;
        }
      
        try {
          setLoading(true);
    if (
      !formData.driverName ||
      !formData.licenseNumber ||
      !formData.rating ||
      !formData.tripsCompleted
    ) {
      toast.error("Please fill all fields");
      return;
    }
  
    const formattedDriver = {
      id: isEdit && selectedItem ? selectedItem.id : drivers.length + 1,
      name: formData.driverName,
      license: formData.licenseNumber,
      rating: Number(formData.rating),
      trips: Number(formData.tripsCompleted),
      status: formData.status ? "verified" : "pending",
    };
  
    if (isEdit) {
      const updatedDrivers = drivers.map((d) =>
        d.id === selectedItem.id ? formattedDriver : d
      );
      setDrivers(updatedDrivers);
      toast.success("Driver Updated Successfully!");
    } else {
      setDrivers((prev) => [...prev, formattedDriver]);
      toast.success("Driver Registered Successfully!");
    }
  
    setFormData(InitialData);
    setIsEdit(false);
    setSelectedItem(null);
    setOpenModal(false);
      } catch (error) {
          console.error(error);
          toast.warning("Failed to register, try again!");
        } finally {
          setLoading(false);
        }
  };
  
  const handleEdit = (driver) => {
    setFormData({
      driverName: driver.name,
      licenseNumber: driver.license,
      rating: driver.rating,
      tripsCompleted: driver.trips,
      status: driver.status === "verified",
    });
  
    setSelectedItem(driver);
    setIsEdit(true);
    setOpenModal(true);
  };
  

  const handleDelete = (id) => {
    const updatedDrivers = drivers.filter((d) => d.id !== id);
    setDrivers(updatedDrivers);
  
    if ((currentPage - 1) * itemsPerPage >= updatedDrivers.length) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  
    toast.success("Driver deleted Successfully");
  };
  
  const filteredDVMang = drivers.filter((d) =>
    Object.values(d)
      .join(" ")
      .toLowerCase()
      .includes(searchDVManagement.toLowerCase())
  );

  const totalItems = filteredDVMang.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredDVMang.slice(startIndex, endIndex);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Driver Management</h2>
        <button className="btn-primary" onClick={handleOpenModal}>Register Driver</button>
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
             { loading ? (
             <CTableDataCell>Loading... </CTableDataCell>
            ): currentItems.length === 0 ? (
              <CTableDataCell style={{color:'gray'}}>No Registered Vehicles</CTableDataCell>
              ) : ( 
            currentItems.map((driver) => (
              <CTableRow key={driver.id} onDoubleClick={() => handleEdit(driver)}>
                <CTableHeaderCell className="font-semibold">
                  {driver.name || formData.driverName}
                </CTableHeaderCell>
                <CTableHeaderCell>{driver.license || formData.licenseNumber}</CTableHeaderCell>
                <CTableHeaderCell>
                  <span className="stars">
                    <StarRate/>
                    {/* {"⭐".repeat(Math.floor(driver.rating))} */}
                  </span> {driver.rating || formData.rating}
                </CTableHeaderCell>
                <CTableHeaderCell>{driver.trips || formData.tripsCompleted}</CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge
                    color={driver.status === "pending" ? "danger" : "success"}
                    className={`badge badge-${driver.status || formData.status}`}
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
                    <CIcon className="action-btn" onClick={() => handleDelete(driver.id)} style={{ color: "blue" }} icon={cilFolderOpen} />
                    <CIcon className="action-btn" onClick={() => handleEdit(driver)} style={{ color: "green" }} icon={cilTask} />
                  </span>
                </CTableHeaderCell>
              </CTableRow>
            )))}
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
      {openModal &&(
      <RegisterNewDriver formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal}  closeModal={closeModal} handleSubmit={handleSubmit} handleEdit={handleEdit} isEdit={isEdit}/>
      )}
    </div>
  );
}

function RegisterNewDriver({formData, setFormData, closeModal, handleSubmit, handleOpenModal, isEdit, handleEdit}){
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      // if model changes, auto-set capacity
      // if (field === 'model') {
      //   const selectedModel = vehicleModel.find(
      //     (vm) => vm.id === Number(value)
      //   )
  
      //   return {
      //     ...prev,
      //     model: value,
      //     capacity: selectedModel?.seats || '',
      //   }
      // }
  
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
        {isEdit ? "Update Driver" : "Register New Driver" }
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md={6}>
            <CFormLabel className="labelStyle">Driver Name</CFormLabel>
            <CFormInput size="sm" type="text"   value={formData.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
              placeholder="Driver Name"/>
          </CCol>
          <CCol md={6}>
            <CFormLabel className="labelStyle">License Number</CFormLabel>
            <CFormInput size="sm" type="text" value={formData.licenseNumber} onChange={(e) => handleInputChange('licenseNumber', e.target.value)} placeholder="License Number"/>
          </CCol>

          {/* <CCol md={6}>
            <CFormLabel className="labelStyle mt-3">Rating</CFormLabel>
            <CFormSelect
              size="sm"
              value={formData.rating || ''}
              onChange={(e) => {
                handleInputChange('rating', e.target.value)
              }}
            >
              <option value="">Select vehicle model</option>
              {vehicleModel.map((vm) => (
                <option key={vm.id} value={vm.id}>
                  {vm.label}
                </option>
              ))}
            </CFormSelect>
          </CCol> */}

          <CCol md={6}>
            <CFormLabel className="labelStyle mt-3">Trips Completed</CFormLabel>
            <CFormInput
              size="sm"
              type="number"
              value={formData.tripsCompleted || ''}
              placeholder="Trps Completed"
              onChange={(e) => handleInputChange('tripsCompleted', e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel className="mt-3">Status</CFormLabel>
            <CFormSwitch
            checked={formData.status}
            label={formData.status ? "active" : "pending"}
              value={formData.status || ''}
              onChange={(e) => handleInputChange('status', e.target.checked)}
            />
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