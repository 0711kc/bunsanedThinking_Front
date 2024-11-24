import {BUTTON, NAME_MAPPER, POP_UP} from "../../../../../../config/employee/sales/sales.js";
import {
  fetchEvaluateSalesPerformance,
  fetchInduceInsuranceProduct, fetchInduceLoanProduct
} from "../../../../apiUtils/apiDocumentation/employee/sales/sales.js";

const context= {
  EVALUATE_SALES_PERFORMANCE: {
    fetchGetById : fetchEvaluateSalesPerformance
  },
  INDUCE_INSURANCE_PRODUCT: {
    fetchInduce: fetchInduceInsuranceProduct
  },
  INDUCE_LOAN_PRODUCT: {
    fetchInduce: fetchInduceLoanProduct
  }
}

export const addStarButtons = () => {
  const starButtonsContainer = document.getElementById("starButtonsContainer");
  const type = sessionStorage.getItem("currentType");
  const employeeId = sessionStorage.getItem("selectedDataId");

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("div");
    button.className = "star-button";
    button.innerHTML =  BUTTON.TASK.EMPLOYEE.SALES.EVALUATE_SALES_PERFORMANCE.INPUT.STAR.repeat(i);
    button.addEventListener("click", () => {
      context[type].fetchGetById(i, employeeId);
      alert(POP_UP.EVALUATION);
      window.location.href="home.html";
    });
    starButtonsContainer.appendChild(button);
  }
};

export const renderBottomButtons = (container) => {
  const type = sessionStorage.getItem("currentType");
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  if (type === NAME_MAPPER.INDUCE_INSURANCE_PRODUCT) {
    const requestButton = document.createElement("button");
    requestButton.textContent = "보험 가입 요청";
    requestButton.className = "action-button";
    requestButton.addEventListener("click", () => {
      alert("보험 가입 요청이 완료되었습니다.");
      const formData = collectFormData();
      console.log(formData);
      context[type].fetchInduce(formData);
      window.location.href="home.html";
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.className = "action-button";
    cancelButton.addEventListener("click", () => {
     window.history.back();
    });

    buttonContainer.appendChild(requestButton);
    buttonContainer.appendChild(cancelButton);
  } else if (type === NAME_MAPPER.INDUCE_LOAN_PRODUCT) {
    const loanButton = document.createElement("button");
    loanButton.textContent = "대출 신청";
    loanButton.className = "action-button";
    loanButton.addEventListener("click", () => {
      alert("대출 신청이 완료되었습니다.");
      const formData = collectFormData();
      console.log(formData);
      context[type].fetchInduce(formData);
      window.location.href="home.html";
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.className = "action-button";
    cancelButton.addEventListener("click", () => {
      window.history.back();
    });

    buttonContainer.appendChild(loanButton);
    buttonContainer.appendChild(cancelButton);
  }

  container.appendChild(buttonContainer);
};

export const collectFormData = () => {
  const getValueById = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : null;
  };

  const getSelectedGender = () => {
    const buttonGroup = document.querySelector(".button-group");
    return buttonGroup ? buttonGroup.dataset.selectedValue : null; // 선택된 값 반환
  };

  const mapDynamicFields = (sectionId, mapping) => {
    const section = document.getElementById(`${sectionId}Container`);
    if (!section) return [];

    const inputGroups = Array.from(section.querySelectorAll(".form-group"));
    return inputGroups.map((group) => {
      const inputs = Array.from(group.querySelectorAll("input"));
      const values = {};
      inputs.forEach((input) => {
        const key = mapping[input.name.replace(sectionId, "")];
        if (key) {
          values[key] = input.value;
        }
      });
      return values;
    });
  };

  return {
    name: getValueById("name"),
    age: getValueById("age"),
    gender: getSelectedGender(),
    address: getValueById("address"),
    phoneNumber: getValueById("phoneNumber"),
    residentRegistrationNumber: getValueById("residentRegistrationNumber"),
    job: getValueById("job"),
    bankAccount: getValueById("bankAccount"),
    bankName: getValueById("bankName"),
    property: getValueById("property"),
    accidentHistories: mapDynamicFields("accidentHistory", {
      date: "date",
      사고내역: "accidentDetail"
    }),
    surgeryHistories: mapDynamicFields("surgeryHistory", {
      date: "date",
      병원이름: "hospitalName",
      수술이름: "name"
    }),
    diseaseHistories: mapDynamicFields("diseaseHistory", {
      date: "dateOfDiagnosis",
      질병이름: "name"
    }),
    productId: sessionStorage.getItem("selectedDataId"),
    employeeId: sessionStorage.getItem("id")
  };
};

