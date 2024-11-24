export const BUTTON = {
  TASK: {
    EMPLOYEE: {
      UNDERWRITING: {
        HOME: {
          REVIEW_ACQUISITION: '인수 심사',
          APPLY_COPERATION: '공동 인수 신청',
          APPLY_REINSURANCE: '재보험 신청'
        },
        REVIEW_ACQUISITION: {
          ACCEPTANCE: "승인",
          DENIED: "거절"
        }
      }
    }
  }
};

export const POP_UP = {
  ACCEPTANCE: "승인이 완료되었습니다.",
  DENIED: "거절이 완료되었습니다."
};

export const COMBOBOX = {
  REVIEW_ACQUISITION: {
    isCombo: true,
    id: "requestingType",
    optionTypes: [
      {
        value: "all",
        label: "처리상태"
      },
      {
        value: "requesting",
        label: "미처리"
      },
      {
        value: "notRequesting",
        label: "처리완료"
      }
    ]
  },
  APPLY_COPERATION: {
    isCombo: false
  },
  APPLY_REINSURANCE: {
    isCombo: false
  }
};

export const TABLE_TITLE = {
  REVIEW_ACQUISITION: "인수 심사 정보 리스트",
  APPLY_COPERATION: "공동 인수 정보 리스트",
  APPLY_REINSURANCE: "재보험 정보 리스트",
};

export const COLUMN_NAME = {
  REVIEW_ACQUISITION:[
    "계약 번호",
    "고객 이름",
    "전화 번호",
    "직업",
    "나이",
    "성별",
    "주민등록번호",
    "주소",
    "신청한 보험 상품 번호",
    "심사 상태"
  ],
  APPLY_COPERATION:[
    "보험 종류",
    "보험 상품 이름",
    "타 보험사 이름"
  ],
  APPLY_REINSURANCE:[
    "보험 종류",
    "보험 상품 이름",
    "보험 상품 번호",
    "타 보험사 이름"
  ]
};

export const DETAIL_COLUMN_NAME = {
  REVIEW_ACQUISITION:{
    ID: "계약 번호",
    CONTRACT_STATUS: "계약 상태",
    PRODUCT_ID: "상품 번호",
    NAME: "고객 이름",
    PHONE_NUMBER: "전화 번호",
    JOB: "직업",
    AGE: "나이",
    GENDER: "성별",
    RESIDENT_REGISTRATION_NUMBER: "주민등록번호",
    ADDRESS: "주소",
    BANK_ACCOUNT: "계좌 번호",
    PROPERTY: "재산",
    ACCIDENT_HISTORIES: "사고 이력",
    SURGERY_HISTORIES: "수술 이력",

    LIST:{
      ACCIDENT_HISTORY:{
        ID: "사고 이력 번호",
        ACCIDENT_DETAIL: "사고 내용",
        DATE: "사고 날짜"
      },
      SURGERY_HISTORY:{
        ID: "수술 이력 번호",
        NAME: "수술명",
        HOSPITAL_NAME: "수술 병원",
        DATE: "수술 날짜"
      }
    }
  }
};
