import {
  fetchGetContractById,
  fetchGetEndorsementById,
  fetchGetReContractById,
  fetchGetRevivalById,
  fetchGetTerminationById
} from "../../../../apiUtils/apiDocumentation/employee/contractManagement/contractManagement.js";
import {renderButtons} from "../../../buttonManager/employee/contractManagement/detail.js";

const accidentHistoryDetail = (data) => {
  return [
    { label: "사고 이력 번호", value: data.id },
    { label: "사고 내용", value: data.accidentDetail },
    { label: "사고 날짜", value: data.date }
  ];
}

const surgeryHistoryDetail = (data) => {
  return [
    { label: "질병 이력 번호", value: data.id },
    { label: "수술명", value: data.name },
    { label: "수술 병원", value: data.hospitalName },
    { label: "수술 날짜", value: data.date }
  ];
}

const customerDetail = (data) => {
  const customer = data.customerInfoResponse;
  return [
    { label: "고객 이름", value: customer.name },
    { label: "전화번호", value: customer.phoneNumber },
    { label: "직업", value: customer.job },
    { label: "나이", value: customer.age },
    { label: "성별", value: customer.gender },
    { label: "주민등록번호", value: customer.residentRegistrationNumber },
    { label: "주소", value: customer.address },
    { label: "계좌 번호", value: customer.bankAccount },
    { label: "재산", value: customer.property },
    { label: "사고 이력", value: customer.accidentHistoryList.map(item => accidentHistoryDetail(item)) },
    { label: "수술 이력", value: customer.surgeryHistoryList.map(item => surgeryHistoryDetail(item)) }
  ];
}

const contractDetail = (data) => {
  const details = customerDetail(data);
  details.push(
    { label: "보험 상품 번호", value: data.productId },
    { label: "납부 날짜", value: data.lastPaidDate }
  );
  return details;
}

const recontractDetail = (data) => {
  const details = customerDetail(data);
  details.push(
    { label: "보험 상품 번호", value: data.productId },
    { label: "만기 날짜", value: data.expirationDate },
    { label: "접수 상태", value: data.reContractStatus }
  );
  return details;
}

const endorsementDetail = (data) => {
  const details = customerDetail(data);
  details.push(
    { label: "보험 상품 번호", value: data.productId },
    { label: "신청 날짜", value: data.applyDate },
    { label: "심사 상태", value: data.endorsementStatus }
  );
  return details;
}

const revivalDetail = (data) => {
  const details = customerDetail(data);
  details.push(
    { label: "보험 상품 번호", value: data.productId },
    { label: "정지 날짜", value: data.terminationDate },
    { label: "심사 상태", value: data.revivalStatus }
  );
  return details;
}

const terminationDetail = (data) => {
  const details = customerDetail(data);
  details.push(
    { label: "보험 상품 번호", value: data.productId },
    { label: "해지 날짜", value: data.applyDate },
    { label: "제지급 금액", value: data.terminationFee },
    { label: "심사 상태", value: data.terminationStatus }
  );
  return details;
}

const context = {
  DEFAULT_CONTRACT: {
    detailGetter: contractDetail,
    fetchGetById: fetchGetContractById
  },
  RECONTRACT: {
    detailGetter: recontractDetail,
    fetchGetById: fetchGetReContractById
  },
  ENDORSEMENT: {
    detailGetter: endorsementDetail,
    fetchGetById: fetchGetEndorsementById
  },
  REVIVAL: {
    detailGetter: revivalDetail,
    fetchGetById: fetchGetRevivalById
  },
  TERMINATION: {
    detailGetter: terminationDetail,
    fetchGetById: fetchGetTerminationById
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
