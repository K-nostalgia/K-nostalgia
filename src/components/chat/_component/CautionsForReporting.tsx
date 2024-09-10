import React from 'react';

const CautionsForReporting = () => {
  return (
    <ul>
      <li>
        이 회원이 신고 대상에 해당하는지 다시 한 번 확인하여 주시기 바랍니다.
      </li>
      <li>
        신고를 제출하면 향그리움팀에서 조사를 시작하며, 이때 사실 관계 확인을
        위해 신고자에게 객관적인 자료를 요청할 수 있습니다.
      </li>
      <li>
        신고자 정보 및 내용은 신고 대상에게 공개되지 않으나, 사실 관계 확인에 꼭
        필요한 신고 내용의 일부는 언급될 수 있습니다.
      </li>
      <li>
        신고 대상은 활동 제한 등 불이익을 받을 수 있으며, 사실 관계 확인 시 쌍방
        과실의 경우 신고자 또한 향그리움팀 활동 제한 등 불이익을 받을 수
        있습니다.
      </li>
    </ul>
  );
};

export default CautionsForReporting;
