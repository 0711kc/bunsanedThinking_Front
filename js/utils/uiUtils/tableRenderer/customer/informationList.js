import {
  fetchGetAccidentRowById,
  fetchGetAllAccidentByCustomerId,
  fetchGetAllAutomobileContractByCustomerId,
  fetchGetAllAutomobileInsurance,
  fetchGetAllCollateralLoan,
  fetchGetAllComplaintsByCustomerId,
  fetchGetAllContractByCustomerId,
  fetchGetAllDiseaseContractByCustomerId,
  fetchGetAllDiseaseInsurance,
  fetchGetAllFixedDepositLoan,
  fetchGetAllInjuryContractByCustomerId,
  fetchGetAllInjuryInsurance,
  fetchGetAllInsurance,
  fetchGetAllInsuranceContractLoan,
  fetchGetAllLoan,
  fetchGetComplaintRowById,
  fetchGetContractRowById,
  fetchGetInsuranceRowByProductId,
  fetchGetLoanRowByProductId
} from '../../../apiUtils/apiDocumentation/customer/customer.js';
import {COLUMN_NAME, COMBOBOX, TABLE_TITLE} from '../../../../../config/customer/customer.js';
import {setButton, setPost} from "../../buttonManager/customer/information.js";

export const informationType = {
  INSURANCE_LIST: "INSURANCE_LIST",
  LOAN_LIST: "LOAN_LIST",
  MANAGEMENT_CONTRACT: "MANAGEMENT_CONTRACT",
  VIEW_ACCIDENT: "VIEW_ACCIDENT",
  VIEW_COMPLAINT: "VIEW_COMPLAINT"
}

const contractRow = (dto) => {
  return `
    <td>${dto.id}</td>
    <td>${dto.name}</td>
    <td>${dto.type}</td>
    <td>${dto.insuranceId}</td>
    <td>${dto.ageRange}</td>
    <td>${dto.monthlyPremium}</td>
    <td>${dto.expirationDate}</td>
    <td>${dto.date}</td>
    <td>${dto.paymentDate}</td>
    <td>${dto.status}</td>
  `;
}

const accidentRow = (dto) => {
  return `
    <td>${dto.id}</td>
    <td>${dto.serviceType}</td>
    <td>${dto.date}</td>
    <td>${dto.customerName}</td>
    <td>${dto.customerPhoneNumber}</td>
    <td>${dto.processStatus}</td>
  `;
}

const complaintRow = (dto) => {
  return `
    <td>${dto.id}</td>
    <td>${dto.type}</td>
    <td>${dto.title}</td>
    <td>${dto.postDate}</td>
    <td>${dto.processingDate}</td>
    <td>${dto.status}</td>
  `;
}

const insuranceRow = (dto) => {
  return `
    <td>${dto.id}</td>
    <td>${dto.name}</td>
    <td>${dto.insuranceType}</td>
    <td>${dto.ageRange}</td>
    <td>${dto.monthlyPremium}</td>
  `;
}

const loanRow = (dto) => {
  return `
    <td>${dto.id}</td>
    <td>${dto.name}</td>
    <td>${dto.loanType}</td>
    <td>${dto.interestRate}</td>
    <td>${dto.maximumMoney}</td>
  `;
}

const context = {
  MANAGEMENT_CONTRACT: {
    listFetch: fetchGetAllContractByCustomerId,
    listFetchById: fetchGetContractRowById,
    rowGetter: contractRow,
    needCustomerId: true,
    needDetail: true,
    comboListFetch: {
      all: fetchGetAllContractByCustomerId,
      disease: fetchGetAllDiseaseContractByCustomerId,
      automobile: fetchGetAllAutomobileContractByCustomerId,
      injury: fetchGetAllInjuryContractByCustomerId
    }
    // 콤보박스는 있는데 아이디 받는 부분이 뭔가 이상해서 일단 이렇게
  },
  VIEW_ACCIDENT: {
    listFetch: fetchGetAllAccidentByCustomerId,
    listFetchById: fetchGetAccidentRowById,
    rowGetter: accidentRow,
    needCustomerId: true,
    needDetail: false,
    comboListFetch: {
      all: fetchGetAllAccidentByCustomerId
    }
    // 콤보박스가 없어서 비워둠
  },
  VIEW_COMPLAINT: {
    listFetch: fetchGetAllComplaintsByCustomerId,
    listFetchById: fetchGetComplaintRowById,
    rowGetter: complaintRow,
    needCustomerId: true,
    needDetail: false,
    comboListFetch: {
      all: fetchGetAllComplaintsByCustomerId
    }
  },
  INSURANCE_LIST: {
    listFetch: fetchGetAllInsurance,
    listFetchById: fetchGetInsuranceRowByProductId,
    rowGetter: insuranceRow,
    needCustomerId: false,
    needDetail: true,
    comboListFetch: {
      all: fetchGetAllInsurance,
      disease: fetchGetAllDiseaseInsurance,
      automobile: fetchGetAllAutomobileInsurance,
      injury: fetchGetAllInjuryInsurance
    }
  },
  LOAN_LIST: {
    listFetch: fetchGetAllLoan,
    listFetchById: fetchGetLoanRowByProductId,
    rowGetter: loanRow,
    needCustomerId: false,
    needDetail: true,
    comboListFetch: {
      all: fetchGetAllLoan,
      collateral: fetchGetAllCollateralLoan,
      fixedDeposit: fetchGetAllFixedDepositLoan,
      insuranceContract: fetchGetAllInsuranceContractLoan
    }
  }
}

