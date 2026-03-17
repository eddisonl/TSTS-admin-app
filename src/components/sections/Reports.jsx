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

const InitialData = {
  route : "",
  revenue: "",
  driver:"",
  vehicle: "",
  compliance: "",
  system: "",
  
}

export default function Reports() {
  const [reportGroup, setReportGroup] = useState("revenue");
  const [reportName, setReportName] = useState("monthly-revenue");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const [generatedReport, setGeneratedReport] = useState(null);
  const [formData, setFormData] = useState(InitialData)
  
  const reportGroups = {
    revenue: {
      label: "Revenue Reports",
      reports: [
        { id: "monthly-revenue", name: "Monthly Revenue Summary" },
        { id: "route-revenue", name: "Revenue by Route" },
        { id: "driver-revenue", name: "Revenue by Driver" },
        { id: "daily-revenue", name: "Daily Revenue Breakdown" },
      ],
    },
    driver: {
      label: "Driver Reports",
      reports: [
        { id: "driver-performance", name: "Driver Performance Metrics" },
        { id: "driver-ratings", name: "Driver Ratings & Reviews" },
        { id: "driver-trips", name: "Driver Trip History" },
        { id: "driver-violations", name: "Driver Violations & Incidents" },
      ],
    },
    vehicle: {
      label: "Vehicle Reports",
      reports: [
        { id: "vehicle-status", name: "Vehicle Status Report" },
        { id: "vehicle-maintenance", name: "Maintenance Schedule Report" },
        { id: "vehicle-utilization", name: "Vehicle Utilization Report" },
        { id: "vehicle-efficiency", name: "Fuel Efficiency Report" },
      ],
    },
    compliance: {
      label: "Compliance Reports",
      reports: [
        { id: "violations", name: "Compliance Violations Report" },
        { id: "enforcement", name: "Enforcement Actions Report" },
        { id: "licenses", name: "Driver License Status Report" },
        { id: "certifications", name: "Vehicle Certification Report" },
      ],
    },
    route: {
      label: "Route Reports",
      reports: [
        { id: "route-demand", name: "Route Demand Analysis" },
        { id: "route-performance", name: "Route Performance Report" },
        { id: "route-capacity", name: "Route Capacity Utilization" },
        { id: "route-incidents", name: "Route Incident Report" },
      ],
    },
    system: {
      label: "System Reports",
      reports: [
        { id: "system-users", name: "User Activity Report" },
        { id: "system-logs", name: "System Activity Logs" },
        { id: "system-errors", name: "System Errors & Alerts" },
        { id: "backup-status", name: "Backup Status Report" },
      ],
    },
  };

  const sortOptions = [
    { value: "date-desc", label: "Date (Newest First)" },
    { value: "date-asc", label: "Date (Oldest First)" },
    { value: "amount-desc", label: "Amount (Highest)" },
    { value: "amount-asc", label: "Amount (Lowest)" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "performance-desc", label: "Performance (Best)" },
  ];

  const generateReportData = () => {
    const mockData = {
      "monthly-revenue": [
        { name: "January", amount: 45320, trips: 1240, vehicles: 156 },
        { name: "February", amount: 48900, trips: 1385, vehicles: 158 },
        { name: "March", amount: 52150, trips: 1521, vehicles: 162 },
        { name: "April", amount: 49750, trips: 1420, vehicles: 159 },
      ],
      "route-revenue": [
        { route: "Accra ↔ Kumasi", revenue: 45320, trips: 1240, avgFare: 36.5 },
        {
          route: "Accra ↔ Takoradi",
          revenue: 38900,
          trips: 985,
          avgFare: 39.5,
        },
        {
          route: "Kumasi ↔ Takoradi",
          revenue: 32150,
          trips: 867,
          avgFare: 37.1,
        },
        {
          route: "Accra ↔ Cape Coast",
          revenue: 28500,
          trips: 612,
          avgFare: 46.6,
        },
      ],
      "driver-performance": [
        {
          driver: "DRV-001",
          name: "John Mensah",
          trips: 245,
          rating: 4.8,
          revenue: 8952,
        },
        {
          driver: "DRV-002",
          name: "Samuel Owusu",
          trips: 218,
          rating: 4.6,
          revenue: 8145,
        },
        {
          driver: "DRV-003",
          name: "Kwame Boateng",
          trips: 195,
          rating: 4.9,
          revenue: 7890,
        },
        {
          driver: "DRV-004",
          name: "Ama Asante",
          trips: 187,
          rating: 4.7,
          revenue: 7456,
        },
      ],
      "vehicle-status": [
        {
          vehicle: "VH-001",
          status: "Active",
          mileage: 152450,
          lastService: "2024-01-15",
          health: "Good",
        },
        {
          vehicle: "VH-002",
          status: "Active",
          mileage: 168900,
          lastService: "2024-02-10",
          health: "Fair",
        },
        {
          vehicle: "VH-003",
          status: "Maintenance",
          mileage: 189234,
          lastService: "2024-01-20",
          health: "Poor",
        },
        {
          vehicle: "VH-004",
          status: "Active",
          mileage: 145670,
          lastService: "2024-02-05",
          health: "Excellent",
        },
      ],
      violations: [
        {
          id: "VL-001",
          driver: "DRV-045",
          violation: "License Expired",
          date: "2024-02-20",
          severity: "High",
        },
        {
          id: "VL-002",
          vehicle: "VH-003",
          violation: "Overdue Maintenance",
          date: "2024-02-18",
          severity: "High",
        },
        {
          id: "VL-003",
          driver: "DRV-032",
          violation: "Speeding",
          date: "2024-02-15",
          severity: "Medium",
        },
        {
          id: "VL-004",
          vehicle: "VH-007",
          violation: "Emission Test Failed",
          date: "2024-02-12",
          severity: "High",
        },
      ],
    };
    return mockData[reportName] || [];
  };

  const handleGenerateReport = async() => {
    try {
      setLoading(true)
      const data = generateReportData();
      setGeneratedReport({
        group: reportGroups[reportGroup].label,
        name: reportGroups[reportGroup].reports.find((r) => r.id === reportName)
          .name,
        sortBy: sortOptions.find((s) => s.value === sortBy).label,
        data: data,
        generatedAt: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.log('generate report:', error);
      
    } finally {
      setLoading(false)
    }
  };

  const getReportColumns = () => {
    const columns = {
      "monthly-revenue": ["name", "amount", "trips", "vehicles"],
      "route-revenue": ["route", "revenue", "trips", "avgFare"],
      "driver-performance": ["driver", "name", "trips", "rating", "revenue"],
      "vehicle-status": [
        "vehicle",
        "status",
        "mileage",
        "lastService",
        "health",
      ],
      violations: ["id", "driver", "violation", "date", "severity"],
    };
    return columns[reportName] || [];
  };

const getColumnLabel = (column) => {
  const defaultLabels = {
    amount: "Revenue (GHS)",
    trips: "Trips",
    vehicles: "Active Vehicles",
    route: "Route",
    revenue: "Revenue (GHS)",
    avgFare: "Avg Fare",
    driver: "ID",
    rating: "Rating",
    vehicle: "Vehicle ID",
    status: "Status",
    mileage: "Mileage (km)",
    lastService: "Last Service",
    health: "Health Status",
    id: "Violation ID",
    violation: "Violation Type",
    date: "Date",
    severity: "Severity",
  };

  const contextualLabels = {
    "monthly-revenue": {
      name: "Month",
    },
    "driver-performance": {
      name: "Name",
    },
    // Add other reports if needed in future
  };

  const reportLabels = contextualLabels[reportName] || {};
  const labels = { ...defaultLabels, ...reportLabels };
  return labels[column] || column;
};

  const filteredReports = generatedReport?.data?.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  ) || [];

  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredReports.slice(startIndex, endIndex);

  return (
    <div className="section">
      <h2 className="section-title">Generate Reports</h2>

      <div className="report-generator">
        <div className="report-filters">
          <div className="filter-group">
            <label className="filter-label">Report Group</label>
            <select
              value={reportGroup}
              onChange={(e) => {
                setReportGroup(e.target.value);
                setReportName(reportGroups[e.target.value].reports[0].id);
              }}
              className="filter-select"
            >
              {Object.entries(reportGroups).map(([key, group]) => (
                <option key={key} value={key}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Report Name</label>
            <select
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="filter-select"
            >
              {reportGroups[reportGroup].reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerateReport}
            className="btn-generate-report"
          >
            📊 Generate Report
          </button>
        </div>
      </div>

      {generatedReport && (
        <div className="report-results">
          <div className="report-header">
            <div>
              <h3 className="report-result-title">{generatedReport.name}</h3>
              <p className="report-meta">
                Generated: {generatedReport.generatedAt} | Sorted by:{" "}
                {generatedReport.sortBy}
              </p>
            </div>
            <div className="report-actions">
              <button className="btn-export">📥 Export PDF</button>
              <button className="btn-export">📊 Export CSV</button>
              <button className="btn-export">🖨️ Print</button>
            </div>
          </div>

          <div className="table-container">
              <CFormInput
                    className="search-input"
                    type="search"
                    size="sm"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
            <CTable striped hover className="data-table">
              <CTableHead>
                <CTableRow>
                  {getReportColumns().map((col) => (
                    <CTableHeaderCell style={{textAlign:'center'}} key={col}>{getColumnLabel(col)}</CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>
              <CTableBody>
              { loading ? (
                <CTableRow style={{display:"flex", justifyContent:"center"}}>
                  <CTableDataCell >Loading...</CTableDataCell>
                </CTableRow>
                ) : currentItems.length === 0 ? (
                  <CTableRow style={{display:"flex", justifyContent:"center", color:"gray"}}>
                    <CTableDataCell>No recorded reports</CTableDataCell>
                  </CTableRow>
                ) : (
                currentItems.map((row, idx) => (
                  <CTableRow key={idx}>
                    {getReportColumns().map((col) => (
                      <CTableDataCell style={{textAlign:'center'}} key={col}>
                        {col === "severity" ? (
                          <span
                            className={`badge badge-${row[col].toLowerCase()}`}
                          >
                            {row[col]}
                          </span>
                        ) : col === "status" ? (
                          <span
                            className={`badge badge-${row[col].toLowerCase()}`}
                          >
                            {row[col]}
                          </span>
                        ) : col === "health" ? (
                          <span
                            className={`badge badge-${row[col].toLowerCase()}`}
                          >
                            {row[col]}
                          </span>
                        ) : col === "rating" ? (
                          <span className="rating">{row[col]} ⭐</span>
                        ) : (
                          row[col]
                        )}
                      </CTableDataCell>
                    ))}
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
          </div>

          <div className="report-summary">
            <p className="summary-text">
              Total Records: {generatedReport.data.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
