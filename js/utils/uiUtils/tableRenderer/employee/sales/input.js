import {addStarButtons, renderBottomButtons} from "../../../buttonManager/employee/sales/input.js";
import { NAME_MAPPER } from "../../../../../../config/employee/sales/sales.js";

export function renderInput() {
  const type = sessionStorage.getItem("currentType");
  if (type === NAME_MAPPER.EVALUATE_SALES_PERFORMANCE) {
    addStarButtons();
  } else if (type === NAME_MAPPER.INDUCE_INSURANCE_PRODUCT || type === NAME_MAPPER.INDUCE_LOAN_PRODUCT) {
    renderCustomerInputFields();
  }
}

const customerForms = [
  {
    isTextArea: false,
    for: "name",
    label: "NAME",
    type: "text",
    id: "name",
    name: "name",
    placeholder: "고객 이름"
  },
  {
    isTextArea: false,
    for: "age",
    label: "AGE",
    type: "number",
    id: "age",
    name: "age",
    placeholder: "고객 나이"
  },
  {
    isTextArea: false,
    for: "gender",
    label: "GENDER",
    type: "button-group", // 버튼 그룹으로 표시
    id: "gender",
    name: "gender",
    options: [
      { value: "Male", text: "남자" },
      { value: "Female", text: "여자" }
    ]
  },
  {
    isTextArea: false,
    for: "address",
    label: "ADDRESS",
    type: "text",
    id: "address",
    name: "address",
    placeholder: "주소"
  },
  {
    isTextArea: false,
    for: "phoneNumber",
    label: "PHONE_NUMBER",
    type: "text",
    id: "phoneNumber",
    name: "phoneNumber",
    placeholder: "전화번호"
  },
  {
    isTextArea: false,
    for: "residentRegistrationNumber",
    label: "RESIDENT_REGISTRATION_NUMBER",
    type: "text",
    id: "residentRegistrationNumber",
    name: "residentRegistrationNumber",
    placeholder: "주민등록번호"
  },
  {
    isTextArea: false,
    for: "job",
    label: "JOB",
    type: "text",
    id: "job",
    name: "job",
    placeholder: "직업"
  },
  {
    isTextArea: false,
    for: "bankAccount",
    label: "BANK_ACCOUNT",
    type: "text",
    id: "bankAccount",
    name: "bankAccount",
    placeholder: "은행 계좌"
  },
  {
    isTextArea: false,
    for: "bankName",
    label: "BANK_NAME",
    type: "text",
    id: "bankName",
    name: "bankName",
    placeholder: "은행 이름"
  },
  {
    isTextArea: false,
    for: "property",
    label: "PROPERTY",
    type: "number",
    id: "property",
    name: "property",
    placeholder: "자산"
  }
];

const createCustomerForm = (form) => {
  const formDiv = document.createElement("div");
  formDiv.className = "form-group";

  const formLabel = document.createElement("label");
  formLabel.for = form.for;
  formLabel.textContent = form.placeholder;
  formDiv.appendChild(formLabel);

  if (form.type === "button-group") {
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";
    form.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option.text; // 버튼에 표시할 텍스트
      button.className = "gender-button";
      button.addEventListener("click", () => {
        document.querySelectorAll(".gender-button").forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        buttonGroup.dataset.selectedValue = option.value; // 선택된 값으로 설정
      });
      buttonGroup.appendChild(button);
    });
    formDiv.appendChild(buttonGroup);
  } else {
    const formInput = form.isTextArea
      ? document.createElement("textarea")
      : document.createElement("input");
    formInput.type = form.type;
    formInput.id = form.id;
    formInput.name = form.name;
    formInput.placeholder = form.placeholder;
    formDiv.appendChild(formInput);
  }

  return formDiv;
};

const renderCustomerInputFields = () => {
  const container = document.getElementById("inputFieldsContainer");
  while (container.firstChild) container.removeChild(container.firstChild); // 기존 내용 제거

  customerForms.forEach((form) => {
    container.appendChild(createCustomerForm(form));
  });

  addDynamicSection(container, "사고 이력", "accidentHistory", ["date", "사고 내역"]);
  addDynamicSection(container, "수술 이력", "surgeryHistory", ["date", "병원 이름", "수술 이름"]);
  addDynamicSection(container, "질병 이력", "diseaseHistory", ["date", "질병 이름"]);

  renderBottomButtons(container);
};

const addDynamicSection = (container, sectionTitle, sectionId, fieldNames) => {
  const sectionDiv = document.createElement("div");
  sectionDiv.id = `${sectionId}Container`;
  sectionDiv.className = "dynamic-section";

  const headerDiv = document.createElement("div");
  headerDiv.className = "section-header";

  const sectionLabel = document.createElement("label");
  sectionLabel.textContent = sectionTitle;

  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.className = "add-button";
  addButton.addEventListener("click", () => addInputField(sectionDiv, sectionId, fieldNames));

  headerDiv.appendChild(sectionLabel);
  headerDiv.appendChild(addButton);
  sectionDiv.appendChild(headerDiv);

  container.appendChild(sectionDiv);
};

const addInputField = (sectionDiv, sectionId, fieldNames) => {
  const inputDiv = document.createElement("div");
  inputDiv.className = "form-group";

  fieldNames.forEach((field) => {
    const input = document.createElement("input");
    input.type = field === "date" || field === "dateOfDiagnosis" ? "date" : "text";
    input.name = `${sectionId}${field}`;
    input.placeholder = field === "date" || field === "dateOfDiagnosis" ? "날짜 입력" : `${field} 입력`;
    input.className = "input-field";
    inputDiv.appendChild(input);
  });

  sectionDiv.appendChild(inputDiv);
};

