import {
  fetchGetInsuranceMoneyById,
  fetchGetReportById
} from "../../../../apiUtils/apiDocumentation/employee/compensation/compensation.js";
import {renderButtons} from "../../../buttonManager/employee/compensation/detail.js";

const serviceTypeStr = {
  EmergencyTowing: "긴급견인",
  EmergencyStart: "긴급시동",
  EmergencyRefueling: "비상급유",
  BatteryCharging: "배터리충전",
  EngineOverheatingRepair: "엔진과열 수리",
  TirepunkRepair: "타이어펑크 수리"
}

const accidentProcessStatusStr = {
  Unprocessed: "미처리",
  Completed: "처리 완료",
  Processing: "처리중"
}

const reportProcessStatusStr = {
  Unprocessed: "미처리",
  Completed: "처리 완료",
}

const reportDetail = (data) => {
  const accident = data.accident;
  return [
    { label: "신고 번호", value: data.id },
    { label: "사고 번호", value: accident.id },
    { label: "서비스 종류", value: serviceTypeStr[accident.serviceType] },
    { label: "사고 날짜", value: accident.date },
    { label: "사고 위치", value: accident.location },
    { label: "고객 이름", value: accident.customerName },
    { label: "고객 전화번호", value: accident.customerPhoneNumber },
    { label: "접수 상태", value: accidentProcessStatusStr[accident.processStatus] },
    { label: "처리 상태", value: reportProcessStatusStr[data.processStatus] },
    { label: "손해 사정 업체 번호", value: data.damageAssessmentCompanyID },
    { label: "긴급 서비스 업체 번호", value: data.roadsideAssistanceCompanyID },
    { label: "손해 사정 금액", value: data.damageAssessmentMoney }
  ];
}

const insuranceMoneyDetail = (data) => {
  return [
    { label: "신청 번호", value: data.id },
    { label: "계약 상품 종류", value: data.productType },
    { label: "신청 날짜", value: data.applyDate },
    { label: "고객 이름", value: data.customerName },
    { label: "처리 상태", value: data.processStatus },
    { label: "진단서 사진", value: data.medicalCertificate },
    { label: "영수증 사진", value: data.receipt },
    { label: "주민등록증 사본", value: data.residentRegistrationCard }
  ];
}

const context = {
  REQUEST_COMPENSATION: {
    detailGetter: reportDetail,
    fetchGetById: fetchGetReportById
  },
  REQUEST_INSURANCE_MONEY: {
    detailGetter: insuranceMoneyDetail,
    fetchGetById: fetchGetInsuranceMoneyById
  }
}

export const renderDetails = async () => {
  // 세션에서 데이터 가져오기
  const selectedDataId = JSON.parse(sessionStorage.getItem("selectedDataId"));
  const type = sessionStorage.getItem("currentType");

  // 세션에 데이터가 있으면 렌더링
  if (selectedDataId) {
    const selectedData = await context[type].fetchGetById(selectedDataId);
    renderDetailsTable(selectedData);
    renderButtons();
  }
}

const renderDetailsTable = (data) => {
  const detailsTable = document.getElementById("detailsTable");

  const details = context[sessionStorage.getItem("currentType")].detailGetter(data);

  // 테이블에 각 정보를 추가
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
