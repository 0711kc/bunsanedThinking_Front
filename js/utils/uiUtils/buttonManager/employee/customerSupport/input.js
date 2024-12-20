import {
  BUTTON as COMMON_BUTTON, CLASS,
  ELEMENT_ID as COMMON_ELEMENT_ID,
  EVENT,
  KEY,
  LOCATION,
  TAG
} from "../../../../../../config/common.js";
import {
  fetchHandleAccident,
  fetchHandleComplaint
} from "../../../../apiUtils/apiDocumentation/employee/customerSupport/customerSupport.js";
import {
  BUTTON,
  ELEMENT_ID,
  QUESTION,
  RESULT_MESSAGE
} from "../../../../../../config/employee/customerSupport/customerSupport.js";

export const renderButtons = () => {
  const selectedButtonType = sessionStorage.getItem(KEY.SELECTED_BUTTON_TYPE);
  context[selectedButtonType].createButtons(selectedButtonType);
};

const createHandleComplaintButton = () => {
  const buttonContainer = document.getElementById(COMMON_ELEMENT_ID.BUTTON_CONTAINER);

  const handleButton = createButton(BUTTON.TASK.EMPLOYEE.CUSTOMER_SUPPORT.HANDLE_COMPLAINT.HANDLE_COMPLAINT);
  handleButton.addEventListener(EVENT.CLICK, async () => {
    let id = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
    let result = getValueById(ELEMENT_ID.RESULT);
    let employeeName = getValueById(ELEMENT_ID.EMPLOYEE_NAME);
    const check = confirm(QUESTION.CONFIRM_HANDLE_COMPLAINT);

    if (!check) {
      return;
    }

    const response = await fetchHandleComplaint(id, result, employeeName);
    if (response == null) {
      return;
    }
    alert(RESULT_MESSAGE.HANDLE_COMPLETE_COMPLAINT);
    window.location.href = LOCATION.HOME;
  });

  buttonContainer.appendChild(handleButton);
  createCancelButton();
}

const createHandleReportButton = () => {
  const buttonContainer = document.getElementById(COMMON_ELEMENT_ID.BUTTON_CONTAINER);

  const handleButton = createButton(BUTTON.TASK.EMPLOYEE.CUSTOMER_SUPPORT.HANDLE_REPORT.HANDLE_REPORT);
  handleButton.addEventListener(EVENT.CLICK, async () => {
    let id = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
    let damageAssessmentCompanyId = getValueById(ELEMENT_ID.DAMAGE_ASSESSMENT_COMPANY_ID);
    let roadsideAssistanceCompanyId = getValueById(ELEMENT_ID.ROADSIDE_ASSISTANCE_COMPANY_ID);
    const check = confirm(QUESTION.CONFIRM_HANDLE_REPORT);

    if (!check)
      return;
    const response = await fetchHandleAccident(id, damageAssessmentCompanyId, roadsideAssistanceCompanyId);
    if (response == null)
      return;
    alert(RESULT_MESSAGE.HANDLE_COMPLETE_REPORT);
    window.location.href = LOCATION.HOME;
  });

  buttonContainer.appendChild(handleButton);
  createCancelButton();
}

const context = {
  HANDLE_COMPLAINT: {
    createButtons: createHandleComplaintButton
  },
  HANDLE_REPORT: {
    createButtons: createHandleReportButton
  }
}

const createButton = (textContent) => {
  const okButton = document.createElement(TAG.BUTTON);
  okButton.className = CLASS.BUTTON_ITEM;
  okButton.textContent = textContent;
  return okButton;
}

const createCancelButton = () => {
  const buttonContainer = document.getElementById(COMMON_ELEMENT_ID.BUTTON_CONTAINER);

  const cancelButton = document.createElement(TAG.BUTTON);
  cancelButton.className = CLASS.BUTTON_ITEM;
  cancelButton.textContent = COMMON_BUTTON.COMMON.CANCEL;

  cancelButton.addEventListener(EVENT.CLICK, () => window.history.back());

  buttonContainer.appendChild(cancelButton);
}

const getValueById = (id) => {
  const element = document.getElementById(id);
  return element ? element.value : null; // 요소가 존재하면 value 반환, 아니면 null 반환
};
