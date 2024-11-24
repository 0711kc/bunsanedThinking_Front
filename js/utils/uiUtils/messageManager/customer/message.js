import { fetchGetCustomerById } from '../../../apiUtils/apiDocumentation/customer/customer.js';
import { MESSAGES } from '../../../../../config/common.js';

export const renderGreeting = async () => {
  const container = document.querySelector(".container");
  const id = sessionStorage.getItem("id");
  const getCustomer = await fetchGetCustomerById(id);
  const greeting = document.createElement("div");
  greeting.className = "greeting";
  greeting.textContent = `${getCustomer.name} ${MESSAGES.GREETING} `;

  const headerLine = document.querySelector(".header-line");
  container.insertBefore(greeting, headerLine.nextSibling);
};
