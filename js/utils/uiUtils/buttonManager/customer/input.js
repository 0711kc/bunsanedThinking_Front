import {initialButtons} from "../../common/buttonUtils.js";
import {ALERT, BUTTON, INPUT_FORM, RECEIVE_INSURANCE_DTO} from "../../../../../config/customer/customer.js";
import {
  fetchApplyEndorsementById, fetchAskInsuranceCounsel, fetchComplain, fetchGetAllAutomobileContractByCustomerId,
  fetchPayInsurancefee,
  fetchReceiveInsurance, fetchReportAccident
} from "../../../apiUtils/apiDocumentation/customer/customer.js";
import {KEY, STRING_EMPTY, ZERO} from "../../../../../config/common.js";

const getInputForm = () => {
  return INPUT_FORM[sessionStorage.getItem(KEY.SELECTED_BUTTON_TYPE)];
}

const applyEndorsement = async () => {
  if (!confirm(ALERT.CONFIRM.APPLY_ENDORSEMENT)) return;
  const inputForm = getInputForm();
  const contractId = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
  const depositDate = document.getElementById(inputForm.DEPOSIT_DATE.id).value;
  if (depositDate === STRING_EMPTY) alert(inputForm.DEPOSIT_DATE.exception);
  else {
    const result = await fetchApplyEndorsementById(depositDate, contractId);
    if (result == null) return;
    alert(ALERT.OK.APPLY_ENDORSEMENT);
    window.history.back();
    window.history.back();
    window.history.back();
  }
}

const getPayInsuranceFeeDTO = (contractId, depositMoney, depositPath) => {
  return {
    contractId: contractId,
    money: depositMoney,
    depositPath: depositPath-1
  }
}

const payInsuranceFee = async () => {
  if (!confirm(ALERT.CONFIRM.PAY_INSURANCE_FEE)) return;
  const inputForm = getInputForm();
  const contractId = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
  const depositPath = document.getElementById(inputForm.DEPOSIT_PATH.id).selectedIndex;
  const depositMoney = document.getElementById(inputForm.DEPOSIT_MONEY.id).value;
  if (depositPath === ZERO) alert(inputForm.DEPOSIT_PATH.exception);
  else if (depositMoney === STRING_EMPTY || depositMoney <= ZERO)
    alert(inputForm.DEPOSIT_MONEY.exception);
  else {
    const depositDTO = getPayInsuranceFeeDTO(contractId, depositMoney, depositPath);
    const result = await fetchPayInsurancefee(depositDTO);
    if (result == null) return;
    alert(ALERT.OK.PAY_INSURANCE_FEE);
    window.history.back();
    window.history.back();
    window.history.back();
  }
}

const getReceiveInsuranceDTO = (contractId, medicalCertificate,
                                receipt, residentRegistrationCard) => {
  const formData = new FormData();
  formData.append(RECEIVE_INSURANCE_DTO.CONTRACT_ID, contractId);
  formData.append(RECEIVE_INSURANCE_DTO.MEDICAL_CERTIFICATE, medicalCertificate);
  formData.append(RECEIVE_INSURANCE_DTO.RECEIPT, receipt);
  formData.append(RECEIVE_INSURANCE_DTO.RESIDENT_REGISTRATION_CARD, residentRegistrationCard);
  return formData;
}

const receiveInsurance = async () => {
  // 만들어두기만 함 - 서버 연동은 아직 미실시
  if (!confirm(ALERT.CONFIRM.RECEIVE_INSURANCE)) return;
  const inputForm = getInputForm();
  const contractId = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
  const medicalCertificate = document.getElementById(inputForm.MEDICAL_CERTIFICATE.id).files;
  const receipt = document.getElementById(inputForm.RECEIPT.id).files;
  const residentRegistrationCard = document.getElementById(inputForm.RESIDENT_REGISTRATION_CARD.id).files;
  if (medicalCertificate.length === ZERO) alert(inputForm.MEDICAL_CERTIFICATE.exception);
  else if (receipt.length === ZERO) alert(inputForm.RECEIPT.exception);
  else if (residentRegistrationCard.length === ZERO) alert(inputForm.RESIDENT_REGISTRATION_CARD.exception);
  else {
    console.log(medicalCertificate);
    console.log(receipt);
    console.log(residentRegistrationCard);
    const receiveInsuranceDTO = getReceiveInsuranceDTO(contractId,
      medicalCertificate[ZERO], receipt[ZERO], residentRegistrationCard[ZERO]);
    const result = await fetchReceiveInsurance(receiveInsuranceDTO);
    if (result == null) return;
    alert(ALERT.OK.RECEIVE_INSURANCE);
    window.history.back();
    window.history.back();
    window.history.back();
  }
}

