import {initialButtons} from "../../common/buttonUtils.js";
import {BUTTON} from "../../../../../config/customer/customer.js";


const applyRecontract = () => {
  alert("재가입 신청");
}

const applyRevival = () => {
  alert("부활 신청");
}

const applyTermination = () => {
  alert("해지 신청");
}

const applyEndorsement = () => {
  alert("배서 신청");
}

const payInsuranceFee = () => {
  alert("보험금 납입");
}

const receiveInsurance = () => {
  alert("보험금 신청");
}

const askInsuranceCounsel = () => {
  alert("상담 신청");
}

const buyInsurance = () => {
  alert("보험 구매");
}

const loan = () => {
  alert("대출 신청");
}

const cancel = () => {
  window.history.back();
}

const customerTaskMapper = {
  MANAGEMENT_CONTRACT: {
    RECONTRACT: applyRecontract,
    REVIVAL: applyRevival,
    TERMINATION: applyTermination,
    ENDORSEMENT: applyEndorsement,
    PAY_INSURANCE_FEE: payInsuranceFee,
    RECEIVE_INSURANCE: receiveInsurance
  },
  INSURANCE_LIST: {
    COUNSEL: askInsuranceCounsel,
    BUY_INSURANCE: buyInsurance
  },
  LOAN_LIST: {
    APPLY: loan,
    CANCEL: cancel
  }
}

export const renderButtons = () => {
  const type = sessionStorage.getItem("currentType");
  initialButtons(BUTTON.TASK.CUSTOMER[type], customerTaskMapper[type]);
}
