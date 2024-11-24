import {
  fetchAddAutomobileInsurance,
  fetchAddDiseaseInsurance,
  fetchAddInjuryInsurance,
  fetchUpdateAutomobileInsurance,
  fetchUpdateDiseaseInsurance,
  fetchUpdateInjuryInsurance
} from "../../../../apiUtils/apiDocumentation/employee/productManagement/productManagement.js";
import {POP_UP, BUTTON} from "../../../../../../config/employee/productManagement/productManagement.js";
import {BUTTON as COMMON_BUTTON} from "../../../../../../config/common.js"

const context = {
  MANAGE_INSURANCE_PRODUCT: {
    fetchAddInsurance: {
      Disease: fetchAddDiseaseInsurance,
      Injury: fetchAddInjuryInsurance,
      Automobile: fetchAddAutomobileInsurance
    },
    fetchUpdateInsurance: {
      Disease: fetchUpdateDiseaseInsurance,
      Injury: fetchUpdateInjuryInsurance,
      Automobile: fetchUpdateAutomobileInsurance
    }
    // postButtons: BUTTON.TASK.EMPLOYEE.PRODUCT_MANAGEMENT.MANAGE_INSURANCE_PRODUCT
  }
}

export const addButtons = (buttonContainer) => {
  const selectedButtonType = JSON.parse(sessionStorage.getItem("selectedButtonType"));
  const type = sessionStorage.getItem("currentType");

  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  // 공통 스타일 적용
  saveButton.className = "button-item";
  cancelButton.className = "button-item";

  if (selectedButtonType === "POST") {
    saveButton.textContent = COMMON_BUTTON.COMMON.OK;
    cancelButton.textContent = COMMON_BUTTON.COMMON.CANCEL;
      saveButton.addEventListener("click", async () => {
        const userConfirmed = confirm(POP_UP.POST.QUESTION);
        if (userConfirmed) {
        const formData = collectFormDataForPost();
        await context[type].fetchAddInsurance[formData.insuranceType](formData);
        alert(POP_UP.POST.OK);
        window.location.href = "home.html"
        } else {
          window.history.back();
        }
      });
    cancelButton.addEventListener("click", () => window.history.back());
  } else if (selectedButtonType === "UPDATE") {
    saveButton.textContent = BUTTON.TASK.EMPLOYEE.PRODUCT_MANAGEMENT.MANAGE_INSURANCE_PRODUCT.UPDATE;
    cancelButton.textContent = COMMON_BUTTON.COMMON.CANCEL;
      saveButton.addEventListener("click", async () => {
        const userConfirmed = confirm(POP_UP.UPDATE.QUESTION);
        if (userConfirmed) {
        const formData = collectFormDataForUpdate();
        await context[type].fetchUpdateInsurance[formData.insuranceType](formData);
        alert(POP_UP.UPDATE.OK);
        window.location.href = "home.html"
        } else {
          window.history.back();
        }
      });
    cancelButton.addEventListener("click", () => window.history.back());
  }
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
};

const collectFormDataForPost = () => {
  const getValueById = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : null; // 요소가 존재하면 value 반환, 아니면 null 반환
  };

  const getCheckedValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(
      (checkbox) => checkbox.value
    );
  };

  const insuranceType = getValueById("insuranceType"); // POST는 콤보박스에서 선택한 값 사용
  const commonData = {
    insuranceType,
    name: getValueById("insuranceName"),
    ageRange: getValueById("ageRange"),
    coverage: getValueById("coverage"),
    maximumMoney: getValueById("maximumMoney"),
    monthlyPremium: getValueById("monthlyPremium"),
    contractPeriod: getValueById("contractPeriod"),
  };

  // 보험 유형별로 데이터 추가
  switch (insuranceType) {
    case "Injury":
      return {
        ...commonData,
        injuryType: getValueById("injuryType"),
        surgeriesLimit: getValueById("surgeriesLimit")
      };
    case "Disease":
      return {
        ...commonData,
        diseaseLimit: getValueById("diseaseLimit"),
        diseaseName: getValueById("diseaseName"),
        surgeriesLimit: getValueById("surgeriesLimit"),
      };
    case "Automobile":
      return {
        ...commonData,
        vehicleType: getValueById("vehicleType"),
        serviceTypes: getCheckedValues("services"),
      };
    default:
      return commonData; // 기본 데이터 반환 (보험 유형이 없을 때)
  }
};

const collectFormDataForUpdate = () => {
  const getValueById = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : null; // 요소가 존재하면 value 반환, 아니면 null 반환
  };

  const getCheckedValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(
      (checkbox) => checkbox.value
    );
  };

  const insuranceType = JSON.parse(sessionStorage.getItem("selectedDataInsuranceType")); // UPDATE는 세션 데이터 사용
  const commonData = {
    id: JSON.parse(sessionStorage.getItem("selectedDataId")), // UPDATE는 id 포함
    insuranceType,
    name: getValueById("insuranceName"),
    ageRange: getValueById("ageRange"),
    coverage: getValueById("coverage"),
    maximumMoney: getValueById("maximumMoney"),
    monthlyPremium: getValueById("monthlyPremium"),
    contractPeriod: getValueById("contractPeriod"),
  };

  // 보험 유형별로 데이터 추가
  switch (insuranceType) {
    case "Injury":
      return {
        ...commonData,
        injuryType: getValueById("injuryType"),
        surgeriesLimit: getValueById("surgeriesLimit")
      };
    case "Disease":
      return {
        ...commonData,
        diseaseLimit: getValueById("diseaseLimit"),
        diseaseName: getValueById("diseaseName"),
        surgeriesLimit: getValueById("surgeriesLimit"),
      };
    case "Automobile":
      return {
        ...commonData,
        vehicleType: getValueById("vehicleType"),
        serviceTypes: getCheckedValues("services"),
      };
    default:
      return commonData; // 기본 데이터 반환 (보험 유형이 없을 때)
  }
};