const getAskInsuranceCounsel = (id, insuranceId, counselDate) => {
  return {
    customerId: id,
    insuranceId: insuranceId,
    counselDate: counselDate
  }
}

const askInsuranceCounsel = async () => {
  if (!confirm(ALERT.CONFIRM.ASK_INSURANCE_COUNSEL)) return;
  const inputForm = getInputForm();
  const insuranceId = sessionStorage.getItem(KEY.SELECTED_DATA_ID);
  const id = sessionStorage.getItem(KEY.LOGIN_ID);
  const counselDate = document.getElementById(inputForm.COUNSEL_DATE.id).value;
  if (counselDate === STRING_EMPTY) alert(inputForm.COUNSEL_DATE.exception); // 여기 형식은 다시 찾아봐야 함
  else {
    const askInsuranceCounselDTO = getAskInsuranceCounsel(id, insuranceId, counselDate);
    const result = await fetchAskInsuranceCounsel(askInsuranceCounselDTO);
    if (result == null) return;
    alert(ALERT.OK.ASK_INSURANCE_COUNSEL);
    window.history.back();
    window.history.back();
    window.history.back();
  }
}

const getReportAccident = (id, type, accidentDate, location) => {
  return {
    accidentDate: accidentDate,
    location: location,
    serviceType: type-1,
    customerId: id
  };
}

const reportAccident = async () => {
  if (!confirm(ALERT.CONFIRM.ADD_ACCIDENT)) return;
  const id = sessionStorage.getItem(KEY.LOGIN_ID);
  const automobileContracts = await fetchGetAllAutomobileContractByCustomerId(id);
  if (automobileContracts.length === ZERO) {
    alert(ALERT.FAIL.ADD_ACCIDENT);
    return;
  }
  const inputForm = getInputForm();
  const type = document.getElementById(inputForm.TYPE.id).selectedIndex;
  const accidentDate = document.getElementById(inputForm.ACCIDENT_DATE.id).value;
  const location = document.getElementById(inputForm.LOCATION.id).value;
  if (type === ZERO) alert(inputForm.TYPE.exception);
  else if (accidentDate === STRING_EMPTY) alert(inputForm.ACCIDENT_DATE.exception);
  else if (location === STRING_EMPTY) alert(inputForm.LOCATION.exception);
  else {
    const reportAccidentDTO = getReportAccident(id, type, accidentDate, location);
    const result = await fetchReportAccident(reportAccidentDTO);
    if (result == null) return;
    alert(ALERT.OK.ADD_ACCIDENT);
    window.history.back();
    window.history.back();
  }
}

const getComplainDTO = (id, type, complaintTitle, content) => {
  return {
    complainType: type-1,
    title: complaintTitle,
    content: content,
    customerId: id
  }
}

const complaint = async () => {
  if (!confirm(ALERT.CONFIRM.ADD_COMPLAINT)) return;
  const inputForm = getInputForm();
  const id = sessionStorage.getItem(KEY.LOGIN_ID);
  const type = document.getElementById(inputForm.TYPE.id).selectedIndex;
  const complaintTitle = document.getElementById(inputForm.COMPLAINT_TITLE.id).value;
  const content = document.getElementById(inputForm.CONTENT.id).value;
  if (type === ZERO) alert(inputForm.TYPE.exception);
  else if (complaintTitle === STRING_EMPTY) alert(inputForm.COMPLAINT_TITLE.exception);
  else if (content === STRING_EMPTY) alert(inputForm.CONTENT.exception);
  else {
    const complainDTO = getComplainDTO(id, type, complaintTitle, content);
    const result = await fetchComplain(complainDTO);
    if (result == null) return;
    alert(ALERT.OK.ADD_COMPLAINT);
    window.history.back();
    window.history.back();
  }
}

const cancel = () => {
  window.history.back();
}

const customerTaskMapper = {
  APPLY_ENDORSEMENT: {
    OK: applyEndorsement,
    CANCEL: cancel
  },
  PAY_INSURANCE_FEE: {
    OK: payInsuranceFee,
    CANCEL: cancel
  },
  RECEIVE_INSURANCE: {
    OK: receiveInsurance,
    CANCEL: cancel
  },
  ASK_INSURANCE_COUNSEL: {
    OK: askInsuranceCounsel,
    CANCEL: cancel
  },
  ADD_ACCIDENT: {
    POST: reportAccident,
    CANCEL: cancel
  },
  ADD_COMPLAINT: {
    POST: complaint,
    CANCEL: cancel
  }
}

export const renderButton = () => {
  const type = sessionStorage.getItem(KEY.SELECTED_BUTTON_TYPE);
  initialButtons(BUTTON.TASK.CUSTOMER.INPUT[type], customerTaskMapper[type]);
}
