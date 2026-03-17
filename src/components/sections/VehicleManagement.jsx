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
import { cilPen, cilPencil, cilTrash } from "@coreui/icons";
import { toast } from "react-toastify";


const InitialData = {
  driverName : "",
  status : false,
  capacity : "",
  model : "",
  plateNumber : ""
}

export default function VehicleManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchVehicles, setSearchVehicles] = useState("");
  const [formData, setFormData] = useState(InitialData)
  const [openModal, setOpenModal] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: "GA-2345-25",
      model: "Sprinter",
      capacity: 14,
      driverName: "Kwesi Mensah",
      status: "active",
    },
    {
      id: 2,
      plateNumber: "GT-2346-26",
      model: "Hiace",
      capacity: 16,
      driverName: "Ama Boateng",
      status: "active",
    },
    {
      id: 3,
      plateNumber: "GW-2347-23",
      model: "Sprinter",
      capacity: 14,
      driverName: "Isaac Owusu",
      status: "maintenance",
    },
  ]);

  const [vehicleModel] = useState([
    {id: 1, label:"Sprinter / Mini Bus", seats:19},
    {id: 2, label:"City Bus", seats:33, standing:25},
    {id: 3, label:"Coach / Intercity", seats:33},
    {id: 4, label:"Double-Decker", seats:49},
    {id: 5, label:"Sedan Taxis", seats:5},
    {id: 6, label:"Minivan / People Carrier", seats:8},
  ])
  const filteredVehicles = vehicles.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(searchVehicles.toLowerCase())
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
    const updatedVehicles = vehicles.filter((v) => v.id !== id)
    setVehicles(updatedVehicles) 
    if((currentPage - 1) * itemsPerPage >= updatedVehicles.length){
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    toast.success("Vehicle deleted Successfully")
  }
  
  const handleSubmit = async () => {
    if (!formData.driverName || !formData.plateNumber || !formData.model || !formData.capacity) {
      toast.error("Please fill all fields");
      return;
    }
  
    try {
      setLoading(true);
  
      const formattedVehicle = {
        ...formData,
        model:
          vehicleModel.find(vm => vm.id === Number(formData.model))?.label ||
          formData.model,
        status: formData.status ? "maintenance" : "active",
      };
  
      if (isEdit && selectedItem) {
        // ✅ UPDATE
        const updatedVehicles = vehicles.map((vehicle) =>
          vehicle.id === selectedItem.id
            ? { ...vehicle, ...formattedVehicle }
            : vehicle
        );
  
        setVehicles(updatedVehicles);
        toast.success("Vehicle Updated Successfully!");
      } else {
        // ✅ ADD NEW
        const newVehicle = {
          ...formattedVehicle,
          id: vehicles.length + 1,
        };
  
        setVehicles((prev) => [...prev, newVehicle]);
        toast.success("New Vehicle Registered!");
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
  
  const handleEdit = (item) => {
    setFormData({...item,
      model : vehicleModel.find(vm => vm.label === item.model) ?.id || "",
      status: item.status === "Maintenance",
    })
    
    setSelectedItem(item)
    setIsEdit(true)
    setOpenModal(true)
    setIsEdit(true)
  }
  const totalItems = vehicles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredVehicles.slice(startIndex, endIndex);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Vehicle Management</h2>
        <CButton size="sm" className="btn-primary" onClick={handleOpenModal}>Register New Vehicle</CButton>
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
        { loading ? (
          <CTableRow style={{textAlign:"center"}}>
            <CTableDataCell>Loading... </CTableDataCell>
          </CTableRow>
         ): currentItems.length === 0 ? (
          <CTableDataCell style={{color:'gray'}}>No Registered Vehicles</CTableDataCell>
          ) : ( 
            currentItems.map((vehicle) => (
            <CTableRow key={vehicle.id} onDoubleClick={() => handleEdit(vehicle)}>
              <CTableDataCell>{vehicle.plateNumber || formData.plateNumber}</CTableDataCell>
              <CTableDataCell>{vehicle.model || formData.model}</CTableDataCell>
              <CTableDataCell>{vehicle.capacity || formData.capacity} seats</CTableDataCell>
              <CTableDataCell>{vehicle.driverName || formData.driverName}</CTableDataCell>
              <CTableDataCell>
                <CBadge
                  color={vehicle.status === "maintenance" ? "primary" : "success"}
                  className={`badge badge-${vehicle.status || formData.status}`}
                >
                  {vehicle.status.charAt(0).toUpperCase() +
                    vehicle.status.slice(1)}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell style={{ gap: "1em" }}>
                <span
                  style={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "center",
                  }}
                >
                    <CIcon className="action-btn" onClick={() => handleDelete(vehicle.id)} style={{ color: "red" }} icon={cilTrash} />

                    <CIcon className="action-btn" onClick={() => handleEdit(vehicle)} style={{ color: "blue" }} icon={cilPencil} />
                </span>
              </CTableDataCell>
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
      {openModal &&(
      <RegisterNewVehicle formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} vehicleModel={vehicleModel} closeModal={closeModal} handleSubmit={handleSubmit} handleEdit={handleEdit} isEdit={isEdit}/>
      )}
    </div>
  );
}

function RegisterNewVehicle({formData, setFormData, vehicleModel, closeModal, handleSubmit, handleOpenModal, isEdit, handleEdit}){
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      // if model changes, auto-set capacity
      if (field === 'model') {
        const selectedModel = vehicleModel.find(
          (vm) => vm.id === Number(value)
        )
  
        return {
          ...prev,
          model: value,
          capacity: selectedModel?.seats || '',
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
          <CCol md={6}>
            <CFormLabel className="labelStyle">Plate Number</CFormLabel>
            <CFormInput size="sm" type="text" value={formData.plateNumber} onChange={(e) => handleInputChange('plateNumber', e.target.value)} placeholder="Plate Number"/>
          </CCol>

          <CCol md={6}>
            <CFormLabel className="labelStyle mt-3">Model</CFormLabel>
            <CFormSelect
              size="sm"
              value={formData.model || ''}
              onChange={(e) => {
                handleInputChange('model', e.target.value)
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
            <CFormLabel className="labelStyle mt-3">Capacity</CFormLabel>
            <CFormInput
              size="sm"
              type="number"
              value={formData.capacity || ''}
              placeholder="Number of Seats"
              onChange={(e) => handleInputChange('capacity', e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel className="mt-3">Status</CFormLabel>
            <CFormSwitch
            checked={formData.status}
            label={formData.status ? "Maintenance" : "Active"}
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