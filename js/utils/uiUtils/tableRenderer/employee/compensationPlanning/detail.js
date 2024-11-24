import {
  fetchGetPartnerCompanyById
} from "../../../../apiUtils/apiDocumentation/employee/compensationPlanning/compensationPlanning.js";
import {renderButtons} from "../../../buttonManager/employee/compensationPlanning/detail.js";

const partnerCompanyTypeStr = {
  // Hospital: "병원",
  // RepairShop: "카센터",
  // LawFirm: "법무법인",
  DamageAssessmentCompany: "손해사정업체",
  RoadsideAssistanceCompany: "긴급출동회사"
}

const partnerCompanyDetail = (data) => {
  return [
    { label: "협력업체 번호", value: data.id },
    { label: "협력업체 이름", value: data.name },
    { label: "협력업체 전화번호", value: data.phoneNumber },
    { label: "협력업체 종류", value: partnerCompanyTypeStr[data.partnerCompanyType] },
    { label: "대표자 이름", value: data.headName },
    { label: "대표자 전화번호", value: data.headPhoneNumber }
  ];
}

const context = {
  EVALUATE_PARTNERCOMPANY: {
    detailGetter: partnerCompanyDetail,
    fetchGetById: fetchGetPartnerCompanyById
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
