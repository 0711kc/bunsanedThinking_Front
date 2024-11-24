import {
  fetchGetContractById,
  fetchGetInsuranceByProductId,
  fetchGetLoanByProductId
} from "../../../apiUtils/apiDocumentation/customer/customer.js";
import {renderButtons} from "../../buttonManager/customer/detail.js";

const insuranceTypeStr = {
  Disease: "질병",
  Automobile: "자동차",
  Injury: "상해"
}

const insuranceDetail = (data) => {
  const detail = [
    { label: "보험 상품 이름", value: data.name },
    { label: "보험 상품 종류", value: insuranceTypeStr[data.insuranceType] },
    { label: "보험 상품 번호", value: data.id },
    { label: "연령대", value: data.ageRange },
    { label: "보장 내용", value: data.coverage },
    { label: "월 보험료", value: data.monthlyPremium },
    { label: "계약기간", value: data.contractPeriod }
  ];
  switch(data.insuranceType) { // case는 재확인 필요
    case "Automobile": return automobileDetail(detail, data);
    case "Disease": return diseaseDetail(detail, data);
    case "Injury": return injuryDetail(detail, data);
    default: return detail;
  }
}

const serviceTypeStr = {
  EmergencyTowing: "긴급견인",
  EmergencyStart: "긴급시동",
  EmergencyRefueling: "비상급유",
  BatteryCharging: "배터리충전",
  EngineOverheatingRepair: "엔진과열 수리",
  TirepunkRepair: "타이어펑크 수리"
}

const vehicleTypeStr = {
  Small: "소형",
  Medium: "중형",
  Large: "대형"
}

const automobileDetail = (detail, data) => {
  let serviceStr = "";
  for (const service of data.serviceList)
    serviceStr += serviceTypeStr[service] + " ";
  detail.push(
    { label: "지원 서비스", value: serviceStr },
    { label: "차량 종류", value: vehicleTypeStr[data.vehicleType] },
    { label: "최대 사고 횟수", value: data.accidentLimit }
  );
  return detail;
}

const diseaseDetail = (detail, data) => {
  detail.push(
    { label: "병명", value: data.diseaseName },
    { label: "최대 질병 횟수", value: data.diseaseLimit }
  );
  return detail;
}

const injuryTypeStr = {
  Minor: "경상",
  Serious: "중상"
}

const injuryDetail = (detail, data) => {
  detail.push(
    { label: "상해 정도", value: injuryTypeStr[data.injuryType] },
    { label: "최대 수술 횟수", value: data.surgeriesLimit }
  );
  return detail;
}

const loanTypeStr = {
  Collateral: "담보",
  FixedDeposit: "정기 예금",
  InsuranceContract: "보험 계약"
}

const loanDetail = (data) => {
  const detail = [
    { label: "대출 상품 이름", value: data.name },
    { label: "대출 상품 종류", value: loanTypeStr[data.loanType] },
    { label: "대출 상품 번호", value: data.id },
    { label: "이자율", value: data.interestRate },
    { label: "대출 가능 최대 금액", value: data.maximumMoney },
    { label: "최소 자산", value: data.minimumAsset }
  ];
  switch(data.loanType) {
    case "Collateral": return collateralDetail(detail, data);
    case "FixedDeposit": return fixedDepositDetail(detail, data);
    case "InsuranceContract": return insuranceContractDetail(detail, data);
    default: return detail;
  }
}

const collateralTypeStr = {
  RealEstate: "부동산",
  Car: "자동차"
}

const collateralDetail = (detail, data) => {
  detail.push(
    { label: "담보 종류", value: collateralTypeStr[data.collateralType] },
    { label: "담보 최소 가치", value: data.minimumValue }
  );
  return detail;
}

const fixedDepositDetail = (detail, data) => {
  detail.push({ label: "최소 예치 금액", value: data.minimumAmount });
  return detail;
}

const insuranceContractDetail = (detail, data) => {
  detail.push({ label: "보험 번호", value: data.insuranceId });
  return detail;
}

const contractDetail = (data) => {
  return [
    { label: "보험 상품 이름", value: data.name }, // insurance
    { label: "보험 상품 번호", value: data.insuranceId },
    { label: "연령대", value: data.ageRange },
    { label: "월 보험료", value: data.monthlyPremium },
    { label: "만기일", value: data.expirationDate }, // contract
    { label: "가입일", value: data.date },
    { label: "납부일", value: data.paymentDate },
    { label: "보험 상태", value: data.status }
  ];
}

const context = {
  MANAGEMENT_CONTRACT: {
    needCustomerId: true,
    detailGetter: contractDetail,
    fetchGetById: fetchGetContractById
  },
  INSURANCE_LIST: {
    needCustomerId: false,
    detailGetter: insuranceDetail,
    fetchGetById: fetchGetInsuranceByProductId
  },
  LOAN_LIST: {
    needCustomerId: false,
    detailGetter: loanDetail,
    fetchGetById: fetchGetLoanByProductId
  }
}

export const renderDetails = async () => {
  // 세션에서 데이터 가져오기
  const selectedDataId = JSON.parse(sessionStorage.getItem("selectedDataId"));
  const type = sessionStorage.getItem("currentType");

  // 세션에 데이터가 있으면 렌더링
  if (selectedDataId) {
    const selectedData = context[type] ?
      await context[type].fetchGetById(selectedDataId, sessionStorage.getItem("id")) :
      await context[type].fetchGetById(selectedDataId);
    renderDetailsTable(selectedData);
    renderButtons();
  }
}

const renderDetailsTable = (data) => {
  const detailsTable = document.getElementById("detailsTable");

  const details = context[sessionStorage.getItem("currentType")].detailGetter(data);

  details.forEach(detail => {
    const row = document.createElement("tr");
    if (Array.isArray(detail.value)) {
      const tableHead = document.createElement("th");
      tableHead.textContent = detail.label;

      const tableData = document.createElement("td");
      detail.value.forEach(listDetail => {
        const nestedTable = document.createElement("table");
        listDetail.forEach(item => {
          const nestedRow = document.createElement("tr")
          const labelCell = document.createElement("th");
          labelCell.textContent = item.label;

          const valueCell = document.createElement("td");
          valueCell.textContent = item.value;

          nestedRow.appendChild(labelCell);
          nestedRow.appendChild(valueCell);

          nestedTable.appendChild(nestedRow);
        });
        tableData.appendChild(nestedTable);
      });
      row.appendChild(tableHead);
      row.appendChild(tableData);
    } else {
      const labelCell = document.createElement("th");
      labelCell.textContent = detail.label;

      const valueCell = document.createElement("td");
      valueCell.textContent = detail.value;

      row.appendChild(labelCell);
      row.appendChild(valueCell);
    }
    detailsTable.querySelector("tbody").appendChild(row);
  });
}
