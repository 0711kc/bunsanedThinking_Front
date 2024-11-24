import {initialButtons} from "../../../common/buttonUtils.js";
import {BUTTON} from "../../../../../../config/employee/compensation/compensation.js";

const requestCompensation = () => {
  alert("보상처리");
}

const requestInsuranceMoney = () => {
  alert("보험금 지급");
}

const cancel = () => {
  window.history.back();
}

const compensationTaskMapper = {
  REQUEST_COMPENSATION: {
    REQUEST: requestCompensation,
    CANCEL: cancel
  },
  REQUEST_INSURANCE_MONEY: {
    REQUEST: requestInsuranceMoney,
    CANCEL: cancel
  }
}

export const renderButtons = () => {
  const type = sessionStorage.getItem("currentType");
  initialButtons(BUTTON.TASK.COMPENSATION[type], compensationTaskMapper[type]);
}
