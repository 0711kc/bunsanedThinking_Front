import {initialButtons} from "../../../common/buttonUtils.js";
import {BUTTON} from "../../../../../../config/employee/contractManagement/contractManagement.js";

const sendNotice = () => {
  alert("안내장 발송");
}
const reviewRecontract = () => {
  alert("재계약 승인");
}
const denyRecontract = () => {
  alert("재계약 거절");
}
const reviewEndorsement = () => {
  alert("배서 승인");
}
const denyEndorsement = () => {
  alert("배서 거절");
}
const reviewRevival = () => {
  alert("부활 승인");
}
const denyRevival = () => {
  alert("부활 거절");
}
const requestTerminationFee = () => {
  alert("해지 승인");
}
const cancel = () => {
  window.history.back();
}

const contractManagementTaskMapper = {
  DEFAULT_CONTRACT: {
    NOTICE: sendNotice,
    CANCEL: cancel
  },
  RECONTRACT: {
    APPLY: reviewRecontract,
    DENY: denyRecontract
  },
  ENDORSEMENT: {
    APPLY: reviewEndorsement,
    DENY: denyEndorsement
  },
  REVIVAL: {
    APPLY: reviewRevival,
    DENY: denyRevival
  },
  TERMINATION: {
    REQUEST: requestTerminationFee,
    CANCEL: cancel
  }
}

export const renderButtons = () => {
  const type = sessionStorage.getItem("currentType");
  initialButtons(BUTTON.TASK.CONTRACT_MANAGEMENT[type], contractManagementTaskMapper[type]);
}
