export interface SapFile {
  id: string;
  name: string;
  filename: string;
}

export const sapFiles: SapFile[] = [
  {
    id: "win7-sap-gui-720",
    name: "WIN7 SAP GUI 720",
    filename: "WIN7_SAP_GUI_720.sar",
  },
  {
    id: "win7-sap-gui-730",
    name: "WIN7 SAP GUI 730",
    filename: "WIN7_SAP_GUI_730.sar",
  },
  {
    id: "sap-gui-740-750",
    name: "SAP GUI 740 750",
    filename: "SAP_GUI_740_750.sar",
  },
  {
    id: "n-comp-idc1-720-730",
    name: "N-Comp IDC1 720 730",
    filename: "NComp_IDC1_720_730.sar",
  },
  {
    id: "sap-legacy",
    name: "SAP Legacy",
    filename: "SAP_Legacy.sar",
  },
  {
    id: "star-dev",
    name: "STAR DEV",
    filename: "STAR_DEV.sar",
  },
  {
    id: "star-preprod",
    name: "STAR PreProd",
    filename: "STAR_PreProd.sar",
  },
  {
    id: "hnh",
    name: "HNH",
    filename: "HNH.sar",
  },
  {
    id: "nw18-prod",
    name: "NW18 PROD",
    filename: "NW18_PROD.sar",
  },
  {
    id: "nw18-dev-qa",
    name: "NW18 DEV QA",
    filename: "NW18_DEV_QA.sar",
  },
  {
    id: "jio-production",
    name: "JIO Production",
    filename: "JIO_Production.sar",
  },
];