export const viewInformationListById = async (fetchType) => {
  sessionStorage.setItem("currentType", fetchType);
  const id = sessionStorage.getItem("id");
  const list = await context[fetchType].listFetch(id);
  sessionStorage.setItem("list", JSON.stringify(list));
  window.location.href = "informationList.html";
}
export const viewInformationListAll = async (fetchType) => {
  sessionStorage.setItem("currentType", fetchType);
  const list = await context[fetchType].listFetch();
  sessionStorage.setItem("list", JSON.stringify(list));
  window.location.href = "informationList.html";
}

export const renderTable = () => {
  initialTable();
}

const setTitle = () => {
  const title = TABLE_TITLE[sessionStorage.getItem("currentType")];
  const contextTitle = document.getElementById("title");
  contextTitle.innerText = title;
}

const setComboBox = () => {
  const container = document.querySelector(".search-container");
  const select = document.createElement("select");
  const type = sessionStorage.getItem("currentType");
  const boxContext = COMBOBOX[type];
  if (!boxContext.isCombo) return null;
  select.id = boxContext.id;
  select.className = "comboBox";
  const optionTypes = boxContext.optionTypes;
  optionTypes.forEach(optionType => {
    const option = document.createElement("option");
    option.value = optionType.value;
    option.textContent = optionType.label;
    select.appendChild(option);
  });
  container.appendChild(select);
  select.onchange = () => initTableBySelect(select.id, type); // 추가
  return select;
}

const setInput = () => {
  const container = document.querySelector(".search-container");
  const input = document.createElement("input");
  input.type = "text";
  input.id = "searchInput";
  input.placeholder = "검색어 입력";
  container.appendChild(input);
  return input;
}

export const initTableByInput = async (id, type) => { // 추가
  const tableBody = document.getElementById('list');
  while(tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
  if (id.length > 0) {
    const item = context[type].needCustomerId ?
      await context[type].listFetchById(id, sessionStorage.getItem("id")) :
      await context[type].listFetchById(id)
    setOneRow(item, type);
  } else {
    const list = context[type].needCustomerId ?
      await context[type].comboListFetch["all"](sessionStorage.getItem("id")) :
      await context[type].comboListFetch["all"]();
    if (list != null) sessionStorage.setItem("list", JSON.stringify(list));
    setTableBody();
  }
}

const initTableBySelect = async (id, type) => { // 추가
  const select = document.getElementById(id);
  const selectedOption = select.options[select.selectedIndex];
  const list = context[type].needCustomerId ?
    await context[type].comboListFetch[selectedOption.value](sessionStorage.getItem("id")) :
    await context[type].comboListFetch[selectedOption.value]();
  if (list != null) sessionStorage.setItem("list", JSON.stringify(list));
  const input = document.getElementById("searchInput");
  if (input != null) input.value = "";
  const tableBody = document.getElementById('list');
  while(tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
  setTableBody();
}

const setSearchBar = () => {
  const type = sessionStorage.getItem("currentType");
  if (COMBOBOX[type].isCombo) setComboBox();
  else setPost();
  setInput();
  setButton();
}

const setColumn = () => {
  const columnList = COLUMN_NAME[sessionStorage.getItem("currentType")];
  const head = document.getElementById('tableHead');
  const columns = document.createElement('tr');
  columnList.forEach(item => {
    const oneColoumn = document.createElement('th');
    oneColoumn.innerHTML = item;
    columns.appendChild(oneColoumn);
  })
  head.appendChild(columns);
}

const setOneRow = (item, type) => {
  const tableBody = document.getElementById('list');
  const row = document.createElement("tr");
  row.innerHTML = context[type].rowGetter(item);
  // 각 행에 클릭 이벤트 추가
  row.addEventListener("click", () => {
    if (window.selectedRow) {
      window.selectedRow.classList.remove("selected");
    }
    row.classList.add("selected");
    window.selectedRow = row;
  });

  // 더블 클릭 시 상세 페이지로 이동
  if (context[type].needDetail) {
    row.addEventListener("dblclick", () => {
      // 상세 정보를 세션에 저장
      sessionStorage.setItem("selectedDataId", item.id);
      window.location.href = "detail.html";
    });
  }

  tableBody.appendChild(row);
}

const setTableBody = () => {
  const type = sessionStorage.getItem("currentType");
  const data = JSON.parse(sessionStorage.getItem("list"));
  data.forEach(item => setOneRow(item, type));
}

const initialTable = () => {
  setTitle();
  setSearchBar();
  setColumn();
  setTableBody();
}
