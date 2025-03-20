import * as XLSX from 'xlsx';
import { ProjectData, EmissionResults } from '../types';

export const exportToExcel = (projectData: ProjectData, results: EmissionResults) => {
  const workbook = XLSX.utils.book_new();

  // Project Details Sheet
  const projectDetails = [
    ['Project Details', ''],
    ['Project Name', projectData.projectName],
    ['Date', projectData.date],
    ['Soil Type', projectData.soilType],
    ['Foundation Type', projectData.foundationType],
    ['Excavation Volume (m³)', projectData.excavationVolume],
    ['Foundation Volume (m³)', projectData.foundationVolume],
    ['Transport Distance (km)', projectData.transportDistance],
  ];

  // Results Sheet
  const emissionResults = [
    ['Emission Results', ''],
    ['Category', 'CO₂e (kg)'],
    ['Excavation', results.excavation],
    ['Foundation', results.foundation],
    ['Transport', results.transport],
    ['Total', results.total],
    ['', ''],
    ['Carbon Intensity', results.carbonIntensity + ' kg CO₂e/m³'],
    ['', ''],
    ['Potential Savings', results.savings.potential + ' kg CO₂e'],
  ];

  // Recommendations Sheet
  const recommendations = [
    ['Recommendations', ''],
    ...results.recommendations.map(rec => [rec]),
    ['', ''],
    ['Savings Methods', ''],
    ...results.savings.methods.map(method => [method]),
  ];

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet(projectDetails),
    'Project Details'
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet(emissionResults),
    'Emission Results'
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet(recommendations),
    'Recommendations'
  );

  // Generate Excel file
  XLSX.writeFile(workbook, `${projectData.projectName}-carbon-footprint.xlsx`);
};