import {BUTTON as COMMON_BUTTON} from "../../../config/common.js"

export const BUTTON = {
  TASK: {
    EMPLOYEE: {
      SALES: {
        HOME: {
          EVALUATE_SALES_PERFORMANCE: '영업 성과 평가',
          HANDLE_INSURANCE_CONSULTATION: '보험 상담 처리',
          INDUCE_INSURANCE_PRODUCT: '보험 상품 영업',
          INDUCE_LOAN_PRODUCT: '대출 상품 영업'
        },
        HANDLE_INSURANCE_CONSULTATION:{
            RESERVATION: "예약",
            CANCEL: COMMON_BUTTON.COMMON.CANCEL
        },
        EVALUATE_SALES_PERFORMANCE:{
          DETAIL:{
            EVALUATION: "평가",
            CANCEL: COMMON_BUTTON.COMMON.CANCEL
          },
          INPUT:{
            STAR: "★"
          }
        },
        INDUCE_INSURANCE_PRODUCT:{
            SENDING_NOTICE: "안내장 발송",
            INSURANCE_ENROLLMENT_REQUEST: "보험 가입 요청"
        },
        INDUCE_LOAN_PRODUCT:{
          SENDING_NOTICE: "안내장 발송",
          LOAN_REQUEST: "대출 요청"
        }
      }
    }
  }
};

export const POP_UP = {
  RESERVATION: "예약이 완료되었습니다.",
  SENDING_NOTICE: "안내장이 발송되었습니다.",
  EVALUATION: "평가가 완료되었습니다."
};
export const COMBOBOX = {
  HANDLE_INSURANCE_CONSULTATION: {
    isCombo: true,
    id: "counselType",
    optionTypes: [
      {
        value: "all",
        label: "처리 상태"
      },
      {
        value: "Completed",
        label: "처리완료"
      },
      {
        value: "Unprocessed",
        label: "미처리"
      }
    ]
  },
  EVALUATE_SALES_PERFORMANCE: {
    isCombo: false
  },
  INDUCE_INSURANCE_PRODUCT: {
    isCombo: true,
    id: "insuranceType",
    optionTypes: [
      {
        value: "all",
        label: "보험종류"
      },
      {
        value: "injury",
        label: "상해보험"
      },
      {
        value: "automobile",
        label: "자동차보험"
      },
      {
        value: "disease",
        label: "질병보험"
      }
    ]
  },
  INDUCE_LOAN_PRODUCT: {
    isCombo: true,
    id: "loanType",
    optionTypes: [
      {
        value: "all",
        label: "대출종류"
      },
      {
        value: "collateral",
        label: "담보"
      },
      {
        value: "fixedDeposit",
        label: "정기예금"
      },
      {
        value: "insuranceContract",
        label: "보험계약"
      }
    ]
  }
};
export const TABLE_TITLE = {
  EVALUATE_SALES_PERFORMANCE: "영업 직원 정보 리스트",
  HANDLE_INSURANCE_CONSULTATION: "보험 상담 처리 정보 리스트",
  INDUCE_INSURANCE_PRODUCT: "보험 상품 정보 리스트",
  INDUCE_LOAN_PRODUCT: "대출 상품 정보 리스트",
};
export const COLUMN_NAME = {
  EVALUATE_SALES_PERFORMANCE: [
    "직원 번호",
    "직원 이름",
    "직급",
    "계약 건수"
  ],
  HANDLE_INSURANCE_CONSULTATION: [
    "상담 번호",
    "고객 이름",
    "전화 번호",
    "날짜",
    "성별",
    "처리 상태"
  ],
  INDUCE_INSURANCE_PRODUCT: [
    "보험 보험 상품 번호",
    "보험 상품 이름",
    "보험 종류",
    "연령대",
    "월 보험료"
  ],
  INDUCE_LOAN_PRODUCT: [
    "대출 상품 번호",
    "대출 상품 이름",
    "대출 상품 종류",
    "이자율",
    "대출가능 최대 금액"
  ]
};

export const DETAIL_COLUMN_NAME = {
  HANDLE_INSURANCE_CONSULTATION:{
    ID: "상담 번호",
    NAME: "고객 이름",
    PHONE_NUMBER: "전화 번호",
    COUNSEL_DATE: "날짜",
    JOB: "직업",
    AGE: "나이",
    GENDER: "성별",
    PROCESS_STATUS: "처리 상태"
  },
  EVALUATE_SALES_PERFORMANCE:{
    ID: "직원 번호",
    NAME: "직원 이름",
    POSITION: "직급",
    SALARY: "급여",
    CONTRACT_COUNT: "계약 건수"
  },
  INDUCE_INSURANCE_PRODUCT:{
    ID: "보험 상품 번호",
    NAME: "보험 상품 이름",
    INSURANCE_TYPE: "보험 종류",
    AGE_RANGE: "연령대",
    COVERAGE: "보장 내용",
    MONTHLY_PREMIUM: "월 보험료",
    CONTRACT_PERIOD: "계약기간",

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
  },
  INDUCE_LOAN_PRODUCT:{
    ID: "대충 상품 번호",
    NAME: "대출 상품 이름",
    LOAN_TYPE: "대출 종류",
    INTEREST_RATE: "이자율",
    MAXIMUM_MONEY: "대출 가능 최대 금액",
    MINIMUM_ASSET: "최소 자산",

    TYPE:{
      COLLATERAL:{
        COLLATERAL_TYPE: "담보 종류",
        MINIMUM_VALUE: "담보 최소 가치"
      },
      FIXED_DEPOSIT:{
        MINIMUM_AMOUNT: "최대 예치 금액"
      },
      INSURANCE_CONTRACT:{
        PRODUCT_ID: "보험 상품 번호"
      }
    }
  }
};

export const NAME_MAPPER= {
  EVALUATE_SALES_PERFORMANCE: "EVALUATE_SALES_PERFORMANCE",
  HANDLE_INSURANCE_CONSULTATION: "HANDLE_INSURANCE_CONSULTATION",
  INDUCE_INSURANCE_PRODUCT: "INDUCE_INSURANCE_PRODUCT",
  INDUCE_LOAN_PRODUCT: "INDUCE_LOAN_PRODUCT"
}
