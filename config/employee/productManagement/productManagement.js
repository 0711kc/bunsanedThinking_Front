import {BUTTON as COMMON_BUTTON} from "../../../config/common.js"

export const BUTTON = {
  TASK: {
    EMPLOYEE: {
      PRODUCT_MANAGEMENT: {
        HOME: {
          MANAGE_INSURANCE_PRODUCT: '보험 상품 관리'
        },
        MANAGE_INSURANCE_PRODUCT:{
          UPDATE: COMMON_BUTTON.COMMON.UPDATE,
          DELETE: COMMON_BUTTON.COMMON.DELETE
        }
      }
    }
  }
};

export const POP_UP = {
  UPDATE: {
    QUESTION: "정말로 수정하시겠습니까?",
    OK: "수정이 완료되었습니다."
  },
  DELETE: {
    QUESTION: "정말로 삭제하시겠습니까?",
    OK: "삭제가 완료되었습니다."
  },
  POST: {
    QUESTION: "정말로 등록하시겠습니까?",
    OK: "등록이 완료되었습니다."
  }
};

export const COMBOBOX = {
  MANAGE_INSURANCE_PRODUCT: {
    isCombo: false
  }
};

export const TABLE_TITLE = {
  MANAGE_INSURANCE_PRODUCT: "보험 상품 관리"
};
export const COLUMN_NAME = {
  MANAGE_INSURANCE_PRODUCT:[
    "보험 상품 번호",
    "보험 상품 이름",
    "보험 종류",
    "연령대",
    "월 보험료"
  ]
};

export const DETAIL_COLUMN_NAME = {
  MANAGE_INSURANCE_PRODUCT:{
    ID: "보험 상품 번호",
    NAME: "보험 상품 이름",
    INSURANCE_TYPE: "보험 종류",
    AGE_RANGE: "연령대",
    COVERAGE: "보장 내용",
    MONTHLY_PREMIUM: "월 보험료",
    CONTRACT_PERIOD: "계약기간",
    MAXIMUM_MONEY: "한도",

    TYPE:{
      DISEASE:{
        DISEASE_LIMIT: "질병 최대 개수",
        DISEASE_NAME: "질병 이름",
        SURGERIES_LIMIT: "수술 최대 횟수"
      },
      INJURY:{
        INJURY_TYPE: "상해 보험 종류",
        SURGERIES_LIMIT:"수술 최대 횟수"
      },
      AUTOMOBILE:{
        ACCIDENT_LIMIT:"사고 최대 횟수",
        VEHICLE_TYPE:"차량 종류",
        SERVICES: "서비스"
      },

      LIST:{
        SERVICE_TYPE: "서비스 타입"
      }

    }
  }
};
